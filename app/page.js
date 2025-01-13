"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import googleIcon from "../public/googleIcon.svg";
import Stroke from "../public/Line 5.svg";
import emailIcon from "../public/emailIcon.svg";
import passwordIconn from "../public/passwordIconn.svg";
import chatiee from "../public/chatiee.svg";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  
} from "firebase/auth";
import { auth } from "./lib/firebase";
// import { doc, setDoc } from "firebase/firestore";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

   

    try {
 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      setSuccess("Account created successfully");

      router.push('/chats')

    } catch (error) {
      setError("Incorrect credentials, please enter valid email and password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in with Google:", result.user);
      setSuccess("Logged in with Google successfully")

      router.push('/chats')
     
    } catch (error) {
      setError("Incorrect credentials, please enter valid email and password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#141414] w-screen flex justify-center flex-col gap-y-8 px-4  md:pt-4 md:py-8  h-screen ">
      <Image className=" size-24" src={chatiee} alt="Chatiee Logo" />

      <form
        onSubmit={handleSignIn}
        className="lg:bg-[#212121] md:mx-auto gap-y-[24px] md:gap-y-[16px] border-[1px] bg-none border-none md:border-white/15 md:rounded-xl flex flex-col md:w-[90%] lg:w-[35%] h-screen py-4 md:px-8 px-3 justify-start"
      >
        {error && <p className=" text-red-500">{error}</p>}
        {success && <p className="mb-4 text-green-500">{success}</p>}
        <div className="flex flex-col text-left gap-y-[2px]">
          <h1 className="text-lg font-semibold">Log in to your Account</h1>
          <p className="text-sm font-light text-white/80">
          Welcome back! Select method to log in
          </p>
        </div>

        <div
          onClick={handleGoogleSignin}
          disabled={loading}
          className="flex cursor-pointer bg-white/5 gap-x-[12px] justify-center border-[1px] border-white/15 rounded-lg py-2"
        >
          <Image src={googleIcon} className="w-[20px]" alt="googleIcon" />
          <h1 className="text-white text-center font-medium">Continue with Google</h1>
        </div>

        <div className="flex gap-x-[8px] justify-center items-center">
          <Image src={Stroke} alt="Stroke Divider" />
          <h1 className="text-sm text-white/80 font-medium">or continue with email</h1>
          <Image src={Stroke} alt="Stroke Divider" />
        </div>

        <div className="flex flex-col gap-y-[16px]">
          <div className="flex gap-x-[8px] bg-[#2B2B2B]/30 border-white/15 border-[1px] px-[14px] py-[10px] rounded-[10px] w-full">
            <Image src={emailIcon} alt="Email Icon" />
            <input
              className="bg-transparent outline-none placeholder:text-[14px] text-white w-full"
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-y-[8px]">
          <div className="flex gap-x-[8px] bg-[#2B2B2B]/30 border-white/15 border-[1px] px-[14px] py-[10px] rounded-[10px] w-full">
            <Image src={passwordIconn} alt="Password Icon" />
            <input
              className="bg-transparent outline-none placeholder:text-[14px] text-white w-full"
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="text-right font-semibold text-sm bg-ray-100">Forgot Password</button>
          </div>
         
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-100 mt-4 text-[#151515] py-[10px] rounded-[10px] font-semibold"
        >
          {loading ? "Logging In..." : "Log In"}
        </button>

        <div className="text-sm flex gap-x-[4px] items-center justify-center text-center">
          <h1 className="text-white/80">Don't have an account?</h1>
          <Link href="/sign-in">
            <button className="text-gray-100">Sign Up</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Page;
