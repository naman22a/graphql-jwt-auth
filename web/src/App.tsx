import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import { Spinner } from '@chakra-ui/react';
import { setAccessToken } from './global';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/auth/refresh_token', {
            method: 'POST',
            credentials: 'include'
        }).then(async res => {
            const { accessToken } = await res.json();
            setAccessToken(accessToken);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return <Routes />;
};

export default App;
