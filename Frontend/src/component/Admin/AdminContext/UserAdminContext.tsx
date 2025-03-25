import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Api from "../../../Axios/Api";

export const CreateUUserAdminContext = createContext({});
const UserAdminContext = ({ children }: { children: ReactNode }) => {
  const [AllUsers, setAllUsers] = useState<null | []>([]);

  const FetchAllUsers = async () => {
    try {
      const res = await Api.get(`/users`);
      const data = res.data;
      setAllUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchAllUsers();
  }, []);

  return (
    <CreateUUserAdminContext.Provider value={{ AllUsers, setAllUsers }}>
      {children}
    </CreateUUserAdminContext.Provider>
  );
};

export default UserAdminContext;

export const GetTotalUsers = () => {
  return useContext(CreateUUserAdminContext);
};
