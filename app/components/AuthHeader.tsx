"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../lib/store";
import { login, register } from "@/services/authService";
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

  useEffect(() => {
    try {
    } catch (e) {}
  });

  function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleLogin = async () => {
    setIsLoading(true);
    if (isValidEmail(email) && password) {
      const res = await login(email, password);
      if (res.success) {
        console.log("log in ok");
        dispatch(setAuth({ isLogin: true, email: email }));
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
    dispatch(logout());
  };

  return (
    <div className={"flex"}>
      {auth.isLogin ? (
        <div>
          welcome back
          <div>
            <label>
              <div className="label"></div>
              <button
                className={"btn m-1"}
                onClick={() => {
                  handleLogout();
                }}
              >
                Log out
              </button>
              <div className="label"></div>
            </label>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="btn"
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
            className="btn"
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
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              {!showSignup && (
                <div className="label">
                  <span className="label-text-alt">Forgot password</span>
                </div>
              )}
            </label>
            {showSignup && (
              <label className="form-control w-full m-1">
                <div className="label">
                  <span className="label-text">Confirm Password</span>
                </div>
                <input
                  type="text"
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
