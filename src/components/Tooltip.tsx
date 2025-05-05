import { TooltipContent, TooltipTrigger, Tooltip as TooltipUI } from '@/components/ui/tooltip';

interface IProps {
  children: React.ReactNode;
  label?: string;
}

export function Tooltip({ children, label }: IProps) {
  if (!label) <></>;
  return (
    <TooltipUI>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <span>{label}</span>
      </TooltipContent>
    </TooltipUI>
  );
}
