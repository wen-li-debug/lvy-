<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <!-- 消息提示 -->
      <el-alert title="消息提示的文案" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 标签页 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs v-model="activeIndex" :tab-position="'left'">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_num">
              <el-input v-model="addForm.goods_num" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_type">
              <el-input v-model="addForm.goods_type"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- <el-tab-pane label="商品参数" name="1">
            <el-form-item>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:3003/shop/img"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
                list-type="picture"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
              <quill-editor v-model="editorData"></quill-editor>
              <el-button type="primary" class="btn">添加内容</el-button>
          </el-tab-pane> -->
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '0',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_num: 0,
        goods_type: '',
        checkList: '',
        editorData: ''
      },
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_num: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_type: [
          { required: true, message: '请输入商品分类', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
      handlePreview(){},
      handleRemove(file){
          console.log(file)
      },
      handleSuccess(response){
          console.log(response)
      }
  }
}
</script>

<style lang="less" scoped>
.btn{
    margin-top: 15px;
}
</style>