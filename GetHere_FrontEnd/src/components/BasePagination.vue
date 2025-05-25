<template>
  <div class="container">
    <section>
      <ul class="list">
        <li class="item" v-if="hasPrev()">
          <a href="#" @click.prevent="changePage(prevPage)">
            <div class="circle arrow">
              <div>
                <ArrowIcon class="prev-icon" />
              </div>
            </div>
          </a>
        </li>
        <li class="item" v-if="hasFirst()">
          <div
            :class="`circle ${current == 1 ? 'active' : ''}`"
            @click="changePage(1)"
          >
            <span>1</span>
          </div>
        </li>
        <li class="item" v-if="hasFirst()">...</li>
        <li class="item" v-for="page in pages" :key="page">
          <div
            :class="`circle ${current == page ? 'active' : ''}`"
            @click="changePage(page)"
          >
            <span>{{ page }}</span>
          </div>
        </li>
        <li class="item" v-if="hasLast()">...</li>
        <li class="item" v-if="hasLast()">
          <div
            :class="`circle ${current == totalPages ? 'active' : ''}`"
            @click="changePage(totalPages)"
          >
            <span>
              {{ totalPages }}
            </span>
          </div>
        </li>
        <li class="item" v-if="hasNext()">
          <div class="circle arrow" @click="changePage(nextPage)">
            <div>
              <ArrowIcon class="next-icon" />
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ArrowIcon from '@/assets/icons/ic_page_arrow.svg';

export default {
  name: 'EventsList',
  components: {
    ArrowIcon,
  },
  props: {
    current: {
      Type: Number,
      default: 1,
    },
    total: {
      Type: Number,
      default: 1,
    },
    perPage: {
      Type: Number,
      default: 1,
    },
    pageRange: {
      Type: Number,
      default: 1,
    },
  },
  data() {
    return {

    };
  },
  computed: {
    pages() {
      const pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i += 1) {
        pages.push(i);
      }
      return pages;
    },
    rangeStart() {
      const start = this.current - this.pageRange;
      return start > 0 ? start : 1;
    },
    rangeEnd() {
      const end = this.current + this.pageRange;
      return end < this.totalPages ? end : this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    nextPage() {
      return this.current + 1;
    },
    prevPage() {
      return this.current - 1;
    },
  },
  methods: {
    hasFirst() {
      return this.rangeStart !== 1;
    },
    hasLast() {
      return this.rangeEnd < this.totalPages;
    },
    hasPrev() {
      return this.current > 1;
    },
    hasNext() {
      return this.current < this.totalPages;
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    },
  },
};

</script>
<style lang="scss">
.container {
    display: flex;
    justify-content: center;
    .list {
        display: flex;
        align-items: center;
        gap: 1rem;
        li {
            display: inline;
        }
    }
    .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        font-size: 12px;
        font-weight: bold;
        border-radius: 50%;
        background: white;
        padding: 16px;
        border: 0.849265px solid #DFE3E8;
        color: $dark-blue;
        cursor: pointer;
        &.active {
            background: $dark-blue;
            color: white;
        }
        &.arrow {
            background: #C4C4C4;
            .next-icon {
                transform: rotate(180deg);
            }
        }
    }
}
</style>
