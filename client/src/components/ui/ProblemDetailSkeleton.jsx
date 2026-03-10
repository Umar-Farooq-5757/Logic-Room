import { useAppContext } from "../../contexts/AppContext";

const ProblemDetailSkeleton = () => {
    const {isDark}=useAppContext()
    return (
        <div className={`border ${isDark ? "border-[#3b3440]" : "border-gray-300"} h-6/10 w-1/2 px-5 py-4 animate-pulse rounded-xl`}>
            <div className="flex justify-between items-center my-5">
                <div className={`${isDark?'bg-slate-800':'bg-gray-200'} w-32 h-9 rounded-md`}></div>
                <div className={`${isDark?'bg-slate-800':'bg-gray-200'} w-32 h-9 rounded-md`}></div>
            </div>
            <div className={`${isDark?'bg-slate-800':'bg-gray-200'} w-full h-10 rounded-md my-4`}></div>
            <div className="flex justify-center gap-10 items-center my-5">
                <div className={`${isDark?'bg-slate-800':'bg-gray-200'} w-32 h-9 rounded-md`}></div>
                <div className={`${isDark?'bg-slate-800':'bg-gray-200'} w-32 h-9 rounded-md`}></div>
            </div>
            <div className={`${isDark?'bg-slate-800':'bg-gray-200'} w-full h-10 rounded-md my-4`}></div>
            <div className={`${isDark?'bg-slate-800':'bg-gray-200'} w-full h-10 rounded-md my-4`}></div>
            <div className={`${isDark?'bg-slate-800':'bg-gray-200'} w-full h-10 rounded-md my-4`}></div>
        </div>
    );
};

export default ProblemDetailSkeleton;
