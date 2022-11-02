<template>
  <div class="fav">
    <main class="container"> 
    <!-- 資料內容(當前分頁)_我的最愛 -->
      <div v-for="(item, index) in favList" :key="index" class="itemList">
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
export default {
  name: "FavView",
  data(){
    return{
      favList: [],
    }
  },
  methods: {
    getStorage(){
      const favLists = localStorage.getItem('myFav');
      if(!favLists) return;
      this.favList = JSON.parse(favLists);
      console.log("我的最愛分頁", this.favList);
    }
  },
  created() {
    this.getStorage()
  },

}
</script>

<style lang="scss" scoped>
  .fav {
    max-width: 1200px;
    width: 100%;
    margin: auto;
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