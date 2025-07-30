import apis from "@/api/apis";
import axiosInstance from "@/api/axiosInstance";
import {
  authServerInfo,
  getAuthToken,
  getLoggedUserInfo,
  login,
  logout,
} from "@/lib/auth";
import { localStorageKey } from "@/utils/constant";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  authProvider: string | null;
  profileImageUrl: string | null;
  phoneNumber: string | null;
  avatarUrl: string | null;
};

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAuthToken());
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    if (isLoggedIn) return;
    window.location.href = `${authServerInfo.url}/login?token=${authServerInfo.clientId}&redirect_url=${authServerInfo.redirectUrl}`;
  };

  const handleRegister = async () => {
    if (isLoggedIn) return;
    window.location.href = `${authServerInfo.url}/register?token=${authServerInfo.clientId}&redirect_url=${authServerInfo.redirectUrl}`;
  };

  const handleLoginToken = async (token: string) => {
    try {
      const user = await login(token);
      await syncUser(user);
      window.location.href = "/";
    } catch (err) {
      throw err;
    }
  };

  const saveUseInfo = (user: User) => {
    localStorage.setItem(localStorageKey.userInfo, JSON.stringify(user));
    setIsLoggedIn(true);
    setUser(user);
  };

  const syncUser = async (userInfo: User) => {
    try {
      try {
        const userBySSOId = await axiosInstance.get(
          apis.user.getBySSOId(userInfo.id)
        );
        if (userBySSOId?.data) {
          saveUseInfo({
            // ...userInfo,
            ...userBySSOId?.data,
          });
          return;
        }
      } catch (error: any) {
        // console.log("Error get by sso", error);
        if (error?.response?.status !== 404) {
          throw Error(error);
        }
      }
      const name = userInfo?.name?.split(" ");
      const user = await axiosInstance.post("users", {
        firstName: name.splice(0, name.length - 1).join(" "),
        lastName: name[name.length - 1],
        email: userInfo?.email,
        ssoId: userInfo.id,
        avatarUrl: userInfo?.profileImageUrl,
        phoneNumber: userInfo?.phoneNumber,
      });
      if (user?.data) {
        saveUseInfo({
          // ...userInfo,
          ...user?.data,
        });
      }
    } catch (error: any) {
      console.log("Login sync error: ", error?.message);
      logout();
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    // navigate("/", {
    //   replace: true,
    // });
  };

  useEffect(() => {
    if (isLoggedIn && !user) {
      const user = getLoggedUserInfo();
      if (user) {
        setUser(user);
      }
    }
  }, [isLoggedIn]);

  return {
    isLoggedIn,
    handleLogin,
    handleRegister,
    handleLogout,
    handleLoginToken,
    user,
    saveUseInfo,
  };
};
