import Link from "next/link";
import { useRouter } from "next/router";
import CartBar from "./Cart/CartBar";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const session = useSession();
  return (
    <header className="max-w-5xl px-4 mx-auto w-full flex items-center justify-between bg-gray-700">
      <nav className="py-2 text-white">
        <Link href="/">
          <a className={router.pathname == "/" ? "bg-blue-600" : ""}>Główna</a>
        </Link>
        <Link href="/about">
          <a className={router.pathname == "/about" ? "bg-blue-600" : ""}>
            About
          </a>
        </Link>
        <Link href="/products">
          <a className={router.pathname == "/products" ? "bg-blue-600" : ""}>
            Produkty
          </a>
        </Link>
      </nav>
      <div className="text-white">
        {session.status === "authenticated" ? (
          <button onClick={() => signOut()}>Wyloguj</button>
        ) : (
          <button onClick={() => signIn()}>Zaloguj się</button>
        )}
      </div>
      <CartBar />
    </header>
  );
};

export default Header;
