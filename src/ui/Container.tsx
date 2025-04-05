import { useLocation } from "react-router";

type props = {
  children: React.ReactNode;
};

export default function Container({ children }: props) {
  const location = useLocation();
  const arr = location.pathname.split("/");
  const isNew = arr.includes("new");
  const bg = isNew ? "bg-white" : "bg-[var(--blue-white)]";

  return (
    <div
      className={`relative flex flex-col px-6 md:px-12 ${bg}  min-h-screen dark:bg-[var(--deep-black)]`}
    >
      {children}
    </div>
  );
}
