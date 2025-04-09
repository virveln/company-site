const API_URL = 'http://127.0.0.1:8000';
// const API_URL = 'http://192.168.1.166:8000';

export default class API {

    static async fetchApartments() {
        try {
            const response = await fetch(`${API_URL}/api/apartments/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error("API Error: ", error);
            return [];
        }
    }

    static async getApartment(apartment_id) {
        try {
            const response = await fetch(`${API_URL}/api/apartments/${apartment_id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error("API Error: ", error);
            return null;
        }
    }

    static async fetchInformation() {
        try {
            const response = await fetch(`${API_URL}/api/information/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error("API Error: ", error);
            return [];
        }
    }

    static async getInformation(information_id) {
        try {
            const response = await fetch(`${API_URL}/api/information/${information_id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error("API Error: ", error);
            return [];
        }
    }

    static async setFaultReport(formDataToSend) {
        try {
            const response = await fetch(`${API_URL}/api/fault-reports/`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                // alert(' skickad!');
                return true;
            } else {
                // alert('Något gick fel. Försök igen.');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Något gick fel. Försök igen.');
        }
    }

}