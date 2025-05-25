<template>
  <div class="search-preview">
    <template v-if="searchStatus == 'error'">
      <Lottie
        :options="errorDefaultOptions"
        :height="100"
        :width="100"
        :key="'error-animation'"
      />
      <span class="search-preview__error-message">
        Erro ao realizar busca ou nenhuma correspondencia</span
      >
    </template>
    <template v-else-if="searchStatus == 'loading'">
      <Lottie
        :options="loadingDefaultOptions"
        :height="400"
        :width="400"
        :key="'loading-animation'"
      />
      <span class="search-preview__loading-message"> Carregando...</span>
    </template>
    <template v-else-if="searchStatus == 'success'">
      <span class="search-preview__label"> Alguns eventos que correspondem a '{{ search }}'</span>
      <div class="search-preview__cards">
        <BaseCard
          v-for="(event, index) in events"
          :key="index"
          class="search-preview__card"
          :data="event"
          :id='event.id_evento'
        />
      </div>
      <span class="search-preview__num-results"> Foram encontrados '{{ eventsNum }}' eventos</span>
    </template>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';
import Lottie from '@/components/Lottie.vue';
import ErrorAnimation from '@/assets/animations/67782-error.json';
import LoadingAnimation from '@/assets/animations/hand-loading.json';
import { SEARCH_EVENTS_REQUEST } from '@/store/events/actions';

export default {
  name: 'HeaderSearchPreview',
  components: {
    BaseCard,
    Lottie,
  },
  data() {
    return {
      debounce: null,
      errorDefaultOptions: { animationData: ErrorAnimation },
      loadingDefaultOptions: { animationData: LoadingAnimation },
      events: [],
    };
  },
  props: {
    search: {
      Required: true,
      Type: String,
    },
  },
  computed: {
    searchStatus() {
      return this.$store.getters.searchEventsStatus;
    },
    eventsNum() {
      return this.events.length;
    },
  },
  methods: {
    searchEvents(search) {
      this.$store
        .dispatch(SEARCH_EVENTS_REQUEST, search)
        .then((data) => {
          if (data) this.events = data;
        })
        .catch((err) => {
          // show tooltip
          console.log(err);
        });
    },
    debounceSearch(search) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchEvents(search);
      }, 600);
    },
  },
  watch: {
    search: {
      immediate: true,
      handler() {
        this.debounceSearch(this.search);
      },
    },
  },
};
</script>

<style lang="scss">
.search-preview {
  $self: &;
  // @apply bg-white;
  animation: fadein 0.4s linear forwards;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 7rem;
  z-index: 5;
  // background: rgba(1, 106, 120, 0.5);
  // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  // backdrop-filter: blur(11px);
  // -webkit-backdrop-filter: blur(11px);
  // border-radius: 10px;
  // border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: 28rem;
  width: 100%;
  top: 0;
  &__label {
    margin-top: 1rem;
    align-self: flex-start;
    padding-left: 2rem;
    font-weight: bold;
    color: $dark-blue;
  }
  &__error-message {
    color: $red-error;
    font-weight: bold;
  }
  &__loading-message {
    position: relative;
    color: $dark-blue;
    font-weight: bold;
    top: -5rem;
  }
  &__cards {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    gap: 1rem;
    padding: 1.5rem;
    margin-top: 0.5rem;
    #{ $self }__card {
      flex: 1 1 auto;
      min-width: 30%;
      box-shadow: rgba(128, 128, 133, 0.2) 0px 7px 29px 0px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      max-width: 30%;
    }
  }
  &__num-results {
    margin-top: 0.5rem;
    align-self: flex-end;
    padding-right: 1rem;
    font-size: 0.75em;
    font-weight: bold;
    color: $dark-blue;
  }
}
</style>
