import { auth } from '@/config/firebase.config';
import {signInWithEmailAndPassword, UserCredential, signOut} from 'firebase/auth';

export async function signIn(email: string, password: string) : Promise<UserCredential> {
  return   signInWithEmailAndPassword(auth, email, password)
}

export async function logOut() {
  return signOut(auth);
}