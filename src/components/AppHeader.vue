<template>
  <header class="app-header">
    <nav class="nav-container">
      <div class="nav-links">
        <router-link to="/" class="nav-link" :class="{ active: $route.name === 'Characters' }">
          Characters
        </router-link>
        <router-link to="/favorites" class="nav-link" :class="{ active: $route.name === 'Favourites' }">
          Favourites
        </router-link>
      </div>
      <div class="favorites-counter">
        <span class="heart-icon">♥</span>
        <span class="count">{{ favoritesCount }}</span>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()

const { favoritesCount } = storeToRefs(favoritesStore)
</script>

<style scoped>
.app-header {
  background-color: #000000;
  color: white;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #495057;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1536px;
  margin: 0 auto;
  width: 100%;
}

.nav-links {
  display: flex;
  gap: 0;
}

.nav-link {
  color: #adb5bd;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.nav-link:hover {
  color: white;
  text-decoration: none;
}

.nav-link.active {
  color: white;
  border-bottom-color: #007bff;
}

.favorites-counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.heart-icon {
  color: #dc3545;
  font-size: 1.2rem;
}

.count {
  font-weight: bold;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1rem;
  }

  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    gap: 0;
  }
}
</style>