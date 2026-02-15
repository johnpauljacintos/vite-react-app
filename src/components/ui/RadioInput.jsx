export default function RadioInput({ 
  variant = "", 
  labelFormat = "",
  options = [], 
  name = "radio-group",
  defaultValue = null,
  onChange = null 
}) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <label key={index} className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            onChange={onChange}
            className={`w-5 h-5 appearance-none rounded-full border border-gray-400 relative cursor-pointer after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-white after:opacity-0 checked:after:opacity-100 ${variant}`}
          />
          <span className={`${labelFormat}`}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}