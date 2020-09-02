<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入姓名" class="input-with-select" v-model="queryInfo.query" clearable @clear = "getGoodList">
            <el-button slot="append" icon="el-icon-search"  @click="getGoodList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="价格" width="95px"></el-table-column>
        <el-table-column prop="goods_weight" label="重量" width="95px"></el-table-column>
        <el-table-column prop="add_time" label="下单时间" width="240px"></el-table-column>
        <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removebyId(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
       <el-pagination
      @size-change="goodshandleSizeChange"
      @current-change="goodshandleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 20, 30, 40]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" background>
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      goodsList: [],
      total: 0,
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
      //显示数据
    async getGoodList() {
      let {data} = await this.$http.get('shop/goods', { params: this.queryInfo })
      console.log(data)
      this.goodsList = data.datas;
      this.total =  data.resu[0]['COUNT(*)'];
    },
    //显示多少条数据
    goodshandleSizeChange(newSize){
        this.queryInfo.pagesize = newSize;
        this.getGoodList();
    },
    //显示第几页
    goodshandleCurrentChange(newCurren){
        this.queryInfo.pagenum = newCurren;
        this.getGoodList();
    },
    //删除数据
    async removebyId(id){
         let config = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if(config != 'confirm') return this.$message.info('用户取消删除');
        let {data} = await this.$http.get('shop/del',{params: {id: id}})
        if(data.status != 'ok') return this.$message.info('删除失败')
        this.$message.error('删除成功');
        this.getGoodList();
    },
    //跳转到添加界面
    addGoods(){
        this.$router.push('/goods/add')
    }
  }
}
</script>

<style lang="less" scoped>
</style>