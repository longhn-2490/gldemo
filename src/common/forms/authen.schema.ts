import * as Yup from 'yup';

export const useLogInSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .nullable()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string().nullable().required('Password is required'),
  });
};
