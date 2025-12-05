const TOKEN_KEY = "craftflow_auth_token";

export function useAuth() {
  // --- MOCK IMPLEMENTATION ---
  // Later this will call my backend and store a real JWT.

  const login = async (username: string, password: string): Promise<boolean> => {
    if (!username || !password) {
      return false;
    }

    const fakeToken = "FAKE_JWT_TOKEN";
    localStorage.setItem(TOKEN_KEY, fakeToken);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  const isAuthenticated = !!localStorage.getItem(TOKEN_KEY);

  return {
    login,
    logout,
    isAuthenticated,
  };
}
