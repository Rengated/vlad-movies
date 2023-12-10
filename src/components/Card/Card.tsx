import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CardProps {
  id: number;
  title: string;
  year: number;
  medium_cover_image: string;
}

export const Card: FC<CardProps> = ({
  id,
  title,
  year,
  medium_cover_image,
}) => {
  const router = useRouter();
  const onFilmClick = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <div
      className=" bg-white border border-black basis-80 object-cover rounded ml-3 mb-3 cursor-pointer"
      onClick={onFilmClick}>
      <Image
        width={320}
        height={600}
        src={medium_cover_image}
        alt={title}
      />
      <div className="flex flex-col p-5 max-w-xs">
        <span className="text-extrabold text-xl text-rose-400">{title}</span>
        <span className="ml-auto text-rose-500">{year}</span>
      </div>
    </div>
  );
};
