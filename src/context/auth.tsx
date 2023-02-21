import React, { createContext, useState } from "react";
import { UserInterface } from "../interface/interface";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface AuthContextData {
  signed: boolean;
  user: UserInterface;
  signIn(user: string, password: string): Promise<void | string>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  async function signIn(user, password) {
    try {
      const response = await signInWithEmailAndPassword(auth, user, password);
      if (response.user.uid && response.user.emailVerified) {
        const docRef = doc(db, "users", response.user.uid);
        const data = await getDoc(docRef);

        // navigateToMenu(data.data())
        if (data.exists()) {
          console.log(data.data());
          setUser(data.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } else {
        // setMessageAlert('Seu email ainda nao foi verificado')
        // setModalAlertVisible(true)
        console.log("Seu email ainda não foi verificado");
        return "Seu email ainda não foi verificado";
      }
    } catch (error) {
      alert(error);
    }
  }

  async function signOut() {}

  return (
    <AuthContext.Provider value={{ signed: !!user, user: {}, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
