import './App.css';
import LoginPage from './Componets/LoginPage';
import { AuthContextProvider, UserAuth } from './firebase/AuthContext';
import { Route, Routes } from 'react-router-dom';

function App() {
  const user = UserAuth();
  return (
    <div className="min-h-screen w-full max-w-[1800px] mx-auto bg-white dark:bg-gray-900 transition-colors">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
