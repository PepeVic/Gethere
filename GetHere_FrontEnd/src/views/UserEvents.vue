//temp

<template>
  <div class="user-events">
    <div>
      <h2>Criar um local</h2>
      <div class="user-events__form">
        <BaseMultiselect
          class="user-events__multiselect"
          :placeholder="'Escolher endereço'"
          v-model="local.id_endereco"
          :options="addresses"
        />
        <input
          v-model="local.tipo"
          class="user-events__input"
          placeholder="Nome do tipo"
          type="text"
        />
        <input
          v-model="local.nome"
          class="user-events__input"
          placeholder="Nome do local"
          type="text"
        />
        <input
          v-model="local.capacidade"
          class="user-events__input"
          placeholder="Capacidade"
          type="number"
        />
        <button class="user-events__send-btn" @click="createLocal">
          Criar local
        </button>
      </div>
    </div>
    <div>
      <h2>Criar um endereço</h2>
      <div class="user-events__form">
        <input
          v-model="address.bairro"
          class="user-events__input"
          placeholder="Bairro"
          type="text"
        />
        <input
          v-model="address.cidade"
          class="user-events__input"
          placeholder="Cidade"
          type="text"
        />
        <input
          v-model="address.estado"
          class="user-events__input"
          placeholder="Estado"
          type="text"
        />
        <input
          v-model="address.logradouro"
          class="user-events__input"
          placeholder="Logradouro"
          type="text"
        />
        <input v-model="address.cep" class="user-events__input" placeholder="CEP" type="text" />
        <input
          v-model="address.numero"
          class="user-events__input"
          placeholder="Numero"
          type="text"
        />
        <button @click="createAddress" class="user-events__send-btn">
          Criar endereço
        </button>
      </div>
    </div>
    <div>
      <h2>Criar um categoria</h2>
      <div class="user-events__form">
        <input
          v-model="categoria.categoria"
          class="user-events__input"
          placeholder="Nome da categoria"
          type="text"
        />
        <button @click="createCategories" class="user-events__send-btn">
          Criar categoria
        </button>
      </div>
    </div>
    <div>
      <h2>Criar apresentador</h2>
      <div class="user-events__form">
        <BaseMultiselect
          class="user-events__multiselect"
          :placeholder="'Escolher ramo'"
          v-model="host.id_ramo"
          :options="ramosHost"
        />
        <input
          v-model="host.nome"
          class="user-events__input"
          placeholder="Nome do apresentador"
          type="text"
        />
        <button @click="createHost" class="user-events__send-btn">
          Criar apresentador
        </button>
      </div>
    </div>
    <div>
      <h2>Criar ramo apresentador</h2>
      <div class="user-events__form">
        <input
          v-model="ramoHost.ramo"
          class="user-events__input"
          placeholder="Nome da categoria"
          type="text"
        />
        <button @click="createRamoHost" class="user-events__send-btn">
          Criar ramo apresentador
        </button>
      </div>
    </div>
    <div>
      <h2>Criar um evento</h2>
      <div class="user-events__form">
        <input
          v-model="data.nome_evento"
          class="user-events__input"
          placeholder="Nome do evento"
          type="text"
        />
        <input
          v-model="data.site_evento"
          class="user-events__input"
          placeholder="Site do evento"
          type="text"
        />
        <input
          v-model="data.descricao_evento"
          class="user-events__input"
          placeholder="Descrição do evento"
          type="text"
        />
        <input
          v-model="data.capacidade_evento"
          class="user-events__input"
          placeholder="Capacidade do evento"
          type="number"
        />
        <BaseMultiselect
          class="user-events__multiselect"
          :placeholder="'Escolher grupo'"
          v-model="data.id_grupo"
          :options="groups"
        />
        <div class="user-events__activities">
          <div v-for="(activity, index) in activities" :key="index" class="user-events__activity">
            <input
              v-model="activities[index].nome_atividade"
              class="user-events__input"
              placeholder="Nome da atividade"
              type="text"
            />
            <input
              v-model="activities[index].data_inicial"
              class="user-events__input"
              placeholder="Data inicial"
              type="Date"
            />
            <input
              v-model="activities[index].data_final"
              class="user-events__input"
              placeholder="Data final"
              type="Date"
            />
            <input
              v-model="activities[index].descricao_atividade"
              class="user-events__input"
              placeholder="Descrição"
              type="text"
            />
            <input
              v-model="activities[index].capacidade_participantes"
              class="user-events__input"
              placeholder="Capacidade"
              type="number"
            />

            <BaseMultiselect
              class="user-events__multiselect"
              :placeholder="'Escolher categoria'"
              v-model="activities[index].categories"
              :options="categories"
            />
            <BaseMultiselect
              class="user-events__multiselect"
              :placeholder="'Escolher local'"
              v-model="activities[index].local"
              :options="locals"
            />
            <BaseMultiselect
              class="user-events__multiselect"
              :placeholder="'Escolher apresentador'"
              v-model="activities[index].host"
              :options="hosts"
            />
          </div>
          <button class="user-events__add-btn" @click="addActivity">
            Adicionar atividade
          </button>
        </div>
        <button @click="createEvent" class="user-events__send-btn">
          Criar evento
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMultiselect from '@/components/BaseMultiselect.vue';
import {
  LIST_GROUPS,
  CREATE_EVENT,
  CREATE_GROUPS,
  LIST_CATEGORIES,
  CREATE_CATEGORIES,
  LIST_HOST,
  CREATE_HOST,
  LIST_RAMO_HOST,
  CREATE_RAMO_HOST,
  LIST_LOCAL,
  CREATE_LOCAL,
  LIST_ADDRESS,
  CREATE_ADDRESS,
} from '@/store/events/actions';

export default {
  name: 'UserEvents',
  components: {
    BaseMultiselect,
  },
  data() {
    return {
      groups: [],
      data: {
        id_empresa: 1,
        id_grupo: '',
        site_evento: '',
        descricao_evento: '',
        nome_evento: '',
        capacidade_evento: '',
        id_sede: 1,
      },
      local: {
        id_endereco: '',
        tipo: '',
        nome: '',
        capacidade: 0,
      },
      address: {
        bairro: '',
        cidade: '',
        estado: '',
        logradouro: '',
        cep: '',
        numero: '',
      },
      ramosHost: [],
      ramoHost: {
        ramo: '',
      },
      host: {
        id_ramo: '',
        nome: '',
      },
      hosts: [],
      activities: [],
      addresses: [],
      locals: [],
      categoria: {
        categoria: '',
      },
      categories: [],
      activityDeafault: {
        nome_atividade: '',
        data_inicial: '',
        data_final: '',
        capacidade_participantes: '',
        descricao_atividade: '',
        id_categoria: '',
        local: null,
        host: null,
        group: null,
      },
    };
  },
  methods: {
    getGroups() {
      this.$store.dispatch(LIST_GROUPS).then(({ events }) => {
        this.groups = events.map((event) => ({
          text: event.categoria,
          value: event.id_categoria,
        }));
      });
    },
    getHost() {
      this.$store.dispatch(LIST_HOST).then((hosts) => {
        this.hosts = hosts.map((host) => ({
          text: host.nome,
          value: host.id_apresentador,
        }));
      });
    },
    getRamoHost() {
      this.$store.dispatch(LIST_RAMO_HOST).then(({ hostBranches }) => {
        this.ramosHost = hostBranches.map((event) => ({
          text: event.ramo,
          value: event.id_ramo,
        }));
      });
    },
    getLocal() {
      this.$store.dispatch(LIST_LOCAL).then((data) => {
        console.log(data);
        this.locals = data.map((event) => ({
          text: event.nome,
          value: event.id_local,
        }));
      });
    },
    getAddress() {
      this.$store.dispatch(LIST_ADDRESS).then(({ adresses }) => {
        this.addresses = adresses.map((address) => ({
          text: `${address.cidade}, ${address.estado}, ${address.bairro},`,
          value: address.id_endereco,
        }));
      });
    },
    getCategories() {
      this.$store.dispatch(LIST_CATEGORIES).then(({ events }) => {
        this.categories = events.map((event) => ({
          text: event.categoria,
          value: event.id_categoria,
        }));
      });
    },
    createEvent() {
      this.data.id_grupo = this.data.id_grupo?.value;
      const atividades = this.activities.map((atividade) => ({
        nome_atividade: atividade.nome_atividade,
        data_inicial: atividade.data_inicial,
        data_final: atividade.data_final,
        capacidade_participantes: atividade.capacidade_participantes,
        descricao_atividade: atividade.descricao_atividade,
        id_categoria: atividade.categories.value,
        locais: [{ id_local: atividade.local.value }],
        apresentadores: [{ id_apresentador: atividade.host.value }],
      }));
      const body = {
        evento: {
          ...this.data,
        },
        atividades,
      };
      this.$store
        .dispatch(CREATE_EVENT, body)
        .then(() => {
          this.$toast.success('Evento criado com sucesso');
        })
        .catch(() => {
          this.$toast.error('Erro ao criar evento');
        });
    },
    createGroup() {
      this.$store.dispatch(CREATE_GROUPS).then(({ events }) => {
        this.groups = events.map((event) => ({
          text: event.categoria,
          value: event.id_categoria,
        }));
      });
    },
    createCategories() {
      this.$store.dispatch(CREATE_CATEGORIES, this.categoria).then(() => {
        this.$toast.success('Categoria criada com sucesso');
      });
    },
    createHost() {
      this.host.id_ramo = this.host.id_ramo?.value;
      this.$store.dispatch(CREATE_HOST, this.host).then(() => {
        this.$toast.success('Apresentador criado com sucesso');
      });
    },
    createRamoHost() {
      this.$store.dispatch(CREATE_RAMO_HOST, this.ramoHost).then(() => {
        this.$toast.success('Ramo criado com sucesso');
      });
    },
    createLocal() {
      this.local.id_endereco = this.local.id_endereco?.value;
      this.$store.dispatch(CREATE_LOCAL, this.local).then(({ events }) => {
        this.groups = events.map((event) => ({
          text: event.categoria,
          value: event.id_categoria,
        }));
      });
    },
    createAddress() {
      this.$store.dispatch(CREATE_ADDRESS, this.address).then(() => {
        this.$toast.success('Endereço criado com sucesso');
      });
    },
    addActivity() {
      this.activities.push(JSON.parse(JSON.stringify(this.activityDeafault)));
    },
  },
  created() {
    this.getGroups();
    this.getCategories();
    this.getLocal();
    this.getAddress();
    this.getRamoHost();
    this.getHost();
    this.getCategories();
  },
};
</script>

<style lang="scss">
.user-events {
  $self: &;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem 0 1rem;
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 3rem 3rem;
    #{ $self }__input {
      padding: 0.25rem 1rem 0.25rem;
      border: 1px solid $mid-blue;
      border-radius: 5px;
    }
    #{ $self }__multiselect {
      border: 1px solid $mid-blue;
      border-radius: 5px;
    }
    #{ $self }__add-btn {
      font-weight: bold;
      padding: 0.25rem 1rem 0.25rem;
      color: white;
      background-color: rgb(211, 145, 24);
      border-radius: 5px;
      &:hover {
        background-color: rgb(131, 92, 19);
      }
    }
    #{ $self }__activities {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: rgb(163, 163, 163);
      padding: 1rem;
      #{ $self }__activity {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        border-radius: 10px;
        gap: 1rem;
        padding: 1rem;
        background-color: rgb(255, 241, 214);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
    }
    #{ $self }__send-btn {
      font-weight: bold;
      padding: 0.25rem 1rem 0.25rem;
      color: white;
      background-color: $mid-blue;
      border-radius: 5px;
      &:hover {
        background-color: $dark-blue;
      }
    }
  }
}
</style>
