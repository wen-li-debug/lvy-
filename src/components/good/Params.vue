<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="注意: 只允许为第三级分类设置相关参数" type="warning" show-icon :closable="false"></el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选中商品分类:</span>
          <!-- 选择分类的级层选择框 -->
          <el-cascader
            v-model="value"
            :options="paramsList"
            :props="{ expandTrigger: 'hover' }"
            @change="selectHand"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" size="mini">添加参数</el-button>
          <el-tag>标签一</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button type="primary" size="mini">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paramsList: [],
      value: '',
      activeName: 'first',
      inputVisible: false,
      inputValue: '',
    }
  },
  created() {
    this.getParamsList()
  },
  methods: {
    async getParamsList() {
      let { data } = await this.$http.get('right/list')
      this.paramsList = data
    },
    selectHand() {
      console.log(11)
    },
    handleTabClick() {
      console.log(this.activeName)
    },
    showInput(){
        this.inputVisible = true;
        this.$nextTick(_=>{
            this.$refs.saveTagInput.$refs.input.focus();
        })
    },
    handleInputConfirm(){
        this.inputVisible = false;
    }
  }
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
.input-new-tag{
    width: 100px;
}
</style>