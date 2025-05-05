import clsx from 'clsx';
import * as React from 'react';

import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Label } from './ui/label';

type TDivElement = Pick<React.HTMLAttributes<HTMLButtonElement>, 'className'>;

export interface ISelectOptions {
  label: string;
  value: string;
}

interface IProps extends TDivElement {
  label: string;
  value?: string;
  onChange?(value: string): void;
  placeholder?: string;
  options: Array<ISelectOptions>;
  onError?: string;
  disabled?: boolean;
}

export function Select({
  label,
  onChange,
  options,
  value,
  placeholder,
  onError,
  className,
  disabled,
}: IProps) {
  const labelOnerror = React.useMemo(() => {
    return onError ? 'text-red-500 dark:text-red-900' : 'text-slate-500';
  }, [onError]);

  return (
    <div className={`flex flex-col gap-2 bg-transparent dark:bg-transparent ${className}`}>
      <Label className={`${labelOnerror}`} aria-disabled={disabled} htmlFor={label}>
        {label}
      </Label>

      <SelectUI value={value} onValueChange={(v) => onChange && onChange(v)}>
        <SelectTrigger
          className={clsx(
            'h-10 bg-white outline-none placeholder:text-slate-300 focus-within:ring-0 focus:border-2 focus:border-slate-500 focus:ring-0 focus:ring-transparent dark:bg-transparent',
            {
              'border-red-500 dark:border-red-950': !!onError,
            },
          )}
        >
          {!value && <span className="text-slate-300 dark:text-slate-600">{placeholder}</span>}
          <SelectValue className="text-slate-300" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem className="cursor-pointer" key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectUI>
      {onError && (
        <span className="text-xs text-red-600 italic dark:text-red-900">{onError ?? ''}</span>
      )}
    </div>
  );
}
