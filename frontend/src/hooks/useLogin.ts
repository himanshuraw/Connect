import { useState } from "react"
import { useAppDispatch } from '../store/hooks'
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router";

const useLogin = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!usernameOrEmail || !password) {
            setError('Please fill in all fields');
            return;
        }

        setError(null);

        try {
            await dispatch(login({ usernameOrEmail, password })).unwrap();
            navigate('/');
        } catch (error) {
            console.log('Login Failed', error);
            setError('Login failed. Please check your credentials.');
        }
    }

    return {
        usernameOrEmail,
        setUsernameOrEmail,
        password,
        setPassword,
        error,
        handleSubmit,
    }
}

export default useLogin;