"use client";

export const login = async (email: string, password: string) => {
  try {
    const data = { email, password };
    const response = await fetch("https://windyrecipe.com/users/login", {
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
    console.log({ token: responseData.token, email: email }, " data");
    return { token: responseData.token, email: email };
  } catch (e) {
    console.error("Login error:", e);
    throw e;
  }
};
