import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Film } from "@/types";

export default function useFilm(id: number) {
  const APICall = axios.create({
    baseURL: "https://api.kinopoisk.dev/v1.4/",
    timeout: 5000,
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  async function fetchFilmByID(id: number) {
    const { data } = await APICall.get<Film>(`/movie/${id}`);
    return data;
  }

  return useQuery<Film, Error>({
    queryKey: ["film", id],
    queryFn: () => fetchFilmByID(id),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
