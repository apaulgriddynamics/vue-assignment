import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Character } from "@/types/character";

const FAVORITES_KEY = "rickmorty_favorites";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<Character[]>([]);

  const favoritesCount = computed(() => favorites.value.length);
  const favoriteIds = computed(() => new Set(favorites.value.map((char) => char.id)));

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      favorites.value = stored ? JSON.parse(stored) : [];
    } catch {
      favorites.value = [];
    }
  };

  const addToFavorites = (character: Character) => {
    const exists = favorites.value.find((fav) => fav.id === character.id);

    if (!exists) {
      favorites.value.push(character);
      saveFavorites();
    }
  };

  const removeFromFavorites = (characterId: number) => {
    favorites.value = favorites.value.filter((fav) => fav.id !== characterId);
    saveFavorites();
  };

  const isFavorite = (characterId: number): boolean => {
    return favoriteIds.value.has(characterId);
  };

  const toggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
  };

  const saveFavorites = () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value));
  };

  loadFavorites();

  window.addEventListener("storage", (e) => {
    if (e.key === FAVORITES_KEY) {
      loadFavorites();
    }
  });

  return {
    favorites,
    favoritesCount,
    favoriteIds,
    loadFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };
});
