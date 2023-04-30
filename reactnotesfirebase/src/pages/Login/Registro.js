import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);


  useEffect(() => {
    checkEmailExists();
  }, [email]);

  const checkEmailExists = async () => {
    try {
      const response = await fetch(`http://localhost:5151/api/Login?email=${email}`);
      const data = await response.json();
      let emailExists = false;
      data.forEach((obj) => {
        if (obj.email === email) {
          emailExists = true;
        }
      });
      setEmailExists(emailExists);
    } catch (err) {
      console.error(err);
      
    }
  };

  const navigate = useNavigate();
  function gotoLogin() {
    navigate('/home')
  }
  

  const handleRegister = async (e) => {
    e.preventDefault();
    await checkEmailExists();
    if (!emailExists) {
      try {
        const response = await fetch("http://localhost:5151/api/Login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, confirmPassword }),
        });
        const data = await response.json();
        console.log(data);
        gotoLogin()
      } catch (err) {
        console.error("email ja existe", err);
        toast.error("Email já existe")
      }
    } else {
        toast.error("Email já existe.")
    }
  };
  

  return (
    <div className="background">
        <ToastContainer/>
      <div className="Auth-form-container">
        <form onSubmit={handleRegister} className="Auth-form">
        <div className="Auth-form-content">
          <div className="title-align">
            <p className="Auth-form-title">Cadastro</p>
            <p className="Auth-form-subtitle">Cadastre sua conta e comece a usar!</p>
          </div>
            <div className="form-group mt-3">
              <p className="input-name">Endereço de e-mail</p>
              <div className="input-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
</svg>
                <input
                
                className="form-input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@example.com.br"
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <p className="input-name">Senha</p>
              <div className="input-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
</svg>
                <input
                className="form-input-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="*********"
                />
              </div>
              <div className="lembrardiv">
                <input className="checkbox" type="checkbox"></input>
                <p className="lembrar">Lembrar de mim por 30 dias</p>
              </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="loginBotao">Cadastro na plataforma</button></div>
      
      
          </div>
          <div className="registrarDiv">
            <a onClick={gotoLogin}><p className="registerP">Já tem conta? Faça Login!</p></a>
          </div>
        </form>
      
      </div>
    </div>



  );
};

export default Register;