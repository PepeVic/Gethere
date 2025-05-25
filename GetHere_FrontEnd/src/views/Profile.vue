<template>
  <div class="w-1/2 p-4 self-center shadow-md mr-auto ml-auto bg-white">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="
            block
            uppercase
            tracking-wide
            text-gray-700 text-xs
            font-bold
            mb-2
          "
          for="grid-first-name"
        >
          Nome
        </label>
        <input
          class="
            appearance-none
            block
            w-full
            bg-gray-200
            text-gray-700
            border border-gray-200
            rounded
            py-3
            px-4
            leading-tight
            focus:outline-none focus:bg-white focus:border-gray-500
          "
          v-model='tempData.nome_usuario'
          id="grid-first-name"
          type="text"
          placeholder="Jane"
        />
        <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="
            block
            uppercase
            tracking-wide
            text-gray-700 text-xs
            font-bold
            mb-2
          "
          for="grid-last-name"
        >
          CPF
        </label>
        <input
          class="
            appearance-none
            block
            w-full
            bg-gray-200
            text-gray-700
            border border-gray-200
            rounded
            py-3
            px-4
            leading-tight
            focus:outline-none focus:bg-white focus:border-gray-500
          "
          v-model='tempData.cpf'
          id="grid-last-name"
          type="text"
          placeholder="Doe"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="
            block
            uppercase
            tracking-wide
            text-gray-700 text-xs
            font-bold
            mb-2
          "
          for="grid-state"
        >
          Data de Nascimento
        </label>
        <input
          class="
            appearance-none
            block
            w-full
            bg-gray-200
            text-gray-700
            border border-gray-200
            rounded
            py-3
            px-4
            leading-tight
            focus:outline-none focus:bg-white focus:border-gray-500
          "
          v-model="tempData.data_nascimento"
          id="grid-state"
          type="date"
          placeholder="90210"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:1/2">
            <button
                class="
                bg-transparent
                hover:bg-blue-dark
                text-blue-dark
                font-semibold
                hover:text-white
                py-2
                px-4
                border border-blue-dark
                hover:border-transparent
                rounded
                "
                @click="saveProfile"
            >
                Salvar
            </button>
        </div>
    </div>
  </div>
</template>

<script>

import { UPDATE_PROFILE } from '@/store/profile/actions';

export default {
  name: 'Profile',
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
  data() {
    return {
      tempData: null,
    };
  },
  methods: {
    saveProfile() {
      if (!this.tempData.cpf) {
        this.$toast.error('Por favor preencha o cpf');
        return;
      }
      if (!this.tempData.nome_usuario) {
        this.$toast.error('Por favor preencha o nome do usuario');
        return;
      }
      this.$store.dispatch(UPDATE_PROFILE, this.tempData)
        .then(() => {
          this.$toast.success('Dados atualizados com sucesso');
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tempData = JSON.parse(JSON.stringify(this.userData));
    });
  },
};
</script>

<style lang="scss">
.profile-form {
  margin: 0 auto;
  width: 100%;
  align-items: center;
}
</style>
