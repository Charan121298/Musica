import './App.css';
import React from 'react';
import LoginPage from './Componets/LoginPage';
import Home from './Componets/home';
import { AuthContextProvider,UserAuth} from './firebase/AuthContext';
import { Route, Routes } from 'react-router-dom';

function App() {
  const user = UserAuth()
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
