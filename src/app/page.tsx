"use client";
import styles from "./index.module.css";
import {
  Container,
  Skeleton,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Box,
  Typography,
  Slider,
} from "@mui/material";
import { FilmCard } from "../components/FilmCard/FilmCard";
import { Film, OptionalSearchParams, FiltersProps } from "@/types";
import { useEffect, useState, useRef, useCallback, useMemo, memo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useSearch from "@/hooks/useSearch";
import useGenres from "@/hooks/useGenres";

export default function Home() {
  const router = useRouter();
  const pathName = usePathname();
  const searchUrl = useSearchParams();

  const createQueryString = useCallback(
    (genres: string | null, year: string | null, rating: string | null) => {
      const params = new URLSearchParams(searchUrl.toString());
      if (genres) params.set("genres", genres);
      if (year) params.set("year", year);
      if (rating) params.set("rating", rating);

      return params.toString();
    },
    [searchUrl]
  );

  const initialYearRange = useMemo(() => {
    const yearParam = searchUrl.get("year");
    return yearParam ? yearParam.split("-").map(Number) : [1990, 2025];
  }, [searchUrl]);

  const initialRatingRange = useMemo(() => {
    const ratingParam = searchUrl.get("rating");
    return ratingParam ? ratingParam.split("-").map(Number) : [0, 10];
  }, [searchUrl]);

  const initialGenres = useMemo(() => {
    return searchUrl.get("genres")?.split("+") || [];
  }, [searchUrl]);

  const [searchParams, setSearchParams] = useState<OptionalSearchParams>({
    genresNames: initialGenres,
  });

  const [filmList, setFilmList] = useState<Film[]>([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const searchQueryParams = useMemo(
    () => ({
      page: nextPage,
      genresNames: searchParams.genresNames,
      year: searchParams.year || initialYearRange.join("-"),
      ratingKP: searchParams.ratingKP || initialRatingRange.join("-"),
    }),
    [nextPage, searchParams, initialYearRange, initialRatingRange]
  );

  const { data, isLoading, error } = useSearch(searchQueryParams);

  const handleApplyFilters = useCallback(
    (selectedGenres: string[], yearRange: number[], ratingRange: number[]) => {
      setFilmList([]);
      setNextPage(1);
      setHasMore(true);

      const newSearchParams = {
        genresNames: selectedGenres,
        year: yearRange.join("-"),
        ratingKP: ratingRange.join("-"),
      };

      setSearchParams(newSearchParams);

      router.push(
        pathName +
          "?" +
          createQueryString(
            selectedGenres.join("+"),
            yearRange.join("-"),
            ratingRange.join("-")
          )
      );
    },
    [createQueryString, router, pathName]
  );

  useEffect(() => {
    if (data) {
      setFilmList((prev) => [...prev, ...data.docs]);
      if (data.pages <= nextPage) setHasMore(false);
    }
  }, [data, nextPage]);

  const observer = useRef<IntersectionObserver>(null);
  const lastRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setNextPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const {
    data: genres,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();

  return (
    <Container maxWidth="xl" className={styles.page}>
      <h1 className={styles.title}>Все фильмы</h1>
      <Filters
        initialGenres={initialGenres}
        initialYearRange={initialYearRange}
        initialRatingRange={initialRatingRange}
        genres={genres || []}
        genresLoading={genresLoading}
        genresError={genresError || null}
        onApply={handleApplyFilters}
      />
      <div className={styles.filmList}>
        {error ? (
          <div>
            <h3>Произошла ошибка...</h3>
            <h6>{error.message}</h6>
          </div>
        ) : filmList.length > 0 ? (
          <FilmList films={filmList} lastRef={lastRef} />
        ) : (
          "ничего не нашлось..."
        )}
        {isLoading &&
          [...Array(18)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="225px"
              height="425px"
              sx={{
                borderRadius: 4,
              }}
            />
          ))}
      </div>
    </Container>
  );
}

const FilmList = memo(function FilmListComponent({
  films,
  lastRef,
}: {
  films: Film[];
  lastRef: (node: HTMLDivElement | null) => void;
}) {
  const items = useMemo(
    () =>
      films.map((item, index) => {
        const isLast = index === films.length - 1;
        return (
          <FilmCard
            id={item.id}
            key={item.id}
            title={item.name || item.alternativeName}
            year={item.year}
            rating={item.rating.kp ?? item.rating.imdb}
            posterUrl={item.poster?.url}
            updateRef={isLast ? lastRef : null}
          />
        );
      }),
    [films, lastRef]
  );

  return <div className={styles.filmList}>{items}</div>;
});

function Filters({
  initialGenres,
  initialYearRange,
  initialRatingRange,
  genres,
  genresLoading,
  genresError,
  onApply,
}: FiltersProps) {
  const [tempYearRange, setTempYearRange] =
    useState<number[]>(initialYearRange);
  const [tempRatingRange, setTempRatingRange] =
    useState<number[]>(initialRatingRange);
  const [tempSelectedGenres, setTempSelectedGenres] =
    useState<string[]>(initialGenres);
  const [isFiltersChanged, setIsFiltersChanged] = useState(false);

  useEffect(() => {
    setTempYearRange(initialYearRange);
    setTempRatingRange(initialRatingRange);
    setTempSelectedGenres(initialGenres);
    setIsFiltersChanged(false);
  }, [initialGenres, initialYearRange, initialRatingRange]);

  const handleYearChange = useCallback((_: Event, newValue: number[]) => {
    setTempYearRange(newValue);
    setIsFiltersChanged(true);
  }, []);

  const handleRatingChange = useCallback(
    (_: Event, newValue: number | number[]) => {
      setTempRatingRange(newValue as number[]);
      setIsFiltersChanged(true);
    },
    []
  );

  const handleGenresChange = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const value = event.target.value;
      setTempSelectedGenres(
        typeof value === "string" ? value.split(",") : value
      );
      setIsFiltersChanged(true);
    },
    []
  );

  const handleApply = useCallback(() => {
    onApply(tempSelectedGenres, tempYearRange, tempRatingRange);
    setIsFiltersChanged(false);
  }, [onApply, tempSelectedGenres, tempRatingRange, tempYearRange]);

  return (
    <div
      style={{
        marginBottom: "30px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <Box sx={{ width: 200 }}>
        <Typography gutterBottom>Год выпуска</Typography>
        <Slider
          value={tempYearRange}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          min={1990}
          max={new Date().getFullYear()}
        />
      </Box>
      <Box sx={{ width: 200 }}>
        <Typography gutterBottom>Рейтинг КП</Typography>
        <Slider
          value={tempRatingRange}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          step={0.1}
        />
      </Box>
      {genres && genres.length !== 0 ? (
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="genres-label">Жанры</InputLabel>
          <Select
            labelId="genres-label"
            multiple
            value={tempSelectedGenres}
            onChange={handleGenresChange}
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.name} value={genre.name}>
                <Checkbox checked={tempSelectedGenres.includes(genre.name)} />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : genresLoading ? (
        "Загрузка жанров..."
      ) : (
        genresError && `Ошибка! ${genresError.message}`
      )}
      <Button onClick={handleApply} disabled={!isFiltersChanged}>
        Применить
      </Button>
    </div>
  );
}
