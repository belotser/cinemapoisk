export interface Film {
  id: number;
  externalId: {
    kpHD: string;
    imdb: string;
    tmdb: number;
  };
  name: string;
  alternativeName: string;
  enName: string;
  names: Array<{
    name: string;
    language: string;
    type: string;
  }>;
  type: string;
  typeNumber: number;
  year: number;
  description: string;
  shortDescription: string;
  slogan: string;
  status: string;
  facts: Array<{
    value: string;
    type: string;
    spoiler: boolean;
  }>;
  rating: {
    kp: number;
    imdb: number;
    tmdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  votes: {
    kp: string;
    imdb: number;
    tmdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  movieLength: number;
  ratingMpaa: string;
  ageRating: number;
  logo: {
    url: string;
  };
  poster: {
    url: string;
    previewUrl: string;
  };
  backdrop: {
    url: string;
    previewUrl: string;
  };
  videos: {
    trailers: Array<{
      url: string;
      name: string;
      site: string;
      size: number;
      type: string;
    }>;
  };
  genres: Array<{ name: string }>;
  countries: Array<{ name: string }>;
  persons: Array<{
    id: number;
    photo: string;
    name: string;
    enName: string;
    description: string;
    profession: string;
    enProfession: string;
  }>;
  reviewInfo: {
    count: number;
    positiveCount: number;
    percentage: string;
  };
  seasonsInfo: Array<{
    number: number;
    episodesCount: number;
  }>;
  budget: {
    value: number;
    currency: string;
  };
  fees: {
    world: { value: number; currency: string };
    russia: { value: number; currency: string };
    usa: { value: number; currency: string };
  };
  premiere: {
    country: string;
    world: string;
    russia: string;
    digital: string;
    cinema: string;
    bluray: string;
    dvd: string;
  };
  similarMovies: Array<
    Pick<
      Film,
      "id" | "name" | "enName" | "alternativeName" | "type" | "year"
    > & {
      poster: { url: string; previewUrl: string };
      rating: Film["rating"];
    }
  >;
  sequelsAndPrequels: Array<
    Pick<
      Film,
      "id" | "name" | "enName" | "alternativeName" | "type" | "year"
    > & {
      poster: { url: string; previewUrl: string };
      rating: Film["rating"];
    }
  >;
  watchability: {
    items: Array<{
      name: string;
      logo: { url: string };
      url: string;
    }>;
  };
  releaseYears: Array<{
    start: number;
    end: number;
  }>;
  top10: number;
  top250: number;
  ticketsOnSale: boolean;
  totalSeriesLength: number;
  seriesLength: number;
  isSeries: boolean;
  audience: Array<{
    count: number;
    country: string;
  }>;
  lists: string[];
  networks: {
    items: Array<{
      name: string;
      logo: { url: string };
    }>;
  };
  updatedAt: string;
  createdAt: string;
}

export interface FavoriteFilm {
  title: string;
  posterUrl: string;
  year: number;
  rating: number;
}

export interface FavoriteList {
  [key: string]: FavoriteFilm;
}

export interface FilmCardProps {
  id: number;
  title: string;
  posterUrl: string;
  year: number;
  rating: number;
  updateRef?: ((node: HTMLDivElement | null) => void) | null;
}

export type Genres = {
  name: "string";
  slug: "string";
}[];

export interface SearchParams extends OptionalSearchParams {
  page: number;
}

export interface OptionalSearchParams {
  ratingKP?: string;
  year?: string;
  genresNames?: string[];
}

export interface FiltersProps {
  initialGenres: string[];
  initialYearRange: number[];
  initialRatingRange: number[];
  genres: { name: string }[];
  genresLoading: boolean;
  genresError: Error | null;
  onApply: (
    genres: string[],
    yearRange: number[],
    ratingRange: number[]
  ) => void;
}
