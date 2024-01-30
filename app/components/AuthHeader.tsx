"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../lib/store";
import {
  login,
  register,
  logoutAccount,
  verifyCookie,
} from "@/services/authService";
import { logout, setAuth } from "@/lib/features/auth/authSlice";

export default function AuthHeader() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showSignup, setShowSignup] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    try {
      verifyCookie().then((res) => {
        if (res?.success) {
          dispatch(setAuth({ isLogin: true, email: "" }));
          console.log(auth, " auth status");
        } else {
          // setAuth({ isLogin: false, email: "" });
        }
      });
    } catch (e) {}
  }, []);

  function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleLogin = async () => {
    setIsLoading(true);
    if (isValidEmail(email) && password) {
      const res = await login(email, password);
      console.log(res);
      if (res.success) {
        console.log(res.success);
        dispatch(setAuth({ isLogin: true, email: email }));
        console.log(auth, " auth status");
        const modal = document.getElementById(
          "auth_modal_1"
        ) as HTMLDialogElement | null;
        if (modal) {
          modal.close();
          setPassword("");
          setEmail("");
        } else {
          console.error("Modal element not found");
        }
      } else {
        setStatus(res.message || "Log in failed.");
      }
    } else {
      setStatus(
        "Please make sure the password and email are properly inserted"
      );
    }
    setIsLoading(false);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    if (isValidEmail(email) && password) {
      const result = await register(email, password);
      if (result.success) {
        setStatus("Registration successful! Please log in now.");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
      } else {
        setStatus(result.message || "Registration failed.");
      }
    } else {
      setStatus(
        "Please make sure the password and email are properly inserted"
      );
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutAccount();
      if (response && response.success) {
        if (typeof window !== "undefined") {
          dispatch(logout());
          window.location.reload();
        }
      } else {
        setLogoutError(response?.message || "Logout failed.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      setLogoutError("An error occurred during logout.");
    }
  };

  return (
    <div className={"flex"}>
      {auth.isLogin === true ? (
        <div className={"flex row-auto"}>
          <div className={"m-3"}>
            <h1>Welcome back! You can save the recipe to your account!</h1>
          </div>
          <div>
            <button
              className={"btn m-1"}
              onClick={() => {
                handleLogout();
              }}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="btn m-3"
            onClick={() => {
              setShowSignup(false);
              const modal = document.getElementById(
                "auth_modal_1"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
              } else {
                console.error("Modal element not found");
              }
            }}
          >
            Log in
          </button>
          <button
            className="btn m-3"
            onClick={() => {
              setShowSignup(true);

              const modal = document.getElementById(
                "auth_modal_1"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
              } else {
                console.error("Modal element not found");
              }
            }}
          >
            Sign up
          </button>
        </div>
      )}

      <dialog id="auth_modal_1" className="modal">
        <div className="modal-box w-full">
          <h3 className="font-bold text-lg">
            {showSignup ? "Sign up" : "Log in"}
          </h3>
          <h4>{status}</h4>
          <div className="w-full">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Type here"
                className="input input-bordered w-full m-1"
              />
            </label>
            <label className="form-control w-full m-1">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              {!showSignup && (
                <div className="label">
                  {/* <span className="label-text-alt">Forgot password</span> */}
                </div>
              )}
            </label>
            {showSignup && (
              <label className="form-control w-full m-1">
                <div className="label">
                  <span className="label-text">Confirm Password</span>
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>
            )}
            <label>
              <div className="label"></div>
              {isLoading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                <button
                  className={"btn m-1"}
                  onClick={() => {
                    if (showSignup) {
                      handleRegister();
                    } else {
                      handleLogin();
                    }
                  }}
                >
                  {showSignup ? "Sign up" : "Log in"}
                </button>
              )}
              <div className="label"></div>
            </label>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
