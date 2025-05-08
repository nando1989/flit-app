import { useNavigate } from 'react-router';

import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';

export const Header = () => {
  const navigate = useNavigate();
  const signOut = useAuth((state) => state.signOut);

  return (
    <div className="flex h-20 w-full items-center justify-between border-b bg-[#f8f8f8] px-2 shadow-xs">
      <div className="flex gap-4 md:hidden">
        <button
          onClick={() => navigate(ROUTES.AUTHENTICATED.HOME)}
          type="button"
          className="flex h-16 cursor-pointer items-center px-2 transition-all hover:backdrop-brightness-110"
        >
          <h1>Home</h1>
        </button>
        <button
          onClick={() => navigate(ROUTES.AUTHENTICATED.EMPLOYEES)}
          type="button"
          className="flex h-16 cursor-pointer items-center px-2 transition-all hover:backdrop-brightness-110"
        >
          <h1>Funcionarios</h1>
        </button>
        <button
          onClick={() => signOut()}
          type="button"
          className="flex h-16 cursor-pointer items-center px-2 transition-all hover:backdrop-brightness-110"
        >
          <h1>Sair</h1>
        </button>
      </div>
    </div>
  );
};
