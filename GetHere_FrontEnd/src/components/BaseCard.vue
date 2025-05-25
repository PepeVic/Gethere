<template>
  <div :class="['base-card', { 'base-card--loading': isLoading }]" @click="selectEvent">
    <span class="base-card__title"> {{ data.nome_evento }} </span>
    <p class="base-card__description">
      {{ data.descricao_evento }}
    </p>
    <div class="base-card__capacity">
      Capacidade: <span>{{ data.capacidade_evento }}</span>
    </div>
    <span class="base-card__site">
      {{ data.site_evento }}
    </span>
  </div>
</template>

<script>
import { SELECT_EVENT } from '@/store/events/actions';

export default {
  name: 'BaseCard',
  data() {
    return {};
  },
  props: {
    isLoading: {
      Type: Boolean,
      Default: false,
    },
    id: {
      Required: true,
    },
    data: {
      default: [],
    },
  },
  methods: {
    selectEvent() {
      if (!this.isLoading) {
        this.$store.dispatch(SELECT_EVENT, this.id);
      }
    },
  },
};
</script>

<style lang="scss">
.base-card {
  @apply rounded-sm h-48;
  position: relative;
  background-color: #0ab8ba;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  padding: 1rem;
  text-align: justify;
  color: white;
  &::after {
    content: "";
    @apply rounded-sm h-48;
    position: absolute;
    background-color: $dark-blue;
    top: 8px;
    left: 8px;
    right: -8px;
    bottom: -8px;
    z-index: -1;
  }
  &--loading {
    animation: pulse 2s infinite ease-in-out;
  }
  &__title {
    color: white;
    text-shadow: rgb(128, 128, 128) 1px 0px 0px, rgb(128, 128, 128) 0.540302px 0.841471px 0px,
      rgb(128, 128, 128) -0.416147px 0.909297px 0px, rgb(128, 128, 128) -0.989992px 0.14112px 0px,
      rgb(128, 128, 128) -0.653644px -0.756802px 0px, rgb(128, 128, 128) 0.283662px -0.958924px 0px,
      rgb(128, 128, 128) 0.96017px -0.279416px 0px;
    font-weight: bold;
    font-size: 1.2em;
  }
  &__description {
    overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
           line-clamp: 2;
   -webkit-box-orient: vertical;
  }
  &__capacity {
    span {
      font-weight: bold;
    }
  }
  &__site {
    color: $white;
    text-align: end;
  }
}
</style>
