import { FC } from 'react';
export type weekColumn = FC<{ name: string }>
export type DayColumn = FC<{ dayNumber: number, year: number, month: { monthName: string, monthNumber: number }, currentDate: boolean }>
export type Header = FC<{ month: string, year: number, prevHandle: () => void, nextHandle: () => void }>