import { Navigate, Route, Routes } from 'react-router';

import { Employees } from '@/pages/app/Employees';
import { EmployeesDetails } from '@/pages/app/Employees/Details';
import { Home } from '@/pages/app/Home';
import { AppLayout } from '@/pages/app/Layout';
import { ROUTES } from '@/paths';

export function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path={ROUTES.AUTHENTICATED.HOME} element={<Home />} />
        <Route path={ROUTES.AUTHENTICATED.EMPLOYEES} element={<Employees />} />
        <Route path={ROUTES.AUTHENTICATED.EMPLOYEES_DETAILS} element={<EmployeesDetails />} />
        <Route path="*" element={<Navigate to={ROUTES.AUTHENTICATED.HOME} />} />
      </Routes>
    </AppLayout>
  );
}
