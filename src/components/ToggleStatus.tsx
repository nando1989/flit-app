import { ToggleLeft, ToggleRight } from 'lucide-react';

interface IToggleStatusIndicatorProps {
  isActive: boolean;
}

export const ToggleStatusIndicator = ({ isActive }: IToggleStatusIndicatorProps) => {
  return (
    <div className="inline-flex">
      {isActive ? (
        <ToggleRight className="text-green-500" size={24} />
      ) : (
        <ToggleLeft className="text-red-500" size={24} />
      )}
    </div>
  );
};
