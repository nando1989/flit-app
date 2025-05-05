import { useFormik } from 'formik';
import { useNavigate } from 'react-router';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useMessages } from '@/hook/useMessages';
import { ROUTES } from '@/paths';
import { getFirebaseErrorMessageTranslation } from '@/service/firebase/translate';
import { useAuth } from '@/store/useAuth';

import { initFormValues, schemaValidationForm } from './types';

export const SignIn = () => {
  const navigate = useNavigate();

  const { onShowMessage } = useMessages();
  const { signIn, loadingAuth } = useAuth();

  const formik = useFormik({
    initialValues: initFormValues,
    validationSchema: schemaValidationForm,
    onSubmit: (data) => handleSubmit(data),
  });

  const handleSubmit = async ({ email, password }: typeof initFormValues) => {
    await signIn({ email, password }).catch((err) => {
      onShowMessage({
        isVisible: true,
        buttonText: 'Ok',
        type: 'MESSAGE',
        messageType: 'error',
        title: 'Atenção!',
        description: getFirebaseErrorMessageTranslation(
          err,
          'Não foi possível realizar o login, verifique o email e senha',
        ),
      });
    });
  };

  return (
    <div className="flex h-dvh">
      <div className="hidden h-full w-3/4 items-center justify-center border-r bg-[#f8f8f8] sm:flex">
        <img src={'/logo_flit.png'} alt="Logo Flit" />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex h-48 w-full items-center justify-center bg-[#f8f8f8] sm:hidden">
          <img className="h-48" src={'/logo_flit.png'} alt="Logo Flit" />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex h-full w-full max-w-xl flex-col gap-4 self-center rounded-t-3xl border-t p-6 sm:h-fit sm:border-0"
        >
          <h1 className="self-start text-4xl font-bold text-slate-600 md:text-5xl">Bem vindo!</h1>
          <h3 className="mb-6 self-start text-lg font-normal text-slate-400 md:text-lg">
            Informe o usuário e senha para realizar o seu login.
          </h3>
          <Input
            label="Email"
            onError={formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange('email')}
          />
          <Input
            label="Password"
            value={formik.values.password}
            onError={formik.errors.password}
            onChange={formik.handleChange('password')}
            password
          />

          <Button
            type="submit"
            isLoading={loadingAuth}
            onClick={() => formik.handleSubmit()}
            label="Entrar"
          />
          <Button
            onClick={() => navigate(ROUTES.NO_AUTH.FORGOT_PASSWORD)}
            variant="link"
            label="Lembrar senha"
          />
        </form>
      </div>
    </div>
  );
};
