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
            <button class="fav" @click="edit(item)">編輯資料</button>
          </div>
          <div class="picContainer col col-12 col-md-4 col-xl-4">
            <img
              :src="item.Picture.PictureUrl1"
              :alt="item.PictureDescription1"
            />
          </div>
        </div>
      </div>
      <div class="lightbox" v-show="showLightBox">
            <div class="fix-list">
                <h3>修改景點資料</h3>
                <p>
                    景點名稱:
                    <input type="text" style="width: 70%" v-model="lbName">
                </p>
                <p>
                    開放時間:
                    <textarea type="text" style="width: 70%"  v-model="lbTime"/></p>
                <p>
                    景點描述:
                    <textarea type="text" style="min-height: 100px; width: 70%"  v-model="lbDetail"/>
                </p>
                <div class="fix-btn">
                    <button @click="editFinish">確定修改</button>
                    <button @click="showLightBox=false">取消</button>
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
      showLightBox: false,
      lbName: "", //燈箱內的vmodel
      lbTime: "", //燈箱內的vmodel
      lbDetail: "", //燈箱內的vmodel
    }
  },
  methods: {
    getStorage(){
      const favLists = localStorage.getItem('myFav');
      if(!favLists) return;
      this.favList = JSON.parse(favLists);
    },
    removeFav(index){
      this.favList.splice(index,1);// 先找到點選的index後, favList陣列從這個index往後刪除掉一個元素｀
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
        this.favList = [];
        localStorage.setItem('myFav', JSON.stringify(this.favList));
      }else{
        alert("請先勾取全選")
      }
    },
    edit(item){
      this.showLightBox = true;
      this.lbName=item.ScenicSpotName;
      this.lbTime=item.OpenTime;
      this.lbDetail=item.DescriptionDetail;
    },
    editFinish() {
      alert("功能建置中，請稍候");
      this.showLightBox = false;
  },
  },
  created() {
    this.getStorage()
  },

}
</script>

<style lang="scss" scoped>
button.fav{
  margin-right: 1rem;
}
.lightbox{
  background-color: rgba($color: #000000, $alpha: 0.2);
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  .fix-list{
    background-color: #fff;
    border: 1px solid #ccc;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    margin-top: 50%;
  }
}

  
</style>