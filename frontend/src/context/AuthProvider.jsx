import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [userData, setUserData] = useState(null);

  const fetchProtectedData = async () => {
    try {
      setToken(sessionStorage.getItem("token"));
      const response = await axios.get("http://localhost:8000/protected", {
        headers: { authorizarion: `Bearer ${token}` },
      });
      setUserData(response.data);
      console.log(userData);
      sessionStorage.setItem("userData", userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, [token]);

  const sharedData = {
    userData: userData,
    fetchProtectedData: fetchProtectedData,
  };
  return (
    <>
      <AuthContext.Provider value={sharedData}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
