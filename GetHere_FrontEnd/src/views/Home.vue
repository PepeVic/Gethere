<template>
  <div class="home sticky">
    <TheHeader v-model='searchEvent'/>
    <HeaderSearchPreview v-if="showPreviewSearch" :search="searchEvent"/>
    <div class="home__content">
      <TheBanner/>
      <FeaturedEvents />
    </div>
    <BaseCardModal />
    <TheFooter />
  </div>
</template>

<script>
import { SET_SEARCH_STATUS } from '@/store/events/actions';
import TheHeader from '@/components/TheHeader.vue';
import HeaderSearchPreview from '@/components/HeaderSearchPreview.vue';
import TheBanner from '@/components/TheBanner.vue';
import BaseCardModal from '@/components/BaseCardModal.vue';
import TheFooter from '../components/TheFooter.vue';
import FeaturedEvents from '../components/FeaturedEvents.vue';

export default {
  name: 'Home',
  data() {
    return {
      searchEvent: null,
    };
  },
  computed: {
    showPreviewSearch() {
      return !!this.searchEvent;
    },
  },
  components: {
    TheHeader,
    HeaderSearchPreview,
    TheBanner,
    BaseCardModal,
    TheFooter,
    FeaturedEvents,
  },
  watch: {
    searchEvent: {
      handler() {
        this.$store.dispatch(SET_SEARCH_STATUS, 'loading');
      },
    },
  },
};
</script>
