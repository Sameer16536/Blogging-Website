import { SigninInput } from "@sameer11/blog-commons";

import Quote from "../components/Quote";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import AuthHeader from "../components/AuthHeader";
import LabelledInput from "../components/ui/LabelledInput";

const SignIn = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: "",
        name:""
    });

    const handleSignIn = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt)
            navigate("/blogs")
        } catch (error) {
            console.log("[SIGN IN ERROR]", error);
            alert("SIGN IN ERROR")
            setLoading(false);
        }
    }


    return (
        <div >
            <div className="grid md:grid-cols-2 grid-cols-1">
                <div className="hidden md:block">
                    <Quote />
                </div>
                <div className="flex flex-col items-center justify-center m-auto w-[60%]">
                    <AuthHeader type="signin" />
                    <div className="flex flex-1 flex-col gap-3 w-full">
                        <LabelledInput label="Email" placeholder="Enter Your Email" onChange={(e) => {
                            setPostInputs((prev) => ({
                                ...prev,
                                email: e.target.value
                            }))
                        }} />
                        <LabelledInput label="Password" type="password" placeholder="Enter Your Passowrd" onChange={(e) => {
                            setPostInputs((prev) => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }} />
                        <button
                            onClick={handleSignIn}
                            disabled={loading}
                            type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SignIn;