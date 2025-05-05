import { useLayoutEffect } from 'react';

import { useAuth } from '@/store/useAuth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const currentUser = useAuth((state) => state.currentUser);
  const checkAuth = useAuth((state) => state.checkAuth);

  useLayoutEffect(() => {
    const unsubscribe = checkAuth();

    return () => unsubscribe();
  }, []);

  // if (loading) return <div className="h-dvh w-dvw bg-slate-950" />;

  return (
    <div className="h-dvh w-dvw bg-slate-100">{currentUser ? <AppRoutes /> : <AuthRoutes />}</div>
  );
}
