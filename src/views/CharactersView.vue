<template>
  <div class="characters-view">
    <div class="filters-section">
      <div class="filters-container">
        <div class="filter-buttons">
          <button class="filter-btn" :class="{ active: !speciesFilter }" @click="setSpeciesFilter('')">
            All
          </button>
          <button class="filter-btn" :class="{ active: speciesFilter === 'Human' }" @click="setSpeciesFilter('Human')">
            Human
          </button>
          <button class="filter-btn" :class="{ active: speciesFilter === 'Alien' }" @click="setSpeciesFilter('Alien')">
            Alien
          </button>
        </div>

        <div class="search-group">
          <input v-model="nameFilter" type="text" placeholder="Search by name..." class="search-input"
            @input="handleSearch" />
          <button class="search-btn" @click="handleSearch" :disabled="loading">
            Search
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="characters-content">
      <div class="characters-grid">
        <ShimmerCard v-for="n in 20" :key="`shimmer-${n}`" />
      </div>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadCharacters" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="characters.length > 0" class="characters-content">
      <div class="characters-grid">
        <div v-for="character in characters" :key="character.id" @click="goToCharacterDetail(character.id)">
          <CharacterCard :character="character" />
        </div>
      </div>

      <PaginationComponent :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
    </div>

    <div v-else class="no-results">
      <p>No characters found. Try adjusting your search criteria.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Character } from '@/types/character'
import { ApiService } from '@/services/api'
import CharacterCard from '@/components/CharacterCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import ShimmerCard from '@/components/ShimmerCard.vue'

const router = useRouter()

const characters = ref<Character[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const nameFilter = ref('')
const speciesFilter = ref('')

let searchTimeout: ReturnType<typeof setTimeout> | null = null

const loadCharacters = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await ApiService.getCharacters(
      currentPage.value,
      nameFilter.value || undefined,
      speciesFilter.value || undefined
    )

    characters.value = response.results
    totalPages.value = response.info.pages
  } catch (err) {
    error.value = 'Failed to load characters. Please try again.'
    console.error('Error loading characters:', err)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    loadCharacters()
  }, 500)
}

const handleFilter = () => {
  currentPage.value = 1
  loadCharacters()
}

const setSpeciesFilter = (species: string) => {
  speciesFilter.value = species
  handleFilter()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  loadCharacters()

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goToCharacterDetail = (id: number) => {
  router.push(`/character/${id}`)
}

onMounted(() => {
  loadCharacters()
})
</script>

<style scoped>
.characters-view {
  max-width: 1536px;
  margin: 0 auto;
  background-color: #f8f9fa;
  width: 100%;
}

.filters-section {
  background: rgb(210, 209, 209);
  padding: 1.5rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  margin-bottom: 2rem;
}

.filters-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.filter-buttons {
  display: flex;
  gap: 0;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #6c757d;
  background: white;
  color: #495057;
  cursor: pointer;
  font-size: 0.875rem;
  border-radius: 0;
  transition: all 0.3s ease;
}

.filter-btn:first-child {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.filter-btn:last-child {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.filter-btn:not(:first-child) {
  border-left: none;
}

.filter-btn:hover {
  background-color: #e9ecef;
}

.filter-btn.active {
  background-color: #000000;
  color: white;
  border-color: #000000;
}

.search-group {
  display: flex;
  gap: 0;
  flex: 1;
  max-width: 400px;
}

.search-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ced4da;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  border-right: none;
  font-size: 0.875rem;
}

.search-input:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 0 0 0 0.2rem rgba(21, 27, 34, 0.25);
}

.search-btn {
  padding: 0.5rem 1rem;
  background-color: #000000;
  color: white;
  border: 1px solid #000000;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover:not(:disabled) {
  background-color: #5a6268;
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading,
.error,
.no-results {
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

.characters-content {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1.5rem;
}

.characters-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 1200px) {
  .characters-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .characters-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 575px) {
  .characters-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .characters-view {
    padding: 1rem;
  }

  .filters-container {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .filter-buttons {
    justify-content: center;
  }

  .search-group {
    max-width: none;
  }

  .characters-content {
    padding: 1rem;
  }
}
</style>