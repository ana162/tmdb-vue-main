<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/plugins/axios';
  import Loading from 'vue-loading-overlay';
  import { useGenreStore } from '@/stores/genre';
  import { useRouter } from 'vue-router'

  const genres = ref([]);
  const genreStore = useGenreStore();
  const isLoading = ref(false);
  const discover = ref([]);
  const router = useRouter()

  const getGenreName = (id) => genreStore.genres.find((genre) => genre.id == id)?.name || 'teste'
  const listtv = async (genreId) => {
    genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {

    params: {
      with_genres: genreId,
      language: 'pt-BR'

    }
  });
  discover.value = response.data.results
  isLoading.value = false;
};

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

function opendiscover(discoverId) {
  router.push({ name: 'discoverDetails', params: { discoverId } });
}
  onMounted(async () => {
    isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
  
  });
  
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
      <li v-for="genre in genreStore.genres" :key="genre.id" @click="listtv(genre.id)" class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }">
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />
  <div class="tv-list">
    <div v-for=" discover in discover" :key="discover.id" class="tv-card">

      <img :src="`https://image.tmdb.org/t/p/w500${discover.poster_path}`" :alt="discover.title"
        @click="opendiscover(discover.id)" />
      <div class="tv-details">
        <p class="tv-title">{{ discover.original_name }}</p>
        <p class="tv-release-date">{{ formatDate(discover.first_air_date) }}</p>
        <p class="tv-genres">
          <span v-for="genre_id in discover.genre_ids" :key="genre_id" @click="listtv(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }">
            {{ getGenreName(genre_id) }}
          </span>
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    padding: 0;
  }

  .genre-item {
    background-color: #5d6424;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    align-self: center;
    color: #fff;
    display: flex;
    justify-content: center;
  }

  .genre-item:hover {
    cursor: pointer;
    background-color: #7d8a2e;
    box-shadow: 0 0 0.5rem #5d6424;
  }
  .tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}
</style>