import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Api from "../Axios/Api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
// import { NotAuth } from "../component/auth/PrivateRoute";
import { AdminUrl } from "./Types";

export const usersContext = createContext({});
export const id = localStorage.getItem("token");

export const LogOutHandler = (router: any, setUser: any) => {
  router("/auth/login");
  console.log("LogOut");
  localStorage.removeItem("token");
  localStorage.removeItem("tokens");

  setTimeout(() => {
    setUser(null);
    window.location.reload();
  }, 1000);
};

export const notAuth = (router: any) => {
  // const location = useLocation();

  toast.error("You are required to Login First");
  setTimeout(() => {
    // <NotAuth location={location} />;
    router("/auth/login");
  }, 2000);
};

const UsersContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | object | any>(null);

  const [userRole, setUserRole] = useState("");
  const router = useNavigate();


  const [routerPath, setrouterPath] = useState<string | null>(
    localStorage.getItem("routerPath") || "/Dashboard"
  );

  const fetchUserApi = async () => {
    try {
      const res = await Api.get(`/users/verfiy/${id}`);
      const data = res.data;
      setUser(data.user);
      setUserRole(data.user.role);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserApi();

    if (id) {
      if (userRole === "admin") {
        return router(`${AdminUrl}`);
      }
      // return navigate(from, { replace: true });
      return router(`${routerPath}` || "/Dashboard");
    }

    // router(`${routerPath}`)
  }, [id, userRole]);

  return (
    <usersContext.Provider
      value={{
        user,
        userRole,
        setUser,
        routerPath,
        setrouterPath,
      }}
    >
      {children}
    </usersContext.Provider>
  );
};

export default UsersContextProvider;

export const UserAuth = () => {
  return useContext(usersContext);
};

export const Fetchtheme = async (theme: any) => {
  const res = await Api.put(`/users/theme/${id}`, theme);
  const user = res.data.user;
  try {
    return user;
  } catch (error) {
    console.log(error);
  }
  return user.theme;
};
