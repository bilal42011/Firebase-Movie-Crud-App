import { FC, ReactNode } from "react";
import { useAuth } from "@/config/hooks";
import { useLocation, Navigate } from "react-router-dom";
import { match } from "node-match-path";

const publicPaths = ["/login", "/signup", "/login/:id"];
const privatePaths = ["/create-movie"];

interface authMiddlware {
    children: ReactNode
}

const AuthMiddleware: FC<authMiddlware> = ({ children }) => {
    const { pathname: path } = useLocation();
    const { user } = useAuth();

    let outlet = children;

    console.log("inside auth middleware");

    console.log(user, path);

    const isPublicPath = publicPaths.some((publicPath) => match(publicPath, path).matches);
    const isPrivatePath = privatePaths.some((privatePath) => match(privatePath, path).matches);

    console.log(isPublicPath);
    console.log(isPrivatePath);
    console.log(match('/admin/:messageId', '/admin/1'));

    if (isPublicPath && user) {
        console.log("inside public");
        outlet = <Navigate to="/" />
    }

    if (isPrivatePath && !user) {
        console.log("inside private");
        outlet = <Navigate to="/login" />
    }

    return outlet;

}

export default AuthMiddleware;