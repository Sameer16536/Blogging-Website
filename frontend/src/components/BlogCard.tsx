
interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

const BlogCard = ({ authorName, title, content, publishedDate }: BlogCardProps) => {
    return (
        <div className="border-b border-slate-200 p-4 pb-4">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorName} />
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
    )
}

const Circle = () => {
    return (
        <div>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        </div>
    )
}

const Avatar = ({ name }: { name: string }) => {
    return (
        <div>
            <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
            </div>
        </div>
    )
}
export default BlogCard