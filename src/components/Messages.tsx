'use client';

import { TriangleAlert, CircleCheckBig, CircleAlert, CircleHelp, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { isPromise } from '@/lib/utils';
import { TIconTypes } from '@/models/appTypes';

import { Button } from './Button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from './ui/alert-dialog';

type TMessageType = 'success' | 'warning' | 'error';

export interface IAlertMessageProps {
  isVisible: boolean;
  onClose(): void;
  title: string;
  description: string;
  buttonText: string;
  callback?(): void;
  isLoading?: boolean;
  messageType?: TMessageType;
}

export function AlertMessage({
  buttonText,
  description,
  isVisible,
  onClose,
  title,
  callback,
  messageType = 'success',
}: IAlertMessageProps) {
  const Icon = useMemo((): TIconTypes => {
    const iconType: Record<TMessageType, TIconTypes> = {
      success: CircleCheckBig,
      warning: TriangleAlert,
      error: CircleAlert,
    };

    return iconType[messageType];
  }, [messageType]);

  const bgColor = useMemo(() => {
    const color: Record<TMessageType, string> = {
      error: 'bg-gradient-to-br from-red-900 to-red-700 dark:from-red-950 dark:to-red-900',
      success:
        'bg-gradient-to-br from-green-900 to-green-700 dark:from-green-950 dark:to-green-900',
      warning:
        'bg-gradient-to-br from-yellow-600 to-yellow-500 dark:from-yellow-950 dark:to-yellow-900',
    };

    return color[messageType];
  }, [messageType]);

  const borderColor = useMemo(() => {
    const color: Record<TMessageType, string> = {
      error: 'outline-red-100 dark:outline-red-950',
      success: 'outline-green-100 dark:outline-green-950',
      warning: 'outline-yellow-100 dark:outline-yellow-950',
    };

    return color[messageType];
  }, [messageType]);

  return (
    <AlertDialog onOpenChange={() => onClose()} open={isVisible}>
      <AlertDialogContent className="flex max-w-96 flex-col items-center gap-0">
        <div
          className={`mb-4 flex h-full w-fit items-center justify-center self-center rounded-full dark:text-slate-300 ${bgColor} ${borderColor} p-4 text-slate-100 outline`}
        >
          <Icon className="size-8" />
        </div>
        <AlertDialogTitle className="mb-1 self-center text-xl font-bold text-slate-800 dark:text-slate-400">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription className="mb-6 font-sans text-slate-600 dark:text-slate-500">
          {description}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button
            label={buttonText}
            className={`w-80 ${bgColor} hover:${bgColor} transition-all ease-in-out hover:brightness-110`}
            onClick={() => {
              onClose();

              if (callback) {
                callback();
              }
            }}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export interface IQuestionMessageProps {
  isVisible: boolean;
  onDismiss(): void;
  onConfirm(): void | Promise<void>;
  title: string;
  description: string;
  messageType?: TMessageType;
}

export function QuestionMessage({
  description,
  isVisible,
  onConfirm,
  onDismiss,
  messageType,
  title,
}: IQuestionMessageProps) {
  const [loading, setLoading] = useState(false);

  const bgColor = useMemo(() => {
    const color: Record<TMessageType, string> = {
      error: 'bg-gradient-to-br from-red-900 to-red-700 dark:from-red-950 dark:to-red-900',
      success:
        'bg-gradient-to-br from-green-900 to-green-700 dark:from-green-950 dark:to-green-900',
      warning:
        'bg-gradient-to-br from-yellow-600 to-yellow-500 dark:from-yellow-950 dark:to-yellow-900',
    };

    return messageType ? color[messageType] : 'bg-gradient-to-br from-slate-900 to-slate-700';
  }, [messageType]);

  const borderColor = useMemo(() => {
    const color: Record<TMessageType, string> = {
      error: 'outline-red-100 dark:outline-red-950',
      success: 'outline-green-100 dark:outline-green-950',
      warning: 'outline-yellow-100 dark:outline-yellow-950',
    };

    return messageType ? color[messageType] : 'outline';
  }, [messageType]);

  const handleConfirm = async () => {
    const resultConfirm = onConfirm();
    if (isPromise(resultConfirm)) {
      setLoading(true);

      await resultConfirm
        .then(() => {
          onDismiss();
        })
        .finally(() => {
          setLoading(false);
        });
    } else onDismiss();
  };

  return (
    <AlertDialog onOpenChange={() => !loading && onDismiss()} open={isVisible}>
      <AlertDialogContent className="flex max-w-96 flex-col items-center gap-0">
        <div
          className={`mb-4 flex ${bgColor} ${borderColor} h-full w-fit items-center justify-center self-center rounded-full border-slate-200 p-4 text-slate-100 dark:border-slate-700 dark:text-slate-400 dark:outline-slate-800`}
        >
          <CircleHelp className="size-8" />
        </div>
        <AlertDialogTitle className="mb-1 self-center text-xl font-bold text-slate-800 dark:text-slate-400">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription className="mb-6 font-sans text-slate-600 dark:text-slate-500">
          {description}
        </AlertDialogDescription>
        <AlertDialogFooter className="flex w-full">
          <Button
            disabled={loading}
            className="flex-1"
            label={'Não'}
            variant={'outline'}
            onClick={() => {
              onDismiss();
            }}
          />
          <Button
            disabled={loading}
            rightIcon={loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : undefined}
            className={`flex-1 ${bgColor} hover:${bgColor}`}
            label={'Sim'}
            onClick={handleConfirm}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
