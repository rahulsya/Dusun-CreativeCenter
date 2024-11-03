import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
export const auth = getAuth(firebase_app);

export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    return Promise.reject({
      status: error.code,
      message: error.message,
    });
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return Promise.reject({
      status: error.code,
      message: error.message,
    });
  }
};
