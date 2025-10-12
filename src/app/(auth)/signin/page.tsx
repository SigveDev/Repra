"use client";

import FullPageLoader from "@/components/fullpageLoader";
import Input from "@/components/input";
import Label from "@/components/label";
import LabelInputContainer from "@/components/labelInputContainer";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function SignInPage() {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError(() => "Please fill out all fields");
      return;
    }

    setIsLoading(() => true);
    setError(() => "");

    const response = await login(email.toString(), password.toString());
    if (response.error) {
      setError(
        () => response.error!.message || "An error occurred, please try again."
      );
    }

    setIsLoading(() => false);
  };

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center gap-6">
      <Link href="/" className="text-2xl font-bold">
        Sign In to{" "}
        <span className="text-primary font-bold text-3xl">Repra!</span>
      </Link>
      <form className="flex flex-col gap-4 w-full px-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <div className="flex flex-col w-full h-fit gap-4 mt-4">
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="w-full h-fit flex flex-col items-center justify-center mt-2">
          <button
            type="submit"
            className="w-2/3 h-fit px-4 py-2 text-center bg-primary text-fg-primary rounded-lg"
          >
            Sign In
          </button>
          <Link
            href="/signup"
            className="w-full h-fit px-4 py-2 text-center text-fg-secondary rounded-lg"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
