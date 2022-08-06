import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { Box, Container, Spinner, Text } from '@chakra-ui/react';

const Dashboard: React.FC = () => {
    const { data, loading, error } = useMeQuery();

    if (loading) {
        return <Spinner />;
    }

    if (error || !data) {
        return (
            <Text color="red" fontWeight="semibold">
                Something went wrong! 😭
            </Text>
        );
    }

    return (
        <Container maxW="lg">
            <Text fontSize="2xl" fontWeight="semibold" mb={3}>
                Dashboard
            </Text>
            <Box>Name : {data.me.name}</Box>
            <Box>Email : {data.me.email}</Box>
        </Container>
    );
};

export default Dashboard;
