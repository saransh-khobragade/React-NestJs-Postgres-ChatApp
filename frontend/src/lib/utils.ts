import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ReadonlyClassValueArray = readonly ClassValue[];

export function cn(...inputs: ReadonlyClassValueArray): string {
  return twMerge(clsx(inputs));
}
