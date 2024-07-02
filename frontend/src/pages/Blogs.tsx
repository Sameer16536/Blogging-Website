import Appbar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"


const Blogs = () => {
    const {loading,blogs} = useBlogs()
    if(loading){
        return <div>
            Loading......
        </div>
    }
    return (
        <div>
            <Appbar />
        <div className="flex justify-center">
            
            <div className="">
                {blogs.map((blog) => ( <BlogCard id={blog.id} authorName={blog.author.name || "Anonymous"} publishedDate={"1 July 2024"} content={blog.content} title={blog.title} 
            />))}
                 </div>
        </div>
        </div>
            )
    
}

export default Blogs
