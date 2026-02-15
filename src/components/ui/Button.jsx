export default function Button({ variant = "", label = "" }) {
  return (
    <button
      type="button"
      className={`transition duration-300 flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-2 active:scale-110 hover:cursor-pointer ${variant}`}
    >
      {label}
    </button>
  );
}
