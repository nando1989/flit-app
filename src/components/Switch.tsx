import { Label } from '@/components/ui/label';
import { Switch as SwitchBase } from '@/components/ui/switch';

interface IProps {
  label: string;
  checked: boolean;
  onChange(value: boolean): void;
}

export function Switch({ onChange, checked, label }: IProps) {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="airplane-mode" className="text-slate-500">
        {label}
      </Label>
      <SwitchBase
        className="cursor-pointer"
        checked={checked}
        onClick={() => onChange(!checked)}
        id="airplane-mode"
      />
    </div>
  );
}
