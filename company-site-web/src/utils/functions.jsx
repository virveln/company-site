export function formatTitleForUrl(title) {
    return title.toLowerCase().replace(/ /g, '-').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').replace(/[^a-z0-9-]/g, ''); // Konverterar till små bokstäver, ersätter mellanslag med bindestreck och tar bort specialtecken
}

export function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('sv-SE', { timeZone: "Europe/Stockholm" });
}