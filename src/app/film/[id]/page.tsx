"use client";
import axios from "axios";
import { use, useState, useEffect } from "react";
import { Film } from "@/types/film";
import { Container, Skeleton, Card, CardMedia } from "@mui/material";
import Link from "next/link";
import styles from "@/styles/Film.module.css";
import { IoChevronBack } from "react-icons/io5";

type ParamsPromise = Promise<{
  id: string;
}>;

export default function FilmPage({ params }: { params: ParamsPromise }) {
  const { id } = use(params);
  const [data, setData] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
        headers: {
          "X-API-KEY": "4SAZ3GF-KGHMFYY-NBDWXP8-YSA853R",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  console.log(data?.year, data?.rating.kp, data?.rating.imdb);

  return (
    <Container maxWidth="xl" className={styles.filmContainer}>
      <Link href="/" className={styles.link}>
        <IoChevronBack /> На главную
      </Link>
      {loading ? (
        <div className={styles.filmContent}>
          <Skeleton
            variant="rectangular"
            width={353}
            height={583}
            className={styles.cardSkeleton}
          />
          <div>
            <div style={{ marginBottom: 16 }}>
              <Skeleton variant="text" width={300} height={24} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Skeleton variant="text" width={150} height={38} />
              <Skeleton
                variant="rectangular"
                width={650}
                height={40}
                sx={{ borderRadius: 2 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Skeleton variant="text" width={150} height={38} />
              <Skeleton
                variant="rectangular"
                height={300}
                sx={{ borderRadius: 2 }}
              />
            </div>
          </div>
        </div>
      ) : error ? (
        <div>
          <h2>Ошибка при выполнении запроса</h2>
          <h5 className={styles.errorMessage}>{error.message}</h5>
        </div>
      ) : (
        data && (
          <div className={styles.filmContent}>
            <Card
              sx={{
                minWidth: 353,
                maxWidth: 353,
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                alt={data.name}
                height="507"
                image={data.poster.url}
                sx={{
                  objectFit: "cover",
                }}
              />
              <div className={styles.filmCardTextContent}>
                <h2>{data.name}</h2>
              </div>
            </Card>
            <div>
              <div className={styles.filmInfoItem}>
                <h4>
                  {data.year || "Н/Д"} год. Кинопоиск:{" "}
                  {(data.rating?.kp ?? "Н/Д").toFixed(1)}, IMDb:{" "}
                  {(data.rating?.imdb ?? "Н/Д").toFixed(1)}
                </h4>
              </div>
              {data.genres && data.genres.length > 0 && (
                <div className={styles.filmInfoItem}>
                  <h3 className={styles.filmCardSubtitle}>Жанры</h3>
                  <div className={styles.filmGenresList}>
                    {data.genres.map((genre, key) => {
                      return (
                        <Card
                          sx={{
                            borderRadius: 4,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                          }}
                          key={key}
                          className={`${styles.filmCardTextContent} ${styles.filmCardGenre}`}
                        >
                          <p
                            className={`${styles.filmDescr} ${styles.filmCardGenreText}`}
                          >
                            {genre.name}
                          </p>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
              {data.description && (
                <div className={styles.filmInfoItem}>
                  <h3 className={styles.filmCardSubtitle}>Описание</h3>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                    className={styles.filmCardTextContent}
                  >
                    <p className={styles.filmDescr}>{data.description}</p>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </Container>
  );
}
