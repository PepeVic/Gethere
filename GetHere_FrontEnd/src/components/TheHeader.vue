// Reafatorar nomes de classe

<template>
  <header class="main-header">
    <div class="flex w-2/3 gap-4 items-center">
      <div class="logo font-bold" @click="goToHome">
        <span class="first-part">Get</span>
        <span class="second-part">here</span>
      </div>
      <form class="search-form relative flex w-full focus:w-full">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 "
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817
          4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          class="search"
          type="text"
          aria-label="Pesquisar evento"
          placeholder="Pesquisar evento"
          @input="emitSearch"
          @blur="emitNull"
        />
      </form>
    </div>
    <div
      v-if='isAuthenticated'
      class="user-actions profile-actions w-30 flex w-1/5 gap-0.25"
    >
      <button
        class="btn  profile"
        @click="goToUser"
      > Perfil </button>
      <button
        class="btn sign-out"
        @click="handleClickSignOut"
      > Sair </button>
    </div>
    <div v-else class="user-actions w-30 flex w-1/5 gap-1.5">
      <button class="btn login" @click="handleClickLogin">
        Login
      </button>
    </div>
  </header>
</template>

<script>
import { AUTH_LOGIN_REQUEST, AUTH_LOGOUT } from '@/store/auth/actions';

export default {
  name: 'Header',
  data() {
    return {
      isInit: false,
      isSignIn: false,
    };
  },
  props: {
    value: {
      required: true,
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    userData() {
      console.log(this.$store.getters.userData);
      return this.$store.getters.userData;
    },
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' });
    },
    emitSearch(search) {
      this.$emit('input', search.target.value);
    },
    emitNull() {
      setTimeout(() => {
        this.$emit('input', false);
      }, 100);
    },
    async handleClickLogin() {
      this.$gAuth
        .getAuthCode()
        .then(async () => {
          this.$store
            .dispatch(
              AUTH_LOGIN_REQUEST,
              this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse(),
            )
            .then((resp) => {
              console.log(resp);
            }).catch(() => {
              this.$toast.error('Por favor, registre-se antes');
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleClickSignIn() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          console.log('GoogleUser', GoogleUser);
          console.log('getId', GoogleUser.getId());
          console.log('getBasicProfile', GoogleUser.getBasicProfile());
          console.log('getAuthResponse', GoogleUser.getAuthResponse());
          console.log(
            'getAuthResponse',
            this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse(),
          );
          this.isSignIn = this.$gAuth.isAuthorized;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // handleClickSignOut() {
    //   this.$gAuth
    //     .signOut()
    //     .then(() => {
    //       this.isSignIn = this.$gAuth.isAuthorized;
    //       this.$store.dispatch(AUTH_LOGOUT);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    handleClickSignOut() {
      this.$store.dispatch(AUTH_LOGOUT);
      // this.$router.push({ name: 'Home' });
    },
    goToUser() {
      this.$router.push({ name: 'User' });
    },

  },
  created() {
    const that = this;
    const checkGauthLoad = setInterval(() => {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
.main-header {
  @apply relative flex gap-4 items-center justify-between bg-white;
  padding: 1.5rem 1.2rem 1.5rem;
  flex-shrink: 0;
  box-shadow: rgba(128, 128, 133, 0.2) 0px 7px 29px 0px;
  z-index: 10;
  .logo {
    font-size: 2em;
    cursor: pointer;
    .firs-part {
      color: $dark_blue;
    }
    .second-part {
      color: $baby_blue;
    }
  }
  .search-form {
    .search {
      @apply flex w-2/4 text-sm text-black bg-gray-100 placeholder-gray-500 border border-gray-200
        rounded-md py-2 pl-10 focus:bg-gray-200 focus:text-blue-dark
        focus:placeholder-gray-400 outline-none;
      &:focus {
        transition: all 0.3s ease-in-out;
        width: 100%;
      }
    }
  }
  .user-actions {
    .btn {
      @apply w-1/2 flex items-center justify-center font-bold rounded-full;
      &.sign-in {
        @apply text-gray-400;
      }
      &.login {
        @apply text-white rounded;
        background: linear-gradient(160deg, $baby_blue 25%, $mid_blue 80%, $dark_blue 100%);
      }
      &.profile {
        width: 25%;
      }
      &.sign-out {
        width: 25%;
        font-weight: normal;
      }
      padding: 0.3rem;
    }
    &.profile-actions {
      justify-content: flex-end;
    }
  }
}
</style>
