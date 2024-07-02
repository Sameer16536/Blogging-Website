import { useState } from "react";

import Quote from "../components/Quote";

import { SignUpInput } from "@sameer11/blog-commons"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import LabelledInput from "../components/ui/LabelledInput";
import AuthHeader from "../components/AuthHeader";


const SignUp = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name: "",
        email: "",
        password: ""
    });

    const handleSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt)
            navigate("/blogs")
        } catch (error) {
            console.log("[SIGN IN ERROR]", error);
            alert("ERROR Sign uP")
            setLoading(false);
        }
    }
    
    return (
        <div >
            <div className="grid md:grid-cols-2 grid-cols-1">
                <div className="flex flex-col items-center justify-center m-auto w-[60%]">
                    <AuthHeader type="signup" />
                    <div className="flex flex-1 flex-col gap-3 w-full">
                        <LabelledInput label="Username" placeholder="Enter Your Username" onChange={(e) => {
                            setPostInputs((prev) => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }} />
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
                        onClick={handleSignUp}
                        disabled={loading}
                        type="submit" 
                        className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign Up</button>
                    </div>
                </div>
                <div className="hidden md:block">
                    <Quote />
                </div>
            </div>
        </div>
    );
    }

export default SignUp;