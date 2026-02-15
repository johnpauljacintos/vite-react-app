import Button from "../components/ui/Button";
import ButtonRounded from "../components/ui/ButtonRounded";
import CheckBox from "../components/ui/CheckBox";
import Datepicker from "../components/ui/DatePicker";
import DateTimePicker from "../components/ui/DateTimePicker";

export default function UiComponentsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">UI Components Page</h2>
      <p className="mt-2 text-gray-600">
        This contains reusable UI components.
      </p>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-base font-semibold mb-3">Buttons</h3>
        <div className="space-y-5">
          <Button
            variant="bg-green-800 hover:bg-green-900 text-white font-normal"
            label="Primary"
          />
          <ButtonRounded
            variant="bg-blue-800 hover:bg-blue-900 text-white font-normal"
            label="Rounded"
          />
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-base font-semibold mb-3">Date Pickers</h3>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Medium Width (w-64)
            </label>
            <Datepicker className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-64 h-10 px-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Small Width (w-48)
            </label>
            <Datepicker className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-48 h-10 px-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Half Width (w-1/2)
            </label>
            <Datepicker className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-1/2 h-10 px-2" />
          </div>
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-base font-semibold mb-3">Date & Time Pickers</h3>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Medium Width (w-64)
            </label>
            <DateTimePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-64 h-10 px-2"
              showTime={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Date Only (No Time)
            </label>
            <DateTimePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-64 h-10 px-2"
              showTime={false}
              placeholder="mm/dd/yyyy"
            />
          </div>
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-base font-semibold mb-3">Checkbox</h3>
        <div className="space-y-5">
          <div className="flex items-center">
            <CheckBox variant="accent-green-700 border-2 border-green-700" />
            <label className="text-sm font-medium ml-2">Checkbox without focus ring</label>
          </div>
          <div className="flex items-center">
            <CheckBox variant="accent-green-700 focus:ring-2 focus:ring-green-700 focus:ring-offset-1" />
            <label className="text-sm font-medium ml-2">Checkbox with focus ring</label>
          </div>
        </div>
      </div>
    </div>
  );
}
