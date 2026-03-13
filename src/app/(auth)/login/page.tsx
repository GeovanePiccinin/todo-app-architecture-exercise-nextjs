"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/todos",
    });
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2"
          name="email"
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2"
          name="password"
        />

        <button className="bg-black text-white p-2" type="submit">
          Login
        </button>
      </form>
      <div className="bg-gray-400 mt-4 p-2 flex justify-center">
        New user?{" "}
        <Link className="no-underline hover:underline" href="/register">
          {" "}
          Create an account.
        </Link>
      </div>
    </div>
  );
}
