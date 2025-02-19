import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase.config';
import { signIn as firebaseSignIn, logOut } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const initialContextState: AuthContextType = {
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
  error: null
};

const AuthContext = createContext<AuthContextType>(initialContextState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
        (currentUser) => {
          setUser(currentUser);
          setIsLoading(false);
          setError(null);
        },
        (error) => {
          console.error('Auth state change error:', error);
          setError(error.message);
          setIsLoading(false);
        }
    );

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await firebaseSignIn(email, password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      console.error('Sign in error:', error);
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await logOut();
      setUser(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      console.error('Sign out error:', error);
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <AuthContext.Provider value={{
        user,
        isLoading,
        signIn,
        signOut,
        error
      }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé au sein d\'un AuthProvider');
  }
  return context;
}