import * as Yup from 'yup';

export const initFormValues = {
  email: '',
  password: '',
};

export const schemaValidationForm = Yup.object().shape({
  email: Yup.string().required('Informe o email').email('Email inválido'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Informe o password'),
});
