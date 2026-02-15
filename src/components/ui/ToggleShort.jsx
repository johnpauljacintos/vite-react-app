export default function ToggleShort({ variant = "" }) {
  return (
    <div className="inline-flex items-center">
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className={`relative w-11 h-4 after:h-6 after:w-6 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:-top-1 after:-start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all ${variant}`}></div>
      </label>
    </div>
  );
}