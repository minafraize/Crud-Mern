import React from 'react';
import { Route, Routes } from "react-router-dom";

import TodoProvider from './contexts/todo';
import AuthProvider from './contexts/auth';
import Todo from './components/todo';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import './App.css';

// ----------------------------------------------------------------------

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <TodoProvider>
            <Todo />
          </TodoProvider>
        } />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
