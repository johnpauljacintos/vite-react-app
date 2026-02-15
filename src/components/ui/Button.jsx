export default function Button({ variant = "", label = "", onClick }) {
  return (
    <button
      type="button"
      className={`transition duration-300 flex items-center justify-center whitespace-nowrap rounded-lg px-6 active:scale-110 hover:cursor-pointer ${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
