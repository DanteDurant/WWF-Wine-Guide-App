import moment from 'moment';
import imgBaby from "../assets/images/baby.png";
import imgBed from "../assets/images/bed.png";
import imgBicycle from "../assets/images/bicycle.png";
import imgEat from "../assets/images/eat.png";
import imgWalker from "../assets/images/walker.png";
import backendURL from '../constants/backendURL';
import Styles from '../constants/Styles';
import { useLocation } from '../hooks/useLocation';

export const formatDistance = (distance:number|undefined) => distance !== undefined ? (Math.round(distance * 10) / 10) + ' km' : ''
export const formatTime = (timeString:string) => moment(timeString, 'HH:mm').format('h:mma').replace(':00', '')

export const distanceBetweenPoints = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  let R = 6371; // km
  let dLat = toRad(lat2 - lat1);
  let dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};
const toRad = (deg: number) => (deg * Math.PI) / 180;

export const distanceToVineyard = (vineyard: any, formatted = false) => {
  const location = (useLocation.getState() as any).location;
  let distance;
  if (location?.coords && vineyard?.location?.gps)
    distance = distanceBetweenPoints(
      location.coords.latitude,
      location.coords.longitude,
      vineyard.location.gps[0],
      vineyard.location.gps[1]
    );
  return formatted ? formatDistance(distance) : distance;
};

export const getOpenStatus = (vineyard: any) => {
  const now = new Date();
  const nowTime = now.getTime();
  const dayOfWeek = now.getDay();
  const dayHours = vineyard.hours[dayOfWeek];
  const byAppointmentOnly = dayHours.byAppointmentOnly
  const closed = dayHours.closed;
  let text = "CLOSED";
  let style = Styles.timeRed;
  let isOpen = false
  if (!closed && !byAppointmentOnly) {
    const oParts = dayHours.openTime.split(":").map((x: any) => parseInt(x)),
          cParts = dayHours.closeTime.split(":").map((x: any) => parseInt(x));
    const opens = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      oParts[0],
      oParts[1]
    );
    const closes = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      cParts[0],
      cParts[1]
    );
    if (nowTime < opens.getTime()) {
      text = `OPENS AT ${dayHours.openTime}`;
      style = Styles.timeOrange;
      isOpen = true
    } else if (nowTime < closes.getTime() - 1000 * 60 * 60) {
      text = `OPEN`;
      style = Styles.timeGreen;
      isOpen = true
    } else if (nowTime < closes.getTime()) {
      text = `CLOSES AT ${dayHours.closeTime}`;
      style = Styles.timeOrange;
      isOpen = true
    }
  }
  if (byAppointmentOnly) {
    text = 'BY APPOINTMENT'

    style = Styles.timeGreen;
    isOpen = true
  }
  return { text, style, isOpen };
};

export const getVineyardImage = (
  vineyard: any,
  image: "header" | "thumbnail"
) => {
  return { uri: `${backendURL}/media/${vineyard.images[image]}` };
};

export const getBadgeIcons = (vineyard: any) => {
  const icons: any = {};
  if (!vineyard.badges) return icons;
  for (const badge of vineyard.badges) {
    let key = badge.charAt(0).toLowerCase() + badge.substr(1);
    icons[key] = true;
  }
  console.log(vineyard.name, icons)
  return icons;
};

export const getBadgeIcon = (identifier:string) => {
  console.log(identifier)
  switch (identifier.toLowerCase()) {
    case 'accommodation': return imgBed
    case 'bike': return imgBicycle
    case 'childfriendly': return imgBaby
    case 'restaurant': return imgEat
    case 'walk': return imgWalker
  }
  return null
}

export const getBadgeDescription = (identifier:string) => {
  switch (identifier.toLowerCase()) {
    case 'accommodation': return 'Accommodation'
    case 'bike': return 'Bike / run route'
    case 'childfriendly': return 'Child friendly'
    case 'restaurant': return 'Restaurant'
    case 'walk': return 'Eco tour / nature walk'
    default: return identifier
  }
}



const isContinuousSequence = (nums:number[]):boolean => {
  for (let i = 0; i < nums.length - 1; i++)
    if (nums[i] + 1 != nums[i + 1]) return false;
  return true;
};

export const generateOpeningHours = (dayHours: Array<any>) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysByKey: any = {},
    statusByKey: any = {};
  for (var i = 1; i <= 7; i++) {
    const index = i % 7
    const day = dayHours[index]
    const byAppointmentOnly = day.byAppointmentOnly
    // console.log(index,day)
    const key = day.open 
      ? (byAppointmentOnly ? 'by appointment only' : `${formatTime(day.openTime)} to ${formatTime(day.closeTime)}` )
      : 'closed'
    if (!daysByKey[key]) {
      daysByKey[key] = [];
      statusByKey[key] = day;
    }
    daysByKey[key].push(i);
  }
  const output = [];
  for (const key of Object.keys(daysByKey)) {
    const days: any = daysByKey[key];
    const continuous = isContinuousSequence(days);
    // console.log(days, continuous);
    let dayString = days[0];
    if (continuous && days.length >= 3)
      dayString = `${dayNames[days[0] % 7]} to ${
        dayNames[days[days.length - 1] % 7]
      }`;
    else if (days.length >= 2) {
      const last = days.pop()
      dayString = `${days.map((x:any) => dayNames[x % 7]).join(', ')} and ${dayNames[last % 7]}`
    } else 
      dayString = dayNames[days[0] % 7]
    if (key == 'closed') {
      output.push(`\nClosed ${dayString}`)
    } else {
      output.push(`${dayString} ${key}`)
    }
  }

  return (output.join('. ') + '.').trim()
}

export const handleSpecialClick = (special: any, navigation: any, db:any, navigateToDestination:Boolean = false) => {
  if (special.link.directLink || navigateToDestination) {
    if (special.link.linkType == 'Vineyard')
      navigation.navigate("FarmModal", {vineyard: db.getVineyardById(special.vineyard)})
    else
      navigation.navigate("ModalWeb", {url: special.link.url})
  } else {
    navigation.navigate("SpecialModal", {special} as any)
  }
}
