import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
// import Home from './components/Home';
import SignIn from './components/SignIn';
import { Typography } from 'antd';
import { useEffect } from 'react';
import './App.css';

const { Title } = Typography;

function App() {

  useEffect(() => {
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const handleBackButton = (event) => {
    if (window.location.pathname === '/home') {
      alert("You're logged out. Please sign in to continue.");
      window.location.href = "/signIn";
      window.history.pushState(null, '', '/home');
    }
  };

  return (
    <BrowserRouter>
      <Title level={2} style={{ color: "brown" }}>Note Taking Application</Title>
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        {/* <Route path="/home" element={<Home />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;