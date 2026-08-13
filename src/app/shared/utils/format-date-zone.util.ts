export function formatDateZone(date: string | Date): string {
    
    // fecha de zona horaria desde chile
    const dateZoneChile = new Date(date).toLocaleDateString('es-CL');
    const dateCreatedSplited = dateZoneChile.split('-');

    const year = dateCreatedSplited?.[2];
    const month = dateCreatedSplited?.[1];
    const day = dateCreatedSplited?.[0];

    const finalDate = `${day}/${month}/${year}`;

    return finalDate;
}