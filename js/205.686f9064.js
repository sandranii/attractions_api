"use strict";(self["webpackChunkattractions"]=self["webpackChunkattractions"]||[]).push([[205],{6205:function(e,t,l){l.r(t),l.d(t,{default:function(){return D}});var i=l(3396),s=l(9242),a=l(7139);const c=e=>((0,i.dD)("data-v-f81d84cc"),e=e(),(0,i.Cn)(),e),n={class:"fav"},o={class:"container"},h={class:"top"},d={class:"selectAllArea"},r=c((()=>(0,i._)("label",{for:"checkbox"},"全選",-1))),u=["value","onClick"],m={class:"row"},v={class:"txtContainer col col-12 col-md-8 col-xl-8"},p=["onClick"],k=["onClick"],_={class:"picContainer col col-12 col-md-4 col-xl-4"},b=["src","alt"],w={class:"lightbox"},f={class:"fix-list"},g=c((()=>(0,i._)("h3",null,"修改景點資料",-1))),x={class:"fix-btn"};function C(e,t,l,c,C,y){return(0,i.wg)(),(0,i.iD)("div",n,[(0,i._)("main",o,[(0,i._)("div",h,[(0,i._)("div",d,[(0,i.wy)((0,i._)("input",{class:"checkboxAll",id:"checkbox","onUpdate:modelValue":t[0]||(t[0]=t=>e.checked=t),type:"checkbox",onChange:t[1]||(t[1]=e=>y.selectAll())},null,544),[[s.e8,e.checked]]),r,(0,i._)("button",{class:"fav",onClick:t[2]||(t[2]=e=>y.removeAllFav())},"移除我的最愛")])]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(C.favList,((l,c)=>((0,i.wg)(),(0,i.iD)("div",{key:c,class:"itemList"},[(0,i.wy)((0,i._)("input",{"onUpdate:modelValue":t[3]||(t[3]=e=>C.checkedItems=e),id:"spot",name:"spot",type:"checkbox",class:"selectSingle",value:l,onClick:t=>e.selectSingle(l)},null,8,u),[[s.e8,C.checkedItems]]),(0,i._)("div",m,[(0,i._)("div",v,[(0,i._)("h2",null,"景點名稱： "+(0,a.zw)(l.ScenicSpotName),1),(0,i._)("span",null,"分類："+(0,a.zw)(l.Class1?l.Class1:null)+" "+(0,a.zw)(l.Class2?"、"+l.Class2:null)+" "+(0,a.zw)(l.Class3?"、"+l.Class3:null),1),(0,i._)("p",null,"開放時間： "+(0,a.zw)(l.OpenTime),1),(0,i._)("p",null,"景點描述： "+(0,a.zw)(l.DescriptionDetail),1),(0,i._)("button",{class:"fav",onClick:e=>y.removeFav(c)},"移除我的最愛",8,p),(0,i._)("button",{class:"fav",onClick:e=>y.edit(l)},"編輯資料",8,k)]),(0,i._)("div",_,[(0,i._)("img",{src:l.Picture.PictureUrl1,alt:l.PictureDescription1},null,8,b)])])])))),128)),(0,i.wy)((0,i._)("div",w,[(0,i._)("div",f,[g,(0,i._)("p",null,[(0,i.Uk)(" 景點名稱: "),(0,i.wy)((0,i._)("input",{type:"text",style:{width:"70%"},"onUpdate:modelValue":t[4]||(t[4]=e=>C.lbName=e)},null,512),[[s.nr,C.lbName]])]),(0,i._)("p",null,[(0,i.Uk)(" 開放時間: "),(0,i.wy)((0,i._)("textarea",{type:"text",style:{width:"70%"},"onUpdate:modelValue":t[5]||(t[5]=e=>C.lbTime=e)},null,512),[[s.nr,C.lbTime]])]),(0,i._)("p",null,[(0,i.Uk)(" 景點描述: "),(0,i.wy)((0,i._)("textarea",{type:"text",style:{"min-height":"100px",width:"70%"},"onUpdate:modelValue":t[6]||(t[6]=e=>C.lbDetail=e)},null,512),[[s.nr,C.lbDetail]])]),(0,i._)("div",x,[(0,i._)("button",{onClick:t[7]||(t[7]=(...e)=>y.editFinish&&y.editFinish(...e))},"確定修改"),(0,i._)("button",{onClick:t[8]||(t[8]=e=>C.showLightBox=!1)},"取消")])])],512),[[s.F8,C.showLightBox]])])])}var y={name:"FavView",data(){return{favList:[],checkedItems:[],showLightBox:!1,lbName:"",lbTime:"",lbDetail:""}},methods:{getStorage(){const e=localStorage.getItem("myFav");e&&(this.favList=JSON.parse(e))},removeFav(e){this.favList.splice(e,1),localStorage.setItem("myFav",JSON.stringify(this.favList))},selectAll(){this.checked?this.checkedItems=this.favList:this.checkedItems=[]},removeAllFav(){!0===this.checked?(this.favList=[],localStorage.setItem("myFav",JSON.stringify(this.favList))):alert("請先勾取全選")},edit(e){this.showLightBox=!0,this.lbName=e.ScenicSpotName,this.lbTime=e.OpenTime,this.lbDetail=e.DescriptionDetail},editFinish(){alert("功能建置中，請稍候"),this.showLightBox=!1}},created(){this.getStorage()}},L=l(89);const S=(0,L.Z)(y,[["render",C],["__scopeId","data-v-f81d84cc"]]);var D=S}}]);
//# sourceMappingURL=205.686f9064.js.map