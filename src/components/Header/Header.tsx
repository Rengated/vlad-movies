import { FC } from "react";
import Image from "next/image";
import arrow from "../../../public/static/arrow.png";
import { useRouter } from "next/router";

interface HeaderProps {
  arrowBack: boolean;
}

export const Header: FC<HeaderProps> = ({ arrowBack }) => {
  const router = useRouter();

  const onArrowClick = () => {
    router.push("/");
  };
  return (
    <header className="flex px-20  w-full py-5 border-b-2 justify-between items-centwr">
      <h1 className="text-3xl flex text-white leading-loose ">YSMLreska</h1>
      {arrowBack && (
        <Image
          src={arrow}
          alt="arrow"
          onClick={onArrowClick}
          className="invert cursor-pointer"
        />
      )}
    </header>
  );
};
