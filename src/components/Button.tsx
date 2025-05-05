/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderCircle } from 'lucide-react';
import React, { forwardRef, HTMLAttributes, useRef } from 'react';

import { useMessages } from '@/hook/useMessages';

import { Button as ButtonUi } from './ui/button';

type TButtonElement = Pick<HTMLAttributes<HTMLButtonElement>, 'className'>;
type TVariants = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary';

interface IProps extends TButtonElement {
  label: string;
  type?: 'submit' | 'reset' | 'button';
  variant?: TVariants;
  onClick?(): void;
  onFileSelect?(file: File | null): void;
  lefIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  isFileButton?: boolean;
  acceptFile?: string;
  tooltip?: string;
  children?: React.ReactNode;
}

const MAX_SIZE = 2;

export const Button = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      label,
      onClick,
      variant = 'default',
      type = 'button',
      className,
      lefIcon,
      rightIcon,
      isLoading,
      disabled,
      isFileButton,
      onFileSelect,
      acceptFile,
      children,
      ...props
    },
    ref,
  ) => {
    const { onShowMessage } = useMessages();

    const bgVariant: Record<TVariants, string> = {
      default: 'w-full bg-blue-900 cursor-pointer transition-all ease-in-out',
      outline: 'border-2 dark:text-slate-400 dark:hover:bg-slate-900 dark:text-slate-500',
      secondary:
        'border bg-gradient-to-br from-slate-200 to-slate-100 transition-all ease-in-out hover:brightness-90 text-slate-700 dark:from-slate-900 dark:to-slate-950 dark:text-slate-500',
      destructive: '',
      ghost: '',
      link: '',
      primary:
        'bg-nort-primary text-slate-700 transition-all ease-in-out hover:brightness-90 dark:from-slate-800 dark:to-slate-600 dark:text-slate-950',
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = (e: any) => {
      e.preventDefault();
      if (isFileButton && fileInputRef.current) {
        fileInputRef.current.click();
      } else if (onClick) {
        onClick();
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const file = event.target.files?.[0] ?? null;

      if (!file) return;

      const size = Math.floor(file.size / (1024 * 1024));

      if (onFileSelect && size >= MAX_SIZE) {
        return onShowMessage({
          title: 'Atenção!',
          description: 'O tamanho máximo da imagem deve ser de 2MB',
          buttonText: 'Ok',
          type: 'MESSAGE',
          messageType: 'warning',
          isVisible: true,
        });
      }

      if (onFileSelect) {
        onFileSelect(file);
      }
    };

    return (
      <>
        <ButtonUi
          ref={ref}
          disabled={isLoading || disabled}
          type={type}
          variant={variant === 'primary' ? 'default' : variant}
          onClick={handleClick}
          className={`h-12 cursor-pointer text-sm font-semibold outline-none ${bgVariant[variant]} ${className}`}
          style={{ touchAction: 'none' }}
          {...props}
        >
          {children}
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              {lefIcon}
              {label}
              {rightIcon}
            </>
          )}
        </ButtonUi>

        {isFileButton && (
          <input
            ref={fileInputRef}
            accept={acceptFile}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        )}
      </>
    );
  },
);

Button.displayName = 'Button';
