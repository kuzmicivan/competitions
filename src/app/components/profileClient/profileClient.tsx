import { useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const userInfoRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
      setIsUserInfoVisible(false);
    }
  };

  function toggleUserInfoVisible() {
    setIsUserInfoVisible((prev) => !prev);
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="text-gray-300 flex justify-end items-center py-2 px-4">
      {user ? (
        <>
          <div className="flex gap-2 relative" ref={userInfoRef}>
            <img
              src={user.picture}
              alt={user.name}
              className="w-8 h-8 rounded-full hover:border hover:border-white"
              onClick={() => toggleUserInfoVisible()}
            />
            {isUserInfoVisible && (
              <div className="absolute top-10 right-1 bg-gray-800 py-2 px-4 rounded flex flex-col justify-center items-center gap-1">
                <p className="text-lg font-medium">{user.name}</p>
                <p className="text-sm mb-2">{user.email}</p>
                <Link href="/api/auth/logout">
                  <div className="bg-blue-800 rounded-full p-2 hover:bg-blue-700 hover:text-white">
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <Link href="/api/auth/login">
          <div className="bg-black rounded-full p-2 hover:bg-white hover:text-blue-800">
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </div>
        </Link>
      )}
    </div>
  );
}
