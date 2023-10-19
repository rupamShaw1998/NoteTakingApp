import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { Typography } from 'antd';
import { useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import NoteDetails from './components/NoteDetails';

const { Title } = Typography;

function App() {

  useEffect(() => {
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const handleBackButton = (event) => {
    if (window.location.pathname === '/dashboard') {
      alert("You're logged out. Please sign in to continue.");
      window.location.href = "/signIn";
      window.history.pushState(null, '', '/dashboard');
    }
  };

  return (
    <BrowserRouter>
      <Title level={2} style={{ color: "brown" }}>Note Taking Application</Title>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/details/:id" element={<NoteDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;