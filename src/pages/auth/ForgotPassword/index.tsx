import { useFormik } from 'formik';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ROUTES } from '@/paths';

import { initFormValues, schemaValidationForm } from './types';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initFormValues,
    validationSchema: schemaValidationForm,
    onSubmit: (data) => handleSubmit(data),
  });

  const handleSubmit = async ({ email }: typeof initFormValues) => {
    console.log(email);
  };

  return (
    <div>
      <h1>Lembrar Senha</h1>
      <Button
        onClick={() => navigate(ROUTES.NO_AUTH.SIGN_IN)}
        lefIcon={<ArrowLeft className="mr-2 size-4" />}
        label="Voltar"
        variant="link"
      />
      <form className="flex flex-col gap-4 p-4">
        <Input
          label="Email"
          onError={formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange('email')}
        />

        <Button onClick={() => formik.handleSubmit()} label="Entrar" />
      </form>
    </div>
  );
};
