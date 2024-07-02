import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const AppBar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-2 items-center">
            <Link to="/">
                <div className="font-bold text-xl cursor-pointer tracking-wider">
                    Medium
                </div>
            </Link>
            <div>
                <Link to="/publish">
                    <button type="button" className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs px-2.5 py-1.5 me-2 mb-2" >New +</button>
                </Link>
                <Avatar name="Sameer Marathe" size="big" />

            </div>
        </div>
    );
}

export default AppBar;