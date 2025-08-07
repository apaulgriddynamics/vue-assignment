<template>
  <div class="shimmer-card">
    <div class="shimmer-image"></div>
    <div class="shimmer-info">
      <div class="shimmer-line shimmer-title"></div>
      <div class="shimmer-line shimmer-subtitle"></div>
      <div class="shimmer-button"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.shimmer-card {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0;
}

.shimmer-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  flex-shrink: 0;
}

.shimmer-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.shimmer-line {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  flex-shrink: 0;
}

.shimmer-title {
  height: 1.25rem;
  width: 80%;
  margin-bottom: 0.5rem;
}

.shimmer-subtitle {
  height: 0.875rem;
  width: 60%;
  margin-bottom: 1rem;
  flex: 1;
}

.shimmer-button {
  height: 2.125rem;
  width: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.25rem;
  margin-top: auto;
  flex-shrink: 0;
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
  .shimmer-image {
    height: 160px;
  }

  .shimmer-info {
    padding: 0.75rem;
  }
}
</style>