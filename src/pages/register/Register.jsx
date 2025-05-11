import { Box, Input, Field, Flex, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useFormik } from "formik";
import { signupSchema } from "../../schemas/schemas";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toaster } from "@/components/ui/toaster"
import useAuthStore from "../../store/Auth";
import useUserStore from "../../store/user";
import { useNavigate } from 'react-router-dom';



export default function Register() {
      const navigate = useNavigate();
      const base = import.meta.env.VITE_BASE_URL;
      const {setToken }  = useAuthStore();
      const {setUser}  = useUserStore();


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${base}/api/auth/register`,{name : values.name , password : values.password , email : values.email});

        setToken(response.data.accessToken);
        setUser(response.data.user);

        toaster.create({
          title : `welcome !`,
          type : 'success'
        })
        navigate('/');
      }
      catch (err) {
        toaster.create({
          title : 'something went wrong! please try again later',
          type : 'error'
        });
        console.log(err);
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
      bg="#f8f9fa" 
    >
      <Box textAlign="center" mb={6} mt={8}>  
        <Heading mb={2} size="2xl" color="#2d3748"> 
        PennyPal
        </Heading>
        <Text color="#718096"> 
          Create an account to get started
        </Text>
      </Box>

      <Flex
        as="form"
        onSubmit={formik.handleSubmit}
        bg="white"
        w="100%"
        maxW="400px"
        minH={{ base: "auto", md: "500px" }}  
        direction="column"
        alignItems="flex-start"
        p={8}
        borderRadius="lg"
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        gap={6}
        mb={8}  
      >
        <Box>
          <Heading size="lg" mb={1} color="#2d3748">Create Account</Heading>
          <Text fontSize="sm" color="#718096">
            Enter your details to sign up
          </Text>
        </Box>

        <Field.Root w="100%">
          <Field.Label color="#4a5568"> 
            Name <Field.RequiredIndicator />
          </Field.Label>
          <Input 
            name="name" 
            placeholder="John Doe" 
            {...formik.getFieldProps('name')}
            isInvalid={formik.touched.name && !!formik.errors.name}
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
            placeholder="name@example.com" 
            {...formik.getFieldProps('email')}
            isInvalid={formik.touched.email && !!formik.errors.email}
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
            {...formik.getFieldProps('password')}
            isInvalid={formik.touched.password && !!formik.errors.password}
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
            {...formik.getFieldProps('confirmPassword')}
            isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
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
          mt="auto"  
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <Spinner size={'md'} /> : 'Create account'}
        </Button>

        <Text fontSize="sm" textAlign="center" w="full" color="#718096">
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
            Sign in
          </Button>
        </Text>
      </Flex>
    </Flex>
  )
}
