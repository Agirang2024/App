import { useEffect, useState } from "react";
import client from "../lib/api/client";
import { getToken, removeToken } from "../lib/storage/asyncStorage";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const token = await getToken();
      if (token) {
        try {
          const res = await client.get("/auth/profile");
          if (res.status === 401) {
            setUser(null);
            return;
          }
          setUser(res.data);
          return res.data;
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    checkUser();
  }, []);

  const Logout = async () => {
    await removeToken();
    setUser(null);
  };

  return { user, isLoading, Logout };
};
