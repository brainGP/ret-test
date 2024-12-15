import { getCookie, getCookies, setCookie, deleteCookie } from "cookies-next";
import axios from "axios";

interface User {
  accessToken: string;
  createdAt?: string;
  email: string;
  isAdmin: boolean;
  username: string;
  _id: string;
}

interface Cookies {
  email?: string;
  username?: string;
  isAdmin?: string;
  _id?: string;
}

export const getUserData = () => {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    return null;
  }

  const cookies: Cookies = getCookies();
  const { email, username, isAdmin, _id } = cookies;

  const user: User = {
    accessToken,
    email: email || "",
    username: username || "",
    isAdmin: isAdmin === "true",
    _id: _id || "",
  };
  return user;
};

export const isUserLoggedIn = () => {
  const accessToken = getCookie("accessToken");
  const cookies: Cookies = getCookies();
  const { email, username, isAdmin, _id } = cookies;

  if (!email || !username || !isAdmin || !_id || !accessToken) {
    return false;
  }

  const user = getUserData();
  if (!user) {
    return false;
  }
  return user;
};

export const isAdmin = async (): Promise<boolean> => {
  try {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      return false;
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/admin`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const isAdminC = () => {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    return false;
  }
  const isAdmin = getCookie("isAdmin");
  return isAdmin === "true";
};

export const logoutUser = async () => {
  deleteCookie("accessToken");
  deleteCookie("email");
  deleteCookie("username");
  deleteCookie("isAdmin");
  deleteCookie("_id");
  deleteCookie("createdAt");
};

export const saveUserData = async (user: User) => {
  try {
    const duration = Number(process.env.NEXT_PUBLIC_AUTH_DURATION);
    setCookie("accessToken", user.accessToken, {
      maxAge: 60 * 60 * 24 * duration,
      path: "/",
    });
    setCookie("email", user.email, {
      maxAge: 60 * 60 * 24 * duration,
      path: "/",
    });
    setCookie("username", user.username, {
      maxAge: 60 * 60 * 24 * duration,
      path: "/",
    });
    setCookie("isAdmin", user.isAdmin.toString(), {
      maxAge: 60 * 60 * 24 * duration,
      path: "/",
    });
    setCookie("_id", user._id, {
      maxAge: 60 * 60 * 24 * duration,
      path: "/",
    });
    setCookie("createdAt", user.createdAt, {
      maxAge: 60 * 60 * 24 * duration,
      path: "/",
    });
    return true;
  } catch {
    return false;
  }
};
