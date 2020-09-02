<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <卡片 -->

    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入姓名" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 表格数据 -->
      <el-table :data="orderList" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="uname"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="身份证" prop="card"></el-table-column>
        <el-table-column label="地址" prop="adress"></el-table-column>
        <el-table-column label="操作" width="185px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editOrders(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleOrders(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 20, 300, 400]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 修改对话框 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="50%">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="省/市/区" prop="adress1">
          <el-cascader v-model="editForm.adress1" :options="cityData"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="adress2">
          <el-input v-model="editForm.adress2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cityData from './city.js'
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      orderList: [],
      total: 0,
      dialogVisible: false,
      cityData: cityData,
      editForm: {
        adress1: '',
        adress2: ''
      },
      editFormRules: {}
    }
  },
  created() {
    this.getOrdersList()
  },
  methods: {
    //获取数据
    async getOrdersList() {
      const { data } = await this.$http.get('admin/users', {
        params: this.queryInfo
      })
      console.log(data)
      this.orderList = data.datas
      this.total = data.resu[0]['COUNT(*)']
    },
    //每页显示多少条
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrdersList()
    },
    //跳转页码
    handleCurrentChange(current) {
      this.queryInfo.pagenum = current
      this.getOrdersList()
    },
    //编辑数据
    editOrders(id) {
      this.dialogVisible = true
    },
    //删除数据
    deleOrders(id) {}
  }
}
</script>

<style lang="less" scoped>
</style>