export default function Toggle({ variant = "" }) {
  return (
    <div className="inline-flex items-center">
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className={`relative w-11 h-6 after:h-5 after:w-5 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all ${variant}`}></div>
      </label>
    </div>
  );
}
