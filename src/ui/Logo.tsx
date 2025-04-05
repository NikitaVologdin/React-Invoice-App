import logo from "../assets/logo.svg";

export default function Logo() {
  return (
    <div className="flex flex-col relative w-[4.5rem] md:w-20 lg:w-[6.4375rem] h-[4.5rem] md:h-20 lg:h-[6.4375rem]">
      <div className="relative z-10 h-full w-full bg-[#7C5DFA] rounded-r-3xl"></div>
      <img
        src={logo}
        alt=""
        width={28}
        height={26}
        className="absolute inset-0 m-auto z-30 md:w-[31px] md:h-[29px] lg:w-[40px] lg:h-[38px]"
      />
      <div className="absolute bottom-0 h-3/6 z-20 w-full bg-[#9277FF] rounded-tl-3xl rounded-br-3xl"></div>
    </div>
  );
}
