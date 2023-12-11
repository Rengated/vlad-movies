import { MovieList, getFilms } from "@/api";
import { Card } from "@/components/Card/Card";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Header } from "@/components/Header/Header";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/minimal.css";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getFilms(String(currentPage));
      setFilms(response.movies);
      setTotal(Math.floor(response.movie_count / response.limit));
      setLoading(false);
    };
    fetch();
  }, [currentPage]);

  return (
    <div className="pt-20">
      <Header arrowBack={false} />
      {!loading ? (
        <main className="min-h-screen flex justify-center">
          <section className="flex flex-col items-center container py-20">
            <h1 className="text-3xl mb-10 mx-auto text-rose-300">FILMS</h1>
            <div className="flex flex-wrap justify-center mb-20">
              {films?.map((item: MovieList, index) => (
                <Card
                  key={index}
                  id={item.id}
                  rating={item.rating}
                  genre={item.genres[0]}
                  description={item.description_full || item.summary}
                  title={item.title}
                  year={item.year}
                  medium_cover_image={item.medium_cover_image}
                />
              ))}
            </div>
            <ResponsivePagination
              maxWidth={700}
              pageLinkClassName="bg-white p-3 text-black border-white border-1"
              current={currentPage}
              total={total}
              onPageChange={setCurrentPage}
            />
          </section>
        </main>
      ) : (
        <div className="flex justify-center items-center min-w-full min-h-screen">
          <Audio
            height="300"
            width="300"
            radius="9"
            color="#4d50bf"
            ariaLabel="loading"
          />
        </div>
      )}
    </div>
  );
}
