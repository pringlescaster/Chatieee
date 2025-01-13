"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import chatIcon from "../../public/chatIcon.svg";
import chatsBlackIcon from "../../public/chatsBlackIcon.svg";
import contactBlackIcon from "../../public/contactBlackIcon.svg";
import groupBlackIcon from "../../public/groupBlackIcon.svg";
import settingsBlackIcon from "../../public/settingsBlackIcon.svg";
import chatieeIcon from "../../public/chatiee.svg";
import groups from "../../public/groups.svg";
import contacts from "../../public/contacts.svg";
import settings from "../../public/settings.svg";
import logout from "../../public/logout.svg";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

function Sidebar() {
    const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  const getIcon = (route, activeIcon, defaultIcon) => {
    return pathname === route ? activeIcon : defaultIcon;
  };

  // Fetch user login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Generate initials
  const getInitials = (name) => {
    if (!name) return "U"; // Default to 'U' for User
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0].toUpperCase()).join("");
    return initials.slice(0, 2); // Limit to 2 characters
  };

  // Fallback profile image as SVG
  const renderInitialsAvatar = (initials) => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <rect width="40" height="40" fill="#555" rx="20"/>
        <text x="50%" y="50%" fill="white" font-size="16" font-family="Arial, Helvetica, sans-serif" 
          dy=".3em" text-anchor="middle">${initials}</text>
      </svg>
    `)}`;
  };

  const handlelogout = async () => {
    try {
        await signOut(auth);
        router.push('/signin')
    } catch (error) {
        console.error("error logging out: ", error);
    }
  }

  return (
    <div className="bg-[#141414] px-3 py-3 border-l-[0.8px] border-white/10 w-[20%] h-screen flex flex-col justify-between">
      <Image className="w-[90px]" src={chatieeIcon} alt="chatIcon" />

      <div className="flex flex-col justify-center px-2 gap-y-4 mb-24 ">
        <Link href="/chats">
          <div
            className={`flex items-center gap-x-[17px] px-3 py-2 rounded-md ${
              pathname === "/chats" ? "bg-gray-100 text-black" : "text-white/80"
            }`}
          >
            <Image
              src={getIcon("/chats", chatsBlackIcon, chatIcon)}
              alt="chatIcon"
              className="w-5 h-5"
            />
            <h1 className="text-lg font-normal">Chats</h1>
          </div>
        </Link>

        <Link href="/groups">
          <div
            className={`flex items-center gap-x-[17px] px-3 py-2 rounded-md ${
              pathname === "/groups" ? "bg-gray-100 text-black" : "text-white/80"
            }`}
          >
            <Image
              src={getIcon("/groups", groupBlackIcon, groups)}
              alt="groups"
              className="w-5 h-5"
            />
            <h1 className="text-lg font-normal">Groups</h1>
          </div>
        </Link>

        <Link href="/contacts">
          <div
            className={`flex items-center gap-x-[17px] px-3 py-2 rounded-md ${
              pathname === "/contacts"
                ? "bg-gray-100 text-black"
                : "text-white/80"
            }`}
          >
            <Image
              src={getIcon("/contacts", contactBlackIcon, contacts)}
              alt="contactIcon"
              className="w-5 h-5"
            />
            <h1 className="text-lg font-normal">Contacts</h1>
          </div>
        </Link>

        <Link href="/settings">
          <div
            className={`flex items-center gap-x-[17px] px-3 py-2 rounded-md ${
              pathname === "/settings"
                ? "bg-gray-100 text-black"
                : "text-white/80"
            }`}
          >
            <Image
              src={getIcon("/settings", settingsBlackIcon, settings)}
              alt="settingsIcon"
              className="w-5 h-5"
            />
            <h1 className="text-lg font-normal">Settings</h1>
          </div>
        </Link>
      </div>

      <div className="flex flex-col justify-center px-2 gap-y-4 mb-16">
        <Link href="/profile">
          <div className="flex px-2 items-center gap-x-[14px]">
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt="User Profile"
                className="w-8 h-8 rounded-full"
                width={40}
                height={40}
              />
            ) : (
              <Image
                src={renderInitialsAvatar(getInitials(user?.name))}
                alt="Initials Avatar"
                className="w-8 h-8 rounded-full"
                width={40}
                height={40}
              />
            )}
            <h1 className="text-lg font-normal text-white/80">
              {user?.name || "User"}
            </h1>
          </div>
        </Link>

        
          <div onClick={handlelogout} className="flex px-4 items-center gap-x-[17px]">
            <Image src={logout} alt="logoutIcon" />
            <h1 className="text-lg font-normal text-white">Log Out</h1>
          </div>
        
      </div>
    </div>
  );
}

export default Sidebar;
