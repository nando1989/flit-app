import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex h-dvh">
      <div className="hidden h-full w-80 md:block">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col overflow-auto">
        <Header />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
