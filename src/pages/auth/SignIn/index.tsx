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
    <div>
      <h1 className="">Sign In</h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
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
  );
};
