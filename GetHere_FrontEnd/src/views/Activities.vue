<template>
  <div class="activities">
    <BaseLoader
      v-if="isLoading"
      class="activities__center"
    />
    <div v-else-if="cards.length > 0" class="activities__card-container">
      <BaseCard
        v-for="(card, index) in cards"
        :key="index"
        :data="card"
        :id="card.id_evento"
      />
    </div>
    <div class="activities__center" v-else>
      <span> Você não esta inscrito em nenhuma atividade</span>
    </div>
    <BaseCardModal />
  </div>
</template>

<script>
import {
  PROFILE_ACTIVITIES_REQUEST,
} from '@/store/profile/actions';
import BaseLoader from '@/components/BaseLoader.vue';
import BaseCard from '@/components/BaseCard.vue';
import BaseCardModal from '@/components/BaseCardModal.vue';

export default {
  name: 'Activities',
  components: {
    BaseLoader,
    BaseCard,
    BaseCardModal,
  },
  computed: {
    isLoading() {
      return this.$store.getters.profileActivitiesStatus === 'loading';
    },
  },
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    getEvents() {
      this.$store.dispatch(PROFILE_ACTIVITIES_REQUEST).then((events) => {
        this.cards = events;
      })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getEvents();
  },
};
</script>

<style lang='scss'>
.activities {
  $self: &;
  display: flex;
  width: 80%;
  &__center {
    align-self: center;
    margin-right: auto;
    margin-left: auto;
  }
  &__card-container {
    @apply relative grid grid-cols-3 gap-7 p-10 mt-4 mb-8 overflow-hidden;
      #{ $self }__card {
      }
  }
}
</style>
