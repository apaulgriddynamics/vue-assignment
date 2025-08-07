<template>
  <div class="character-card">
    <div class="image-container">
      <img :src="character.image" :alt="character.name" class="character-image" @error="handleImageError" />
    </div>

    <div class="character-info">
      <h3 class="character-name">{{ character.name }}</h3>
      <p class="character-detail">{{ character.species }} - {{ character.status }}</p>

      <button class="favorite-btn" :class="{ 'is-favorite': isFavorite }" @click.stop="toggleFavorite">
        {{ isFavorite ? 'Remove from Favourites' : 'Add to Favourites' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/types/character'
import { useFavoritesStore } from '@/stores/favorites'

interface Props {
  character: Character
}

const props = defineProps<Props>()
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => favoritesStore.isFavorite(props.character.id))

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.character)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/300x300?text=Image'
}
</script>

<style scoped>
.character-card {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0;
}

.character-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.character-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.character-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #212529;
  line-height: 1.2;
}

.character-detail {
  margin: 0 0 1rem 0;
  color: #6c757d;
  font-size: 0.875rem;
  flex: 1;
}

.favorite-btn {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #212529;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;
  flex-shrink: 0;
}

.favorite-btn:hover {
  background-color: #16181b;
}

.favorite-btn.is-favorite {
  background-color: #dc3545;
}

.favorite-btn.is-favorite:hover {
  background-color: #c82333;
}

.image-container::before {
  content: "Image";
  color: white;
  font-size: 1rem;
  position: absolute;
  z-index: 1;
  pointer-events: none;
}

.character-image[src]+.image-container::before {
  display: none;
}

@media (max-width: 768px) {
  .image-container {
    height: 160px;
  }

  .character-info {
    padding: 0.75rem;
  }

  .character-name {
    font-size: 1.1rem;
  }
}
</style>