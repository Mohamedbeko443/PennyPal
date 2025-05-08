import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});



export const signupSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password')
});