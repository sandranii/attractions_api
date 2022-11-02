<template>
  <nav>
    <router-link to="/">資料列表</router-link> |
    <router-link to="/fav">我的最愛</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  .top{
      box-sizing: border-box;
      margin: 1rem;
      text-align: left;
      input{
        margin-left: 1.5rem;
        margin-right: 1rem;
      }
      button.fav{
        margin-left: 1rem;
      }
  }
  // 資料
  .itemList {
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #ddd;
    margin-bottom: 3rem;
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
        vertical-align: bottom;
      }
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
