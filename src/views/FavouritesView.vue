<template>
  <div class="favourites-view">
    <h1 class="page-title">Favourites</h1>

    <div v-if="favorites.length === 0" class="no-favorites">
      <p>no cards</p>
    </div>

    <div v-else class="favorites-content">
      <div class="favorites-grid">
        <div v-for="character in favorites" :key="character.id" @click="goToCharacterDetail(character.id)">
          <CharacterCard :character="character" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'
import CharacterCard from '@/components/CharacterCard.vue'

const router = useRouter()
const favoritesStore = useFavoritesStore()

const { favorites } = storeToRefs(favoritesStore)

const goToCharacterDetail = (id: number) => {
  router.push(`/character/${id}`)
}
</script>

<style scoped>
.favourites-view {
  max-width: 1536px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  width: 100%;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  color: #212529;
  text-align: center;
  margin-bottom: 2rem;
}

.no-favorites {
  text-align: center;
  padding: 4rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.no-favorites p {
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
}

.favorites-content {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1.5rem;
}

.favorites-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 1200px) {
  .favorites-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .favorites-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .favorites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .favorites-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 575px) {
  .favorites-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .favourites-view {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .favorites-content {
    padding: 1rem;
  }
}
</style>