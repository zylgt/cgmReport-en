import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);

}


const routes = [
  {
    path:'/',
    redirect: "/AGPreport",
    component:(resolve) => require(["@/views/pdfReport/report"], resolve)
  },{
    path: '/AGPreport',
    name: 'AGPreport',
    meta: { title: "动态葡萄糖监测报告"},
    component:(resolve) => require(["@/views/pdfReport/report"], resolve)
  }
]

const router = new VueRouter({
  mode: "", // 去掉url中的#
  base:'/report',
  routes
})
// router.beforeEach((to, from, next) =>{
//   if(!getToken()){
//     if(to.path=='/login'){
//       next()
//     }else{
//       router.push('/login')
//     }
//   }else{
//     next()
//   }
  
// })

export default router