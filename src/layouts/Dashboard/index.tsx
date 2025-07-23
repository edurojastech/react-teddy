import React from "react";
import { Link, useParams } from "react-router-dom";
import TeddyLogo from "../../assets/teddy-logo.svg"
import "./styles.css"

const menuItems = [
  { icon: "bi-house", label: "Home" },
  { icon: "bi-person", label: "Perfil" },
  { icon: "bi-gear", label: "Configurações" },
  { icon: "bi-info-circle", label: "Sobre" },
];

const Dashboard: React.FC = ({ children, nameUser }) => {
  let currentPath = location.pathname

  return (
    <div>
      <nav className="nav navbar bg-light shandow d-flex justify-content-between" id="navBarMain">
        <div className="d-flex gap-2">
          <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">
            <i className="bi bi-list" style={{fontSize: 24}}></i>
          </button>
          <img src={TeddyLogo} alt="Teddy Open Finance" />
        </div>
        <div className="d-flex gap-4" id="links">
          <Link to={'/home'} className={`nav-link ${currentPath == '/home' && 'linkActive'}`}>Clientes</Link>
          <Link to={'/selecionados'} className={`nav-link ${currentPath == '/selecionados' && 'linkActive'}`}>Clientes  Selecionados</Link>
          <Link to={'/'} className="nav-link" onClick={()=> localStorage.removeItem("UserName")}>Sair</Link>
        </div>
        <div>
          <h4 className="mx-3">Olá, {nameUser}!</h4>
        </div>
      </nav>

      <div className="p-2">
        {children}
      </div>


      {/* menu lateral */}
      <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
        <div className="offcanvas-header bg-light px-4">
          <img src={TeddyLogo} alt="Teddy Open Finance"/>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body px-5">
          <Link to={'/home'} className={`nav-link my-3 ${currentPath == '/home' && 'linkActive'}`} style={{ fontSize: 24}}>
            <i className="bi bi-person-fill"></i> Clientes
          </Link>
          <Link to={'/selecionados'} className={`nav-link my-3 ${currentPath == '/selecionados' && 'linkActive'}`} style={{ fontSize: 24}}>
            <i className="bi bi-person-fill-check"></i> Selecionados
          </Link>
          <Link to={'/'} className="nav-link my-3" style={{ fontSize: 24}} onClick={()=> localStorage.removeItem("UserName")}>
            <i className="bi bi-x-octagon-fill"></i> Sair
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
