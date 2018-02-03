<template>
<div>
  <div>
     <CleanNav v-bind:step="task_step" v-bind:id="config_id"></CleanNav>
  </div>
  <div class="success_content">
    <div >
      <p style="float:left;margin-left:5%;">数据库配置：</p>
      <span  style="float:left;margin-left:-5%;margin-top:50px;">Database: <el-select v-model="database" placeholder="请选择">
          <el-option v-for="item in database_list" :key="item" :label="item" :value="item">
          </el-option>
          </el-select>
      </span>
    <span style="float:left;margin-left:155px;margin-top:55px;">Table: </span><el-input v-model="table" placeholder="请输入内容" label="table" style="width:250px;margin-top:50px;float:left;margin-left:10px;"></el-input>
    
    </div>
    <div style="float:left;margin-top:25px;width:95%">
       <p style="float:left;margin-left:5%;">字段设置：</p>
    </div>
    <div style="margin-left:5%;">
        <el-table :data="tableData" border  stripe style="width:904px">
            <el-table-column  prop="name" label="字段名" width="226px" stripe>
              <template slot-scope="scope">
               <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="comment" label="注释" width="226px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.comment" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column  label="类型" width="226px" prop="type">
              <template slot-scope="scope">
                 <el-select v-model="scope.row.type" placeholder="请选择">
                <el-option v-for="type in options" :key="type"  :value="type">
                </el-option>
              </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="226px">
              <template slot-scope="scope">
                <el-button @click="handleAdd(scope.$index,scope.row)" type="text" size="small">添加</el-button>
                <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
    </div>
      <el-button type="primary" @click="backStep" style="position:relative; bottom:-185px;left:25%">上一步</el-button>
      <el-button type="primary" @click="nextStep" style="position:relative; bottom:-185px;left:35%">完成</el-button>
</div>
</template>
<script>
import CleanNav from '@/components/clean_nav';
import {getConfigError} from '@/api/api';
import { postConfigSuccess } from '@/api/api';
export default {
    components:{
      CleanNav
    },
     data(){
      return{
        task_step:0,
        config_id:0,
        database:'',
        table:'',
        database_list:['raw'],
        options: ["string","int", "bigint", "timestamp", "date", "double", " "],
        tableData:[{'name':"name1", 'comment':'comment', 'type':'type'},{'name':"name2", 'comment':'comment2', 'type':'type2'}]
      }
    },
     mounted: function() {
            this.$nextTick(function () {
              this.initData();
            })
        },
    methods:{
        initData:function(){
          this.config_id = this.$route.query.id;
          this.loadConfigErrorData();
        },
        loadConfigErrorData(){
             getConfigError({params:{id: this.$route.query.id}}).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.database = result.error_writer.database;
                    this.table = result.error_writer.table;
                    this.tableData = result.error_writer.fields
                    this.task_step = result.step;
                  }
                      });
        },
        handleAdd: function(index, row){
            this.tableData.splice(index+1, 0, {'name':'field', 'comment':'conment', 'type':'type'});  
        },
        handleDelete: function(index,row){
            if (this.tableData.length >1){
            this.tableData.splice(index,1);
            }else{
                this.tableData = [{}]
            
            }
        },
        nextStep(){
          let return_obj ={"table":this.table,"database":this.database,"fields":this.tableData}
          let formData = new FormData();
          formData.append('errorWriter', JSON.stringify(return_obj));
          formData.append('id', this.$route.query.id)
          postConfigSuccess(formData).then(data =>{
              let { msg, code, result } = data;
              if (code !== 200) {
                  this.$message({
                  message: msg,
                  type: 'error',
                  });
              } else {
                  this.$message({
                  message: msg,
                  type: 'success',
                          });
              }
          });
          // var url_path = "/clean/task/error_writer?id=" + this.$route.query.id;
          // this.$router.push(url_path);
      },
      backStep(){
          var url_path = "/clean/task/success_writer?id=" + this.$route.query.id;
          this.$router.push(url_path);
      }
    }
}
</script>
<style scoped>
.success_content{
  background-color: #FFFFFF;
  min-height: 600px;
}
</style>
