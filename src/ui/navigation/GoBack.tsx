import { Link } from "react-router-dom";
import left from "../../assets/icon-arrow-left.svg";

type props = {
  href: string;
};

export default function GoBack({ href }: props) {
  return (
    <nav className="mt-[105px] md:mt-[129px] lg:mt-[65px]">
      <Link
        to={href}
        className="inline-block font-bold -tracking-[0.25px] leading-[15px] p-4 dark:text-white"
      >
        <div className="flex items-center gap-[23.66px]">
          <img src={left} alt="" width={7} height={10} aria-hidden="true" />
          Go back
        </div>
      </Link>
    </nav>
  );
}
