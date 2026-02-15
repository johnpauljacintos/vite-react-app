export default function CheckBox({ variant = "" }) {
  return (
    <div className="flex items-center space-x-1">
      <input
        type="checkbox"
        className={`w-4 h-4 rounded border-gray-300 bg-gray-100 focus:ring-0 focus:ring-offset-0 cursor-pointer ${variant}`}
      />
    </div>
  );
}