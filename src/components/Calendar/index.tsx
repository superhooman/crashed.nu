import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { Button } from '@src/components/Button';
import { Stack } from '@src/components/Stack';
import type { Item, Time, WeekDay } from '@src/types/time';
import { calculateOverlap, formatTime } from '@src/utils/data/time';

import cls from './Calendar.module.scss';

const TIMES = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];

export const WEEK_DAYS: [WeekDay, string][] = [['M', 'Monday'], ['T', 'Tuesday'], ['W', 'Wednesday'], ['R', 'Thursday'], ['F', 'Friday'], ['S', 'Saturday']];

const WEEK_DAYS_ONLY = WEEK_DAYS.map(([key]) => key);

interface CalendarProps {
    week?: Record<WeekDay, Item[]>;
    showCurrentTime?: boolean;
    showTodayButton?: boolean;
    highlightCurrentDay?: boolean;
    getCurrentTime?: () => Time;
    getCurrentDay?: () => WeekDay | 'SS';
}

const getShiftFromHM = (time: Time, noShift?: boolean) => {
    return (noShift ? time.hh : time.hh - 8) + time.mm / 60;
};

const defaultGetCurrentTime = () => {
    const current = new Date();
    return {
        hh: current.getHours(),
        mm: current.getMinutes(),
    }
}

const getDayFromDate = (date: Date) => {
    const day = date.getDay();
    if (day === 0) {
        return 'SS';
    }
    return WEEK_DAYS_ONLY[day - 1]!;
}

const defaultGetCurrentDay = () => {
    const current = new Date();
    return getDayFromDate(current);
}

export const Calendar: React.FC<CalendarProps> = ({
    week,
    showTodayButton,
    showCurrentTime,
    highlightCurrentDay,
    getCurrentTime = defaultGetCurrentTime,
    getCurrentDay = defaultGetCurrentDay,
}) => {
    const [today, setToday] = React.useState<WeekDay | 'SS'>(() => getCurrentDay());
    const [selected, setSelected] = React.useState<WeekDay>(() => today === 'SS' ? 'M' : today);

    const [now, setNow] = React.useState(() => getCurrentTime());

    React.useEffect(() => {
        const tick = () => {
            setNow(getCurrentTime());
            setToday(getCurrentDay());
        }
        const interval = setInterval(tick, 5 * 1000);
        return () => clearInterval(interval);
    }, [getCurrentDay, getCurrentTime]);

    const overlap = React.useMemo(() => {
        const result: Record<WeekDay, Item[]> = { M: [], T: [], W: [], R: [], F: [], S: [] };
        WEEK_DAYS.forEach(([key]) => {
            result[key] = week?.[key] ? calculateOverlap(week[key]) : [];
        });
        return result;
    }, [week]);

    const nextDay = React.useCallback(() => {
        setSelected((day) => {
          const index = WEEK_DAYS_ONLY.indexOf(day);
          return WEEK_DAYS_ONLY[(index + 1) % WEEK_DAYS_ONLY.length] as WeekDay;
        });
      }, []);
    
    const prevDay = React.useCallback(() => {
    setSelected((day) => {
        const index = WEEK_DAYS_ONLY.indexOf(day);
        return WEEK_DAYS_ONLY[(index === 0 ? WEEK_DAYS_ONLY.length : index) - 1 % WEEK_DAYS_ONLY.length] as WeekDay;
    });
    }, []);
    
    const toToday = React.useCallback(() => {
        if (today === 'SS') {
            return;
        }
        scrollTo(0, 0);
        setSelected(today);
    }, [today]);

    return (
        <div className={clsx(cls.root)}>
            <div className={cls.times}>
                {TIMES.map(el => (
                    <div key={el} className={cls.timeCell}>{el}</div>
                ))}
            </div>
            <div className={cls.days}>
                <Stack alignItems="center" justifyContent="space-between" className={cls.buttons}>
                    <Button aria-label="Previous day" size="small" icon={<ArrowLeftIcon />} onClick={prevDay} />
                    <Button aria-label="Next day" size="small" icon={<ArrowRightIcon />} onClick={nextDay} />
                </Stack>
                {WEEK_DAYS.map(([key, label]) => (
                    <div key={key} className={clsx(cls.day, key === selected && cls.selected, overlap[key].length > 0 && cls.error)}>
                        <div className={cls.dayTitle}>
                            {overlap[key].length > 0 ? (
                                <ExclamationTriangleIcon height={15} width={15} />
                            ) : null}
                            <span className={highlightCurrentDay && key === today ? cls.selected : ''}>{label}</span>
                        </div>
                        <div className={cls.dayItems}>
                            {week?.[key]?.map(({ startTime, endTime, content }, i) => (
                                <CalendarElement startTime={startTime} endTime={endTime} key={`${key}_${i}`}>
                                    {content}
                                </CalendarElement>
                            ))}
                            {overlap[key].map(({ startTime, endTime }, i) => (
                                <CalendarElement startTime={startTime} endTime={endTime} key={`${key}_overlap_${i}`}>
                                    <div className={cls.overlap} />
                                </CalendarElement>
                            ))}
                        </div>
                    </div>
                ))}
                {showCurrentTime && now.hh < 23 && now.hh > 7 ? (
                    <NowLine now={now} />
                ) : null}
            </div>
            {showTodayButton && today !== 'SS' && today !== selected ? (
                <Button onClick={toToday} className={cls.today} icon={<CalendarIcon />}>
                    Today
                </Button>
            ) : null}
        </div>
    );
};

const CalendarElement: React.FC<PropsWithChildren<Item>> = ({ startTime, endTime, children }) => {
    const height = React.useMemo(() => getShiftFromHM({
        hh: endTime.hh - startTime.hh,
        mm: endTime.mm - startTime.mm
    }, true), [endTime, startTime]);
    return (
        <div
            className={cls.element}
            style={{
                transform: `translateY(calc(var(--block-height) * ${getShiftFromHM(startTime)}))`,
                height: `calc(var(--block-height) * ${height})`,
            }}
        >
            {children}
        </div>
    );
};

const NowLine: React.FC<{ now: Time }> = ({ now }) => (
    <div className={cls.now} style={{
        transform: `translateY(calc(var(--block-height) * ${getShiftFromHM(now)} + var(--header-height)))`,
    }}>
        <div className={cls.nowTime}>{formatTime(now)}</div>
    </div>
);
