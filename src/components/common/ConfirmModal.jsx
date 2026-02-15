import Button from "../ui/Button";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  content,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/65 px-6">
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl">
        <div className="text-center">
          <div className="mb-3 mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-7 w-7 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="mb-5 text-2xl font-bold text-gray-900">{title}</h3>
          <div className="mb-6 text-gray-800">{content}</div>
          <div className="flex justify-center space-x-10">
            <Button 
              variant="bg-green-800 hover:bg-green-900 text-white font-semibold w-28 py-1.5" 
              label="Confirm" 
              onClick={onConfirm} 
            />
            <Button 
              variant="bg-gray-500 hover:bg-gray-700 text-white font-semibold w-28 py-1.5" 
              label="Cancel" 
              onClick={onClose} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}