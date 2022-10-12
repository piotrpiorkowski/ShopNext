import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="bg-teal-100 flex-grow max-w-2xl mx-auto grid p-6 gap-6 sm:grid-cols-2">
      {children}
    </main>
  );
};

export default Main;
