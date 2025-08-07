<template>
  <div class="pagination" v-if="totalPages > 1">
    <div class="page-info">
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
    </div>
    <button class="pagination-btn prev-btn" :disabled="currentPage === 1"
      @click="$emit('page-change', currentPage - 1)">
      &lt;&lt; Prev
    </button>
    <button class="pagination-btn next-btn" :disabled="currentPage === totalPages"
      @click="$emit('page-change', currentPage + 1)">
      Next &gt;&gt;
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}

defineProps<Props>()

defineEmits<{
  'page-change': [page: number]
}>()
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1rem 0 0 0;
  padding: 0;
}

.pagination-btn {
  background: transparent;
  padding: 0.5rem 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 400;
  transition: all 0.3s ease;
  text-decoration: none;
}

.pagination-btn:hover:not(:disabled) {
  color: black;
  background: #b9b9b9;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #6c757d;
}

.page-info {
  font-weight: 400;
  color: #495057;
  min-width: 120px;
  text-align: center;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .pagination {
    gap: 0.5rem;
    margin: 1rem 0 0 0;
  }

  .pagination-btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.8rem;
  }

  .page-info {
    min-width: 100px;
    font-size: 0.8rem;
  }
}
</style>