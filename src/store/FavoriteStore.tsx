import { makeAutoObservable } from "mobx";
import { FilmCardProps, FavoriteList } from "@/types";

class FavoriteStore {
  favorites: FavoriteList = {};

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  has(targetId: string) {
    if (this.favorites[targetId]) {
      return true;
    }

    return false;
  }

  push(item: FilmCardProps) {
    this.favorites[item.id] = {
      title: item.title,
      posterUrl: item.posterUrl,
      year: item.year,
      rating: item.rating,
    };

    this.saveToLocalStorage();
  }

  del(filmId: string) {
    delete this.favorites[filmId];
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("filmStore", JSON.stringify(this.favorites));
  }

  loadFromLocalStorage() {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("filmStore");
    if (stored) {
      try {
        this.favorites = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse filmStore from localStorage", e);
      }
    }
  }
}

const currentStore = new FavoriteStore();
export default currentStore;
