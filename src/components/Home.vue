<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/02.png" alt />
        <span>订单系统</span>
      </div>
      <el-button @click="loginOut" type="info">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="iscollapse ? '64px': '200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <el-menu
          default-active="2"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          router
        >
          <!-- 用户列表 -->
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+ users">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 权限列表 -->
          <!-- 一级菜单 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+ roles">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/'+ rights">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 商品列表 -->
          <!-- 一级菜单 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+ goodList">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/'+ params">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>分类参数</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/'+ categories">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>商品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 订单管理 -->
          <!-- 一级菜单 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+ orders">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 数据统计 -->
          <!-- 一级菜单 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+ report">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>数据报表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主题 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      iscollapse: false,
      users: 'user',
      rights: 'right',
      roles: 'roles',
      categories: 'categories',
      params: 'params',
      goodList: 'goodList',
      orders: 'orders',
      report: 'report'
    }
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse() {
      this.iscollapse = !this.iscollapse
    }
  }
}
</script>

<style lang="less" scoped>
.toggle_button {
  background-color: #4a5064;
  line-height: 24px;
  font-size: 10px;
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 18px;
  > div {
    display: flex;
    align-items: center;
    > img {
      width: 80px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>