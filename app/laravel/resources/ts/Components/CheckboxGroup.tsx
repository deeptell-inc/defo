import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";

interface CheckboxGroupProps {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  label: string;
}

const CheckboxGroup = ({ options, selected, onChange, label }: CheckboxGroupProps) => {
  const handleCheckboxChange = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base">{label}</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selected.includes(option.value)}
              onCheckedChange={() => handleCheckboxChange(option.value)}
            />
            <Label htmlFor={option.value} className="text-sm font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;