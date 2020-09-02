<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加按钮 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="success">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="5">
                <el-tag closable @close="eidtTagClose">{{scope.row.children}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19"></el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="showSetRightDialog"
          >分配权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%">
      <el-tree :data="rolesList" :props="treeProps"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      setRightDialogVisible: false,
      treeProps: {
          label: 'roleName',
          children: 'roleDesc'
      },
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      let { data } = await this.$http.get('right/roles')
      this.rolesList = data
    },
    async eidtTagClose() {
      let res = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      //确认删除返回字符串confirm,   取消删除返回字符串cancel
      console.log(res)
    },
    showSetRightDialog() {
        this.setRightDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>