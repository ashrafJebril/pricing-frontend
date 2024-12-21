import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/slices/authSlice';
import { authApi } from '../lib/api/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    try {
      dispatch(loginStart());
      const user = await authApi.login(email, password);
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    dispatch(logout());
  };

  return {
    ...auth,
    login,
    logout: handleLogout,
  };
};