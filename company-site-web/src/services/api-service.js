const API_URL = 'http://127.0.0.1:8000';
// const API_URL = 'http://192.168.1.166:8000';

export default class API {

    // static async loginUser(body) {
    //     const response = await fetch(`${API_URL}/auth/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(body)
    //     });
    //     if (!response.ok) {
    //         return null;
    //     }
    //     return await response.json();
    // }

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
}