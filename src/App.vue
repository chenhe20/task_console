<template>
  <div>
    <TopNav/>
    <SideNav/>
    <notifications/>
  </div>

</template>
<script>
  import SideNav from './components/SideNav'
  import TopNav from "@/components/TopNav";

export default {
  name: 'App',
  components: { SideNav, TopNav}
}
</script>

<style>
  html,body, #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
