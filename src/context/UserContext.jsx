import React, { createContext, useReducer, useState } from "react";
import { UserInterface } from "../interface/interface";

const initialState = {
  name: '',
  email: '',
  password: '',
  turma: '',
  permission: 1
}
const UserContext = createContext(initialState)

export const UserProvider = (props) => {

  function reducer(state, action) {
    switch (action.type) {
      case 'login':        
        const user = action.payload
        return user

      case 'delete':
        console.warn('delete');
        return state

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;