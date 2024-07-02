import { Blog } from "../hooks";
import AppBar from "./AppBar";
import { Avatar } from "../components/BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 pt-8 max-w-screen-xl">
                    <div className="col-span-8 flex flex-col gap-2">
                        <div className="text-5xl font-bold">
                            {blog.title}
                        </div>
                        <div className="text-slate-400">
                            Posted on December 3, 2024
                        </div>
                        <div className="text-gray-700 max-w-screen-md">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4 p-4">
                        <div className="text-sm text-gray-600 mb-2">
                            Author
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <Avatar name={blog.author.name} />
                            
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div>
                                Random Catch Phrase about the author ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullBlog;