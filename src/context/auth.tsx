import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { auth, db } from "../config/Firebase";
import { UserInterface } from "../interface/interface";

interface AuthContextData {
  signed: boolean;
  user: UserInterface | null;
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
        getUser(response.user.uid);
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

  function getUser(uid: string) {
    const usersCollection = collection(db, "users");
    const unsubscribe = onSnapshot(
      query(usersCollection, where("uid", "==", uid)),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            ...doc.data(),
          };
          setUser(data);
        });
      },
      (error) => {
        console.error("Error getting user: ", error);
      }
    );
    return unsubscribe;
  }

  async function logOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null);
      console.log("Deslogado com sucesso");
    }).catch((error) => {
      // An error happened.
      console.log("Erro ao deslogar");
    });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user: user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
