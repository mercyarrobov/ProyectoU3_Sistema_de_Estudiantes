import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { IUser } from "../context/types";
import AdminLayout from "../components/Layout/AdminLayoutDocente";
//{ children}:{children:JSX.Element}
export const ProtectedRouteDocente = () => {
  const { username, name_rol } = useAuth();
  let user: IUser = JSON.parse(localStorage.getItem("user"));
  if (
    name_rol?.toLowerCase() == "docente" ||
    user.name_rol.toLowerCase() == "docente"
  ) {
    return (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    );
  }

  return <Navigate to="/" replace />;
};
