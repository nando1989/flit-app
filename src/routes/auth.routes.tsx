import { Navigate, Route, Routes } from 'react-router';

import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { SignIn } from '@/pages/auth/SignIn';
import { ROUTES } from '@/paths';

export function AuthRoutes() {
  return (
    <Routes>
      <Route index path={ROUTES.NO_AUTH.SIGN_IN} element={<SignIn />} />
      <Route index path={ROUTES.NO_AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to={ROUTES.NO_AUTH.SIGN_IN} />} />
    </Routes>
  );
}
