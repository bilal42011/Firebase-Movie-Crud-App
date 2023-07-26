import { Outlet } from "react-router-dom"
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { useAuth } from "@/config/hooks";

function App() {

  const { user } = useAuth();


  return (
    <AuthMiddleware>
      <p>{user ? user?.email : ""}</p>
      <Outlet />
    </AuthMiddleware>
  )
}

export default App
