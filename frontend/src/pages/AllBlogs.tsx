import Appbar from "../components/AppBar";
import  {BlogCard}  from "../components/BlogCard";
import { BlogSkeleton } from "../components/Skelleton";
import { useBlogs } from "../hooks";

const AllBlogs = () => {

    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <BlogSkeleton/>
        )
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="max-w-xl">
                    {blogs.map((blog, idx) => (
                        <BlogCard
                            key={idx}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            id={blog.id}
                            publishedDate="December 3, 2023"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllBlogs;