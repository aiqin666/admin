<template>
    <div>
      
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="我的角色" prop="name">
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
                <el-select v-model="ruleForm.name" placeholder="超级管理员">
                  
                </el-select>
                <!-- <span>当前角色不可更改为其他角色</span> -->
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input
                    placeholder="xianxin"
                    v-model="username"
                    clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input
                    placeholder="贤心"
                    v-model="nickname"
                    clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="性别" prop="delivery">
                <el-radio v-model="sex" label="男">男</el-radio>
                <el-radio v-model="sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="头像" prop="touxiang">
                <el-input
                    placeholder="http://cdn.lanyui.com/avatar"
                    v-model="touxiang"
                    clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input
                   
                    v-model="phone"
                    clearable>
                </el-input>
            </el-form-item>
            <!-- <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
                  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]"
            >
                <el-input v-model="dynamicValidateForm.email"></el-input>
            </el-form-item> -->
            <el-form-item label="邮箱" prop="email">
                <el-input
                   
                    v-model="email"
                    clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
                <el-input type="textarea" v-model="desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                <el-button @click="resetForm('ruleForm')">重新填写</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          sex: '男',
          username:'',
          nickname:'',
          phone:'',
          email:'',
          desc:''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
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
   /* p{text-align: left;border-bottom:1px solid #eee;padding-bottom:10px;margin-bottom:20px;}*/
    .el-form-item{width:400px;}

</style>