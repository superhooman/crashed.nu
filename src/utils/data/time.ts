import type { Item, Time } from '@src/types/time';

export const pad2 = (n: number) => `${n > 9 ? '' : 0}${n}`;

export const parseTime = (str: string): Time => {
  const [time, modifier] = str.split(' ');
  const [hh_or, mm_or] = time?.split(':').map((el) => parseInt(el, 10)) || [0, 0];
  let hh = hh_or ?? 0;
  const mm = mm_or ?? 0;
  if (hh_or == 12) {
    hh = 0;
  }
  if (modifier === 'PM') {
    hh = hh + 12;
  }
  return { hh, mm };
};

export const formatTime = (time: Time) => `${pad2(time.hh)}:${pad2(time.mm)}`;

export const getTimeRange = (a: Omit<Item, 'content'>) => `${formatTime(a.startTime)} - ${formatTime(a.endTime)}`;

export const getStartTime = (a: Item) => (a.startTime.hh * 60 + a.startTime.mm);
export const getEndTime = (a: Item) => (a.endTime.hh * 60 + a.endTime.mm);

export const getRange = (str: string) => {
  const times = str.split('-').map(parseTime);

  if (!times[0] || !times[1]) {
    return null;
  }

  return getTimeRange({ startTime: times[0], endTime: times[1] });
};

export const calculateOverlap = (day: Item[]) => {
  const result: Item[] = [];
  day.forEach((card, i) => {
    if (i + 1 === day.length) {
      return;
    }
    const nextDay = day[i + 1];
    if (!nextDay) {
      return;
    }
    const current = {
      card: card,
      start: getStartTime(card),
      end: getEndTime(card),
    };
    const next = {
      card: nextDay,
      start: getStartTime(nextDay),
      end: getEndTime(nextDay),
    };
    if (current.end > next.start && current.start <= next.start) {
      result.push({
        startTime: next.card.startTime,
        endTime: current.card.endTime,
      });
    } else if (current.start <= next.start && current.end >= next.end) {
      result.push({
        startTime: next.card.startTime,
        endTime: next.card.endTime,
      });
    }
  });
  return result;
};
