import avatar from "../assets/image-avatar.jpg";

export default function Avatar() {
  return (
    <div className="flex justify-center items-center py-[4px] px-[8px]">
      <button className="cursor-pointer p-4">
        <span className="sr-only">Open profile</span>
        <img
          src={avatar}
          alt=""
          width={80}
          height={80}
          className="rounded-full w-8 h-8 lg:w-10 lg:h-10"
        />
      </button>
    </div>
  );
}
