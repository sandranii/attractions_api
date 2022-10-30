<template>
  <div class="home">
    <nav>
      <ul>
        <li
          v-for="page in pagination"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="triggerPage(page)"
        >
          {{ page }}
        </li>
      </ul>
    </nav>
    <main class="container">
      <div v-for="item in data.slice(0,page)" :key="item.Id">
        <h2>{{ item.Name }}</h2>
        <!-- <p>{{ item.Toldescribe }}</p> -->
        <!-- <p>{{ item.Description }}</p> -->
        <!-- <p>{{ item.Id }}</p> -->
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: "HomeView",
  components: {
  },
  data() {
    return {
      sourceData: [],
      data: [],
      load: false,
      currentPage: 1, //目前分頁
      perPage: 100, //一頁幾筆資料
      pagination: [], // 分頁呈現
      totalPages: 10, //總頁數
    };
  },
  methods: {
    getSource() {
      this.sourceData = [];
      this.axios
        .get(
          "https://api.kcg.gov.tw:443/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c",
          {
            headers: {
              accept: "application/json",
            },
            params: {
              page: this.currentPage,
              per_page: this.perPage,
            },
          }
        )
        .then((res) => {
          this.data = res.data.data.XML_Head.Infos.Info;
          this.load = false;
          this.dataListLength = this.data.length;
          console.log("this.data", this.data);
          console.log("length", this.dataListLength);
          this.totalPages = this.dataListLength/this.perPage;
          this.updatePage();
        })
        .catch((error) => console.log("error", error));
    },
    triggerPage(page) {
      this.currentPage = page;
      this.getSource();
    },
    updatePage() {
      this.pagination = [];
      let start = 1;
      let end = this.totalPages;
      for (let index = start; index <= end; index++) {
        this.pagination.push(index);
      }
    },
  },
  mounted() {
    // this.getData();
  },
  created() {
    this.getSource();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: inline-flex;
  flex-wrap: wrap;
  width: 100vw;
  > div {
    flex-basis: 20%;
  }
}
ul {
  display: inline-flex;
  li {
    list-style: none;
    border: 1px solid #ddd;
    margin: 0 0.5rem;
    padding: 0.25rem;
    &.active {
      background: rgb(202, 202, 202);
    }
  }
}
</style>