"use client"

import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Center,
  Container,
} from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import { registerSchema } from '@/app/_validations/auth';

const RegisterForm = () => {
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(registerSchema),
  });

  const handleSubmit = async (values:unknown) => {

    console.log(values);
    // Handle form submission (e.g., send data to your API)
  };

  return (
    <Container size={420} my={40}>
      <Title mb={30}>
        <Center>Register</Center>        
      </Title>

      <Paper shadow="md" radius="md" p="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Your name"
            {...form.getInputProps('name')}
            mb="sm"
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            {...form.getInputProps('email')}
            mb="sm"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
            mb="sm"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            {...form.getInputProps('confirmPassword')}
            mb="lg"
          />
          <Center>
            <Button type="submit">Register</Button>
          </Center>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;