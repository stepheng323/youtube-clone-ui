import { formatDistanceStrict } from 'date-fns';

export const getTokenExpiryAndRefreshToken = () => {
  const { tokenExpiry, refreshToken } = JSON.parse(
    localStorage.getItem('tokenData')
  );
  return { tokenExpiry, refreshToken };
};

export const removeSpecialCharacters = (string) => {
  return string.replace(/[^\w\s]/gi, ' ');
};

export const getRelativeTime = (date) =>
  formatDistanceStrict(Date.now(), new Date(date).getTime());

export function convertSecondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ':') : '';
  var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ':') : '0:';
  var sDisplay = s > 0 ? s + (s === 1 ? ' second' : '') : '';
  return hDisplay + mDisplay + sDisplay;
}

export const trimText = (text = '', length = 0) => {
  if (text.length < length) return text;
  const trimed = text.slice(0, length);
  return `${trimed}...`;
};

export const groupByDate = (data) => {
  const obj = {};
  data.forEach((video) => {
    const date = video.createdAt.split('T')[0];
    if (obj[date]) {
      obj[date].push(video);
    } else {
      obj[date] = [video];
    }
  });

  const groupArrays = Object.keys(obj).map((date) => ({
    date,
    videos: obj[date],
  }));
  return groupArrays;
};

export const formatHistoryDate = (sectionDate) => {
  const sectionUTCDate = new Date(`${sectionDate}`).getTime();  
  const todayUTCDate = new Date(new Date().toISOString().split('T')[0]).getTime();
  const yesterdayUTCDate = new Date(new Date());
  yesterdayUTCDate.setDate(yesterdayUTCDate.getDate() - 1);

  if (todayUTCDate === sectionUTCDate ) return 'Today';

  if (yesterdayUTCDate.getTime() === sectionUTCDate) return 'Yesterday'
  return sectionDate;
};
