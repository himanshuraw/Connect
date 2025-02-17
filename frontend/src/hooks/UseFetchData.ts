import { useEffect, useState } from "react"
import { privateAPI, publicAPI } from "../services/api";

const useFetchData = <T>(url: string, isPrivate: boolean) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = isPrivate
                    ? await privateAPI.get(url)
                    : await publicAPI.get(url);

                setData(response.data);
                console.log(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);
    return { data, loading, error };
};

export default useFetchData;
