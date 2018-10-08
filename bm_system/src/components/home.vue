<template>
    <el-container>
        <el-header >
        <h4>后台管理系统</h4>
        <span class="span1" @click="goto()">退出</span>

        </el-header>
            <el-container>
                <el-aside width="230px">
                    <!--导航菜单-->
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
                         unique-opened router v-show="!collapsed">
                        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                            <el-submenu :index="index+''" v-if="!item.leaf">
                                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
                        </template>
                    </el-menu>
                 
                </el-aside>
                <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.name}}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in" class="view">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
            </el-container>
    </el-container>
</template>

<script>

export default {
        data() {
            return {
                sysName:'VUEADMIN',
                collapsed:false,
                sysUserName: '',
                sysUserAvatar: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            goto(){
                this.$router.push({
                    path:'/login'
                })
            },
            onSubmit() {
                console.log('submit!');
            },
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
            },
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {

                });


            },
            //折叠导航栏
            collapse:function(){
                this.collapsed=!this.collapsed;
            },
            showMenu(i,status){
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
            }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || '';
                this.sysUserAvatar = user.avatar || '';
            }

        }
    }

</script>

<style>
    body{margin: 0;}
    .el-header{
       
        border-bottom:1px solid #000;
        color: #000;
      
         font-weight: bold;
        line-height: 30px;
        padding:10px 60px 0;
        
     /*   height:300px;*/
    }
    h4{
        font-size:24px;
       margin:0;
        float:left;

    }
    .span1{
        float:right;
        cursor:pointer;
        font-size:16px;
    }
      
    .el-aside {
        
        border:1px solid #000;
        border-top:none;
        color: #000;
        text-align: left;
        line-height: 20px;
        font-size:24px;
        font-weight: bold;
        height:800px;
    }


    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 30px;
    }
      
    body > .el-container {
        margin-bottom: 40px;
    }
      
    .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
    }
    .menu-expanded{
        flex:0 0 230px;
        width: 230px;
    }
    .content-container {
        
        flex:1;
         
        overflow-y: scroll;
        padding: 20px;
       
        border-bottom:1px solid #ddd;
        margin-bottom:20px;

    }

    .title {
        width: 200px;
        float: left;
        color: #475669;
        margin-bottom: 20px;
    }

    .breadcrumb-inner {
        float: right;
        margin-bottom: 20px;
    }
        
    .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
    }

</style>
