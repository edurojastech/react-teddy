/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, type FormEvent } from "react";
import { type User } from "../../types/User";
import "./styles.css"
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>({
    name: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Nome do usuário atual é: , ${user.name}!`);
    user.name.length > 0 && navigate('/home')
    localStorage.setItem('UserName', user.name)
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-4 bg-white rounded shadow-sm d-flex flex-column gap-4" style={{ width: "24rem", height: "14rem"}}>
        <h4 className="mb-4">Olá, seja bem-vindo!</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Digite o seu nome:"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white fw-bold bg-orange"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
