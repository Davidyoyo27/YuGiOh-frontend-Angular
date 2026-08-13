export function formatDateHourZone(newDate: string | Date): string {

    const dateToConvert = new Date(newDate);

    // fecha de zona horaria desde chile
    const result = dateToConvert.toLocaleString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).replace(/-/g,"/");

    return result;
}