import Button from "../components/ui/Button";
import ButtonRounded from "../components/ui/ButtonRounded";
import CheckBox from "../components/ui/CheckBox";
import RadioInput from "../components/ui/RadioInput";
import Spinner from "../components/ui/Spinner";
import SpinnerThick from "../components/ui/SpinnerThick";
import Toggle from "../components/ui/Toggle";
import ToggleShort from "../components/ui/ToggleShort";
import ToggleSmall from "../components/ui/ToggleSmall";
import ToggleWithIcon from "../components/ui/ToggleWithIcon";
import ToggleLarge from "../components/ui/ToogleLarge";

export default function UiComponentsPage() {
  const radioOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];
  
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
            variant="bg-green-800 hover:bg-green-900 text-white font-normal py-2"
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
        <h3 className="text-base font-semibold mb-3">Checkbox</h3>
        <div className="space-y-5">
          <div className="flex items-center">
            <CheckBox variant="checked:bg-green-700 checked:border-green-700" />
            <label className="text-sm font-medium ml-2">Checkbox without focus ring</label>
          </div>
          <div className="flex items-center">
            <CheckBox variant="checked:bg-green-700 checked:border-green-700 focus:ring-2 focus:ring-green-700 focus:ring-offset-1" />
            <label className="text-sm font-medium ml-2">Checkbox with focus ring</label>
          </div>
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-base font-semibold mb-3">Toggle</h3>
        <div className="space-y-5">
          <div className="flex items-center">
            <Toggle 
              variant="peer-checked:bg-green-700 bg-gray-400"
            />
            <label className="text-sm font-medium ml-2">Green</label>
          </div>
          <div className="flex items-center">
            <Toggle 
              variant="peer-checked:bg-blue-700 bg-red-500"
            />
            <label className="text-sm font-medium ml-2">Custom color</label>
          </div>
          <div className="flex items-center">
            <ToggleSmall 
              variant="peer-checked:bg-green-700 bg-gray-400"
            />
            <label className="text-sm font-medium ml-2">Small</label>
          </div>
          <div className="flex items-center">
            <ToggleLarge
              variant="peer-checked:bg-green-700 bg-gray-400"
            />
            <label className="text-sm font-medium ml-2">Large</label>
          </div>
          <div className="flex items-center">
            <ToggleShort
              variant="peer-checked:bg-green-700 bg-gray-400"
            />
            <label className="text-sm font-medium ml-2">Short</label>
          </div>
          <div className="flex items-center">
            <ToggleWithIcon 
              variant="peer-checked:bg-green-700 bg-gray-400"
            />
            <label className="text-sm font-medium ml-2">Green</label>
          </div>
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-base font-semibold mb-3">Radio Inputs</h3>
        <div className="space-y-5">
          <div className="flex items-center">
            <RadioInput 
              variant="checked:bg-green-800 checked:border-green-800"
              labelFormat="text-base font-semibold ml-3"
              options={radioOptions}
              name="example-options"
              defaultValue="option1"
            />
          </div>
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      <div className="mt-5">
        <h3 className="text-base font-semibold mb-3">Spinner</h3>
        <div className="space-y-5">
          <div className="flex items-center">
            <Spinner
             variant="w-4 h-4 text-gray-600"
            />
            <Spinner 
             variant="w-6 h-6 text-gray-600"
            />
            <Spinner 
             variant="w-8 h-8 text-gray-600"
            />
          </div>
          <div className="flex items-center">
            <Spinner 
             variant="w-4 h-4 text-red-600"
            />
            <Spinner 
             variant="w-6 h-6 text-green-700"
            />
            <Spinner 
             variant="w-8 h-8 text-blue-700"
            />
          </div>
          <div className="flex items-center">
            <SpinnerThick
             variant="w-4 h-4 text-gray-600"
            />
            <SpinnerThick 
             variant="w-6 h-6 text-gray-600"
            />
            <SpinnerThick 
             variant="w-8 h-8 text-gray-600"
            />
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
}
