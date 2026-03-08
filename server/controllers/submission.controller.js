import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const USE_RAPIDAPI = process.env.USE_RAPIDAPI === "true";
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || process.env.JUDGE0_KEY || "";
const JUDGE0_HOST = process.env.JUDGE0_HOST || "https://ce.judge0.com";


/**
 * Build axios request config for submission or status check.
 * When using RapidAPI we call the rapidapi host; otherwise we call direct host.
 */
function buildAxiosConfig({
    method = "POST",
    path = "/submissions",
    params = {},
    data = null,
}) {
    const headers = {
        "Content-Type": "application/json",
    };

    let url;
    if (USE_RAPIDAPI) {
        url = `https://${RAPIDAPI_HOST}${path}`;
        headers["X-RapidAPI-Host"] = RAPIDAPI_HOST;
        if (RAPIDAPI_KEY) headers["X-RapidAPI-Key"] = RAPIDAPI_KEY;
    } else {
        // direct host
        url = `${JUDGE0_HOST}${path}`;
        if (process.env.JUDGE0_TOKEN)
            headers["Authorization"] = `Bearer ${process.env.JUDGE0_TOKEN}`;
    }

    return {
        method,
        url,
        params,
        headers,
        data,
        timeout: 20000, // 20s timeout
        validateStatus: null, // let us handle statuses manually
    };
}

/**
 * Submit code to the judge and return the token (or error).
 * requestBody: { language_id, source_code, stdin }
 */
const submitCode = async ({ language_id, source_code, stdin = "" }) => {
    if (!language_id || !source_code) {
        throw new Error("language_id and source_code are required");
    }

    const payload = {
        language_id,
        source_code: Buffer.from(String(source_code)).toString("base64"),
        stdin: Buffer.from(String(stdin || "")).toString("base64"),
    };

    const config = buildAxiosConfig({
        method: "POST",
        path: "/submissions",
        params: { base64_encoded: true, wait: false }, // wait:false -> returns token immediately
        data: payload,
    });

    const resp = await axios.request(config);
    if (resp.status >= 200 && resp.status < 300) {
        return resp.data; // contains token
    } else {
        const errMsg = resp.data || resp.statusText || `HTTP ${resp.status}`;
        const e = new Error("Submission failed: " + JSON.stringify(errMsg));
        e.httpStatus = resp.status;
        e.httpData = resp.data;
        throw e;
    }
}

/**
 * Check status by token. Returns decoded stdout/stderr and full response data.
 */
const getSubmissionResult = async (token) => {
    if (!token) throw new Error("token required");

    const config = buildAxiosConfig({
        method: "GET",
        path: `/submissions/${encodeURIComponent(token)}`,
        params: { base64_encoded: true },
    });

    const resp = await axios.request(config);
    if (resp.status >= 200 && resp.status < 300) {
        const data = resp.data || {};
        // decode fields if present
        const decode = (b64) => (b64 ? Buffer.from(b64, "base64").toString() : "");
        const decoded = {
            ...data,
            stdout: decode(data.stdout),
            stderr: decode(data.stderr),
            compile_output: decode(data.compile_output),
            message: decode(data.message),
        };
        return decoded;
    } else {
        const errMsg = resp.data || resp.statusText || `HTTP ${resp.status}`;
        const e = new Error("Status check failed: " + JSON.stringify(errMsg));
        e.httpStatus = resp.status;
        e.httpData = resp.data;
        throw e;
    }
}

/**
 * Polling helper with exponential backoff.
 * maxWaitMs: total time to wait before giving up
 */
const pollForResult = async (
    token,
    { intervalMs = 1000, maxWaitMs = 30000 } = {},
) => {
    const start = Date.now();
    let attempt = 0;
    while (true) {
        attempt += 1;
        const elapsed = Date.now() - start;
        if (elapsed > maxWaitMs) {
            throw new Error("Timeout waiting for execution result");
        }

        const result = await getSubmissionResult(token);

        // status.id: 1=in queue, 2=processing, >=3 finished (3=accepted, 4=wrong answer, etc)
        const statusId = result.status && result.status.id ? result.status.id : 0;
        if (statusId > 2) {
            return result;
        }

        // exponential backoff capped
        const backoff = Math.min(intervalMs * Math.pow(1.7, attempt - 1), 5000);
        await new Promise((r) => setTimeout(r, backoff));
    }
}

// These functions are used in submission.routes.js
const submit = async (req, res) => {
    try {
        const { language_id, source_code, stdin } = req.body;
        const submission = await submitCode({ language_id, source_code, stdin });
        // return token and raw submission data
        res.json({ success: true, token: submission.token, submission });
    } catch (err) {
        console.error("submit error:", err.message || err);
        res
            .status(500)
            .json({
                success: false,
                error: err.message,
                details: err.httpData || null,
            });
    }
}

const checkResult = async (req, res) => {
    try {
        const token = req.params.token;
        const result = await getSubmissionResult(token);
        res.json({ success: true, result });
    } catch (err) {
        console.error("status error:", err.message || err);
        res
            .status(500)
            .json({
                success: false,
                error: err.message,
                details: err.httpData || null,
            });
    }
}

const runCode = async (req, res) => {
    try {
        const {
            language_id,
            source_code,
            stdin,
            wait = true,
            timeoutMs = 30000,
        } = req.body;

        // Submit
        const submission = await submitCode({ language_id, source_code, stdin });
        const token = submission.token;

        if (!wait) {
            return res.json({ success: true, token, submission });
        }

        // Poll for result
        const result = await pollForResult(token, {
            maxWaitMs: Number(timeoutMs) || 30000,
        });
        return res.json({ success: true, token, result });
    } catch (err) {
        console.error("run error:", err.message || err);
        res
            .status(500)
            .json({
                success: false,
                error: err.message,
                details: err.httpData || null,
            });
    }
}

// Health check
const checkHealth = (req, res) => res.json({ ok: true, ts: Date.now() })

export default { submit, checkResult, runCode, checkHealth }