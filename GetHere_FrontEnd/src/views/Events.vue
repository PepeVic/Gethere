<template>
  <div class="events sticky">
    <TheHeader v-model='searchEvent'/>
    <div class="events__content">
      <EventsList :search="searchEvent" />
    </div>
    <BaseCardModal />
    <TheFooter />
  </div>
</template>

<script>
import BaseCardModal from '@/components/BaseCardModal.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import EventsList from '../components/EventsList.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
    EventsList,
    BaseCardModal,
  },
  data() {
    return {
      searchEvent: null,
    };
  },
};
</script>

<style lang='scss'>
.events {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: $background-color;
  &__content {
    flex: 1 0 auto;
  }
}
</style>
