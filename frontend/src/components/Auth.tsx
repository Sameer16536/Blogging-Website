
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { SignUpInput } from "@sameer11/blog-commons"


const Auth = ({ type }: { type: "Sign Up" | "Sign In" }) => {
    const [postInputs, setPostInputs] = useState<SignUpInput>({
        email: "",
        name: "",
        password: ""
    })
    return (
        <div className='bg-white h-screen flex  justify-center flex-col'>
            <div className="flex justify-center">
                <div>
                    <div className="font-extrabold  text-3xl">
                        Create an Account
                    </div>
                    <div className="text-slate-400">
                        {type==='Sign In'? "Dont have an account?": "Already have an account?"}

                        <Link to={type==='Sign In'?'/signup':'/signin'} className="pl-2 underline">
                        {type==='Sign In'? "Sign Up": "Sign In"}

                        </Link>
                    </div>
                    <div>
                        <LabelledInput label="Full Name" placeholder="Enter your fullname" onChange={(e) => {
                            setPostInputs({ ...postInputs, name: e.target.value })
                        }} />
                        <LabelledInput label="email" placeholder="Enter your email" onChange={(e) => {
                            setPostInputs({ ...postInputs, email: e.target.value })
                        }} />
                        <LabelledInput label="Password" placeholder="Enter your password" onChange={(e) => {
                            setPostInputs({ ...postInputs, password: e.target.value })
                        }} type={"password"} />
                    </div>

                    <div className="mt-8">
                        <button type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
         dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="Sign In"?  "Sign In" : "Sign Up"}</button>

                    </div>



                </div>

            </div>
        </div>
    )
}


//Input component:
interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string

}
const LabelledInput = ({ label, placeholder, onChange, type }: LabelledInputType) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-bold text-black pt-3.5">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-black
             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-400 dark:border-gray-600 dark:placeholder-white dark:text-black
             dark:focus:ring-red-500 dark:focus:border-red-500" placeholder={placeholder} required />
        </div>


    )
}

export default Auth