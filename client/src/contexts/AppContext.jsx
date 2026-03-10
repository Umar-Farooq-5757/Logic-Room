import { createContext, useContext, useEffect, useState } from "react";
import api from '../api/axios.js'
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [problems, setProblems] = useState([])
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false,
  );
  useEffect(() => {
    const getProblems = async () => {
      try {
        const response = await api.get('/getallproblems');
        setProblems(response.data.problems)
      } catch (err) {
        console.error(err)
      }
    }
    getProblems()
  }, [])
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      try {
        const response = await api.get('/me')
        if (response.data.success) {
          const userData = await response.data.user
          setUser(userData)
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error("Verification failed", err);
      }
    }
    verifyToken()
  }, [user])

  const value = { isDark, setIsDark, user, problems, setProblems };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
