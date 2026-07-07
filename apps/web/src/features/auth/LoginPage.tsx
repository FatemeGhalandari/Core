import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { useAuth, type AuthUser } from "./auth";

type LoginResponse = {
  data: {
    user: AuthUser;
  };
};

async function loginUser(data: { email: string; password: string }) {
  const response = await api.post<LoginResponse>("/api/auth/login", {
    email: data.email.trim().toLowerCase(),
    password: data.password,
  });

  return response.data.data.user;
}

function getLoginErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      return "Could not sign in. Check the email and password.";
    }

    if (error.response?.status === 400) {
      return "Enter a valid email address and password.";
    }

    if (error.response) {
      return "Could not sign in because the server returned an error. Try again in a moment.";
    }

    return "Could not reach the API. Make sure the backend is running on http://localhost:4000.";
  }

  return "Could not sign in. Try again in a moment.";
}

export function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("owner@maplecare.test");
  const [password, setPassword] = useState("Password123!");

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (loggedInUser) => {
      login(loggedInUser);
      navigate("/");
    },
  });

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  }

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <div>
          <p className="eyebrow">Core Login</p>
          <h1>Sign in</h1>
          <p className="page-description">
            Use a demo user to personalize the workspace.
          </p>
        </div>

        <label>
          Email
          <input
            autoComplete="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Password
          <input
            autoComplete="current-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {loginMutation.isError && (
          <div className="form-error">
            {getLoginErrorMessage(loginMutation.error)}
          </div>
        )}

        <button
          className="primary-button"
          disabled={loginMutation.isPending || !email || !password}
          type="submit"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
