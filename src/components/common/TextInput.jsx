export default function TextInput({
  variant = "",
  placeholder = "",
  name = "",
  value = "",
  onChange = () => {},
  error = {},
  type = "",
  disabled = false,
  label = "",
  labelColor = "",
}) {
  return (
    <div>
      <label
        name={name}
        className={`block text-sm font-medium p-1 ${error[name] ? "text-red-500" : `${labelColor}`}`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`border sm:text-sm rounded-lg focus:ring-gray-500 block px-3 py-1.5 
            ${error[name] ? "border-red-500 outline-2 outline-offset-0 outline-red-200" : "border-gray-300"} 
            ${disabled ? "text-gray-400 bg-gray-100" : "text-gray-600 bg-gray-50"}
            ${variant}`}
      />
    </div>
  );
}
