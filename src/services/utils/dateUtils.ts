import dayjs, {Dayjs} from 'dayjs';

export const generateDateBetween = (startDate: string, endDate: string) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  //let reverse = false;
  let diff = end.diff(start, 'day');

  if (diff < 0) {
    //reverse = true;
    diff = start.diff(end, 'day');
  }

  return Array.from(Array(diff + 1)).map((_, key) => {
    return start.add(key, 'day');
  });
};

export const formatDateToStringView = (startDate: Dayjs, endDate: Dayjs) => {
  return `${startDate?.format('DD.MMM')} - ${endDate?.format(
    'DD.MMM',
  )} ${endDate?.format('YYYY')}`;
};
