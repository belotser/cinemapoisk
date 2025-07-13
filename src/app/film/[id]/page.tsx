"use client";

import { Container, Skeleton, Card, CardMedia, Box } from "@mui/material";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import ModalConfirm from "@/components/ModalConfirm/ModalConfirm";
import currentStore from "@/store/FavoriteStore";
import styles from "./Film.module.css";
import useFilm from "@/hooks/useFilm";

export default function FilmPage() {
  const { id } = useParams() as { id: string };

  const [openModal, setOpenModal] = useState<"add" | "del" | null>(null);
  const handleOpen = (type: "add" | "del") => () => setOpenModal(type);
  const handleClose = () => setOpenModal(null);

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(currentStore.has(id));
  }, [id]);

  const { data, isLoading, error } = useFilm(Number(id));

  return (
    <Container maxWidth="xl" className={styles.filmContainer}>
      {isLoading ? (
        <SkeletonFilmPage />
      ) : error ? (
        <>
          <h2>Ошибка при выполнении запроса</h2>
          <h5 className={styles.errorMessage}>{error.message}</h5>
        </>
      ) : (
        data && (
          <div className={styles.filmContent}>
            <Card sx={sxStyles.filmMajorCard}>
              {data.poster && data.poster.url ? (
                <CardMedia
                  component="img"
                  alt={data.name}
                  image={data.poster.url}
                  sx={{
                    objectFit: "cover",
                    ...sxStyles.imageSizing,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    backgroundColor: "gray",
                    ...sxStyles.imageSizing,
                  }}
                />
              )}
              <div className={styles.filmCardTextContent}>
                <h2>{data.name || data.alternativeName}</h2>
              </div>
            </Card>
            <div>
              <div className={styles.filmInfoItem}>
                <h4>
                  {data.year || "Н/Д"} год. Кинопоиск:{" "}
                  {getRatingStr(data.rating.kp)}, IMDb:{" "}
                  {getRatingStr(data.rating.imdb)}
                </h4>
              </div>
              {data.genres && data.genres.length > 0 && (
                <div className={styles.filmInfoItem}>
                  <h3 className={styles.filmCardSubtitle}>Жанры</h3>
                  <div className={styles.filmGenresList}>
                    {data.genres.map((genre, key) => {
                      return (
                        <Card sx={sxStyles.filmMinorCard} key={key}>
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
                  <Card sx={sxStyles.filmMinorCard}>
                    <p className={styles.filmDescr}>{data.description}</p>
                  </Card>
                </div>
              )}
              <ModalConfirm
                text={"Сделать избранным?"}
                isVisible={openModal === "add"}
                handleClose={handleClose}
                confirmFn={() => {
                  setIsFavorite(true);
                  currentStore.push({
                    id: Number(id),
                    title: data.name || data.alternativeName,
                    posterUrl: data.poster?.url,
                    year: data.year,
                    rating: data.rating.kp || data.rating.imdb || 0,
                  });
                }}
              />
              <ModalConfirm
                text={"Удалить из избранного?"}
                isVisible={openModal === "del"}
                handleClose={handleClose}
                confirmFn={() => {
                  setIsFavorite(false);
                  currentStore.del(id);
                }}
              />
              <div className={styles.filmInfoItem}>
                {isFavorite ? (
                  <Card sx={sxStyles.favoriteCard} onClick={handleOpen("del")}>
                    <IoStar />
                    <p className={styles.favoriteText}>В избранном</p>
                  </Card>
                ) : (
                  <Card sx={sxStyles.favoriteCard} onClick={handleOpen("add")}>
                    <>
                      <IoStarOutline />
                      <p className={styles.favoriteText}>Сделать избранным</p>
                    </>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </Container>
  );
}

const sxStyles = {
  favoriteCard: {
    borderRadius: 4,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    display: "inline-block",
    maxWidth: "100%",
    transition: "0.15s",
    cursor: "pointer",
    padding: "18px 24px",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    },
  },

  imageSizing: {
    width: "100%",
    height: "505px",
  },

  filmMajorCard: {
    minWidth: 353,
    maxWidth: 353,
    width: 353,
    borderRadius: 4,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },

  filmMinorCard: {
    borderRadius: 4,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    padding: "12px 16px",
  },
};

function getRatingStr(rating: number | null) {
  if (rating) {
    return rating.toFixed(1);
  } else {
    return "Н/Д";
  }
}

function SkeletonFilmPage() {
  return (
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
  );
}
