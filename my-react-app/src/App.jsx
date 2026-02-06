import { useState } from "react";
import Encabezado from "./Encabezado";
import ContenedorTarjeta from "./ContenedorTarjeta";
import PromosContenidos from "./PromosContenidos";
import PiePagina from "./PiePagina";

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
    
        </div>
  );
}

function UserComponent(){
  const nombre = 'Jaquelin';
  const apellido = 'Soto Romero';
  const nombreCompleto = <h3>Ella se llama: {nombre} y sus apellidos son {apellido}</h3>;
  return <h3>UserComponent {nombreCompleto}</h3>;
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
      <p><h2>Lista de Materiales de Construcción</h2></p>
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

