"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Film } from "@/types/film";
import Image from "next/image";

const MoviesInfiniteScroll = () => {
  const [movies, setMovies] = useState<Film[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Ваш API ключ от Kinopoisk
  const PAGE_SIZE = 50; // Количество фильмов за один запрос

  const fetchMovies = async () => {
    try {
      const response = await axios.get("https://api.kinopoisk.dev/v1.4/movie", {
        headers: {
          "X-API-KEY": "4SAZ3GF-KGHMFYY-NBDWXP8-YSA853R",
        },
        params: {
          page: page,
          perPage: PAGE_SIZE,
        },
      });

      const newMovies = response.data.docs;
      console.log(newMovies);

      if (newMovies.length === 0) {
        setHasMore(false);
        return;
      }

      setMovies((prev) => [...prev, ...newMovies]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  });

  return (
    <div>
      <h1>Фильмы с Kinopoisk API</h1>

      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={hasMore}
        loader={<h4>Загрузка...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Вы просмотрели все фильмы</b>
          </p>
        }
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{ border: "1px solid #ccc", padding: "10px" }}
            >
              {movie.poster && movie.poster.url && (
                <Image
                  src={movie.poster.url}
                  alt={movie.name}
                  style={{ width: "100%", height: "auto" }}
                  width={339}
                  height={507}
                />
              )}
              <h3>{movie.name}</h3>
              <p>{movie.year}</p>
              <p>Рейтинг: {movie.rating.kp || movie.rating.imdb}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MoviesInfiniteScroll;
