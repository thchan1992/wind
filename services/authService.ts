"use client";

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}
const VERIFY_COOKIES_API = "https://windyrecipe.com/users/verifySession";
const LOGIN_API = "https://windyrecipe.com/users/login";
const LOGOUT_API = "https://windyrecipe.com/users/logout";
const REGISTER_API = "https://windyrecipe.com/users";
const DEV_API = "http://localhost:3001/";
const DEV_REGISTER_API = "http://localhost:3001/users";
const DEV_LOGIN_API = "http://localhost:3001/users/login";

export const verifyCookie = async () => {
  try {
    const response = await fetch(VERIFY_COOKIES_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          message: "Unauthorised: Session expired.",
        };
      }

      const errorText = response.statusText || (await response.text());
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    console.log(response.status);

    return {
      success: true,
    };
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const data = { email, password };
    const response = await fetch(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          message: "Unauthorised: Incorrect email or password.",
        };
      }

      const errorText = response.statusText || (await response.text());
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    // the status is in the range 200–299
    return {
      success: true,
    };
  } catch (e) {
    console.error("Login error:", e);
    return { success: false, message: "Log in error" };
  }
};

export const register = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const data = { email, password };
    const response = await fetch(REGISTER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      return { success: true };
    } else if (response.status === 409) {
      return { success: false, message: "User already exists." };
    } else {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
  } catch (e) {
    console.error(e);
    return { success: false, message: "Registration error" };
  }
};

export const logoutAccount = async () => {
  try {
    const response = await fetch(LOGOUT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};
