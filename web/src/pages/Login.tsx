import React from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components';
import { Button, Container, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { setAccessToken } from '../global';

const Login: React.FC = () => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    return (
        <Container maxW="sm">
            <Text textAlign="center" fontSize="2xl" mb={10}>
                Login
            </Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async data => {
                    const response = await login({
                        variables: data,
                        update: (store, { data }) => {
                            if (!data) {
                                return null;
                            }
                            store.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    me: data.login.user
                                }
                            });
                        }
                    });

                    if (response && response.data) {
                        setAccessToken(response.data.login.accessToken);
                    }
                    navigate('/');
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="email"
                            label="Email"
                            placeholder="Email"
                        />
                        <InputField
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Password"
                        />
                        <Button
                            type="submit"
                            colorScheme="teal"
                            mt={5}
                            isLoading={isSubmitting}
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Login;
