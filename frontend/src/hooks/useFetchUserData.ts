import axios from "axios";
import { useEffect, useState } from "react"
import { UserData } from "../types/user";


const useFetcUserData = (username: string) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${BASE_URL}/users/${username}`);
                setUserData(response.data);
                console.log(response.data)
            } catch (error) {
                setError('Failed to fetch user data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    return { userData, loading, error };
}

export default useFetcUserData;