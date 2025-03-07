import { useState, useEffect } from "react";

const useFetch = (url) => {
    const API_URL = 'http://127.0.0.1:8000';
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            // await new Promise(resolve => setTimeout(resolve, 3000));
            try {
                const response = await fetch(`${API_URL}${url}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Error getting data.')
                }
                const result = await response.json();
                setData(result || []);
                setLoading(false);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { data, loading, error };
}

export default useFetch;