/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import { ptBR } from 'date-fns/locale';
import dayjs from 'dayjs';
import LocalePtBR from 'dayjs/locale/pt-br';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn, firstLettersUpperCase } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
export type IProps = { onYearClick?(): void } & CalendarProps;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: IProps) {
  return (
    <DayPicker
      mode="single"
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      formatters={{
        formatCaption: (date) => {
          const month = dayjs(date).locale(LocalePtBR).format('MMMM YYYY');

          return firstLettersUpperCase(month);
        },
      }}
      locale={ptBR}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
