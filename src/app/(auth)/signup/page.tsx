"use client";

import Input from "@/components/input";
import Label from "@/components/label";
import LabelInputContainer from "@/components/labelInputContainer";
import FullPageLoader from "@/components/fullpageLoader";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

export default function SignUpPage() {
  const { login, createAccount } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Simple password strength calculation
    const strength = calculatePasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [formData.password]);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength < 50) return "bg-red-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError(() => "Passwords do not match");
      return;
    }

    if (passwordStrength < 75) {
      setError(() => "Password is too weak");
      return;
    }

    if (!firstName || !lastName || !email || !password) {
      setError(() => "Please fill out all fields");
      return;
    }

    setIsLoading(() => true);
    setError(() => "");

    const response = await createAccount(
      `${firstName} ${lastName}`,
      email.toString(),
      password.toString()
    );

    if (response.error) {
      setError(() => response.error!.message);
    } else {
      const loginResponse = await login(email.toString(), password.toString());
      if (loginResponse.error) {
        setError(() => loginResponse.error!.message);
      }
    }

    setIsLoading(() => false);
  };

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center gap-6">
      <Link href="/" className="text-2xl font-bold">
        Sign Up to{" "}
        <span className="text-primary font-bold text-3xl">Repra!</span>
      </Link>
      <form
        className="flex flex-col gap-4  w-full px-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-fit flex gap-2">
          <LabelInputContainer>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
        </div>
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
          <LabelInputContainer>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <div className="w-full h-fit">
            <div className="h-1 w-full bg-bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${getPasswordStrengthColor(
                  passwordStrength
                )}`}
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </div>
            <p className="text-sm text-fg-secondary">
              Password strength: {passwordStrength}%
            </p>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="w-full h-fit flex flex-col items-center justify-center mt-2">
          <button
            type="submit"
            className="w-2/3 h-fit px-4 py-2 text-center bg-primary text-fg-primary rounded-lg"
          >
            Sign Up
          </button>
          <Link
            href="/signin"
            className="w-full h-fit px-4 py-2 text-center text-fg-secondary rounded-lg"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
