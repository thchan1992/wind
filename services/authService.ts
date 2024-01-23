"use client";

export const login = async (email: string, password: string) => {
  try {
    const data = { email, password };
    const response = await fetch("http://104.131.68.243:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return { token: responseData.token, email: email };
  } catch (e) {
    console.error("Login error:", e);
    throw e;
  }
};
