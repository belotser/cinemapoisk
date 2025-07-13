"use client";
import styles from "@/app/index.module.css";
import { Container } from "@mui/material";
import { FilmCard } from "../../components/FilmCard/FilmCard";
import { FavoriteFilm } from "@/types";
import currentStore from "@/store/FavoriteStore";

export default function Home() {
  const data: [string, FavoriteFilm][] = Object.entries(currentStore.favorites);

  return (
    <Container maxWidth="xl" className={styles.page}>
      <h1 className={styles.title}>Избранные фильмы</h1>
      <div className={styles.filmList}>
        {data.length !== 0
          ? data.map((arr) => {
              return (
                <FilmCard
                  id={Number(arr[0])}
                  key={arr[0]}
                  title={arr[1].title}
                  year={arr[1].year}
                  rating={arr[1].rating}
                  posterUrl={arr[1].posterUrl}
                />
              );
            })
          : "здесь пока ничего нет.."}
      </div>
    </Container>
  );
}
