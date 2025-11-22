import { AuthProvider } from './src/context/auth/AuthContext';
import { RootNavigation } from './src/navigation';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
