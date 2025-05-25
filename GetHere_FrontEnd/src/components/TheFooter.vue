<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__sections">
        <section
          v-for="(section, index) in sections"
          :key="index"
          class="footer__section"
        >
          <h3> {{section.title }} </h3>
          <ul class="footer__section-list">
            <li
              v-for="(item, index) in section.items"
              :key="`${index}-item`"
            >
              {{item.label}}
            </li>
          </ul>
        </section>
      </div>
      <section class="footer__base">
        <div class="footer__info">
          © 2022 GetHere, Inc. · Privacidade · Termos · Mapa do site · Informações da empresa
        </div>
        <div class="footer__media">
        </div>
      </section>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      sections: [
        {
          title: 'Atendimento',
          items: [
            {
              label: 'Central de ajuda',
            },
            {
              label: 'Informações de segurança',
            },
            {
              label: 'Denuncie',
            },
          ],
        },
        {
          title: 'Criadores',
          items: [
            {
              label: 'Antonio Souza',
            },
            {
              label: 'Pedro Fonseca',
            },
            {
              label: 'Victor Ribeiro',
            },
            {
              label: 'Matheus Moreira',
            },
          ],
        },
        {
          title: 'Eventos',
          items: [
            {
              label: 'Principais eventos',
            },
            {
              label: 'Noticias',
            },
            {
              label: 'Fórum',
            },
            {
              label: 'Crie seu evento',
            },
          ],
        },
        {
          title: 'Sobre',
          items: [
            {
              label: 'Carreiras',
            },
            {
              label: 'Tecnologias',
            },
            {
              label: 'Universidade de São Paulo',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.footer {
  $self: &;
  flex-shrink: 0;
  margin-top: 8rem;
  height: 300px;
  background-color: $dark-blue;
  padding: 1rem 5rem 0;
  color: white;
  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    #{ $self }__sections {
      display: flex;
      align-items: center;
      padding-top: 2rem;
      width: 100%;
      #{ $self }__section {
        flex: 1 0 0%;
        padding: 0 1rem 0;
        text-align: justify;
        h3 {
          font-weight: bold;
        }
        #{ $self }__section-list {
          list-style: none;
          font-size: 0.9em;
          li {
            margin-top: 10px;
          }
        }
      }
    }
    #{ $self }__base {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-size: 0.9em;
      border-top: 1px solid white;
    }
  }
}
</style>
