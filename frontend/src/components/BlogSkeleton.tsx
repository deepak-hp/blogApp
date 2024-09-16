export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="p-4 border-b border-slate-200 pb-4 cursor-pointer ">
        <div className="flex items-center justify-start">
          <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

          <div className="pl-2 font-thin text-slate-500 text-sm">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

        <div className="text-slate-500 text-sm font-thin pt-2">
          {" "}
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
        </div>
      </div>
    </div>
  );
};
