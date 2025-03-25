import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { id, UserAuth } from "../../content/usersContext";
import { useEffect } from "react";
import { AdminUrl } from "../../content/Types";

const PrivateRoute = () => {
  const router = useNavigate();
  const { userRole, routerPath }: any = UserAuth(); 


  useEffect(() => {
    if (id) {
      if (userRole === "admin") {
        return router(`${AdminUrl}`);
      }
      return router(`${routerPath}` || "/Dashboard");
    } else {
      return router("/auth/login");
    }
  }, [id, userRole]);

  // return id ? (
  //   <>
  //     <Navigate to={"/Dashboard"} />
  //     <Outlet />
  //   </>
  // ) : (
  //   <NotAuth location={location} />
  // );
  return <Outlet />;
};

export default PrivateRoute;
export const NotAuth = (location: any) => {
  return <Navigate to={"/auth/login"} state={{ from: location }} replace />;
};
