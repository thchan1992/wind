"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../lib/store";
import { login } from "@/services/authService";
import { logout, setAuth } from "@/lib/features/auth/authSlice";

export default function AuthHeader() {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      if (res && "token" in res && "email" in res) {
        dispatch(setAuth(res));
        setEmail("");
        setPassword("");
      } else {
        console.error("Login failed ");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <div className={"flex"}>
      {userData.token ? (
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
          <label className="form-control w-full max-w-xs">
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
              className="input input-bordered w-full max-w-xs m-1"
            />
            <div className="label">
              <span className="label-text-alt">Forgot password</span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs m-1">
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
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text-alt">Forgot password</span>
            </div>
          </label>
          <label>
            <div className="label"></div>
            <button
              className={"btn m-1"}
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
            <div className="label"></div>
          </label>
        </div>
      )}
      {/* <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs m-1"
        />
        <div className="label">
          <span className="label-text-alt">Forgot password</span>
        </div>
      </label>
      <label className="form-control w-full max-w-xs m-1">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <div className="label">
          <span className="label-text-alt">Forgot password</span>
        </div>
      </label>
      <label>
        <div className="label"></div>
        <button className={"btn m-1"} onClick={() => {}}>
          Login
        </button>
        <div className="label"></div>
      </label> */}
    </div>
  );
}
