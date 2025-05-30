import { Box, Input, Field, Flex, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/schemas";
import { toaster } from "@/components/ui/toaster"
import { Link } from "react-router-dom";
import axios from 'axios';
import useAuthStore from "../../store/Auth";
import useUserStore from "../../store/user";
import { useNavigate } from 'react-router-dom';






export default function Login() {


        const base = import.meta.env.VITE_BASE_URL;
        const {setToken} = useAuthStore();
        const {setUser} = useUserStore();
        const navigate = useNavigate();

    const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    validationSchema: loginSchema,
    onSubmit:  async (values) => {
        try {
            const response = await axios.post(`${base}/api/auth/login`,{email : values.email , password : values.password});
            
            setToken(response.data.accessToken);
            setUser(response.data.user);

            toaster.create({
                title : `welcome back `,
                type : 'success'
            });

            navigate('/');
        }
        catch (err) {
                console.log(err);
                toaster.create({
                    title : 'something went wrong! please try again later.',
                    type : 'error'
                });
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
    <Box textAlign="center" mb={4}>
        <Heading mb={2} size="2xl" color="#2d3748"> 
        PennyPal
        </Heading>
        <Text color="#718096"> 
            Take control of your finances
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
            <Heading size="lg" mb={1} color="#2d3748">Welcome back</Heading>
            <Text fontSize="sm" color="#718096">
                Enter your email and password to continue
            </Text>
        </Box>

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
                placeholder="password123"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
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

        <Button
            type="submit"
            w="full"
            bg="#4299e1" 
            color="white"
            _hover={{ bg: "#3182ce" }} 
            size="lg"
            isLoading={formik.isSubmitting}
            disabled={formik.isSubmitting}
            loadingText="Signing in..."
            mt={2}
        >
            {formik.isSubmitting ? <Spinner size={'md'}/> :  "Sign In"}
        </Button>

        <Text   fontSize="sm" textAlign="center" w="full" mt={2} color="#718096">
            Don't have an account?{' '}
            <Button 
                as={Link}
                to='/register'
                variant="link" 
                color="#4299e1" 
                _hover={{ textDecoration: 'underline' }}
                fontWeight="normal"
                
                mb={1}
            >
                Sign up
            </Button>
        </Text>
    </Flex>
</Flex>
  )
}
