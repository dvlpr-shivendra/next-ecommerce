import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, setData] = useState<AuthData | null>(null);

  useEffect(() => {
    setData({
      token: localStorage.token,
      user: localStorage.user ? JSON.parse(localStorage.user) : undefined,
    });
  }, []);

  function login(data: AuthData) {
    localStorage.setItem("token", data.token as string);
    localStorage.setItem("user", JSON.stringify(data.user));
    setData(data);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setData(null);
  }

  return (
    <AuthContext.Provider value={{ data, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
