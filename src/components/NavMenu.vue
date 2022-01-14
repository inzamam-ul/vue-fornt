<template>
  <div class="nav-menu">
    <div id="avatar">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <h3 style="padding-left: 15px">Student Management</h3>
    </div>

    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/"> Home </el-menu-item>
      <el-menu-item index="/students">All Students</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Manage Student</template>
        <el-menu-item index="/add-students">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/about" route="/about">About</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("key: ", key, "path: ", keyPath);
    },
  },
};
</script>

<style>
.nav-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
  background: #8ca7c2;
}
h3 {
  font-family: cursive;
}

#avatar {
  display: flex;
  align-items: center;
}
#navMenu {
  padding: 5px 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#navigation {
  display: flex;
  margin-left: auto;
}
a {
  text-decoration: none;
  color: none;
}
</style>
