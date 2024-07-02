import { Link } from "react-router-dom";

const AuthHeader = ({ type }: {
    type: "signin" | "signup"
}) => {
    const props = type === "signup" ? {
        header: "Create an Account",
        alternateheader: "Already have an Account?",
        linkText: "Login",
        path: "/signin",
    } : {
        header: "Log into your Account",
        alternateheader: "Don't have an Account?",
        linkText: "SignIn",
        path: "/signup",

    }

    return (
        <div>
            <div className="flex flex-col justify-center">
                <div className="mb-4">
                    <div className="text-3xl font-bold text-center">
                        {props.header}
                    </div>
                    <div className="text-md text-center text-gray-600">
                        {props.alternateheader}
                        <Link to={props.path} className="underline ml-1">{props.linkText}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthHeader;