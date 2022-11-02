<template>
  <div class="fav">
    <main class="container"> 
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
          <button class="fav" @click="removeAllFav()">移除我的最愛</button>
        </div>
      </div>

      <!-- 資料內容(當前分頁)_我的最愛 -->
      <div v-for="(item, index) in favList" :key="index" class="itemList">
        <!-- checkbox 單一勾選-->
        <input 
          v-model="checkedItems"
          id="spot"
          name="spot"
          type="checkbox"
          class="selectSingle"
          :value="item"
          @click="selectSingle(item)"
        >
        <div class="row">
          <div class="txtContainer col col-12 col-md-8 col-xl-8">
            <h2>景點名稱： {{ item.ScenicSpotName }}</h2>
            <span>分類：{{ item.Class1? item.Class1:null }}
                      {{ item.Class2? "、"+item.Class2:null }}
                      {{ item.Class3? "、"+item.Class3:null }}</span>
            <p>開放時間： {{ item.OpenTime }}</p>
            <p>景點描述： {{ item.DescriptionDetail }}</p>
            <button class="fav" @click="removeFav(index)">移除我的最愛</button>
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
export default {
  name: "FavView",
  data(){
    return{
      favList: [],
      checkedItems: [], //打勾的item陣列
    }
  },
  methods: {
    getStorage(){
      const favLists = localStorage.getItem('myFav');
      if(!favLists) return;
      this.favList = JSON.parse(favLists);
      console.log("我的最愛分頁", this.favList);
    },
    removeFav(index){
      console.log("點到",index);
      this.favList.splice(index,1);// 先找到點選的index後, favList陣列從這個index往後刪除掉一個元素｀
      console.log("splice後", this.favList);
      localStorage.setItem('myFav', JSON.stringify(this.favList));
    },
    selectAll(){
      if(this.checked){  // 當這格選項從沒打勾變成有打勾的時候，要把favList arr裡面所有選項都打勾
        this.checkedItems =this.favList;
      }else{
        this.checkedItems = [];// 當這格選項從打勾變成沒打勾的時候，清空checkedItems的陣列
      }
    },
    removeAllFav(){
      if(this.checked ===true){
        console.log("concat前",this.favList);
        this.favList = [];
        console.log("concat後",this.favList);
        localStorage.setItem('myFav', JSON.stringify(this.favList));
      }else{
        alert("請先勾取全選")
      }
    }
  },
  created() {
    this.getStorage()
  },

}
</script>