import React from 'react';
import { useUsersQuery } from '../generated/graphql';
import { Box, Container, Spinner, Text } from '@chakra-ui/react';

const Home: React.FC = () => {
    const { data, loading } = useUsersQuery({ fetchPolicy: 'network-only' });

    if (loading || !data) {
        return <Spinner />;
    }

    return (
        <Container maxW="lg">
            <Text fontSize="2xl">Home</Text>

            {data.users.map((user, index) => (
                <Box key={user.id} my={3}>
                    {index + 1}
                    {'.)'}
                    {user.name}
                </Box>
            ))}
        </Container>
    );
};

export default Home;
