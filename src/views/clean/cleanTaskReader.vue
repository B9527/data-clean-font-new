<template>
<div>
  <div style="margin-left:0%">
     <CleanNav v-bind:step="task_step" v-bind:id="config_id" ></CleanNav>
  </div>
  <div class="redader_content">
    <div >
    <p style="float:left;margin-left:5%;">数据库配置：</p>
      <span  style="float:left;margin-left:-5%;margin-top:50px;">Database: <el-select v-model="database" placeholder="请选择">
        <el-option v-for="item in database_list" :key="item" :label="item" :value="item">
        </el-option>
    </el-select>
    </span>
    <span style="float:left;margin-left:155px;margin-top:55px;">Table: 
    </span><el-input v-model="table" placeholder="请输入内容" label="table" style="width:200px;margin-top:50px;float:left;margin-left:10px;"></el-input>


    
    </div>
     <div style="float:left;margin-top:25px;width:95%;">
       <p style="float:left;margin-left:5%;">数据预览：</p>
       <div style="margin-left:5%;">
       <el-table :data="tableData" border stripe style="width: 100%" height="800">
          <el-table-column v-for="item in fieldList" :key="item" :prop=item :label=item  min-width="180"></el-table-column>
      </el-table>
      <div class="block" style="float:right">
          <el-pagination  @current-change="handleCurrentChange"  :page-size="pageSize" layout="prev, pager, next" :total="total"> </el-pagination>
      </div>
      </div>
    </div>
   
  </div>
  <el-button type="primary" @click="nextStep" style="position:relative; bottom:-605px;left:-5%">下一步</el-button>
  </div>
  
</template>
<script>
import CleanNav from '@/components/clean_nav';
import { getDatabaseList } from '@/api/api';
import { getTable } from '@/api/api';
import { getAllData } from "@/api/api";
import { postSaveReader } from '@/api/api';
import { getConfigTableInfo } from '@/api/api';

export default {
 
  components:{
    CleanNav
  },
  data(){
    return {
      pageSize:10,
      currentPage:1,
      task_step:0,
      database:'',
      table:'',
      table_list:[],
      database_list:[],
      fieldList:[],
      tableData:[],
      allData:[],
      total:0,
      config_id:0,

    }
  },
  watch:{
    table(curVal,oldVal){
      this.postTable();
    },
    database(curVal,oldVal){
      this.postTable();
    }
  },
  mounted: function(){
      this.$nextTick(function () {
              //  this.loadData();
              var config_task_id = this.$route.query.id;
              this.loadDatabaseList();
              if (config_task_id){
                this.config_id = config_task_id;
                this.loadDataTableInfo();
              }
             
              
          
                })
        
  },
  methods:{
     loadDataTableInfo(){
        getConfigTableInfo({params:{id: this.$route.query.id,}}).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.table = result.table;
                    this.database = result.database;
                    this.task_step = result.step;
                    this.loadAllData();
                  }
                      });
      },
      loadDatabaseList: function(){
          getDatabaseList({params:{}}).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.database_list = result.database_list;
                    this.$message({
                    message: msg,
                    type: 'success',
                    });
                  }
                      });
      },
      postTable:function(){
          getTable({params:{database:this.database, table_name:this.table}}).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.table_list = result.table_list;
                    this.$message({
                    message: msg,
                    type: 'success',
                    });
                  }
                      });
      },
      loadAllData:function(){
          getAllData({params:{database:this.database, table_name:this.table}}).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.allData = result.data_list;
                    this.total = this.allData.length;
                    this.fieldList = result.columns;
                    this.showData();
                    this.$message({
                    message: msg,
                    type: 'success',
                    });
                  }
                      });
      },
      saveReader(){
          var formData = new FormData();
          formData.append("database", this.database);
          formData.append("table_name", this.table);
          postSaveReader(formData).then(data =>{
                    let { msg, code, result } = data;
                    if (code !== 200) {
                        this.$message({
                        message: msg,
                        type: 'error',
                        });
                    } else {
                        var config_id = result.id
                        var url_path = "/clean/task/tranform?id="+ config_id;
                        this.$router.push(url_path);
                        this.$message({
                        message: msg,
                        type: 'success',
                                });
                    }
                });
      },
      
      handleCurrentChange(val) {
            this.currentPage = val;
            this.showData();
            console.log(this.currentPage);
        },
      showData(){
        var start_index = (this.currentPage-1)*this.pageSize;
        var end_index = this.currentPage*this.pageSize;
        if(this.total<end_index){
          end_index = this.total
        }
        this.tableData = this.allData.slice(start_index, end_index);
      },
      nextStep(){
          this.saveReader();
          // var url_path = "/clean/task/tranform?id=" + this.config_id;
          // this.$router.push(url_path);
      },
       querySearch(queryString, cb) {
        var table_list = this.table_list;
        cb(table_list);
      },
       handleSelect(item) {
          this.table = item;
          this.loadAllData();
         
      },
        
  }
}
</script>
<style scoped>
.redader_content{
  background-color: #FFFFFF;
  min-height: 500px;
}
  .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
</style>

