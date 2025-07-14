import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { SearchParams, Film } from "@/types";

const LIMIT = 50;

export default function useSearch(params: SearchParams) {
  const APICall = axios.create({
    baseURL: "https://api.kinopoisk.dev/v1.4/",
    timeout: 5000,
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  function parseParams(params: SearchParams) {
    let query = `?page=${params.page}&limit=${LIMIT}`;

    if (params.year) query += `&year=${params.year}`;
    if (params.ratingKP) query += `&rating.kp=${params.ratingKP}`;

    if (params.genresNames) {
      params.genresNames.forEach((genre) => {
        query += `&genres.name=%2B${genre}`;
      });
    }

    return query;
  }

  async function fetchFilmByParams(params: SearchParams) {
    const { data } = await APICall.get<{ docs: Film[]; pages: number }>(
      `/movie${parseParams(params)}`
    );
    return data;
  }

  return useQuery<{ docs: Film[]; pages: number }, Error>({
    queryKey: ["search", params],
    queryFn: () => fetchFilmByParams(params),
    staleTime: 1000 * 60 * 60,
    retry: false,
  });
}
