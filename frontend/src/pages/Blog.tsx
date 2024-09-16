import { AppBar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });
  if (loading) {
    return (
      <>
        <AppBar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <AppBar />
      <div className="container mx-auto flex flex-col pt-12">
        <FullBlog blog={blog} />
      </div>
    </>
  );
};
