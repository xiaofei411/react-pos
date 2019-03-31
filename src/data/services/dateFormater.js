import moment from 'moment';

export const dateToUTC = (defDate) => {
  const dateObj = new Date(defDate);
  const dateUtc = moment.utc(dateObj);
  const formatedStringDate = dateUtc.format('L') + " " + dateUtc.format('HH:mm');

  return formatedStringDate
};