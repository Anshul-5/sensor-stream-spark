import { ReactNode } from 'react';
import { useMultipleSensors } from '@/hooks/useSensorData';
import Navigation from './Navigation';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { refreshAll, isFetching } = useMultipleSensors();

  return (
    <div className="min-h-screen bg-background">
      <Navigation onRefresh={refreshAll} isRefreshing={isFetching} />
      <main className="pb-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;