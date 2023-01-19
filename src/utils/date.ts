export function EpochToDate(epoch: number) {
    return new Date(epoch * 1000);
}

export function StringToEpoch(date: string) {
    return Date.parse(date) / 1000
}

export function DateNowEpoch() {
    return Date.now() / 1000;
}

export function StringToDate(date: string) {
    return new Date(date);
}

export function DateToEpoch(date: Date) {
    return Date.parse(date.toString());
}

export function StringToUtcDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return new Date(Date.UTC(year, month, day, hours, minutes));
}

export function StringToUtcEpoch(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return new Date(Date.UTC(year, month, day, hours, minutes)).getTime() / 1000;
}