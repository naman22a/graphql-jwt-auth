import React from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components';
import { Button, Container, Text } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    return (
        <Container maxW="sm">
            <Text textAlign="center" fontSize="2xl" mb={10}>
                Register
            </Text>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                onSubmit={async data => {
                    await register({ variables: data });
                    navigate('/');
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="name"
                            label="Name"
                            placeholder="Name"
                        />
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
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Register;
