<template>
  <div>
    <VueMultiselect
      v-if="isSearch"
      class="form-type-select"
      :value="value"
      :options="options"
      @input="
        item => {
          this.$emit('input', item);
        }
      "
      @close="item => $emit('close', item)"
      :multiple="multiple"
      :clear-on-select="false"
      :close-on-select="!multiple"
      :limit="1"
      open-direction="bottom"
      :arrow="false"
      :track-by="trackBy"
      :label="label"
      :disabled="disabled"
      select-label="selecionar"
      selected-label="selecionado"
      deselect-label="remover"
      :placeholder="placeholder"
      :preselect-first="false"
      :internalSearch="false"
      @search-change="debounceSearch($event)"
      :loading="loading"
    >
      <template slot="tag">
        <span></span>
      </template>
      <template slot="caret" slot-scope="{ toggle }">
        <span class="search" @mousedown.prevent.stop="toggle">
          <i class="fas fa-search"></i>
        </span>
      </template>
      <template slot="limit">
        <span></span>
      </template>
      <template slot="selection" slot-scope="{ values, isOpen }">
        <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen"
          >{{ optionLength }} {{ optionLength > 1 ? selectionTitle + "s" : selectionTitle }}</span
        >
      </template>
      <template slot="noResult">
        Nenhuma opção encontrada
      </template>
      <template slot="noOptions">
        Nenhuma opção encontrada
      </template>
    </VueMultiselect>
    <VueMultiselect
      v-else
      class="form-type-select"
      :options="options"
      :value="value"
      @input="item => $emit('input', item)"
      @close="item => $emit('close', item)"
      :multiple="multiple"
      :clear-on-select="false"
      :close-on-select="true"
      :arrow="false"
      :track-by="trackBy"
      :label="label"
      :disabled="disabled"
      select-label="selecionar"
      selected-label="selecionado"
      deselect-label="remover"
      :placeholder="placeholder"
      :loading="loading"
    >
      <template slot="noResult">
        Nenhuma opção encontrada
      </template>
      <template slot="noOptions">
        Nenhuma opção encontrada
      </template>
    </VueMultiselect>
  </div>
</template>
<script>
import VueMultiselect from 'vue-multiselect';

export default {
  name: 'BaseMultiselect',
  components: {
    VueMultiselect,
  },
  props: {
    isSearch: {
      type: Boolean,
      deafult: false,
    },
    options: {
      type: Array,
      required: true,
    },
    trackBy: {
      type: String,
      default: 'value',
    },
    label: {
      type: String,
      default: 'text',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    selectionTitle: {
      type: String,
      default: 'Value',
    },
    placeholder: {
      type: String,
      default: 'Selecionar',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      required: true,
    },
    selectType: {
      type: String,
      default: 'item',
    },
  },
  data() {
    return {
      debounce: null,
    };
  },
  computed: {
    optionLength() {
      return this.value.length;
    },
  },
  methods: {
    debounceSearch(search) {
      // this.$emit('input-search', search);
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit('debounce-search', search);
      }, 600);
    },
  },
};
</script>

<style lang="scss">
// Change Multiselect css
.multiselect {
  input {
    border: none;
  }
  .search {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #adadad;
    width: 40px;
    height: 38px;
    right: 1px;
    top: 1px;
    padding: 4px 8px;
  }
  .multiselect__single {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    line-height: 1.5 !important;
    font-size: 0.8rem;
  }
  .multiselect__content-wrapper {
    min-width: 100%;
    font-size: 0.8rem;
    width: fit-content;
    max-width: 280px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .multiselect__tags {
    min-height: 38px;
    height: 38px;
    font-size: 0.8rem;
    .multiselect__placeholder,
    .multiselect__input,
    .multiselect__single {
      font-size: 0.8rem;
    }
  }
  &.no-tags {
    .multiselect__tags-wrap {
      display: none;
    }
  }
}
</style>
