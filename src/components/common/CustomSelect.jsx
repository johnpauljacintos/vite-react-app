import Select from "react-select";

export const CustomSelect = ({
  id,
  name,
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select",
  error,
  isDisabled = false,
  styles = {},
  className,
}) => {
  const baseSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: error
        ? "1px solid #ef4444"
        : state.isFocused
        ? "1px solid #ffffff"
        : "1px solid #d1d5db",
      outline: error ? "3px solid #fecaca" : "none",
      boxShadow: state.isFocused ? "0 0 0 2px #6b7280" : "none",
      borderRadius: "0.5rem",
      backgroundColor: isDisabled ? "#f3f4f6" : "#f9fafb",
      marginTop: "0.15rem",
      fontSize: "0.875rem",
      height: "2.13rem",
      minHeight: "1.8rem",
      "&:hover": {
        border: error
          ? "1px solid #f05252"
          : "1px solid #d1d5db",
      },
    }),
    input: (base) => ({
      ...base,
      "input[type='text']:focus": { boxShadow: "none" },
      marginTop: "0",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "0.875rem",
      marginBottom: "0",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      marginTop: "0.25rem",
      backgroundColor: "#f9fafb",
      padding: "0.25rem 0",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#e5e7eb"
        : state.isFocused
        ? "#f3f4f6"
        : "white",
      color: "#1f2937",
      fontSize: "0.875rem",
      padding: "0.5rem 1rem",
      margin: "0.2rem 0",
      borderRadius: "0.5rem",
      boxSizing: "border-box",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#1f2937",
      marginBottom: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      outline: "none",
      boxShadow: "none",
      paddingTop: "0.35rem",
      transform: "translateY(0)",
    }),
    ...styles,
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id || name} className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Select
        id={id}
        name={name}
        options={options}
        value={selectedOption}
        onChange={(option) =>
          onChange({ target: { name, value: option?.value } })
        }
        className={`${error ? "border-red-500" : "border-gray-200"} react-select-container ${className}`}
        classNamePrefix="select"
        placeholder={placeholder}
        styles={baseSelectStyles}
        isDisabled={isDisabled}
        menuPosition="fixed"
      />
      {/* {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )} */}
    </div>
  );
};