// api/login.ts
"use client"


import { NEXT_PUBLIC_API_URL } from "@/config";

// Interface for the login response
export interface LoginResponse {
  access_token: string;
}

// Function to handle user login
export const fetchLogin = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const endpoint = new URL("/api/login/token", NEXT_PUBLIC_API_URL).toString();
  console.log(`API: Attempting login at ${endpoint} with username: ${username}`);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API: Login failed:", errorData);
    throw new Error(errorData.message || "Login failed. Check your credentials.");
  }

  const data = await response.json();
  console.log("API: Login successful, received data:", data);
  return data;
};

// Function to fetch current user details
export const fetchCurrentUser = async (token: string): Promise<any> => {
  const endpoint = new URL("/api/login/users/me", NEXT_PUBLIC_API_URL).toString();
  console.log(`API: Fetching current user at ${endpoint} with token: ${token}`);

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API: Fetch current user failed:", errorData);
    throw new Error(errorData.message || "Failed to fetch user details.");
  }

  const user = await response.json();
  console.log("API: Current user fetched:", user);
  return user;
};

// Function to check if the user is an admin
export const fetchAdmin = async (token: string): Promise<{ isAdmin: boolean }> => {
  const endpoint = new URL("/api/login/user/isadmin", NEXT_PUBLIC_API_URL).toString();
  console.log(`API: Checking admin status at ${endpoint} with token: ${token}`);

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API: Fetch admin status failed:", errorData);
    throw new Error(errorData.message || "Failed to fetch admin status.");
  }

  const adminStatusRaw = await response.json();
  console.log("API: Admin status raw:", adminStatusRaw);

  // Transform the raw boolean into an object
  const adminStatus = { isAdmin: adminStatusRaw };
  console.log("API: Admin status wrapped:", adminStatus);

  return adminStatus;
};
