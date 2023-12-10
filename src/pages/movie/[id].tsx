"use client";
import { getFilmById } from "@/api";
import { FC, useEffect, useState } from "react";
import { MovieList } from "@/api";
import { useParams } from "next/navigation";
import { Audio } from "react-loader-spinner";
import { useComments } from "../../hooks/useComments";
import Image from "next/image";

const Details: FC = () => {
  const [movieDetails, setMovieDetails] = useState<MovieList>();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({
    name: "",
    text: "",
  });
  const id = useParams()?.id;
  const { comments, updateComments } = useComments(id);

  const onCommentChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSendComment = () => {
    updateComments(id, comment);
    setComment({ name: "", text: "" });
  };

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        setLoading(true);
        const response: MovieList = await getFilmById(id);
        setMovieDetails(response);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <>
      {!loading ? (
        <section className="min-h-screen flex items-center flex-col pb-20 px-4">
          <div className="container py-20 flex flex-col lg:flex-row items-start">
            <div
              style={{
                minWidth: "300px",
                width: "100%",
                maxWidth: "400px",
                minHeight: "600px",
                position: "relative",
              }}
              className="mb-5">
              <Image
                layout="fill"
                loading="lazy"
                src={movieDetails?.large_cover_image || ""}
                alt={movieDetails?.title || ""}
              />
            </div>

            <div className="flex  lg:pl-20 flex-col">
              <p className="text-white text-2xl mb-2">
                Title: {movieDetails?.title}
              </p>
              <p className="text-gray-400 mb-2">
                description: {movieDetails?.description_full}
              </p>
              <p className="text-white mb-2">
                Genres:{" "}
                {movieDetails?.genres?.map((genre, index) => (
                  <b key={index}> {genre}</b>
                ))}
              </p>
              <p className="text-white mb-2">
                Language: {movieDetails?.language}
              </p>
              <p className="text-white mb-2">Rating: {movieDetails?.rating}</p>
              <p className="text-white mb-2">
                Runtime: {movieDetails?.runtime}
              </p>
            </div>
          </div>
          <div className="container flex flex-col">
            <p className="text-3xl text-rose-500 mb-5">Comments</p>
            <p className="text-white mb-2">Name</p>
            <input
              name="name"
              onChange={onCommentChange}
              type="text"
              className="w-80 bg-transparent border-2 p-2 mb-2 rounded-md text-white"
            />
            <p className="text-white mb-2">Comment</p>
            <textarea
              onChange={onCommentChange}
              name="text"
              className="w-full bg-transparent border-2 p-2 rounded-md text-white"
            />
            <button
              onClick={onSendComment}
              className="ml-auto text-white border-2 rounded-md p-3 mt-3 hover:bg-black">
              Send
            </button>
            <div className="flex flex-col mt-10">
              {comments &&
                comments?.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-col border bg-gray-800 w-full p-5 text-white rounded-md mb-3">
                    <p className="text-xl extrabold mb-2">{comment.name}</p>
                    <p className="text-gray-500">{comment.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center min-w-full min-h-screen">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="#4d50bf"
            ariaLabel="loading"
          />
        </div>
      )}
    </>
  );
};

export default Details;
