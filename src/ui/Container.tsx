type props = {
  children: React.ReactNode;
};

export default function Container({ children }: props) {
  return (
    <div className="relative flex flex-col px-6 md:px-12 bg-[var(--blue-white)] min-h-screen dark:bg-[var(--deep-black)]">
      {children}
    </div>
  );
}
