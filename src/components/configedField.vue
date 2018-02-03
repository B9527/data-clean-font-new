<template>
    <div>
   <el-button type="primary" plain>{{field}}</el-button> <img class="config_field_ing" :src="location_img">
    </div>
</template>
<script>
export default {
  props: ['field'],  
  data(){
      return {
          location_img: './static/images/duihao.png',
      }
  }
}
</script>
<style>
.config_field_ing{
    position: relative;
    left:-37px;
    top: -6px;
}
</style>
