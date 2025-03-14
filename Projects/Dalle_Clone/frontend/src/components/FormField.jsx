import React from "react";

const FormField = (
  {LabelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe}
) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 ">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 "
        >
          {LabelName}
        </label>
        {isSurpriseMe && (
          <button
            className="font-semibold bg-[#ececf1] py-1 px-2 text-xs rounded-[5px] text-black "
            type="button"
            onClick={handleSurpriseMe}
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] block outline-none w-full p-3 "
      />
    </div>
  );
};

export default FormField;
