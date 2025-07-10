"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const session = useSession();

  // console.log("ini isi session user", session.data?.user);
  const logout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="bg-gray-400">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <p className="text-2xl font-bold">BlogHub</p>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">Home</Link>
          {!session.data?.user ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <p className="capitalize">{session.data.user.name}</p>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

//shift + alt + f untuk sorting tailwind
