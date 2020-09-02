<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 添加按钮 -->
      <el-row>
        <el-col>
          <el-button type="success" @click="showDialog">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表单数据 -->
      <tree-table
        :data="cateList"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        show-index
        index-text="#"
        border
        class="tab"
      >
        <!-- 状态 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cate_status === 'true'"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>

        <!-- 标签 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.level === 1">标签一</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.level === 2">标签二</el-tag>
          <el-tag size="mini" type="warning" v-else>标签三</el-tag>
        </template>

        <!-- 操作 -->
        <template slot="opt">
          <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="cateSizeChange"
        @current-change="cateCurrentChange"
        :current-page="queryInfo.pagesize"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryInfo.pagenum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="cateDialogVisible" width="50%">
      <el-form :model="addCateForm" :rules="rules" ref="addCateRuleFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addCateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="selectKeys"
            :options="cateList"
            :props="{ expandTrigger: 'hover' }"
            @change="cateHandleChange"
            clearable
            show-all-levels
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cateDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 5
      },
      cateList: [],
      columns: [
        {
          label: '商品名称',
          prop: 'name'
        },
        // 定义模板列
        {
          label: '是否有效',
          type: 'template',
          template: 'isok' //模板列名称
        },
        {
          label: '排序',
          type: 'template',
          template: 'order' //模板列名称
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      total: 4,
      cateDialogVisible: false,
      addCateForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      selectKeys: [],
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      let { data } = await this.$http.get('good/list', {
        params: this.queryInfo
      })
      this.cateList = data
    },
    cateSizeChange(newSize) {
      this.pagesize = newSize
      this.getCateList()
    },
    cateCurrentChange(newNum) {
      this.pagenum = newNum
      this.getCateList()
    },
    showDialog() {
      this.cateDialogVisible = true
    },
    cateHandleChange(){
      console.log(111)
    }
  }
}
</script>

<style lang="less" scoped>
.tab {
  margin-top: 15px;
}
</style>