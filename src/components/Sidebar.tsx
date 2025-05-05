import { Home, LogOut, SquareUserRound } from 'lucide-react';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';

export const Sidebar = () => {
  const navigate = useNavigate();

  const signOut = useAuth((state) => state.signOut);

  return (
    <div className="flex h-full flex-col gap-2 border-r-2 bg-slate-200">
      <button
        type="button"
        className="flex cursor-pointer gap-2 p-4 transition-all hover:backdrop-brightness-110"
        onClick={() => navigate(ROUTES.AUTHENTICATED.HOME)}
      >
        <Home />
        <h1>Home</h1>
      </button>

      <button
        type="button"
        className="flex cursor-pointer gap-2 p-4 transition-all hover:backdrop-brightness-110"
        onClick={() => navigate(ROUTES.AUTHENTICATED.EMPLOYEES)}
      >
        <SquareUserRound />
        <h1>Funcionários</h1>
      </button>

      <button
        type="button"
        className="flex cursor-pointer gap-2 p-4 transition-all hover:backdrop-brightness-110"
        onClick={() => signOut()}
      >
        <LogOut />
        <h1>Sair</h1>
      </button>
    </div>
  );
};
