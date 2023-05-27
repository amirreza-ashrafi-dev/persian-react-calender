import moment from 'jalali-moment';
// @ts-ignore
import CalenderStyle from './calender.module.css';
import { useState, FC, useMemo } from 'react';
import { GenDays } from './lib/generate-days';
import { nameOfTheDays, nameOfTheMonths } from './lib/data';
import { weekColumn, DayColumn, Header } from './types';

export interface Calender {
    WeekColumn: weekColumn,
    DayColumn: DayColumn,
    Header: Header,
}

export const Calender: FC<Calender> = ({ WeekColumn, DayColumn, Header }) => {
    moment.locale("fa")
    const [month, setMonth] = useState<number>(moment().jMonth() + 1);
    const [year, setYear] = useState<number>(moment().jYear());
    const day: number = moment().jDate() - 1;
    const days = useMemo(() => GenDays({ month, year, day }), [month, year]);
    const currentDate = moment().format('jYYYY/jM/jD').split("/");


    const nextHandle = () => {
        setMonth((prevMonth) => prevMonth === 12 ? 1 : prevMonth + 1);
        month === 12 && setYear(year + 1);
    }

    const prevHandle = () => {
        setMonth((prevMonth) => prevMonth === 1 ? 12 : prevMonth - 1);
        month === 1 && setYear(year - 1);
    }

    const checkCurrentDate = (year: number, month: number, day: number) => {
        return year === Number(currentDate[0])
            && month === Number(currentDate[1])
            && day === Number(currentDate[2]) ? true : false;
    };

    return (
        <div>
            <div className={`${CalenderStyle.weeksName} ${CalenderStyle.calenderContainer}`}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {Header
                        ?
                        <Header month={nameOfTheMonths[month - 1]} year={year} prevHandle={prevHandle} nextHandle={nextHandle} />
                        :
                        <>
                            <button onClick={prevHandle}>{"<"}</button>
                            <div>{year} {nameOfTheMonths[month - 1]}</div>
                            <button onClick={nextHandle}>{">"}</button>
                        </>
                    }

                </div>
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    {nameOfTheDays.map((name, idx) => {
                        return WeekColumn
                            ?
                            <WeekColumn name={name} key={idx} />
                            :
                            <div key={idx} className={CalenderStyle.weekColumn}>{name}</div>
                    })}
                </div>
                {
                    days.map((week, idx) => {
                        return <div key={idx} style={{ display: "flex", flexDirection: "row-reverse" }}>
                            {week.map(((day, idx) => {
                                return DayColumn
                                    ?
                                    <DayColumn
                                        currentDate={checkCurrentDate(year, month, day)}
                                        key={idx}
                                        dayNumber={day}
                                        year={year}
                                        month={{ monthName: nameOfTheMonths[month - 1], monthNumber: month }}
                                    />
                                    :
                                    <div key={idx} className={CalenderStyle.weekColumn}>{day}</div>
                            }))}
                        </div>
                    })
                }
            </div>
        </div>
    )
}