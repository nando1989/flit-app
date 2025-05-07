// src/components/ToggleButton.tsx
import { Check, X } from 'lucide-react';
import { useState } from 'react';

interface IToggleButtonProps {
  isActive: boolean;
  onToggle: (newStatus: boolean) => Promise<void> | void;
  disabled?: boolean;
}

export const ToggleButton = ({ isActive, onToggle, disabled }: IToggleButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClick = async () => {
    if (disabled) return;

    setIsUpdating(true);
    try {
      await onToggle(!isActive);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isUpdating}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none ${disabled || isUpdating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${isActive ? 'bg-green-500' : 'bg-red-500'} `}
      aria-label={isActive ? 'Desativar' : 'Ativar'}
    >
      <span
        className={`absolute flex h-4 w-4 transform items-center justify-center rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'} `}
      >
        {isUpdating ? (
          <span className="animate-pulse">...</span>
        ) : isActive ? (
          <Check size={12} className="text-green-500" />
        ) : (
          <X size={12} className="text-red-500" />
        )}
      </span>
    </button>
  );
};
