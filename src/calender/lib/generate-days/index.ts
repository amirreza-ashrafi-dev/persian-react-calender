import { genDaysArgs } from './types';
import moment from 'jalali-moment';
import { nameOfTheDays } from '../data';

export const GenDays = ({ year, month, day }: genDaysArgs) => {
    const numberOfDaysInMonth = moment.from(`${year}/${month}/${day}`, 'fa', 'YYYY/M/D').jDaysInMonth();
    const numberOfDaysInPrevMonth = moment.from(`${year - 1}/${month === 1 ? 12 : month - 1}/${day}`, 'fa', 'YYYY/M/D').jDaysInMonth();
    const nameOfFirstDayInMonth = moment.from(`${year}/${month}/${day}`, 'fa', 'YYYY/M/D').startOf("month").format("dddd")
    const structure: number[][] = [];
    let daysOfOneWeek: number[] = [];
    let counter = 1;

    while (counter <= numberOfDaysInMonth) {
        for (let j = 0; j < nameOfTheDays.length; j++) {
            if (nameOfTheDays.indexOf(nameOfFirstDayInMonth) > j && !structure[0]) {
                const measureSomeAmountOfPrevMonth
                    =
                    numberOfDaysInPrevMonth - ((nameOfTheDays.indexOf(nameOfFirstDayInMonth) - 1) - j);
                daysOfOneWeek.push(measureSomeAmountOfPrevMonth);
            } else {
                if (counter > numberOfDaysInMonth) {
                    daysOfOneWeek.push(counter - numberOfDaysInMonth);
                    counter++
                } else {
                    daysOfOneWeek.push(counter);
                    counter = counter + 1;
                }
            }
        }
        structure.push(daysOfOneWeek);
        daysOfOneWeek = []
    }

    return structure;
}