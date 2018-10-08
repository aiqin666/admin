<template>
 
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"  class="demo-ruleForm" >
        <el-form-item label="当前密码" prop="currentpassword">
            <el-input v-model="ruleForm2.currentpassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
          
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">确认修改</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    export default {
    data() {
      var validatecurrentpassword = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('密码不能为空'));
        }
        
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          currentpassword: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          currentpassword: [
            { validator: validatecurrentpassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
    p{text-align: left;border-bottom:1px solid #eee;padding-bottom:10px;margin-bottom:20px;}
    .el-form-item{
        width:300px;
    }
</style>