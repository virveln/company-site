import { useState, useEffect } from "react";


const useFetch = (url) => {
    const API_URL = 'http://127.0.0.1:8000';
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const controller = new AbortController();
        // const signal = controller.signal;

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
                    // signal,
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                setData(result || []);

            } catch (err) {
                // if (err.name === "AbortError") return; // Ignore abort errors
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchData();

        // return () => {
        //     controller.abort(); // Cancel fetch on unmount
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { data, loading, error };
}

export default useFetch;