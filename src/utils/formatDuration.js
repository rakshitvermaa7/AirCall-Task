export function formatDuration(duration) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    const hoursPart = hours > 0 ? `${hours} hr ` : '';
    return `${hoursPart}${minutes} min ${seconds} sec`;
}
