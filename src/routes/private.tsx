import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { IUser } from "../context/types";
import AdminLayout from "../components/Layout/AdminLayout";

//{ children}:{children:JSX.Element}
export const ProtectedRoute = () => {
  const { username, name_rol } = useAuth();
  let user: IUser = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (
    name_rol?.toLowerCase() != "administrador" &&
    user.name_rol != "administrador"
  ) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};
