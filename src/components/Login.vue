<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="header_box">
        <img src="../assets/01.png" alt />
      </div>
      <!-- 表单区域 -->
      <el-form ref="loginFormRef" :model="userForm" :rules="rules" label-width="80px" class="login_form">
        <el-form-item label="用户名" prop="uname">
          <el-input prefix-icon="el-icon-user-solid" v-model="userForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input prefix-icon="el-icon-s-goods" v-model="userForm.pwd"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" @click="landing">登陆</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // 登陆的数据
      userForm: {
        uname: "",
        pwd: ""
      },
    //   表单验证规则
      rules: {
        uname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        pwd: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
      reset(){
          this.$refs.loginFormRef.resetFields()
      },
      landing(){
          this.$refs.loginFormRef.validate( async (valid)=>{
              if(!valid) return;
              let {data:res} = await this.$http.post('admin/login',this.userForm)
              console.log(res)
              if(res.status != 'ok') return this.$message.error('用户名或者密码错误')
              this.$message.success('登陆成功')
              window.sessionStorage.setItem('token',res.token);
              this.$router.push('/home')
          })
      }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .header_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0, 0, 10px, #ddd;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>