<template>
    <div class="button" @click="changeView">
        <span :class="icon_class"></span>
        <span style="width: 100%; text-align: left; margin-left: 10%">{{text}}</span>
    </div>
</template>

<script>
export default {
  data() {
    return {
      icon_class: `mdi mdi-24px mdi-${this.icon}`,
    };
  },
  props: {
    icon: {
      Type: String,
      Required: true,
    },
    text: {
      Type: String,
      Required: true,
    },
    viewName: {
      Type: String,
      Required: true,
    },
  },
  methods: {
    changeView() {
      this.$emit('optionSelected', this.viewName);
    },
  },
};
</script>

<style lang="scss">
    .button {
        $self: &;
        display: flex;
        align-items: center;
        width: 100%;
        padding-bottom: 5%;
        padding-top: 5%;
        transition-duration: 0.4s;
        &:hover {
            background-color: #dee2e6;
            cursor: pointer;
        }
    }
</style>
