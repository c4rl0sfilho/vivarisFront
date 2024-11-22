import React, { useState } from "react";
import FormInput from "./FormInput";
import GoogleIcon from "../assets/googleIcon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaEyeSlash as EyeIcon, FaEye as OpenedEye } from "react-icons/fa";

import Swal from "sweetalert2";

const ContainerLogin = () => {
  localStorage.clear();
  const [selectedButton, setSelectedButton] = useState<"Cliente" | "Psicólogo">(
    "Cliente"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleButtonClick(buttonName: "Cliente" | "Psicólogo") {
    setSelectedButton(buttonName);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    // Validação básica antes de enviar a requisição
    if (!email || !password) {
      setLoading(false);
      Swal.fire({
        title: "Erro!",
        text: "Preencha todos os campos!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const endpoint =
        selectedButton === "Cliente"
          ? "http://localhost:8080/v1/vivaris/login/usuario"
          : "http://localhost:8080/v1/vivaris/profissional/login";

      const response = await axios.post(endpoint, {
        email: email,
        senha: password,
      });

      // Verifica se o status da resposta é 200
      if (response.status === 200) {
        console.log("Login bem-sucedido:", response);

        if (response.status === 200) {
          await Swal.fire({
            title: "Sucesso!",
            text: "Login bem-sucedido!",
            icon: "success",
            confirmButtonText: "Continuar",
          });

          if (selectedButton === "Cliente") {
            if (
              response.data &&
              response.data.cliente &&
              response.data.cliente.usuario
            ) {
              let idDoCliente = response.data.cliente.usuario.id;
              let token = response.data.token;
              localStorage.setItem("idDoCliente", idDoCliente);
              localStorage.setItem("token", token);

              let url = `http://localhost:8080/v1/vivaris/usuario/preferencias/${idDoCliente}`;
              const preferenciasResponse = await axios.get(url, {
                headers: {
                  "x-access-token": token,
                },
              });

              if (preferenciasResponse.data.data.preferencias.length < 1) {
                navigate("/Preferences");
              } else {
                navigate("/Home");
              }
            } else {
              Swal.fire({
                title: "Erro!",
                text: "Resposta inesperada do servidor ao fazer login como cliente.",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          } else {
            if (response.data.data.id) {
              let idDoPsicologo = response.data.data.id;
              let token = response.data.token;
              localStorage.setItem("idDoPsicologo", idDoPsicologo);
              localStorage.setItem("token", token);
              navigate("/Home");
            } else {
              Swal.fire({
                title: "Erro!",
                text: "Resposta inesperada do servidor ao fazer login como psicólogo.",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          }
        } else {
          Swal.fire({
            title: "Erro!",
            text: "Email ou senha inválidos.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao fazer login";
      setError(errorMessage);
      Swal.fire({
        title: "Erro!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Erro no login:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  // Lógica para capturar a tecla Enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <div
      className="flex flex-col w-[30rem]"
      onKeyDown={handleKeyPress} // Adiciona o evento de teclado
      tabIndex={0} // Torna o div focável para capturar eventos de teclado
    >
      <div className="title flex justify-center pb-8">
        <h1 className="text-7xl font-semibold text-[#13916D]">Login</h1>
      </div>
      <div className="ClienteOrPsicologo flex border-[#96E3CD] border-2 items-center justify-center rounded-xl mb-4">
        <button
          className={`w-[14.9rem] h-[2rem] rounded-xl font-semibold transition-all duration-700 
                    ${
                      selectedButton === "Cliente"
                        ? "bg-[#296856] text-[#ffffff]"
                        : "bg-[#ffffff] text-[#296856]"
                    }`}
          onClick={() => handleButtonClick("Cliente")}
        >
          Cliente
        </button>
        <button
          className={`w-[14.9rem] h-[2rem] rounded-xl font-semibold transition-all duration-700 
                    ${
                      selectedButton === "Psicólogo"
                        ? "bg-[#296856] text-[#ffffff]"
                        : "bg-[#ffffff] text-[#296856]"
                    }`}
          onClick={() => handleButtonClick("Psicólogo")}
        >
          Psicólogo
        </button>
      </div>
      <div className="inputs">
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          label="Email"
          placeholder="Email"
          required
        />
        <div className="relative">
          <FormInput
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            label="Senha"
            placeholder="Senha"
            required
          />
          <div
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <OpenedEye width={20} height={2} />
            ) : (
              <EyeIcon width={20} height={20} />
            )}
          </div>
        </div>
      </div>
      <div className="buttonLogin flex justify-center py-4">
        <button
          onClick={handleLogin}
          className="w-[10rem] h-[2rem] rounded bg-[#296856] text-white font-semibold border-solid hover:bg-[#13916D]"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Login"}
        </button>
      </div>
      {loading && (
        <p className="text-center font-semibold pb-2">Carregando...</p>
      )}
      <div className="textConta flex justify-around border-b border-b-black">
        <p>Não tem conta?</p>
        <p
          onClick={() => navigate("/Register")}
          className="cursor-pointer text-[#296856] underline"
        >
          Cadastre-se
        </p>
      </div>
      <div className="google flex justify-center py-2">
        <img src={GoogleIcon} alt="Google Icon" />
      </div>
    </div>
  );
};

export default ContainerLogin;
