import * as Yup from 'yup';

export const initFormValues = {
  email: '',
};

export const schemaValidationForm = Yup.object().shape({
  email: Yup.string().required('Informe o email').email('Email inválido'),
});
