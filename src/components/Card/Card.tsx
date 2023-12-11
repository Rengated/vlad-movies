import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CardProps {
  id: number;
  title: string;
  year: number;
  medium_cover_image: string;
  description: string;
  rating: string;
}

export const Card: FC<CardProps> = ({
  id,
  title,
  year,
  medium_cover_image,
  description,
  rating,
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  const toggleMouseOver = () => setMouseOver((prev) => !prev);

  const router = useRouter();
  const onFilmClick = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <div
      onMouseOver={toggleMouseOver}
      onMouseOut={toggleMouseOver}
      className=" bg-white border border-black basis-80 object-cover rounded ml-3 mb-3 cursor-pointer relative"
      onClick={!mouseOver ? onFilmClick : () => {}}>
      {mouseOver && (
        <div
          className="absolute flex items-center justify-center flex-col text-center  bg-rose-200 p-5"
          style={{ width: "317px", height: "477px" }}>
          <h1 className="text-white text-3xl text-extrabold mb-3">{title}</h1>
          <p className="text-lg">Rating: {rating}</p>
          <button
            onClick={onFilmClick}
            className="p-3 border-2 mt-5 border-black px-10 rounded-md border-white hover:bg-white ">
            Details
          </button>
        </div>
      )}
      <Image
        width={320}
        height={600}
        src={medium_cover_image}
        alt={title}
      />

      <div className="flex flex-col p-5 max-w-xs">
        <span className="text-extrabold text-xl text-rose-400">{title}</span>
        <span>{description?.slice(0, 60)}...</span>
        <span className="ml-auto text-rose-500">{year}</span>
      </div>
    </div>
  );
};
