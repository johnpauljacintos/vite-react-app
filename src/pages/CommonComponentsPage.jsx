import { useState } from "react";
import { CustomSelect } from "../components/common/CustomSelect";
import DatePicker from "../components/common/DatePicker";
import DateTimePicker from "../components/common/DateTimePicker";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/common/ConfirmModal";
import TextInput from "../components/common/TextInput";

export default function CommonComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  const [textInputWithError, setTextInputWithError] = useState("");
  const [errors, setErrors] = useState({});

  const selectOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    console.log("Confirmed!");
    setIsModalOpen(false);
  };

  const handleTextInputChange = (e) => {
    setTextInputValue(e.target.value);
  };

  const handleTextInputWithErrorChange = (e) => {
    const value = e.target.value;
    setTextInputWithError(value);
    
    if (value.length > 0 && value.length < 3) {
      setErrors({ ...errors, textWithError: "Must be at least 3 characters" });
    } else {
      const newErrors = { ...errors };
      delete newErrors.textWithError;
      setErrors(newErrors);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Common Components Page</h2>
      <p className="mt-2 text-gray-600">
        This includes reusable components that can be integrated across your
        application.
      </p>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-lg font-bold mb-3">Select</h3>
        <div className="w-48">
          <CustomSelect options={selectOptions} placeholder="Select Options" />
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-lg font-bold mb-3">Date Pickers</h3>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Medium Width (w-64)
            </label>
            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-64 h-9 px-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Small Width (w-48)
            </label>
            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-48 h-9 px-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Half Width (w-1/2)
            </label>
            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-1/2 h-9 px-2" />
          </div>
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-lg font-bold mb-3">Date & Time Pickers</h3>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Medium Width (w-64)
            </label>
            <DateTimePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-64 h-9 px-2"
              showTime={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Date Only (No Time)
            </label>
            <DateTimePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-64 h-9 px-2"
              showTime={false}
              placeholder="mm/dd/yyyy"
            />
          </div>
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-lg font-bold mb-3">Inputs</h3>
        <div className="space-y-5">
          <div>
            <TextInput 
              placeholder="Enter text here..."
              type="text"
              name="basicInput"
              value={textInputValue}
              onChange={handleTextInputChange}
              error={{}}
              variant="focus:outline-gray-500 w-64"
              label="Basic Text Input"
              labelColor="text-gray-900"
            />
          </div>
          <div>
            <TextInput 
              placeholder="Type at least 3 characters..."
              type="text"
              name="textWithError"
              value={textInputWithError}
              onChange={handleTextInputWithErrorChange}
              error={errors}
              variant={errors.textWithError ? "" : "focus:outline-green-700 w-64"}
              label="Text Input with validation and custom color"
              labelColor="text-green-700"
            />
          </div>
          <div>
            <TextInput 
              placeholder="This input is disabled"
              type="text"
              name="disabledInput"
              value="Cannot edit this"
              onChange={() => {}}
              error={{}}
              variant="focus:outline-gray-500 w-64"
              label="Disabled Input"
              labelColor="text-gray-900"
              disabled={true}
            />
          </div>
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-lg font-bold mb-3">Confirmation Modal</h3>
        <div>
          <Button
            variant="bg-green-800 hover:bg-green-900 text-white font-semibold py-1.5"
            label="Click to Open Modal"
            onClick={handleOpenModal}
          />
        </div>
      </div>
      <div className="h-10"></div>
      <ConfirmModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="Confirm Action"
        content="Are you sure you want to proceed with this action? This will demonstrate the modal functionality."
      />
    </div>
  );
}