
import { Link } from "react-router-dom"



const Auth = ({ type }: { type: "signup" | "signin" }) => {
    return (
        <div className='bg-white h-screen flex  justify-center flex-col'>
            <div className="flex justify-center">
                <div>
                    <div className="font-extrabold  text-3xl">
                        Create an Account
                    </div>
                    <div className="text-slate-400">
                        Already have an Account?
                        <Link to={'/signin'} className="pl-2 underline">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth