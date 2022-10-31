<template>
  <div class="home">
    <!-- <div v-if="load">Load</div>
        <div v-else-if="sourceError">{{sourceError}}</div> -->
    <!-- <div v-else>{{sourceData}}</div> -->
    <main class="container">
      <!-- 分頁切換pagination -->
      <div class="pagination">
        <button type="button" @click="prevPage">上一頁</button>
        <button
          class="pageNum"
          type="button"
          v-for="i in pageNum"
          :key="i"
          :class="{ active: i === curPage }"
          @click="page(i)"
        >
          {{ i }}
        </button>
        <button type="button" @click="nextPage">下一頁</button>
      </div>
      <!-- 資料內容(當前分頁) -->
      <div v-for="item in dataShow" :key="item" class="itemList">
        <div class="txtContainer">
          <h2>景點名稱： {{ item.ScenicSpotName }}</h2>
          <p>開放時間： {{ item.OpenTime }}</p>
          <p>景點描述： {{ item.DescriptionDetail }}</p>
        </div>
        <div class="picContainer">
          <img
            :src="item.Picture.PictureUrl1"
            :alt="item.PictureDescription1"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  const AUTH_URL = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
  const API_URL = "https://tdx.transportdata.tw/api/basic/";
  const CLIENT_ID = process.env.VUE_APP_CLIENT_ID || null;
  const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET || null;
  export default {
    name: "HomeView",
    data() {
      return {
        accesstoken: "",
        load: false,
        sourceError: "",
        sourceData: [], //api取出來的data
        city: "Taipei",
        params: {
          $format: "JSON",
          $top: 10,
        },
        totalPage: [], //所有分頁的數據 不同分頁會分組
        pageSize: 3, //每頁顯示數量
        pageNum: 1, //共幾頁＝所有數量/每頁顯示數量
        dataShow: [], //當前分頁顯示的資料
        curPage: 0, // 默認當前顯示第一頁
        i: 0,
      };
    },
    methods: {
      getAuthorizationHeader() {
        const parameter = new URLSearchParams([
          ["grant_type", "client_credentials"],
          ["client_id", CLIENT_ID],
          ["client_secret", CLIENT_SECRET],
        ]);

        //return
        return this.axios({
          method: "POST",
          url: AUTH_URL,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: parameter,
        })
          .then((response) => {
            this.accesstoken = response.data;
          })
          .catch((err) => {
            this.sourceError = err.response;
          });
      },
      getSourceData() {
        if (!CLIENT_ID || !CLIENT_SECRET) {
          this.sourceError = "要輸入CLIENT_ID和CLIENT_SECRET";
          return;
        }
        if (!(this.accesstoken && this.accesstoken.access_token)) {
          this.sourceError = "沒有token，每個呼叫來源端IP的上限為每日50次。";
          return;
        }
        this.load = true;
        this.sourceData = [];
        //return
        //https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/Taipei?%24top=30&%24format=JSON
        return this.axios
          .get(`${API_URL}v2/Tourism/ScenicSpot/${this.city}`, {
            headers: {
              authorization: `Bearer ${this.accesstoken.access_token}`,
            },
            params: this.params,
          })
          .then((response) => {
            this.sourceData = response.data;
            this.pageNum = Math.ceil(this.sourceData.length / this.pageSize) || 1; //計算總共有幾頁 默認1
            //循環頁面
            for (let i = 0; i < this.pageNum; i++) {
              //每一個分頁都是一個數組
              //根據每頁顯示數量將數據分割到每一頁 假設pageSize＝3, 第一頁是1~3條, slice(0,3), 第二頁是4～6 slice(3,6)
              this.totalPage[i] = this.sourceData.slice(
                this.pageSize * i,
                this.pageSize * (i + 1)
              );
            }
            //取到數據後默認顯示第一頁內容
            this.dataShow = this.totalPage[this.curPage];
            console.log("this.dataShow", this.dataShow);
            this.i = this.curPage;
            console.log("this.i", this.i);
          })
          .catch((err) => {
            this.sourceError = err.response;
          })
          .finally(() => {
            this.load = false;
          });
      },
      nextPage() {
        if (this.curPage === this.pageNum - 1) return;
        this.dataShow = this.totalPage[++this.curPage];
      },
      prevPage() {
        if (this.curPage === 0) return;
        this.dataShow = this.totalPage[--this.curPage];
      },
      page(i) {
        this.curPage = i;
        this.dataShow = this.totalPage[i - 1];
      },
    },
    async created() {
      //在async之內的作用域
      await this.getAuthorizationHeader();
      //會等getAuthorizationHeader裡面的promise做完事情在做下一個getSourceData
      await this.getSourceData();
    },
  };
</script>

<style lang="scss" scoped>
  .home {
    max-width: 1200px;
    width: 100%;
    //   border: 1px solid #000;
    margin: auto;
    .pagination {
      button {
        background-color: #fff;
        border: 1px solid #ddd;
        margin: 0 0.5rem;
        padding: 0.25rem 0.55rem;
        height: 1.875rem;
        &.active {
          background-color: #fa0;
        }
      }
    }
    .container {
      .itemList {
        margin: auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 1px solid #ddd;
        margin-top: 3rem;
        padding: 1.5rem;
        .txtContainer {
          width: 60%;
          text-align: left;
        }
        .picContainer {
          width: 30%;
          overflow: hidden;
          img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            object-position: center center;
          }
        }
      }
    }
  }
</style>