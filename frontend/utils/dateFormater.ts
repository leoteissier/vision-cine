export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString(); // Months start at 0 in JavaScript
    let year = date.getFullYear();

    // Add leading zero if day or month is a single digit
    day = day.length < 2 ? '0' + day : day;
    month = month.length < 2 ? '0' + month : month;

    return `${day}-${month}-${year}`;
};

export const formatDateToInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

export const formatDateWithTimezone = (inputDate: Date | string) => {
    const date = new Date(inputDate);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const pad = (num: number) => (num < 10 ? '0' : '') + num;
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        sign + pad(hours) + ':' + pad(minutes);
}
