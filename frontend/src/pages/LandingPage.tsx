import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="flex w-screen h-screen justify-center items-center">

            <div className="flex flex-col items-center">
                <h1 className="text-5xl font-bold">Welcome to Blog Villa</h1>
                <p className="text-lg font-medium text-slate-400">
                    The latest insights, tutorials, and news about the web.
                </p>
                <Link to="/signup">
                    <button type="button" className=" min-w-40  mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-md px-2.5 py-2.5 text-center me-2 mb-2">Start Bloging</button>
                </Link>
            </div>

        </div>
    );
}

export default LandingPage 