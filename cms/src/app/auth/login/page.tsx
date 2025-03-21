"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Center,
  Container,
  Text,
} from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import { loginSchema } from '@/app/_validations/auth';
import { useLogin } from '@/app/_hooks/auth';
import { useState } from 'react';
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const [processData, isProcessPending, isProcessError, errorData] = useLogin();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const form = useForm({
        initialValues: {
        email: '',
        password: '',
        },
        validate: zodResolver(loginSchema),
    });

    const handleSubmit = async (values: { email: string; password: string }) => {
        console.log('Form values:', values);
        setErrorMessage(null);
        try {
        const response = await processData(values);
        console.log('res', response);
        router.push('/dashboard');
        } catch (error: any) {
            console.log('error',error)
        if (error?.response?.status === 401) {
            setErrorMessage(error.response.data.error);
        } else {
            setErrorMessage("An unexpected error occurred.");
        }
        }
    };

    return (
        <Container size={420} my={40}>
        <Title mb={30}>
            <Center>Login</Center>
        </Title>
        <Paper shadow="md" radius="md" p="xl">
            <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label="Email"
                placeholder="Your email"
                {...form.getInputProps('email')}
                mb="sm"
                error={form.errors.email ? form.errors.email : null} // Conditionally show error
            />
            <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps('password')}
                mb="sm"
                error={form.errors.password ? form.errors.password : null} // Conditionally show error
            />
                {errorMessage && (
                <Text color="red" size="sm" mt="sm" align="center">
                {errorMessage}
                </Text>
            )}
            <Center>
                <Button type="submit">Login</Button>
            </Center>
        
            </form>
        </Paper>
        </Container>
    );
};

export default LoginForm;