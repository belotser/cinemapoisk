import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Genres } from "@/types";

export default function useGenres() {
  const APICall = axios.create({
    baseURL: "https://api.kinopoisk.dev/v1/",
    timeout: 5000,
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  async function fetchGenres() {
    const { data } = await APICall.get<Genres>(
      `/movie/possible-values-by-field?field=genres.name`
    );
    return data;
  }

  return useQuery<Genres, Error>({
    queryKey: ["genres"],
    queryFn: () => fetchGenres(),
    staleTime: 1000 * 60 * 60 * 24,
  });
}
