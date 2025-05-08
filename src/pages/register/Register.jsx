import { Box, Input, Field, Flex, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useFormik } from "formik";
import { signupSchema } from "../../schemas/schemas";
import { Link } from "react-router-dom";


export default function Register() {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      try {
        console.log(values);
      }
      catch {
        console.log('Error in signup');
      }
    },
  });


  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100vh"
      px={4}
      gap={8}
      bg="#f8f9fa"
    >
      <Box  mt={8} textAlign="center" mb={4}>
        <Heading mb={2} size="2xl" color="#2d3748">
          PennyPal
        </Heading>
        <Text color="#718096">
          Start managing your finances today
        </Text>
      </Box>

      <Flex
        as="form"
        onSubmit={formik.handleSubmit}
        bg="white"
        w="100%"
        maxW="400px"
        direction="column"
        alignItems="flex-start"
        p={8}
        borderRadius="lg"
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        gap={6}
      >
        <Box>
          <Heading size="lg" mb={1} color="#2d3748">Create Account</Heading>
          <Text fontSize="sm" color="#718096">
            Fill in your details to get started
          </Text>
        </Box>

        <Field.Root w="100%">
          <Field.Label color="#4a5568">
            Full Name <Field.RequiredIndicator />
          </Field.Label>
          <Input
            name="name"
            placeholder="John Doe"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="name"
            isInvalid={formik.touched.name && !!formik.errors.name}
            borderColor="#e2e8f0"
            _hover={{ borderColor: "#cbd5e0" }}
          />
          {formik.touched.name && formik.errors.name && (
            <Text fontSize="sm" color="#e53e3e" mt={1}>
              {formik.errors.name}
            </Text>
          )}
        </Field.Root>

        <Field.Root w="100%">
          <Field.Label color="#4a5568">
            Email <Field.RequiredIndicator />
          </Field.Label>
          <Input
            name="email"
            placeholder="demo@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="email"
            isInvalid={formik.touched.email && !!formik.errors.email}
            borderColor="#e2e8f0"
            _hover={{ borderColor: "#cbd5e0" }}
          />
          {formik.touched.email && formik.errors.email && (
            <Text fontSize="sm" color="#e53e3e" mt={1}>
              {formik.errors.email}
            </Text>
          )}
        </Field.Root>

        <Field.Root w="100%">
          <Field.Label color="#4a5568">
            Password <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            name="password"
            placeholder="•••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="new-password"
            isInvalid={formik.touched.password && !!formik.errors.password}
            borderColor="#e2e8f0"
            _hover={{ borderColor: "#cbd5e0" }}
          />
          {formik.touched.password && formik.errors.password && (
            <Text fontSize="sm" color="#e53e3e" mt={1}>
              {formik.errors.password}
            </Text>
          )}
        </Field.Root>

        <Field.Root w="100%">
          <Field.Label color="#4a5568">
            Confirm Password <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            name="confirmPassword"
            placeholder="•••••••••"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="new-password"
            isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            borderColor="#e2e8f0"
            _hover={{ borderColor: "#cbd5e0" }}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Text fontSize="sm" color="#e53e3e" mt={1}>
              {formik.errors.confirmPassword}
            </Text>
          )}
        </Field.Root>

        <Button
          type="submit"
          w="full"
          bg="#4299e1"
          color="white"
          _hover={{ bg: "#3182ce" }}
          size="lg"
          isLoading={formik.isSubmitting}
          loadingText="Creating account..."
          mt={2}
        >
          Sign Up
        </Button>

        <Text fontSize="sm" textAlign="center" w="full" mt={2} color="#718096">
          Already have an account?{' '}
          <Button
            as={Link}
            to="/login"
            variant="link"
            color="#4299e1"
            _hover={{ textDecoration: 'underline' }}
            fontWeight="normal"
            mb={1}
          >
            Log in
          </Button>
        </Text>
      </Flex>
    </Flex>
  )
}
