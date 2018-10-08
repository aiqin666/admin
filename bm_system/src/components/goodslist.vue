<template>
    <div class="goodslist">
        <el-form :inline="true" :model="formInline" class="demo-form-inline top">
              <el-form-item label="关键字">
                <el-input v-model="formInline.user" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-select v-model="formInline.region" placeholder="请选择分类">
                  <el-option label="麻利" value="麻利"></el-option>
                  <el-option label="皇家" value="皇家"></el-option>
                  <el-option label="冠能" value="冠能"></el-option>
                  <el-option label="比瑞吉" value="比瑞吉"></el-option>
                </el-select>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" icon="el-icon-search"></el-button>
                </el-form-item>
              </el-form-item>
              
        </el-form>
        <div class="btn">
            <el-button type="primary" @click="dialogFormVisible = true">删除</el-button>
           
            <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form >
              <el-form-item label="ID" :label-width="formLabelWidth" disabled="disabled">
              <el-input v-model="currentRow.id" autocomplete="off" readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" :label-width="formLabelWidth">
              <el-input v-model="currentRow.brand" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
              <el-input v-model="currentRow.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input v-model="currentRow.price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="发布状态" :label-width="formLabelWidth">
              <el-input v-model="currentRow.hot" autocomplete="off"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="savegoods">确 定</el-button>
          </div>
        </el-dialog>
        <el-table
        ref="multipleTable"
        border
        :data="goodslist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                sortable
                width="100">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column
                prop="brand"
                label="商品分类"
                width="120">
            </el-table-column>
            <el-table-column
                prop="name"
                label="商品名称"
                width="300">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
                width="100">
            </el-table-column>
           <!--  <el-table-column
                prop="date"
                label="上传时间"
                sortable
                 width="120">
            </el-table-column> -->
            <el-table-column
                prop="hot"
                label="发布状态"
                width="100"
                :filters="[{ text: '发布', value: '发布' }, { text: '编辑', value: '编辑' }]"
                :filter-method="filterState"
                filter-placement="bottom-end">
              
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>

              </template>
        </el-table-column>
        </el-table>
        <el-pagination
            class="page"
            @size-change="handleSizeChange"
            @current-change="current_change"
            :current-page="currentPage"
         
            :page-size="7"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {

            goodslist:[],
            total:0,
            pagesize:7,
            currentPage:1,
            title:'修改商品信息',

            formInline:{
                user:'',
                region:''
            },

            currentRow:{},
            dialogFormVisible: false,
            formLabelWidth: '120px',
             multipleSelection: [],
            isdisable:false
        }
    },
     created(){

        this.getGoodslist();
       
    },
    methods: {
            getGoodslist(){
                this.$axios.post('/api/goodslist').then(res => {
                    this.goodslist = res.data;
                    this.total = this.goodslist.length;
                    console.log(res)
                })
            },
            
            // 获取page
            current_change(currentPage){
                this.currentPage = currentPage;
            },

            setCurrent(row){
                this.$refs.singleTable.setCurrentRow(row);
            }, 

            // 编辑当前行
            handleEdit(index, row) {
                console.log(index, row);
                this.title= "修改商品信息";
                // this.dialogFormVisible = true;
                this.currentRow = row;

            },
            //添加前先更新
            addgoods(){
                this.dialogFormVisible = true;
                this.currentRow={};
                this.title= "添加商品信息";
            },

            //添加商品信息
            savegoods(){
                this.dialogFormVisible = false;

                console.log(this.currentRow.name)
                 this.$axios({
                    url:'/api/goodsadd',
                    method:'post',
                    data:(()=>{
                            let data = '';
                            for(let key in this.currentRow){
                                data += key + '=' + this.currentRow[key] + '&'
                            }
                            data = data.slice(0);
                            console.log(data)
                            return data;
                        })(),
                }).then(res =>{
                  console.log(res)
                })

                 this.getGoodslist();
            },


            // 实现搜索功能
            onSubmit(){
                console.log('submit!');
                if(this.formInline.user == '' || this.formInline.region == ''){
                    this.$message.warning("查询条件不能为空！");
                    this.formInline = {}
                    return;
                }

                this.$axios({
                    url:'/api/goodsSelect',
                    method:'post',
                    data:this.formInline            
                   }).then(res=>{
                    this.goodslist = res.data;
                })
            },

            handleSizeChange(pagesize) {
                console.log(`每页 ${pagesize} 条`);
            },


            handleCurrentChange(pagesize) {
                console.log(`当前页: ${pagesize}`);
               
            },


            // 选择切换
            toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
              },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },



            filterState(value, row) {
                return row.state === value;
            },
            
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleDelete(index, row) {
                  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.goodslist.splice(index, 1)
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    })
                  })
                },

            showTime() {
                this.$alert(this.value6, '起止  时间', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$message({
                        type: 'info',
                        message: '已显示'
                      })
                    }
                  })
                },
              
    },

   

}
</script>



<style scoped>
    .top{text-align: left;color:#fff;font-weight: bold;}
    .el-form-item{margin-left:20px;}
    .btn{margin-top:10px;padding:10px 0 10px 0;border-top:1px solid #ddd;text-align: left;}
    .page{text-align: left;height:40px;line-height:40px;border:1px solid #ddd;border-top:none;padding:10px 0 0 20px;}
</style>