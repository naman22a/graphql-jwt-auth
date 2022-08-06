import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { Button, Flex, Link, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../global';

const Header: React.FC = () => {
    const { data, loading, error } = useMeQuery();

    const [logout, { client }] = useLogoutMutation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        setAccessToken('');
        await client.cache.reset();
        navigate('/');
    };

    let body = null;

    if (loading) {
        body = <Spinner />;
    } else if (error || !data) {
        body = <Text>Not logged in</Text>;
    } else if (data && data.me) {
        body = (
            <Flex alignItems="center">
                <Text mr={5}>
                    Logged in as{' '}
                    <Text as="span" fontWeight="semibold" casing="capitalize">
                        {data.me.name}
                    </Text>
                </Text>
                <Button
                    colorScheme="pink"
                    color="white"
                    mt={4}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Flex>
        );
    }

    return (
        <Flex as="header" p={8}>
            {body}
            <Flex as="nav" ml="auto">
                <Link mx={2} as={ReactLink} to="/">
                    Home
                </Link>
                <Link mx={2} as={ReactLink} to="/register">
                    Register
                </Link>
                <Link mx={2} as={ReactLink} to="/login">
                    Login
                </Link>
                <Link mx={2} as={ReactLink} to="/dashboard">
                    Dashboard
                </Link>
            </Flex>
        </Flex>
    );
};

export default Header;
