<template>
    <el-table
    :data="tableData"
    border
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
        <!-- <el-table-column
          prop="sort"
          label=""
          width="50">
        </el-table-column> -->
        <el-table-column
          prop="id"
          label="ID"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="brand" 
          label="分类名"
          >
        </el-table-column>
        
        <el-table-column label="操作" width="180">
            <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>

          </template>
    </el-table-column>
  </el-table>

</template>

<script>
export default {
    data() {
        return {
               
            tableData:[]

            // tableData: [{
            //   sort: '1',
            //   id: '001',
            //   fenlei: '美食'
            // }, {
            //   sort: '2',
            //   id: '002',
            //   fenlei: '新闻'
            // }, {
            //   sort: '3',
            //   id: '003',
            //   fenlei: '八卦'
            // }, {
            //   sort: '4',
            //   id: '004',
            //   fenlei: '体育'
            // }]
        }
    },
    methods: {
        // showTime() {
        //     this.$alert(this.value6, '起止  时间', {
        //         confirmButtonText: '确定',
        //         callback: action => {
        //           this.$message({
        //             type: 'info',
        //             message: '已显示'
        //           })
        //         }
        //     })
        // },
        update() {
            this.table.push(this.form)
            // this.dialogFormVisible = false
        },
        handleEdit(index, row) {
            this.tableData.push(index);
            // this.form = this.tableData[index]
            // this.currentIndex = index
            // this.dialogFormVisible = true
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(index, 1)
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
        // cancel() {
        //     this.dialogFormVisible = false
        // },
        // handleSizeChange(val) {
        //   console.log(`每页 ${val} 条`)
        // },
        // handleCurrentChange(val) {
        //   console.log(`当前页: ${val}`)
        // }
    },

    created(){
        //发送post请求获取数据
        this.$axios.get('/api/brand').then(res => {
            this.tableData = res.data;
       
            console.log(res)
       })
        
    }
}

</script>

<style scoped>
    .el-table-column{text-align:left;}
</style>