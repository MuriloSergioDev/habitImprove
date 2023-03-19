import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { auth, db } from "../config/Firebase";
import { UserInterface } from "../interface/interface";

interface AuthContextData {
  signed: boolean;
  user: UserInterface;
  signIn(user: string, password: string): Promise<void | string>;
  logOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {  
  children: JSX.Element[],
};

export const AuthProvider = ({ children } : Props) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  async function signIn(user : string, password: string) {
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

  async function logOut() {    
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Deslogado com sucesso");
    }).catch((error) => {
      // An error happened.
      console.log("Erro ao deslogar");
    });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user: {}, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
