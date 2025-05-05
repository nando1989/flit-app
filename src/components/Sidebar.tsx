import { Home, LogOut, SquareUserRound } from 'lucide-react';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';

export const Sidebar = () => {
  const navigate = useNavigate();

  const signOut = useAuth((state) => state.signOut);

  return (
    <div className="flex h-full flex-col border-r bg-[#f8f8f8]">
      <div className="items-center justify-center border-b bg-[#f8f8f8]">
        <img src={'/logo_flit.png'} alt="Logo Flit" />
      </div>

      <button
        type="button"
        className="flex cursor-pointer gap-2 p-4 font-semibold text-slate-500 transition-all hover:bg-[#518adb] hover:font-bold hover:text-white"
        onClick={() => navigate(ROUTES.AUTHENTICATED.HOME)}
      >
        <Home />
        <h1>Home</h1>
      </button>

      <button
        type="button"
        className="flex cursor-pointer gap-2 p-4 font-semibold text-slate-500 transition-all hover:bg-[#518adb] hover:font-bold hover:text-white"
        onClick={() => navigate(ROUTES.AUTHENTICATED.EMPLOYEES)}
      >
        <SquareUserRound />
        <h1>Funcionários</h1>
      </button>

      <button
        type="button"
        className="flex cursor-pointer gap-2 p-4 font-semibold text-slate-500 transition-all hover:bg-[#518adb] hover:font-bold hover:text-white"
        onClick={() => signOut()}
      >
        <LogOut />
        <h1>Sair</h1>
      </button>
    </div>
  );
};
