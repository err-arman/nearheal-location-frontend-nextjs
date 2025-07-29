import { localStorageKey } from "./utils";
import axios from "axios";
import Cookies from "js-cookie";


export const authServerInfo = {
    url: process.env.NEXT_PUBLIC_SSO_SERVER_URL as string,
    clientId: process.env.NEXT_PUBLIC_SSO_CLIENT_ID as string,
    redirectUrl: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL as string,
}

export const login = async (token: string) => {
    await Cookies.set(localStorageKey.token, token); //no-expired
    const userInfo = await fetchSSOUserProfile(token);
    return userInfo;
};

export const logout = () => {
    Cookies.remove(localStorageKey.token);
    localStorage.removeItem(localStorageKey.userInfo);
};

export const getAuthToken = () => {
    return Cookies.get(localStorageKey.token);
};

export const removeAuthToken = () => {
    Cookies.remove(localStorageKey.token);
    localStorage.removeItem(localStorageKey.userInfo);
};

export const getLoggedUserInfo = () => {
    const user = localStorage.getItem(localStorageKey.userInfo);
    if (user)
        return JSON.parse(user);
    return null;
}

export const fetchSSOUserProfile = async (token: string) => {
    try {
        const response = await axios.get(`${authServerInfo.url}/api/user/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.data;
    } catch (error) {
        return null;
    }
}