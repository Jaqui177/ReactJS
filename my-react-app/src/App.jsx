import { useState } from "react";
import Encabezado from "./Encabezado";
import ContenedorTarjeta from "./ContenedorTarjeta";
import PromosContenidos from "./PromosContenidos";
import PiePagina from "./PiePagina";
import Productos from "./Productos";
import Conciertos from "./Conciertos";
import Galeria from "./Galeria";
import Contacto from "./Contacto";
import Sucursales from "./Sucursales";

function App(){
  const [vista, setVista] = useState("inicio");

  const handleNavigate = (seccion) => {
    setVista(seccion);
  };

  return (
  <div>
    <Encabezado onNavigate={handleNavigate} />
    {vista === "inicio" && (
      <>
        <ContenedorTarjeta />
        <PromosContenidos />
        <PiePagina />
      </>
    )}
    {vista === "acerca" && (
      <>
        <PromosContenidos />
        <PiePagina />
      </>
    )}
    {vista === "productos" && (
      <>
        <Productos />
        <PiePagina />
      </>
    )}
    {vista === "conciertos" && (
      <>
        <Conciertos />
        <PiePagina />
      </>
    )}
    {vista === "galeria" && (
      <>
        <Galeria />
        <PiePagina />
      </>
    )}
    {vista === "contacto" && (
      <>
        <Contacto />
        <PiePagina />
      </>
    )}
    {vista === "sucursales" && (
      <>
        <Sucursales />
        <PiePagina />
      </>
    )}
    <div style={{ display: "none" }}>
      <UserComponent />
      <ProfileComponent />
      <FeedComponent />
    </div>
  </div>
  );
}

function UserComponent(){
  const nombre = 'Jaquelin';
  const apellido = 'Soto Romero';
  const nombreCompleto = <>Ella se llama: {nombre} y sus apellidos son {apellido}</>;
  return (
    <>
      <h3>UserComponent</h3>
      <h3>{nombreCompleto}</h3>
    </>
  );
}

function ProfileComponent(){
   const users = [
    { id: 1, name: 'Gustavo', role: 'Web Developer' },
    { id: 2, name: 'Carlos', role: 'Web Designer' },
    { id: 3, name: 'David', role: 'Team Leader' },
  ]
  return (
    <>
      <p>Lista de usuarios del Sistema</p>
      <ul>
        {
        users.map(function(user,index){
          return(
            <li key={index}>{user.name} Es un {user.role}</li>
          )
        })
      }
      </ul>
      </>
  );
}

function FeedComponent() {
  const materiales = [
    { id: 4, name: 'Cemento', tipo: 'Material Base' },
    { id: 5, name: 'Ladrillo', tipo: 'Bloque de Construcción' },
    { id: 6, name: 'clavo', tipo: 'Unir' },
    { id: 7, name: 'Madera', tipo: 'Estructura' },
    { id: 8, name: 'Martillo', tipo: 'Pegar' },
  ]
  return (
    <>
      <h2>Lista de Materiales de Construcción</h2>
      <ul>
        {
        materiales.map(function(material,index){
          return(
            <li key={index}>{material.name} Es un {material.tipo}</li>
          )
        })
      }
      </ul>
      </>
  );
}

export default App

