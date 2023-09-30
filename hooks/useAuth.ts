import { useContext, useDebugValue } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthProvider';

export default function useAuth(): AuthContextType {
  const authContext: AuthContextType = useContext(AuthContext);

  // For debugging in React DevTools.
  useDebugValue(authContext.auth ? 'Logged In' : 'Logged Out');
  return authContext;
}
