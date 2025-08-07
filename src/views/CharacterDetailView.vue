<template>
  <div class="character-detail-view">
    <div v-if="loading" class="character-detail">
      <div class="detail-container">
        <div class="info-section">
          <div class="shimmer-line shimmer-name"></div>
          <div class="character-info">
            <div class="info-item">
              <div class="shimmer-line shimmer-label"></div>
              <div class="shimmer-line shimmer-value"></div>
            </div>
            <div class="info-item">
              <div class="shimmer-line shimmer-label"></div>
              <div class="shimmer-line shimmer-value"></div>
            </div>
            <div class="info-item">
              <div class="shimmer-line shimmer-label"></div>
              <div class="shimmer-line shimmer-value"></div>
            </div>
            <div class="info-item">
              <div class="shimmer-line shimmer-label"></div>
              <div class="shimmer-line shimmer-value"></div>
            </div>
          </div>
          <div class="shimmer-button-detail"></div>
        </div>
        <div class="image-section shimmer-bg"></div>
      </div>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadCharacter" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="character" class="character-detail">
      <div class="detail-container">
        <div class="info-section">
          <h1 class="character-name">{{ character.name }}</h1>

          <div class="character-info">
            <div class="info-item">
              <span class="label">Species:</span>
              <span class="value">{{ character.species }}</span>
            </div>

            <div class="info-item">
              <span class="label">Status:</span>
              <span class="value" :class="`status-${character.status.toLowerCase()}`">
                {{ character.status }}
              </span>
            </div>

            <div class="info-item">
              <span class="label">Last known location:</span>
              <span class="value">{{ character.location.name }}</span>
            </div>

            <div class="info-item" v-if="firstEpisode">
              <span class="label">First seen in:</span>
              <span class="value">{{ firstEpisode.name }}</span>
            </div>

            <div class="info-item" v-else-if="loadingEpisode">
              <span class="label">First seen in:</span>
              <span class="value">Loading...</span>
            </div>
          </div>

          <button class="favorite-btn" :class="{ 'is-favorite': isFavorite }" @click="toggleFavorite">
            {{ isFavorite ? 'Remove from Favourites' : 'Add to Favourites' }}
          </button>
        </div>

        <div class="image-section">
          <img :src="character.image" :alt="character.name" class="character-image" @error="handleImageError" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Character, Episode } from '@/types/character'
import { ApiService } from '@/services/api'
import { useFavoritesStore } from '@/stores/favorites'

const route = useRoute()
const favoritesStore = useFavoritesStore()

const character = ref<Character | null>(null)
const firstEpisode = ref<Episode | null>(null)
const loading = ref(false)
const loadingEpisode = ref(false)
const error = ref<string | null>(null)

const isFavorite = computed(() =>
  character.value ? favoritesStore.isFavorite(character.value.id) : false
)

const loadCharacter = async () => {
  const characterId = Number(route.params.id)

  if (!characterId || isNaN(characterId)) {
    error.value = 'Invalid character ID'
    return
  }

  loading.value = true
  error.value = null

  try {
    character.value = await ApiService.getCharacter(characterId)

    if (character.value.episode.length > 0) {
      loadFirstEpisode(character.value.episode[0])
    }
  } catch (err) {
    error.value = 'Failed to load character details. Please try again.'
    console.error('Error loading character:', err)
  } finally {
    loading.value = false
  }
}

const loadFirstEpisode = async (episodeUrl: string) => {
  loadingEpisode.value = true

  try {
    firstEpisode.value = await ApiService.getEpisode(episodeUrl)
  } catch (err) {
    console.error('Error loading episode:', err)
  } finally {
    loadingEpisode.value = false
  }
}

const toggleFavorite = () => {
  if (!character.value) return

  favoritesStore.toggleFavorite(character.value)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/300x300?text=Image'
}

onMounted(() => {
  loadCharacter()
})
</script>

<style scoped>
.character-detail-view {
  max-width: 1536px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  width: 100%;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.error {
  color: #dc3545;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.character-detail {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
}

.detail-container {
  display: flex;
  min-height: 400px;
}

.image-section {
  width: 300px;
  background-color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-section::before {
  content: "Image";
  color: white;
  font-size: 1rem;
  position: absolute;
  z-index: 1;
  pointer-events: none;
}

.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.info-section {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.character-name {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #212529;
  line-height: 1.2;
}

.character-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-weight: 600;
  color: #6c757d;
  font-size: 0.875rem;
}

.value {
  font-size: 1rem;
  color: #212529;
  font-weight: 400;
}

.status-alive {
  color: #28a745;
}

.status-dead {
  color: #dc3545;
}

.status-unknown {
  color: #ffc107;
}

.favorite-btn {
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #212529;
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;
  align-self: flex-start;
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

.shimmer-bg {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.shimmer-line {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.shimmer-name {
  height: 2rem;
  width: 70%;
  margin-bottom: 1.5rem;
}

.shimmer-label {
  height: 0.875rem;
  width: 40%;
  margin-bottom: 0.25rem;
}

.shimmer-value {
  height: 1rem;
  width: 60%;
}

.shimmer-button-detail {
  height: 2.125rem;
  width: 150px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.25rem;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

@media (max-width: 768px) {
  .character-detail-view {
    padding: 1rem;
  }

  .detail-container {
    flex-direction: column;
  }

  .image-section {
    width: 100%;
    height: 300px;
  }

  .info-section {
    padding: 1.5rem;
  }

  .character-name {
    font-size: 1.5rem;
  }
}
</style>