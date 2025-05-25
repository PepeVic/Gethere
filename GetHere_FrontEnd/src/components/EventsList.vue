<template>
  <div class="events-list">
    <BaseLoader v-if="isLoading" class="events-list__loader"/>
    <section v-else class="events-list__cards-container">
      <div class="events-list__cards">
        <BaseCard
          v-for="(card, index) in cards"
          :key="index"
          :data="card"
          :id="card.id_evento"
          class="events-list__card"
        />
      </div>
      <BasePagination
        v-if="cards.length != 0 && !isSearch"
        :current="params.page"
        :total="totalPages"
        :per-page="params.size"
        @page-changed="changePage"
      />
    </section>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import BasePagination from '@/components/BasePagination.vue';
import { FEATURED_EVENTS_REQUEST, SEARCH_EVENTS_REQUEST } from '@/store/events/actions';

export default {
  name: 'EventsList',
  components: {
    BaseCard,
    BaseLoader,
    BasePagination,
  },
  props: {
    search: {
      default: '',
      Type: String,
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.featuredEventsStatus === 'loading';
    },
  },
  data() {
    return {
      cards: [],
      params: {
        page: 1,
        size: 12,
      },
      totalPages: 0,
      isSearch: false,
    };
  },
  methods: {
    getEvents() {
      this.$store
        .dispatch(FEATURED_EVENTS_REQUEST, { page: this.params.page, size: this.params.size })
        .then(({ total, events }) => {
          this.totalPages = total;
          this.cards = events;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePage(page) {
      this.params.page = page;
      this.getEvents();
    },
    resetsParams() {
      this.params = {
        page: 1,
        size: 12,
      };
    },
    searchEvents(search) {
      this.$store
        .dispatch(SEARCH_EVENTS_REQUEST, search)
        .then((data) => {
          if (data) this.cards = data;
        })
        .catch((err) => {
          // show tooltip
          console.log(err);
        });
    },
    debounceSearch(search) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        if (search === '') {
          this.isSearch = false;
          this.resetsParams();
          this.$nextTick(() => {
            this.getEvents();
          });
          return;
        }
        this.isSearch = true;
        this.searchEvents(search);
      }, 600);
    },
  },
  watch: {
    search: {
      handler() {
        console.log(this.search);
        this.debounceSearch(this.search);
      },
    },
  },
  created() {
    this.getEvents();
  },
};
</script>

<style lang="scss">
.events-list {
  $self: &;
  &__loader {
    margin-top: 4rem;
  }
  &__cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    #{ $self }__cards {
      @apply relative grid grid-cols-3 gap-7 p-10 mt-4 mb-8 overflow-hidden;
      #{ $self }__card {
        min-width: 35%;
      }
    }
  }
}
</style>
