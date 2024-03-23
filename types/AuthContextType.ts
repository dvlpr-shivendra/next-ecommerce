type AuthContextType = {
  data: AuthData | null;
  login: (data: AuthData) => void;
};
