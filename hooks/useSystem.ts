import { useContext } from 'react';
import { SystemContext, SystemContextType } from '../context/SystemProvider';

export default function useSystem(): SystemContextType {
  return useContext(SystemContext);
}
