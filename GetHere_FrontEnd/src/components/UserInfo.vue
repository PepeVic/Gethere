<template>
  <div class="user_info">
    <div class="user_info__header">
      <div class="user_info__header_info">
        <img :src="userProfilePic" class="user_info__rounded_image" />
        <span class="user_info__centered_span">{{ userName }}</span>
      </div>
      <div class="user_info__header_separator">
        <hr />
      </div>
    </div>
    <div class="user_info__list">
      <Button
        icon="account-circle"
        text="Editar Perfil"
        viewName="Profile"
        @optionSelected="changeView"
      />
      <Button
        icon="ticket"
        text="Visualizar Atividades"
        viewName="Activities"
        @optionSelected="changeView"
      />
      <Button
        icon="calendar-edit"
        text="Criar Evento"
        viewName="UserEvents"
        @optionSelected="changeView"
      />
      <Button
        icon="keyboard-return"
        text="Voltar Home"
        viewName="Home"
        @optionSelected="changeView"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'UserInfo',
  components: {
    Button,
  },
  computed: {
    userName() {
      return this.$store.getters.userData?.nome_usuario;
    },
    userProfilePic() {
      return this.$store.getters.userData?.imagem_perfil;
    },
  },
  methods: {
    changeView(viewName) {
      this.$emit('viewChanged', viewName);
    },
  },
};
</script>

<style lang="scss">
.user_info {
  $self: &;
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100vh;
  background-color: #fff;
  &__header {
    width: 100%;
    height: 20vh;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: wrap;
  }
  &__header_info {
    display: flex;
    flex-flow: nowrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
  }
  &__header_separator {
    margin-top: 3px;
    width: 80%;
  }
  &__rounded_image {
    border-radius: 50%;
    height: 50px;
  }
  &__centered_span {

  }
  &__list {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    margin-left: 10%;
  }
}
</style>
