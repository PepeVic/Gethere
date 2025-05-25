<template>
    <div class="user">
      <div class="user__content">
          <UserInfo class="user__sidebar" @viewChanged="setCurrentView"/>
          <router-view></router-view>
      </div>
          <TheFooter class="user__footer"/>
    </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
import TheFooter from '../components/TheFooter.vue';

export default {
  components: {
    TheFooter,
    UserInfo,
  },
  methods: {
    setCurrentView(viewName) {
      this.$router.push({ name: viewName });
    },
  },
  mounted() {
    this.$router.push({ name: 'Profile' });
  },
};
</script>

<style lang='scss'>
.user {
  $self: &;
  display: flex;
  flex-direction: column;
  height: 100vh;
  &__content {
    display: flex;
    flex: 1 0 auto;
    #{ $self }__sidebar {
    }
  }
  &__footer {
    margin: 0;
  }
}
</style>
