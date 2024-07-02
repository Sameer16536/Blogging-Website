import { ChangeEvent } from "react";
interface LabelledInputProps {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const LabelledInput = ({ label, placeholder, type, onChange }: LabelledInputProps) => {
    return (
        <div>
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                id={label}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 "
                placeholder={placeholder} required />
        </div>
    );
}

export default LabelledInput;