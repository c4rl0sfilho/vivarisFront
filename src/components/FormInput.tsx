import React from 'react';

interface FormInputProps {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    required?: boolean;
    placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ type, name, value, onChange, placeholder, required = false }) => {
    return (
        <div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 p-2 block w-full border border-black rounded-md"
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
};

export default FormInput;
