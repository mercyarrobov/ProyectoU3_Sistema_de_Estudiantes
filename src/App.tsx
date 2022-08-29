import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./routes/private";
import { ProtectedRouteDocente } from "./routes/docente";
//CONTEXT
import { AuthProvider } from "./context";
// PAGES
import SignIn from "./pages/Sigin";
import UsuariosPage from "./pages/usuarios";
import ParaleloPage from "./pages/paralelo";
import NotasPage from "./pages/notas";
import MateriaPage from "./pages/materia";
import CicloAcademico from "./pages/cicloacademico";
import Games from "./pages/Games";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/evaluacion" element={<Games />} />
          <Route element={<SignIn />} path="signIn" />
          <Route path="Admin" element={<ProtectedRoute />}>
            <Route element={<UsuariosPage />} path="usuarios" />
            <Route element={<ParaleloPage />} path="paralelos" />
            <Route element={<NotasPage />} path="notas" />
            <Route element={<MateriaPage />} path="materia" />
            <Route element={<CicloAcademico />} path="cicloAcademico" />
          </Route>
          <Route path="Docente" element={<ProtectedRouteDocente />}>
            <Route element={<UsuariosPage />} path="notas" />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

const Elements = () => {
  return <h2>Element</h2>;
};
export default App;
