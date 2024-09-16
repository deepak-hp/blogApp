import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center flex-col">
          <div className="container mx-auto flex flex-col justify-center max-w-xl">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AppBar />
      <div className="container mx-auto flex flex-col justify-center max-w-xl">
        {blogs.length
          ? blogs.map((blog) => (
              <div key={blog.id}>
                <BlogCard
                  id={blog.id}
                  authorName={blog?.author?.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={"2nd feb 2024"}
                />
              </div>
            ))
          : null}
      </div>
    </>
  );
};
