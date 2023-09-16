import { useLocalStorageState } from 'ahooks';
import React, { FC, PropsWithChildren, createContext, useCallback, useState } from 'react';

export class User {
  public name = '';
  public userid = '';

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
const initUser = new User();

const AuthContext = createContext<{ user: User, updateUser: (user: User) => void; }>({ user: initUser, updateUser: () => { } });
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [_, updateLocaUser] = useLocalStorageState<User>('user');
  const [user, setUser] = useState<User>(_ ?? initUser);

  const updateUser = useCallback((user: User) => {
    updateLocaUser(user);
    setUser((oldUser) => ({ ...oldUser, ...user }));
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  return React.useContext(AuthContext);
}
