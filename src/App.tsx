import Login from 'pages/auth/login';
import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import AuthLayout from "components/authLayout";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to={"/auth/login"} />}/>
        <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to={"/auth/login"} />} />
            <Route path="login" element={<Login />}/>
        </Route>
      </Routes>
  );
}

export default App;
