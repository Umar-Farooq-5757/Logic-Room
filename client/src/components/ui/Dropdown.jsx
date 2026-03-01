import React, { useState } from "react";

const Dropdown = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
  isDark,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col w-36 md:w-48 text-sm relative self-end">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center text-left px-4 pr-2 py-2 border rounded-lg  ${isDark ? "bg-[#272727] text-gray-300 hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-50"} border-gray-300 shadow-sm  focus:outline-none`}
      >
        <span className="flex items-center gap-3">
          <div className="size-5 rounded-md overflow-hidden">
            {languages.find((lang) => lang.value === selectedLanguage).icon}
          </div>
          <div>
            {selectedLanguage.charAt(0).toUpperCase() +
              selectedLanguage.slice(1)}
          </div>
        </span>
        <svg
          className={`w-5 h-5 inline float-right transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#6B7280"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="w-full border z-50 border-gray-300 rounded-lg shadow-md mt-1 py-2 bg-white absolute top-9">
          {languages.map((language) => (
            <li
              key={language.name}
              className={`px-4 py-2 ${isDark ? "bg-[#272727]" : "bg-white"} cursor-default hover:bg-gray-100 flex items-center gap-3`}
              onClick={() => {
                handleSelect(language.value);
              }}
            >
              <div className="size-5">{language.icon}</div>
              <p>
                {language.value.charAt(0).toUpperCase() +
                  language.value.slice(1)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
