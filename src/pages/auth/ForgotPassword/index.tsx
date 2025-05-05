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
    <div className="flex h-dvh">
      <div className="h-full w-3/4 items-center justify-center border-r bg-[#f8f8f8]">
        <img src={'/logo_flit.png'} alt="Logo Flit" />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <form onSubmit={formik.handleSubmit} className="flex w-full max-w-xl flex-col gap-4">
          <div>
            <Button
              onClick={() => navigate(ROUTES.NO_AUTH.SIGN_IN)}
              lefIcon={<ArrowLeft className="mr-2 size-4 justify-self-start" />}
              label="Voltar"
              variant="link"
            />
          </div>
          <h1 className="self-start text-5xl font-bold text-slate-600">Esqueceu a senha?</h1>
          <h3 className="mb-6 self-start text-lg font-normal text-slate-400">
            Informe o email que te ajudamos a redefinir.
          </h3>
          <Input
            label="Email"
            onError={formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange('email')}
          />

          <Button type="submit" onClick={() => formik.handleSubmit()} label="Enviar" />
        </form>
      </div>
    </div>
  );
};
