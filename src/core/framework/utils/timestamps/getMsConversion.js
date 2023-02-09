import { msConstants } from "./msConstants";

export const getMsConversion = (time) => {
    const { MS_IN_YEAR, MS_IN_MONTH, MS_IN_DAY, MS_IN_HOUR, MS_IN_MINUTE } = msConstants;

    const remainders = {
        fromYear: time % MS_IN_YEAR,
        fromMonth: (time % MS_IN_YEAR) % MS_IN_MONTH,
        fromDay: ((time % MS_IN_YEAR) % MS_IN_MONTH) % MS_IN_DAY,
        fromHour: (((time % MS_IN_YEAR) % MS_IN_MONTH) % MS_IN_DAY) % MS_IN_HOUR
    };

    const computedYear = Math.floor(time / MS_IN_YEAR);
    const computedMonth = Math.floor(remainders.fromYear / MS_IN_MONTH);
    const computedDay = Math.floor(remainders.fromMonth / MS_IN_DAY);
    const computedHour = Math.floor(remainders.fromDay / MS_IN_HOUR);
    const computedMin = Math.floor(remainders.fromHour / MS_IN_MINUTE);

    return [
        computedYear,
        computedMonth,
        computedDay,
        computedHour,
        computedMin
    ];
};
