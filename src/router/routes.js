export default [
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName:'home' */ "@/components/view/home")
  }
];
