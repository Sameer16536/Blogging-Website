import { Avatar } from "./BlogCard"

const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <div>
                BlogVilla
            </div>

        <div>
            <Avatar name={"Sameer"} size={6}/>
        </div>
        </div>
    )
}

export default Appbar