import { StatusBar } from 'expo-status-bar';
import moment from 'moment-timezone';
import React from 'react';
import { AuthProvider } from './src/context/auth';
import Routes from './src/routes/index';

const App = () => {
  moment.tz.setDefault('America/Sao_Paulo');

  return (
    <>
      <AuthProvider>
        <StatusBar style="light" backgroundColor="#FE9D2A" />
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App
