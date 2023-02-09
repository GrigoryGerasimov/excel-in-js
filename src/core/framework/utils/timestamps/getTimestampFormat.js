import { getMsConversion } from "./getMsConversion.js";
import { getTimeFormat } from "./getTimeFormat.js";

export const getTimestampFormat = (timestamp = 0) => {
    const timestampDate = new Date(timestamp);
    const timeElapsed = Date.now() - (typeof timestamp === "number" ? timestamp : timestampDate.getTime());

    const [year, month, day, hour, min] = getMsConversion(timeElapsed);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    if (year) {
        return `${getTimeFormat(timestampDate.getDate())} ${
            months[timestampDate.getMonth()]
        } ${timestampDate.getFullYear()}`;
    } else if (month || day) {
        return `${getTimeFormat(timestampDate.getDate())} ${months[timestampDate.getMonth()]}`;
    } else if (hour || min > 30) {
        return `${getTimeFormat(timestampDate.getHours())}:${getTimeFormat(timestampDate.getMinutes())}`;
    } else {
        if (min > 10 && min <= 30) {
            return "30 min ago";
        } else if (min > 5 && min <= 10) {
            return "10 min ago";
        } else if (min > 1 && min <= 5) {
            return "5 min ago";
        } else if (min <= 1) {
            return "1 min ago";
        }
    }
};
