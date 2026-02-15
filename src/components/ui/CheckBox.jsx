export default function CheckBox({ variant = "" }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={`w-4 h-4 appearance-none rounded border border-gray-300 focus:outline-none focus:ring-0 cursor-pointer relative ${variant}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
