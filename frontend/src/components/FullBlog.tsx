import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="grid grid-cols-12 px-10 w-full pt-200">
      <div className="col-span-8">
        <div className="text-5xl font-extrabold">{blog.title}</div>
        <div className="pt-2 text-slate-500">Posted on 2nd Dec 2023</div>
        <div className="pt-4 text-slate-900">{blog.content}</div>
      </div>
      <div className="col-span-4">
        <div className="text-slate-600 text-lg">Author</div>
        <div className="flex items-center gap-4 pt-4">
          <div>
            <Avatar name={blog.author.name || "Anonymous"} size="big" />
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-bold">
              {blog.author.name || "Anonymous"}
            </div>
            <div className="pt-0 text-slate-500">
              Random catch phrase about the author's ability to grab the user's
              attention
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
