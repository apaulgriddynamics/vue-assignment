import type { Character } from '@/types/character'

const FAVORITES_KEY = 'rickmorty_favorites'

export class FavoritesService {
  static getFavorites(): Character[] {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  static addToFavorites(character: Character): void {
    const favorites = this.getFavorites()
    const exists = favorites.find(fav => fav.id === character.id)
    
    if (!exists) {
      favorites.push(character)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  }

  static removeFromFavorites(characterId: number): void {
    const favorites = this.getFavorites()
    const filtered = favorites.filter(fav => fav.id !== characterId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
  }

  static isFavorite(characterId: number): boolean {
    const favorites = this.getFavorites()
    return favorites.some(fav => fav.id === characterId)
  }

  static getFavoritesCount(): number {
    return this.getFavorites().length
  }
}