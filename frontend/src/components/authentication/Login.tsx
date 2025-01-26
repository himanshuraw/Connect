import React from 'react'
import useLogin from '../../hooks/useLogin';

const Login: React.FC = () => {

    const {
        usernameOrEmail,
        setUsernameOrEmail,
        password,
        setPassword,
        error,
        handleSubmit,
    } = useLogin();

    return (
        <>
            <div>Login</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>


        </>
    )
}

export default Login;


