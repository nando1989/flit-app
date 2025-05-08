import { DatabaseBackup } from 'lucide-react';

export const Home = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mt-8 flex flex-col items-center justify-center gap-2">
        <h1 className="text-slate-600">Não foi possível carregar os dados</h1>
        <DatabaseBackup className="size-4 text-slate-500" />
      </div>
    </div>
  );
};
