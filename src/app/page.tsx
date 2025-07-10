"use client";
import styles from "../styles/page.module.css";
import { Container } from "@mui/material";
import { FilmCard } from "../components/FilmCard";

export default function Home() {
  return (
    <Container maxWidth="xl" className={styles.page}>
      <h1 className={styles.title}>Все фильмы</h1>
      <div className={styles.filmList}>
        <FilmCard
          id={5278126}
          title="Главы государств"
          year={2025}
          rating={4}
          posterUrl="https://avatars.mds.yandex.net/get-kinopoisk-image/10703859/bc2d2557-ad2a-4045-9c2f-d7f81803e009/600x900"
        />
        <FilmCard
          id={5278126}
          title="Главы государств"
          year={2025}
          rating={4}
          posterUrl="https://avatars.mds.yandex.net/get-kinopoisk-image/10703859/bc2d2557-ad2a-4045-9c2f-d7f81803e009/600x900"
        />
        <FilmCard
          id={5278126}
          title="Главы государств"
          year={2025}
          rating={4}
          posterUrl="https://avatars.mds.yandex.net/get-kinopoisk-image/10703859/bc2d2557-ad2a-4045-9c2f-d7f81803e009/600x900"
        />
        <FilmCard
          id={5278126}
          title="Главы государств"
          year={2025}
          rating={4}
          posterUrl="https://avatars.mds.yandex.net/get-kinopoisk-image/10703859/bc2d2557-ad2a-4045-9c2f-d7f81803e009/600x900"
        />
        <FilmCard
          id={5278126}
          title="Главы государств"
          year={2025}
          rating={4}
          posterUrl="https://avatars.mds.yandex.net/get-kinopoisk-image/10703859/bc2d2557-ad2a-4045-9c2f-d7f81803e009/600x900"
        />
      </div>
    </Container>
  );
}
