import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <header className="max-w-5xl mx-auto w-full ">
      <nav className="bg-gray-700 px-4 py-2 text-white">
        <Link href="/">
          <a className={router.pathname == "/" ? "bg-blue-600" : ""}>Główna</a>
        </Link>
        <Link href="/about">
          <a className={router.pathname == "/about" ? "bg-blue-600" : ""}>
            About
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
