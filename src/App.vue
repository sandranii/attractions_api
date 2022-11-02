<template>
  <nav>
    <router-link to="/">資料列表</router-link> |
    <router-link to="/fav">我的最愛</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
// ----mixin----
@mixin grid($val, $d:null) {
  //格線系統
  @for $i from 1 through $val {
      .col#{$d}-#{$i} {
          width: calc($i / $val * 100%);
      }
  }
}

// 手機板 mobile
@mixin m() {
    @media screen and (min-width: 320px) and (max-width: 768px) {
        @content;
    }
}
// 平板 tablet
@mixin t() {
    @media screen and (min-width: 769px) and (max-width: 1200px) {
        @content;
    }
}
// 桌機 pc
@mixin pc() {
    @media screen and (min-width: 1201px) {
        @content;
    }
}
// ----mixin----
@include m(){
  @include grid(12);
}
@include t(){
  @include grid(12, -md);
}
@include pc(){
  @include grid(12, -xl);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1200px;
  width: 100%;
  margin: auto;
}
  .top{
      box-sizing: border-box;
      margin: 1rem;
      text-align: left;
      input{
        margin-left: 0.8rem;
        margin-right: 1rem;
      }
      button.fav{
        margin-left: 1rem;
      }
  }

  // 資料
  .row{
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .col{
    box-sizing: border-box;
    padding: 15px;
  }
  .itemList {
    margin: auto;
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
    border: 1px solid #ddd;
    margin-bottom: 3rem;
    padding: 1.5rem;
    input.selectSingle{
      margin-right: 100%;
    }
    .txtContainer {
      // width: 60%;
      text-align: left;
    }
    .picContainer {
      // width: 30%;
      overflow: hidden;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        object-position: center center;
        vertical-align: bottom;
      }
    }
  }


nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #fa0; 
    }
  }
}

button {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 0.25rem 0.55rem;
  height: 1.875rem;
  cursor: pointer;
  &:hover{
    background-color: #fa0;
  }
  &.active {
    background-color: #fa0;
  }
}



</style>
