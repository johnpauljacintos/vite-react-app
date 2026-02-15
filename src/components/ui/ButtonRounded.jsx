export default function ButtonRounded({ variant = "", label = "" }) {
  return (
    <button
      type="button"
      className={`transition duration-300 flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 active:scale-110 hover:cursor-pointer ${variant}`}
    >
      {label}
    </button>
  );
}