<template>
<div style="height:auto;">
  <div>
     <CleanNav v-bind:step="task_step" v-bind:id="config_task_id"></CleanNav>
  </div>
  <div >
      <p style="float:left;margin-left:5%;">数据库配置：</p>
      <span  style="float:left;margin-left:-5%;margin-top:55px;">Database:{{database}}</span> 
      <span style="float:left;margin-left:155px;margin-top:55px;">Table: {{table}}</span>
  
  </div>
  <div style="float:left;margin-top:25px;width:95%">
      <p style="float:left;margin-left:5%;">字段设置：</p>
  
        <div style="margin-left:5%;">
              <el-table :data="tableData" border stripe style="width: 100%" max-height="450">
                  <el-table-column v-for="item in fieldList" :key="item" :prop=item :label=item  min-width="180" ></el-table-column>
              </el-table>
              <div class="block" style="float:right">
                  <el-pagination  @current-change="handleCurrentChange"  :page-size="pageSize" layout="prev, pager, next" :total="total"> </el-pagination>
              </div>

        </div>
  </div>
    
  <div style="margin-top:25px;width:95%;height:auto">
      <p style="float:left;margin-left:5%;">数据清洗：</p>
    <div style="margin-top:12px;float:left;margin-left:80px">
      <ConfigedField v-for="item_field in configured_fields"  :key="item_field" v-bind:field="item_field" style="float:left" @click.native="handleConfigField(item_field)"></ConfigedField>
       <el-button type="primary" v-for="add_field in addList" :key="add_field" plain style="float:left;" @click.native="handleConfigField(add_field)">{{add_field}}</el-button>
       <el-popover ref="popover4" placement="right" width="400" trigger="click">
        <div>
          <el-checkbox-group v-model="addList">
              <el-checkbox-button v-for="field in fieldList" :label="field" :key="field" style="width:20%;">{{field}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        </el-popover>

        <el-button v-popover:popover4  type="success" style="float:left;margin-left:10px;">+增加需要配置fields</el-button>
    </div>
  </div>
  <div class="div3">
       <div class="table_header">
         <p>参数</p>
         <p>值</p>
         <p>类型</p>
       </div>
       <div class="table_type">
         
           <p style="float:left;margin-left:29px;margin-top:20px">基本类型：</p><el-select v-model="base.type" clearable placeholder="请选择" style="margin-top:10px;">
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
       </div> 
       <div classs="table_data">
            <table  class="table  table-bordered" v-for="(value,key) in base.params" :key="key" style="margin-left:150px;width:1288px;text-align:center; margin-top:-18px">
              <td v-if="Object.prototype.toString.call(value) ==='[object Object]'" >
              <tr >
                   <el-dialog title="新增参数" :visible.sync="dialogbaseson" top="300px"> 
                     <el-form :model="form">
                      <el-form-item label="参数名：" :label-width="formLabelWidth">
                        <el-input v-model="form.key" auto-complete="off"></el-input>
                      </el-form-item>
                    
                        <el-form-item label="参数值：" :label-width="formLabelWidth">
                        <el-input v-model="form.value" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogbaseson = false">取 消</el-button>
                      <el-button type="primary" @click="addBaseObjectSon(key)">确 定</el-button>
                    </div> 
                  </el-dialog>

                  <th style="width:71px"><p style="color:#00A0E9" @click="dialogbaseson= true">+增加</p></th>
                  <th style="text-align:center;width:800px">{{key}}</th>
                  <th style="text-align:center;width:300px">object</th>
                  <th style="text-align:center;width:100px"><p style="color:#00A0E9" @click="removeBaseObject(key)">删除</p></th>
              </tr>
        
              <tr v-for="(son_value, son_key) in value" :key="son_key" style="height:65px">
                  <td></td>
                  <td ><p style="float:left;margin-left:50px">{{son_key}}</p><p>{{son_value}}</p></td>
                  <td>{{typeof(son_value)}}</td>
                  <td><p style="color:#00A0E9" @click="removeBaseSonObject(key, son_key)">删除</p></td>
              </tr>
              </td>

            <td v-else-if="Object.prototype.toString.call(value) ==='[object Array]'" >
              <tr >
                  <th style="width:71px"><p style="color:#00A0E9" @click="addBaseObjectArray(key)">+增加</p></th>
                  <th style="text-align:center;width:800px">{{key}}</th>
                  <th style="text-align:center;width:300px">Array</th>
                  <th style="text-align:center;width:100px"><p style="color:#00A0E9" @click="removeBaseObject(key)">删除</p></th>
              </tr>
        
              <tr v-for="(son_value, index) in value" :key="index" style="height:65px">
                  <td></td>
                  <td >{{son_value}}</td>
                  <td>{{typeof(son_value)}}</td>
                  <td><p style="color:#00A0E9" @click="removeBaseSonArry(key, index)">删除</p></td>
              </tr>
              </td>
              <td v-else>
              <tr >
                  <th style="width:71px"></th>
                  <th style="text-align:center;width:800px"><p style="float:left;margin-left:50px">{{key}}</p><p>{{value}}</p></th>
                  <th style="text-align:center;width:300px">{{typeof(key)}}</th>
                  <th style="text-align:center;width:100px"><p style="color:#00A0E9" @click="removeBaseObject(key)">删除</p></th>
              </tr>
              </td>
              
            </table>
             <table class="table  table-bordered"  style="margin-left:150px;width:1288px;text-align:center;margin-top:-18px;">
               <tr>
                  <el-dialog title="新增非被选参数" :visible.sync="dialogFormVisible" top="300px"> 
                     <el-form :model="form">
                      <el-form-item label="参数名：" :label-width="formLabelWidth">
                        <el-input v-model="form.key" auto-complete="off"></el-input>
                      </el-form-item>
                     <el-form-item label="参数类型：" :label-width="formLabelWidth">
                        <el-select v-model="form.type" placeholder="请选择参数类型" style="float:left">
                          <el-option label="Object" value="Object"></el-option>
                          <el-option label="Array" value="Array"></el-option>
                          <el-option label="其他" value="normal"></el-option>
                        </el-select>
                      </el-form-item>
                        <el-form-item label="参数值：" :label-width="formLabelWidth">
                        <el-input v-model="form.value" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="addBaseObject">确 定</el-button>
                    </div> 
                  </el-dialog>
                  <th style="width:71px"><p style="color:#00A0E9"   @click="dialogFormVisible = true"  v-popover:popover5>+增加</p></th>
                  <th style="text-align:left;width:965px">点击增加新增参数</th>
                  <td></td>
              </tr>
            </table>        
       </div>

       <div class="table_type">
         
           <p style="float:left;margin-left:29px;margin-top:20px">扩展类型：</p><el-select v-model="extend.type" clearable placeholder="请选择" style="margin-top:10px;">
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
       </div> 
       <div classs="table_data">
            <table  class="table  table-bordered" v-for="(value,key) in extend.params" :key="key" style="margin-left:150px;width:1288px;text-align:center; margin-top:-18px">
              <td v-if="Object.prototype.toString.call(value) ==='[object Object]'" >
              <tr >
                   <el-dialog title="新增参数" :visible.sync="dialogbaseson" top="300px"> 
                     <el-form :model="form">
                      <el-form-item label="参数名：" :label-width="formLabelWidth">
                        <el-input v-model="form.key" auto-complete="off"></el-input>
                      </el-form-item>
                    
                        <el-form-item label="参数值：" :label-width="formLabelWidth">
                        <el-input v-model="form.value" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogbaseson = false">取 消</el-button>
                      <el-button type="primary" @click="addExtendObjectSon(key)">确 定</el-button>
                    </div> 
                  </el-dialog>

                  <th style="width:71px"><p style="color:#00A0E9" @click="dialogbaseson= true">+增加</p></th>
                  <th style="text-align:center;width:800px">{{key}}</th>
                  <th style="text-align:center;width:300px">object</th>
                  <th style="text-align:center;width:100px"><p style="color:#00A0E9" @click="removeBaseObject(key)">删除</p></th>
              </tr>
        
              <tr v-for="(son_value, son_key) in value" :key="son_key" style="height:65px">
                  <td></td>
                  <td ><p style="float:left;margin-left:50px">{{son_key}}</p><p>{{son_value}}</p></td>
                  <td>{{typeof(son_value)}}</td>
                  <td><p style="color:#00A0E9" @click="removeBaseSonObject(key, son_key)">删除</p></td>
              </tr>
              </td>

            <td v-else-if="Object.prototype.toString.call(value) ==='[object Array]'" >
              <tr >
                  <th style="width:71px"><p style="color:#00A0E9" @click="addBaseObjectArray(key)">+增加</p></th>
                  <th style="text-align:center;width:800px">{{key}}</th>
                  <th style="text-align:center;width:300px">Array</th>
                  <th style="text-align:center;width:100px"><p style="color:#00A0E9" @click="removeBaseObject(key)">删除</p></th>
              </tr>
        
              <tr v-for="(son_value, index) in value" :key="index" style="height:65px">
                  <td></td>
                  <td >{{son_value}}</td>
                  <td>{{typeof(son_value)}}</td>
                  <td><p style="color:#00A0E9" @click="removeBaseSonArry(key, index)">删除</p></td>
              </tr>
              </td>
              <td v-else>
              <tr >
                  <th style="width:71px"></th>
                  <th style="text-align:center;width:800px"><p style="float:left;margin-left:50px">{{key}}</p><p>{{value}}</p></th>
                  <th style="text-align:center;width:300px">{{typeof(key)}}</th>
                  <th style="text-align:center;width:100px"><p style="color:#00A0E9" @click="removeBaseObject(key)">删除</p></th>
              </tr>
              </td>
              
            </table>
             <table class="table  table-bordered"  style="margin-left:150px;width:1288px;text-align:center;margin-top:-18px;">
               <tr>
                  <el-dialog title="新增非被选参数" :visible.sync="dialogFormVisible" top="300px"> 
                     <el-form :model="form">
                      <el-form-item label="参数名：" :label-width="formLabelWidth">
                        <el-input v-model="form.key" auto-complete="off"></el-input>
                      </el-form-item>
                     <el-form-item label="参数类型：" :label-width="formLabelWidth">
                        <el-select v-model="form.type" placeholder="请选择参数类型" style="float:left">
                          <el-option label="Object" value="Object"></el-option>
                          <el-option label="Array" value="Array"></el-option>
                          <el-option label="其他" value="normal"></el-option>
                        </el-select>
                      </el-form-item>
                        <el-form-item label="参数值：" :label-width="formLabelWidth">
                        <el-input v-model="form.value" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="addBaseObject">确 定</el-button>
                    </div> 
                  </el-dialog>
                  <th style="width:71px"><p style="color:#00A0E9"   @click="dialogFormVisible = true"  v-popover:popover5>+增加</p></th>
                  <th style="text-align:left;width:965px">点击增加新增参数</th>
                  <td></td>
              </tr>
            </table>        
       </div>

       <div class="table_type">
         
           <p style="float:left;margin-left:29px;margin-top:20px">自定义类型：</p><el-select v-model="custome.type" clearable placeholder="请选择" style="margin-top:10px;">
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
       </div> 
       <div classs="table_data">
            <table  class="table  table-bordered" v-for="(value,key) in custome.params" :key="key" style="margin-left:150px;width:1288px;text-align:center; margin-top:-18px">
              <td v-if="Object.prototype.toString.call(value) ==='[object Object]'" >
              <tr >
                   <el-dialog title="新增参数" :visible.sync="dialogbaseson" top="300px"> 
                     <el-form :model="form">
                      <el-form-item label="参数名：" :label-width="formLabelWidth">
                        <el-input v-model="form.key" auto-complete="off"></el-input>
                      </el-form-item>
                    
                        <el-form-item label="参数值：" :label-width="formLabelWidth">
                        <el-input v-model="form.value" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogbaseson = false">取 消</el-button>
                      <el-button type="primary" @click="addBaseObjectSon(key)">确 定</el-button>
                    </div> 
                  </el-dialog>

                  <th style="width:71px"><p style="color:#00A0E9" @click="dialogbaseson= true">+增加</p></th>
                  <th style="text-align:center;width:800px">{{key}}</th>
                  <th style="text-align:center;width:300px">object</th>
                  <th style="text-align:center;width:100px"><p style="color:#00A0E9" @click="removeBaseObject(key)">删除</p></th>
              </tr>
        
              <tr v-for="(son_value, son_key) in value" :key="son_key" style="height:65px">
                  <td></td>
                  <td ><p style="float:left;margin-left:50px">{{son_key}}</p><p>{{son_value}}</p></td>
                  <td>{{typeof(son_value)}}</td>
                  <td><p style="color:#00A0E9" @click="removeBaseSonObject(key, son_key)">删除</p></td>
              </tr>
              </td>

            <td v-else-if="Object.prototype.toString.call(value) ==='[object Array]'" >
              <tr >
                  <th style="width:71px"><p style="color:#00A0E9" @click="addBaseObjectArray(key)">+增加</p></th>
                  <th style="text-align:center;width:800px">{{key}}</th>
                  <th style="text-align:center;width:300px">Array</th>
                  <th style="text-align:center;width:100px"><p style="color:#00A0E9" @click="removeBaseObject(key)">删除</p></th>
              </tr>
        
              <tr v-for="(son_value, index) in value" :key="index" style="height:65px">
                  <td></td>
                  <td >{{son_value}}</td>
                  <td>{{typeof(son_value)}}</td>
                  <td><p style="color:#00A0E9" @click="removeBaseSonArry(key, index)">删除</p></td>
              </tr>
              </td>
              <td v-else>
              <tr >
                  <th style="width:71px"></th>
                  <th style="text-align:center;width:800px"><p style="float:left;margin-left:50px">{{key}}</p><p>{{value}}</p></th>
                  <th style="text-align:center;width:300px">{{typeof(key)}}</th>
                  <th style="text-align:center;width:100px"><p style="color:#00A0E9" @click="removeBaseObject(key)">删除</p></th>
              </tr>
              </td>
              
            </table>
             <table class="table  table-bordered"  style="margin-left:150px;width:1288px;text-align:center;margin-top:-18px;">
               <tr>
                  <el-dialog title="新增非被选参数" :visible.sync="dialogFormVisible" top="300px"> 
                     <el-form :model="form">
                      <el-form-item label="参数名：" :label-width="formLabelWidth">
                        <el-input v-model="form.key" auto-complete="off"></el-input>
                      </el-form-item>
                     <el-form-item label="参数类型：" :label-width="formLabelWidth">
                        <el-select v-model="form.type" placeholder="请选择参数类型" style="float:left">
                          <el-option label="Object" value="Object"></el-option>
                          <el-option label="Array" value="Array"></el-option>
                          <el-option label="其他" value="normal"></el-option>
                        </el-select>
                      </el-form-item>
                        <el-form-item label="参数值：" :label-width="formLabelWidth">
                        <el-input v-model="form.value" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="addBaseObject">确 定</el-button>
                    </div> 
                  </el-dialog>
                  <th style="width:71px"><p style="color:#00A0E9"   @click="dialogFormVisible = true"  v-popover:popover5>+增加</p></th>
                  <th style="text-align:left;width:965px">点击增加新增参数</th>
                  <td></td>
              </tr>
            </table>        
       </div>

  </div>
    
    
</div>

</template>
<script>
import CleanNav from '@/components/clean_nav';
import ConfigedField from '@/components/configedField'
import { getConfigTableInfo } from '@/api/api';
import { getAllData } from "@/api/api";
export default {
    components:{
      CleanNav, ConfigedField
    },
    data(){
      return{
        visible: false,
        task_step:1,
        database:'',
        table:'',
        fieldList:['field1', 'field2', 'field3', 'field4','field5','field6','field7','field8','field9','field10','field11','field12','field13','field14','field15','field16'],
        tableData:[],
        allData:[{'field1':'1'},{'field1':'2'},{'field1':'3'},{'field1':'4'}],
        total:0,
        pageSize:10,
        currentPage:1,
        config_task_id:0,
        configured_fields:['field1', 'field2', 'field3'],
        addList:['field4','field5'],
        tabPosition: '', 
        location_img: './static/images/duihao.png',
        options: ["string","int", "bigint", "timestamp", "date", "double", " "],
        field_type:"",
        base: {
            "type": "timestamp",
            "params": {
              "format": "%Y-%m-%d %H:%M:%S",
              "param2": {"name":"clean", "age":12},
              "param3":["fuck1", "fuck2", "funck3", "funck_all"]
      
            }          
        },
        extend:{
            "type": "int",
            "params": {
              "param1":"funck you!",
              "param2": {"name":"all", "age":12},
              "param3":["fuck1", "fuck2", "funck3", "funck_all"]
            }
        },
        custome:{
            "type": "string",
            "params": {
              "param1":"funck you all!",
              "param2": {"name":"all", "age":12},
              "param3":["fuck1", "fuck2", "funck3", "funck_all"]
            }
        },
        dialogFormVisible: false,
        dialogbaseson:false,
        form: {
          key: '',
          value: '',
          type:'',
          type_list: [],

          
        },
         formLabelWidth: '120px'
        



      }
    },
     mounted: function() {
            this.$nextTick(function () {
              this.config_task_id = this.$route.query.id;
              this.loadDataTableInfo();
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
        var url_path = "/clean/task/success_writer?id=";
        this.$router.push(url_path);
      },
      backStep(){
        var url_path = "/clean/task/success_writer?id=";
        this.$router.push(url_path);
      },
      handleConfigField(val){
        alert(val)
      },
      addObjectArray(key, object){
          this.$prompt('参数值', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[^\\0]+/,
          inputErrorMessage: '不能为空'
        }).then(({ value }) => {
          object.params[key].push(value);
          this.$message({
            type: 'success',
            message: 'success' 
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      
      addObject(object){
        this.dialogFormVisible=false;
        if (this.form.type==='Object'){
            var new_obj;
            try {
              new_obj= JSON.parse(this.form.value);
              if (Object.prototype.toString.call(new_obj) ==='[object Object]'){
                  this.$set(object.params, this.form.key, new_obj);
              } else {
                  new_obj = new Object();
                  this.$set(object.params, this.form.key, new_obj);
              }
              
              } catch (error) {
                  new_obj = new Object();
                  this.$set(object.params, this.form.key, new_obj);
              }
        }else if (this.form.type="Array") {
            var new_array;
            try {
              new_array= JSON.parse(this.form.value);
              if (Object.prototype.toString.call(new_array) ==='[object Array]'){
                  this.$set(object.params, this.form.key, new_array);
              } else {
                  new_array = new Array();
                  this.$set(object.params, this.form.key, new_array);
              }
              
              } catch (error) {
                   new_array = new Array();
                  this.$set(object.params, this.form.key, new_array);
              }
        }else if (this.form.type=="normal"){
            this.$set(object.params, this.form.key,this.form.value);
        }
      
      },
      addBaseObject(){
          this.addObject(this.base);
      },
      
      addBaseObjectArray(key){
        this.addObjectArray(key, this.base)
      },
      addBaseObjectSon(key){
        this.dialogbaseson=false;
        this.$set(this.base.params[key], this.form.key, this.form.value);
      },
      addExtendObjectSon(key){
        this.dialogbaseson=false;
        this.$set(this.base.params[key], this.form.key, this.form.value);
      },
      removeBaseObject(key){
        // this.$set(this.base_params, 'format',27);
        this.$delete(this.base.params, key);
      },
      removeBaseSonObject(key,son_key){
          this.$delete(this.base.params[key], son_key);
      },
      removeBaseSonArry(key,index){
        this.base.params[key].splice(index,1)
    },
    }
}
</script>
<style scoped>
.div3{
  min-width: 1500px;
  /* position: relative; */
  float: left;
  margin-top:40px;
  margin-left:100px
 
}
.table_header{
  width: 1436px;
  height: 73px;
  line-height:43px;
  background: #F6F6F6;
}
.table_header p{
  float: left;
  margin-left: 252px;
}
.table_type{
  background: #F6F6F6;
  width: 1436px;
  height: 59px;
  margin-top: 2px;
  text-align: left;
}

</style>
