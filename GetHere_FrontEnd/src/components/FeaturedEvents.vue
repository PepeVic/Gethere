<template>
  <section class="featured-events">
    <h2 class="featured-events__title">Principais eventos</h2>
    <div class="featured-events__card-container">
      <BaseCard
        v-for="(card, index) in featuredCards"
        :key="index"
        :isLoading='isLoading'
        :data='card'
        :id='card.id_evento'
      ></BaseCard>
      <div class="featured-events__limit">

      </div>
    </div>
    <button
      class="featured-events__btn"
      @click='goToEvents'
      @mouseover="playAnimation"
      @mouseleave="pauseAnimation"
    >
      Descubra mais eventos
      <Lottie :options="defaultOptions" :height="40" :width="50" @animCreated="handleAnimation" />
    </button>
  </section>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';
import ArrowAnimation from '@/assets/animations/lf20_faorml1q.json';
import Lottie from '@/components/Lottie.vue';
import { FEATURED_EVENTS_REQUEST } from '@/store/events/actions';

export default {
  name: 'FeaturedEvents',
  components: {
    Lottie,
    BaseCard,
  },
  data() {
    return {
      defaultOptions: { animationData: ArrowAnimation, autoplay: false },
      animationSpeed: 1,
      featuredCards: [],
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.featuredEventsStatus === 'loading';
    },
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
    },
    playAnimation() {
      console.log('anim', this.anim);
      this.anim.play();
    },
    pauseAnimation() {
      this.anim.pause();
    },
    onSpeedChange() {
      this.anim.setSpeed(this.animationSpeed);
    },
    getFeaturedEvents() {
      this.$store.dispatch(FEATURED_EVENTS_REQUEST, { page: 1, size: 9 })
        .then((data) => {
          if (data) this.featuredCards = data.events;
          console.log(data);
        }).catch((err) => {
        // show tooltip
          console.log(err);
        });
    },
    goToEvents() {
      this.$router.push({ name: 'Events' });
    },
  },
  created() {
    this.getFeaturedEvents();
  },
};
</script>

<style lang="scss">
.featured-events {
  $self: &;
  @apply flex flex-col mt-24 mb-12;
  &__title {
    @apply text-xl text-gray-600 font-bold;
  }
  &__card-container {
    max-height: 550px;
    @apply relative grid grid-cols-3 gap-7 p-10 mt-4 mb-8 overflow-hidden;
    #{ $self }__limit {
      @apply absolute h-24 w-full bottom-0;
      background: linear-gradient(to top, #FAFAFA 0%, rgba(255, 255, 255, 0) 100%);
    }
  }
  &__btn {
    @apply flex items-center w-1/5 gap-4 self-center
    bg-gradient-to-r border-2 rounded font-bold
    border-blue-dark text-blue-dark hover:border-blue-light pr-4 pl-4;
  }
}
</style>
