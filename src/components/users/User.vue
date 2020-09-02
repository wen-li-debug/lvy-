<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入姓名"
            class="input-with-select"
            clearable
            v-model="queryInfo.query"
            @clear="clearUers"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 按钮框 -->
      <el-row :gutter="8">
        <el-col :span="2">
          <el-button type="primary" @click="dialogVisible = true">添加订单</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="exportExcel">导出表格</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="toggleSelection">取消选择</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="deleteSelection">删除所选项</el-button>
        </el-col>
      </el-row>

      <!-- 用户表格数据 -->
      <el-table
        border
        stripe
        :data="userList"
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="套餐" prop="combo"></el-table-column>
        <el-table-column label="姓名" prop="uname"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="身份证号码" prop="card"></el-table-column>
        <el-table-column label="购买的号码" prop="newphone"></el-table-column>
        <el-table-column label="地址" prop="adress"></el-table-column>
        <el-table-column label="地址" prop="date"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top-start"
              :enterable="false"
            >
              <el-button type="primary" icon="el-icon-edit" @click="showeditVisible(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button type="danger" icon="el-icon-delete" @click="deleUser(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加订单对话框 -->
    <el-dialog title="添加订单" :visible.sync="dialogVisible" width="50%" @close="addFormClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="套餐" prop="combo">
          <el-input v-model="addForm.combo"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="uname">
          <el-input v-model="addForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="card">
          <el-input v-model="addForm.card"></el-input>
        </el-form-item>
        <el-form-item label="购买的号码" prop="newphone">
          <el-input v-model="addForm.newphone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="adress">
          <el-input v-model="addForm.adress"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" prop="date">
          <el-input v-model="addForm.date"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改订单对话框 -->
    <el-dialog title="修改订单" :visible.sync="eidtVisible" width="70%" @close="editFormClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="editForm.uname" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="adress">
          <el-input v-model="editForm.adress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eidtVisible = false">取 消</el-button>
        <el-button type="primary" @click="eidtUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    //设置添加自定义规则
    var checkCombo = (rule, val, callback) => {
      //验证套餐
      if (val == '大王卡' || val == '地王卡' || val == '天王卡') {
        return callback()
      }
      callback(new Error('请输入正确的套餐名'))
    }
    //验证姓名
    var checkUname = (rule, val, callback) => {
      const regUname = /^[\u4e00-\u9fa5]{0,}$/
      if (regUname.test(val)) {
        return callback()
      }
      callback(new Error('请输入汉字'))
    }
    //验证电话号码
    var checkPhone = (rule, val, callback) => {
      const regPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (regPhone.test(val)) {
        return callback()
      }
      callback(new Error('请输入正确的手机号码'))
    }
    //验证身份证号码
    var checkCard = (rule, val, callback) => {
      const regCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (regCard.test(val)) {
        return callback()
      }
      callback(new Error('请输入正确的身份证号码'))
    }

    return {
      queryInfo: {
        query: '', //查询参数
        pagenum: 1, //当前页码
        pagesize: 4 //显示条数
      },
      userList: [],
      total: 0,
      dialogVisible: false, //设置对话框隐藏显示
      multipleTable: [], //需要删除的数据
      //添加订单数据
      addForm: {
        combo: '',
        uname: '',
        phone: '',
        card: '',
        newphone: '',
        adress: ''
      },
      //添加订单的规则
      addFormRules: {
        combo: [
          { required: true, message: '请输入套餐名', trigger: 'blur' },
          { validator: checkCombo, trigger: 'blur' }
        ],
        uname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: checkUname, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入用户电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        card: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { validator: checkCard, trigger: 'blur' }
        ],
        newphone: [
          { required: true, message: '请输入购买的号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        adress: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 6, message: '地址长度需要大于6位', trigger: 'blur' },
          { validator: checkUname, trigger: 'blur' }
        ]
      },
      eidtVisible: false, //修改对话框的显示隐藏
      editForm: {}, //修改的数据
      //修改订单数据的规则
      editFormRules: {
        adress: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 6, message: '地址长度需要大于6位', trigger: 'blur' },
          { validator: checkUname, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    //获取订单信息
    async getUserList() {
      const { data } = await this.$http.get('admin/users', {
        params: this.queryInfo
      })
      console.log(data)
      this.userList = data.datas
      this.total = data.resu[0]['COUNT(*)']
    },
    //每页显示条数事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    //显示第几页事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    //清空搜索框触发事件
    clearUers() {
      this.getUserList()
    },
    //重置添加订单数据
    addFormClose() {
      this.$refs.addFormRef.resetFields()
    },
    //添加订单数据提交
    addFormVisible() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        let { data } = await this.$http.post('admin/users/add', this.addForm)
        if (data.status != 'ok') return this.$message.error('添加失败')
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.getUserList()
      })
    },

    //修改订单信息
    async showeditVisible(id) {
      //根据id获取这条订单数据
      let { data } = await this.$http.get('admin/users/id', {
        params: { id: id }
      })
      this.editForm = data[0]
      //显示修改框
      this.eidtVisible = true
    },
    //监听修改对话框关闭
    editFormClose(){
      this.$refs.editFormRef.resetFields();
    },
    //修改订单数据提交
    eidtUserInfo(){
      this.$refs.editFormRef.validate(async valid =>{
        if(!valid) return;
        //效验成功发起修改请求
        let data = await this.$http.get('admin/edit',{params:{id: this.editForm.id,adress: this.editForm.adress}});
        console.log(data)
        this.eidtVisible = false;
        this.getUserList()
      })
    },

    //删除用户数据
    async deleUser(id) {
      const res = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      //确认删除返回字符串confirm,   取消删除返回字符串cancel
      if (res != 'confirm') return this.$message.info('已经取消删除')
      const { data } = await this.$http.delete('admin/users/' + id)
      if (data.status != 'ok') return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getUserList()
    },

    //取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection()
    },

    //获取需要删除的数据
    handleSelectionChange(val) {
      console.log(val)
      this.multipleTable = val
    },

    //删除所选数据
    async deleteSelection() {
      if (!this.multipleTable.length)
        return this.$message.info('请选择要删除的数据')
      const res = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      //确认删除返回字符串confirm,   取消删除返回字符串cancel
      if (res != 'confirm') return this.$message.info('已经取消删除')
      let arr = []
      this.multipleTable.forEach(element => {
        arr.push(element.id)
      })
      console.log(arr.join())
      let { data } = await this.$http.delete('admin/datas', {
        params: { id: arr.join() }
      })
      if (data.status != 'ok') return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getUserList()
    },

    // 导出表格所用
    exportExcel() {
      // 设置当前日期
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      let name = year + '' + month + '' + day
      // console.log(name)
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector('.table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          name + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
} 
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-row {
  margin-bottom: 15px;
}
</style>