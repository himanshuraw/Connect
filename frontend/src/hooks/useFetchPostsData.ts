import axios from "axios";
import { useEffect, useState } from "react"
import { PostProp } from "../types/post";

const useFetchPostsData = (username: string) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const [postsData, setPostsData] = useState<PostProp[] | null>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${BASE_URL}/posts/${username}`);
                setPostsData(response.data);
                console.log(response.data);
            } catch (error) {
                setError('Failed to fetch user data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchPostData();
    }, [username])

    return { postsData, loading, error }
}

export default useFetchPostsData;