import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id:number
}

const BlogCard = ({ authorName, title, content, publishedDate,id }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b border-slate-200 p-4 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorName}  size={6}/>
                </div>
                <div className="font-extralight pl-2">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2">

                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500">
                    {publishedDate}
                </div>

            </div>
            <div className="text-xl font-semibold pt-2">{title}</div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + '....'}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-3">
                {`${Math.ceil(content.length / 100)} minute read`}
            </div>
          
        </div>
        </Link>
    )
}

const Circle = () => {
    return (
        <div>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        </div>
    )
}

export const Avatar = ({ name,size=4 }: { name: string,size?:number }) => {
    return (
        <div>
            <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
                <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
            </div>
        </div>
    )
}
export default BlogCard