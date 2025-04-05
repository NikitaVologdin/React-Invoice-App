import Logo from "../ui/Logo";
import Avatar from "../ui/Avatar";
import Dark from "./icons/Dark";
import LogOut from "./icons/Logout";

export default function Settings() {
  return (
    <header className="absolute z-50 left-0 right-0 lg:fixed lg:top-0 lg:bottom-0 lg:right-auto flex lg:flex-col lg:rounded-tr-3xl lg:rounded-br-3xl dark:bg-[#1E2139] bg-[#373B53]">
      <Logo />
      <div className="flex justify-center items-center ml-auto lg:py-[16px] lg:px-[12px] lg:ml-0 lg:mt-auto flex-row lg:flex-col lg:justify-center lg:gap-0.5">
        <Dark />
        <LogOut />
      </div>
      <div className="w-px h-[4.5rem] md:h-20 lg:h-px lg:w-[103px] bg-[#494E6E]"></div>
      <Avatar />
    </header>
  );
}
