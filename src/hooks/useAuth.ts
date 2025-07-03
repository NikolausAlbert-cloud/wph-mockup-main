import { loginOauth, logout } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import { auth } from '@/utils/firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword( auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      console.log("token: ", token);

      const userEmail = user.email ?? "";
      localStorage.setItem("token", token);

      dispatch(loginOauth({ id: user.uid, email: userEmail, token}))
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };
  
  return { isToken: !!token, loginUser, logoutUser, loading}
}