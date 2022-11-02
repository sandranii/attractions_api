<template>
  <div class="home">
    <div v-if="load">Load</div>
    <div v-else-if="sourceError">{{sourceError}}</div>
    <main v-else class="container">
      <div class="filterArea">
        <!-- 篩選多個條件的用checkbox -->
        篩選分類
        <select name="categoryFilter" id="categoryFilter" v-model="categoryFilter" >
          <option disabled>請選擇</option>
          <option 
            v-for="category in categoryArray" 
            :key="category" 
            :value="category">{{category}}</option>
        </select>
      </div>
      <!-- top(全選＆pagination) -->
      <div class="top">
        <!-- checkbox 全選-->
        <div class="selectAllArea">
          <input 
            class="checkboxAll"
            id="checkbox"
            v-model="checked"
            type="checkbox"
            @change="selectAll()"
          >
          <label for="checkbox">全選</label>
          <button class="fav" @click="selectAllFav()">加入我的最愛</button>
        </div>
        <!-- 分頁切換pagination -->
        <div class="pagination">
          <button type="button" @click="prevPage" :disabled="curPage === 1">上一頁</button>
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
          <button type="button" @click="nextPage" :disabled="curPage === pageNum">下一頁</button>
        </div>
      </div>
      
      <!-- 資料內容(當前分頁) -->
        <!-- <p>檢查checkedNames內容 {{checkedNames}}</p> -->
      <div v-for="(item, index) in dataShow" :key="index" class="itemList">
        <!-- checkbox 單一勾選-->
        <input 
          v-model="checkedNames"
          id="spot"
          name="spot"
          type="checkbox"
          class="selectSingle"
          :value="item"
          @click="selectSingle(item, index)"
        >
        <div class="row">
          <div class="txtContainer col col-12 col-md-8 col-xl-8">
            <h2>景點名稱： {{ item.ScenicSpotName }}</h2>
            <span>分類：{{ item.Class1? item.Class1:null }}
                      {{ item.Class2? "、"+item.Class2:null }}
                      {{ item.Class3? "、"+item.Class3:null }}</span>
            <p>開放時間： {{ item.OpenTime }}</p>
            <p>景點描述： {{ item.DescriptionDetail }}</p>
            <button class="fav" @click="addToFav(item)">加入我的最愛</button>
          </div>
          <div class="picContainer col col-12 col-md-4 col-xl-4">
            <img
              :src="item.Picture.PictureUrl1"
              :alt="item.PictureDescription1"
            />
          </div>
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
        sourceData: [], //api取出來的原始data
        categoryArray: [],
        categoryFilter: [],
        city: "Taipei",
        params: {
          $format: "JSON",
          $top: 10,
        },
        totalPage: [], //所有分頁的數據 不同分頁會分組
        pageSize: 3, //每頁顯示數量
        pageNum: 1, //共幾頁＝所有數量/每頁顯示數量
        dataShow: [], //當前分頁顯示的資料 & 處理filter後的data
        curPage: 0, // 默認當前顯示第一頁
        favList: [], //我的最愛列表
        checked: false,
        checkedNames: [],//勾選的陣列
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
            //如果categoryArray已經有包含這個class或是這個class本身undefined, 就return false, 不包含就新增push項目
            this.sourceData.filter(item=>this.categoryArray.includes(item.Class1) || item.Class1 === undefined ? false: this.categoryArray.push(item.Class1));
            this.sourceData.filter(item=>this.categoryArray.includes(item.Class2) || item.Class2 === undefined ? false: this.categoryArray.push(item.Class2));
            this.sourceData.filter(item=>this.categoryArray.includes(item.Class3) || item.Class3 === undefined ? false: this.categoryArray.push(item.Class3));
            this.updateFilter()
          })
          .catch((err) => {
            this.sourceError = err.response;
          })
          .finally(() => {
            this.load = false;
          });
      },
      updateFilter(){
        this.dataShow = this.sourceData.filter(item => {
          //沒有類別或符合類別
          return this.categoryFilter.length === 0 
          || this.categoryFilter.includes(item.Class1)
          || this.categoryFilter.includes(item.Class2)
          || this.categoryFilter.includes(item.Class3)
        })
      },
      // --- pagination ---
      nextPage(i) {
        if (this.curPage === this.pageNum) return;
        this.dataShow = this.totalPage[this.curPage++];
      },
      prevPage() {
        if (this.curPage === 1 || 0) return;
        this.curPage--;
        this.dataShow = this.totalPage[this.curPage-1];
      },
      page(i) {
        this.curPage = i;
        this.dataShow = this.totalPage[i - 1];
      },
      // --- pagination ---

      // --- 加入我的最愛 ---
      addToFav(item){
        this.favList.push(item);
        localStorage.setItem('myFav', JSON.stringify(this.favList));
      },
      // --- 加入我的最愛 ---

      //取出localStorage內的我的最愛favList
      getStorage(){
        const favLists = localStorage.getItem('myFav');
        if (!favLists) return;
        this.favList = JSON.parse(favLists);
      },
      // checkbox 勾選 加入我的最愛
      selectSingle(item,index){
        // if(this.checkedNames.indexOf(item) != -1){
        //   this.checkedNames.splice(index,1);
        //   this.checked=false;
        // }else{
        //   this.checkedNames.push(item); //把勾選的item放進checkedNames裡面
        // }
        this.checkedNames.push(item); 
        if(this.dataShow.length == this.checkedNames.length){
          this.checked=true; //當陣列長度一樣時 把全選打勾
        }else{
          this.checked=false; 
        }
      },
      selectAll(){
        if(this.checked){  // 當這格選項從沒打勾變成有打勾的時候，要把這datashow arr裡面所有選項都打勾
          this.checkedNames =this.dataShow;
        }else{
          this.checkedNames = [];// 當這格選項從打勾變成沒打勾的時候，清空checkedNames的陣列
        }
      },
      selectAllFav(){
        if(this.checked ===true){
          console.log("concat前",this.favList);
          this.favList = this.favList.concat(this.checkedNames); //把這頁的dataShow(checkedNames)都組合進去favList的陣列裡面
          console.log("concat後",this.favList);
          localStorage.setItem('myFav', JSON.stringify(this.favList));
        }else{
          alert("請先勾取全選")
        }
      }

    },
    watch: {
      categoryFilter(){
        this.updateFilter()
      }
    },
    async created() {
      //在async之內的作用域
      await this.getAuthorizationHeader();
      //會等getAuthorizationHeader裡面的promise做完事情在做下一個getSourceData
      await this.getSourceData();
      
      //計算總共有幾頁 默認1
      this.pageNum = Math.ceil(this.sourceData.length / this.pageSize) || 1; 
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
      this.dataShow = this.totalPage[this.curPage++];
      this.i = this.curPage;
    },
  };
</script>

<style lang="scss" scoped>
  .home {
    .container {
      .filterArea{
        text-align: right;
      }
      .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        box-sizing: border-box;
        .pagination {
          button.pageNum {
            margin: 0 0.5rem;
          }
        }
      }
    }
  }
</style>