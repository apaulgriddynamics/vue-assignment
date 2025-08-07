import type { Character, ApiResponse, Episode } from "@/types/character";

const BASE_URL = "https://rickandmortyapi.com/api";

export class ApiService {
  static async getCharacters(
    page: number = 1,
    name?: string,
    species?: string
  ): Promise<ApiResponse<Character>> {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    if (name) {
      params.append("name", name);
    }

    if (species) {
      params.append("species", species);
    }

    const response = await fetch(`${BASE_URL}/character?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async getCharacter(id: number): Promise<Character> {
    const response = await fetch(`${BASE_URL}/character/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async getEpisode(url: string): Promise<Episode> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async getMultipleCharacters(ids: number[]): Promise<Character[]> {
    if (ids.length === 0) return [];

    const idsString = ids.join(",");
    const response = await fetch(`${BASE_URL}/character/${idsString}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return Array.isArray(result) ? result : [result];
  }
}
