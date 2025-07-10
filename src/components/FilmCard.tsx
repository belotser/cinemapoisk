import * as React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export interface FilmCardProps {
  title: string;
  posterUrl: string;
  year: number;
  rating: number;
}

export const FilmCard: React.FC<FilmCardProps> = ({
  title,
  posterUrl,
  year,
  rating,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 235,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        },
        backgroundColor: "#ffffff",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        height="338"
        image={posterUrl}
        sx={{
          objectFit: "cover",
          filter: "brightness(0.95)",
        }}
      />
      <CardContent sx={{ padding: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            color: "#333",
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
          <Box style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <StarIcon fontSize="inherit" style={{ color: "orange" }} />
            <Typography variant="body2" sx={{ color: "#888" }}>
              {rating}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "#888" }}>
            {year}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
