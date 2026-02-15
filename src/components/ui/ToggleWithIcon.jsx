export default function ToggleWithIcon({ variant = "" }) {
  return (
    <div className="inline-flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className={`w-11 h-6 rounded-full ${variant}`}></div>
        <div className="absolute top-0.5 left-0.5 h-5 w-5 bg-white border border-gray-300 rounded-full transition-all peer-checked:translate-x-full rtl:peer-checked:-translate-x-full peer-checked:border-white flex items-center justify-center pointer-events-none"></div>
        <svg
          className="absolute top-0.5 left-0.5 w-5 h-5 p-1 text-gray-400 opacity-100 peer-checked:opacity-0 transition-all peer-checked:translate-x-full rtl:peer-checked:-translate-x-full pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <svg
          className="absolute top-0.5 left-0.5 w-5 h-5 p-1 text-green-800 opacity-0 peer-checked:opacity-100 transition-all peer-checked:translate-x-full rtl:peer-checked:-translate-x-full pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </label>
    </div>
  );
}