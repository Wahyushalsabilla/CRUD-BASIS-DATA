"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { LabelInputContainer } from "../misc/label-input-container";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupForm() {
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
      const response = await axios.post("/api/user", null, {
        params: {
          email: data.email,
          fullName: data.fullName,
          password: data.password,
          username: data.username,
        },
      });

      const responseSignin = await axios.post("/api/login", null, {
        params: {
          username: data.username,
          password: data.password,
        },
      });

      if (responseSignin) {
        router.push("/");
        router.refresh();
      }
      console.log("Registration successful:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Failed to register");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto border border-gray-300 shadow-lg p-6 rounded-lg bg-gray-50">
      <h2 className="font-bold text-2xl text-neutral-800 text-center mb-4">
        Welcome to{" "}
        <span className="font-extrabold text-neutral-900">
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
          <Label htmlFor="firstname" className="text-neutral-700">
            Full name
          </Label>
          <Input
            id="firstname"
            name="fullName"
            placeholder="Enter your name, ex : Esther"
            type="text"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-neutral-600"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="lastname" className="text-neutral-700">
            Username
          </Label>
          <Input
            id="lastname"
            name="username"
            placeholder="Enter your username, ex : Estherians"
            type="text"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-neutral-600"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="email" className="text-neutral-700">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="Esther@esthershop.com"
            type="email"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-neutral-600"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password" className="text-neutral-700">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="Esthrinas"
            type="password"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-neutral-600"
          />
        </LabelInputContainer>

        <button
          className={`w-full py-2 text-white rounded-md bg-neutral-800 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-900"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>

        <p className="text-sm text-center text-neutral-600">
          Already have an account?{" "}
          <Link href={"/signin"} className="font-bold text-neutral-800 underline">
            Sign In
          </Link>
        </p>
      </form>

      <div className="my-6 border-t border-gray-300"></div>

      <div className="flex justify-center">
        <button
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-white text-black border border-gray-300 hover:bg-gray-100"
          type="button"
          onClick={() => {
            console.log("Google signup clicked");
          }}
        >
          <IconBrandGoogle className="h-5 w-5" />
          <span>Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
