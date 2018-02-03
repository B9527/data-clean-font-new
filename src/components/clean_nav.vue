<template>
<el-steps :active="step" finish-status="success" simple style="margin-top: 20px; margin-left:-5%;width:1000px;background-color:#FFFFFF;">
  <el-step title="数据源读取" @click.native="goRead" ></el-step>
  <el-step title="清洗规则" @click.native="goClean" ></el-step>
  <el-step title="正确数据"  @click.native="goSuccess" ></el-step>
  <el-step title="错误数据" @click.native="goError"></el-step>
</el-steps>
</template>
<script>
  export default {
    props: ['step', 'id'],
    data() {
      return {
         
      };
    },
    methods: {
    
      goRead: function(){
        this.$router.push('/clean/task/reader?id=' + this.id);
      },
      goClean: function(){
        if(this.step >=1){
          this.$router.push('/clean/task/tranform?id=' + this.id);
        }else {
           this.$message({
                    message: "请先完成数据源配置！",
                    type: 'info',
                    });
        }
        
      },
      goSuccess: function(){
        if(this.step >=2){
           this.$router.push('/clean/task/success_writer?id='+this.id)
        }else {
           this.$message({
                    message: "请先完成清洗规则配置！",
                    type: 'info',
                    });
        }
       
      },
      goError: function(){
        if(this.step >=3){
          this.$router.push('/clean/task/error_writer?id='+ this.id)
        }else {
           this.$message({
                    message: "请先完成正确数据配置！",
                    type: 'info',
                    });
        }
        
      }
    } 
  };
</script>
<style>
.setp1{
  
}
.active {
  border-bottom-style:solid;
  border-bottom-color:aqua;
  border-bottom-width: 2px;

}
</style>
