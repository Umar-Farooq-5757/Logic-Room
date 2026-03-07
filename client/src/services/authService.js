import api from "../api/axios";

export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });

  if (res.data.success) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};
