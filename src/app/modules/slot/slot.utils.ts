export const convertTimeStringToMilliseconds = (timeString: string): number => {
    return new Date(
        2018,
        11,
        24,
        Number(timeString.split(':')[0]),
        Number(timeString.split(':')[1])
    ).getTime();
};

export const prependZeroIfNeeded = (hourOrMin: number) => {
    return hourOrMin.toString().padStart(2, '0');
}
