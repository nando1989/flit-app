/* eslint-disable @typescript-eslint/no-explicit-any */

import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export const isPromise = <T>(value: any): value is Promise<T> => {
  return value instanceof Promise;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function firstLettersUpperCase(word: string) {
  const firstLetter = word.charAt(0).toLocaleUpperCase();
  const restOfWord = word.slice(1, word.length);

  return `${firstLetter}${restOfWord}`;
}

export const formatFirebaseDateToDate = (dateFirebase: any): Date => {
  if (dateFirebase && typeof dateFirebase?.seconds === 'number') {
    return dayjs.unix(dateFirebase.seconds).toDate();
  }

  if (dateFirebase) return dateFirebase;

  return new Date();
};

export const removeMask = (value: string) => {
  value = value.replace(/\D/g, '');
  return value;
};

export const formattedCPF = (value: string) => {
  if (value) {
    value = removeMask(value);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1-$2');
    return value;
  }
  return '';
};

export const formattedCEP = (value: string) => {
  if (value) {
    value = removeMask(value);
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
  }
  return '';
};
