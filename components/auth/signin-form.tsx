"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { BottomGradient } from "../misc/bottom-gradient";
import { LabelInputContainer } from "../misc/label-input-container";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("/api/login", null, {
        params: {
          username: data.username,
          password: data.password,
        },
      });
      if (response) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setError("Username not found");
        } else if (error.response?.status === 401) {
          setError("Incorrect password");
        } else {
          setError(error.response?.data?.error || "Login failed");
        }
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white text-black shadow-lg border border-neutral-300 rounded-lg">
      <h2 className="text-3xl font-semibold text-neutral-800 text-center mb-6">
        Welcome to{" "}
        <span className="font-extrabold text-neutral-900 underline decoration-black">
          EstherShop
        </span>
      </h2>
  
      {error && (
        <div
          className="bg-red-500 text-white text-sm px-4 py-3 rounded-md mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
  
      <form className="space-y-6" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="username" className="text-neutral-700 font-medium">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            placeholder="yourusername"
            type="text"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-neutral-400 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password" className="text-neutral-700 font-medium">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-neutral-400 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:outline-none"
          />
        </LabelInputContainer>
        <button
          className={`w-full px-4 py-2 rounded-lg font-medium text-white bg-neutral-900 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        <p className="text-sm text-center text-neutral-600">
          Don't have an account?{" "}
          <Link href={"/signup"} className="font-bold text-neutral-900 underline">
            Sign up
          </Link>
        </p>
      </form>
  
      <div className="my-6 border-t border-neutral-300"></div>
  
      <div className="flex justify-center">
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-neutral-400 bg-white text-black w-full hover:bg-neutral-100"
          type="button"
          onClick={() => {
            console.log("Google sign in clicked");
          }}
        >
          <IconBrandGoogle className="h-5 w-5" />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
  
}
