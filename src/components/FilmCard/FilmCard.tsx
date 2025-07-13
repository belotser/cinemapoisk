import * as React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { FilmCardProps } from "@/types";
import styles from "./FilmCard.module.css";
import { useRouter } from "next/navigation";

export const FilmCard: React.FC<FilmCardProps> = ({
  id,
  title,
  posterUrl,
  year,
  rating,
  updateRef,
}) => {
  const router = useRouter();
  return (
    <Card
      sx={{
        maxWidth: 225,
        borderRadius: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        },
        cursor: "pointer",
      }}
      onClick={() => router.push(`/film/${id}`)}
      ref={updateRef ? updateRef : null}
    >
      {posterUrl ? (
        <CardMedia
          component="img"
          alt={title}
          image={posterUrl}
          sx={{
            objectFit: "cover",
            width: "225px",
            height: "338px",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "225px",
            height: "338px",
            backgroundColor: "gray",
          }}
        />
      )}
      <CardContent sx={{ padding: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Box className={styles.ratingBox}>
            <StarIcon fontSize="inherit" className={styles.ratingIcon} />
            <Typography variant="body2">
              {rating === 0 ? "Н/Д" : rating.toFixed(1)}
            </Typography>
          </Box>
          <Typography variant="body2">{year}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
