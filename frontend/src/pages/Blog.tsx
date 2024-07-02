import { useParams } from "react-router-dom";

import { useBlog } from "../hooks";
import { BlogSkeleton } from "../components/Skelleton";
import FullBlog from "../components/FullBlog";



const Blog = () => {
    const { id } = useParams()

    const { loading, post } = useBlog({ id: Number(id || "1") });

    if (loading) {
        return (
            <div>
                <BlogSkeleton />
            </div>
        )
    }

    if (!post) {
        return null;
    }

    return (
        <div>
            <FullBlog blog={post} />
        </div>
    );
}

export default Blog;