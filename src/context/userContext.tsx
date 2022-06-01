import React, { useContext, useEffect, useState } from "react";
import { useAuth0, User } from "@auth0/auth0-react";

const UserContext = React.createContext({});
type Props = {
  children: JSX.Element | JSX.Element[];
};
export const UserProvider = ({ children }: Props) => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const [myUser, setMyUser] = useState<undefined | User>(undefined);

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
