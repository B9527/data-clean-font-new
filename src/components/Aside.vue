<template>
  
<div>
  <el-row class="tac">
    <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#01151E" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
            
            <template slot="title" >
                <img :src="this.clean_main" />
                <span style="margin-right:30%">数据清洗</span>
            </template>
            <el-menu-item-group> 
                
                <el-menu-item index="1-1" @click="cleanSet"> <img :src="this.clean_set" />  清洗任务配置</el-menu-item>
                <el-menu-item index="1-2" @click="cleanTaskList"> <img :src="this.clean_task_list"/>  清洗任务列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航二</span>
            </template>
            <el-menu-item-group> 
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu> -->
        
    </el-menu>
  </el-row>
</div>
</template>

<script>
  export default {
      data(){
          return {
              clean_set: './static/images/cleanSet.png',
              clean_main: './static/images/clean_main.png',
              clean_task_list: './static/images/clean_task_list.png'
          }
      },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      resetindex(index){
          return "1-"+index;
      },
      cleanSet(){
          this.$router.push('/clean/task/reader')
      },
      cleanTaskList(){
          this.$router.push('/clean/task_list')
      }

    }
  }
</script>
