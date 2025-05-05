/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarIcon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { Label } from './ui/label';

type TContainerClassName = Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>;

interface IProps extends TContainerClassName {
  label: string;
  onError?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: Date;
  onChange?(value: string): void;
}

export function SelectDate({ label, disabled, onError, className, onChange, value }: IProps) {
  const [date, setDate] = React.useState<Date>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showYearPicker, setShowYearPicker] = React.useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange && onChange(selectedDate as any);
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (value) {
      setDate(value as any);
    }
  }, [value]);

  const years = React.useMemo(() => {
    const start = 1940;
    const end = 2050;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, []);

  const handleYearSelect = (year: number) => {
    const updated = dayjs(date ?? new Date())
      .year(year)
      .toDate();

    setDate(updated);
    onChange && onChange(updated as any);
    setShowYearPicker(false);
    setIsOpen(false);
  };

  const labelOnerror = React.useMemo(() => {
    return onError ? 'text-red-500 dark:text-red-900' : 'text-slate-500';
  }, [onError]);

  return (
    <div className={`flex flex-col gap-2 bg-transparent dark:bg-transparent ${className}`}>
      <Label className={`${labelOnerror}`} aria-disabled={disabled} htmlFor={label}>
        {label}
      </Label>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              dayjs(date).format('DD/MM/YYYY')
            ) : (
              <span className="text-slate-300">DD/MM/AAAA</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {showYearPicker ? (
            <div className="grid max-h-[240px] grid-cols-4 gap-2 overflow-y-auto p-4">
              {years.map((year) => (
                <Button
                  key={year}
                  size="sm"
                  variant="ghost"
                  onClick={() => handleYearSelect(year)}
                  className={cn(
                    'text-sm',
                    year === dayjs(date ?? new Date()).year() &&
                      'bg-primary hover:bg-primary/90 text-white',
                  )}
                >
                  {year}
                </Button>
              ))}
            </div>
          ) : (
            <Calendar
              mode="single"
              selected={dayjs().subtract(10).toDate()}
              onSelect={handleDateSelect}
              onYearClick={() => setShowYearPicker(true)}
            />
          )}
        </PopoverContent>
      </Popover>
      {onError && (
        <span className="text-xs text-red-600 italic dark:text-red-900">{onError ?? ''}</span>
      )}
    </div>
  );
}
