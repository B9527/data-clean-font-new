<template>
<div>
<el-container>
  <el-header>
    <div class="logo_image">
				<img  :src="this.logo" width=200/>
		</div>
    <div class="sysname_image">
      	<img  :src="this.sysNameLogo" width=200/>
    </div>
    <div class="sysuser">
       <img :src="this.sysUserAvatar" />
        <el-dropdown :hide-on-click="false">
              <span class="el-dropdown-link">{{sysUserName}} </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
    </div>
  </el-header>
  <el-container>
    <el-aside>
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-main>
        <div class="clean_config_location">
          <span class="clean_config_location"><img :src="location_img"> 数据清洗>>清洗任务配置</span>
        </div>
        <div class="no_class"> <p style="color:#00A0E9;font-size:24">清洗配置：</p></div>
       
        <div class="clean_main_content">  
          <router-view></router-view>
        </div>
         
      </el-main>
    </el-container>
  </el-container>
</el-container>
</div>
</template>



<script>
import Aside from '@/components/Aside'
  export default {
    components:{
      Aside,
    },
    data() {
      return {
          logo:'./static/images/LOGO.png',
          sysNameLogo:'./static/images/sysNameLogo.png',
          sysUserAvatar: './static/images/user.png',
          sysUserName: 'baiyang',
          location_img: './static/images/location.png',
      };
    },
    methods: {
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
      }
    }
  }
</script>
<style>

  .el-header{
    background-color: #00A0E9;
    height: 113px;
    width: 100%;
    margin-top: -60px;   
  }
  .logo_image{
    /* background-color: red; */
    width:160px;
    height:22px;
    margin-left: 40px;
    margin-top: 15px;
    float: left;
  }
  .sysname_image{
    float: left;
    width:229px;
    height:31px;
    margin-left: 50px;
    margin-top: 15px;
  }
  .sysuser{
    text-align: center;
		float: right;
    margin-right: 5%;
  }
  .sysuser span{
     float: right;
     margin-left: 20px;
     margin-bottom: 20px;
  }
  .sysuser img {
    width: 40px;
		height: 40px;
    margin: 10px 0px 10px 10px;
  }
 .sysuser .el-dropdown-link {
    cursor: pointer;
    color:#E9EEF3;
  }
  .el-footer{
  }
  
  .el-aside {
    background-color: #01151E;
    width:230px;
    min-height:1883px; 
  }
  
  .el-main {
    background-color: #FFFFFF;

  }
  .el-main .no_class {
    height: 40px;
    width:100%;
    margin-top: 40px;
    text-align: left;
  }
  .el-main .clean_config_location span{
    float: left;
  }
  .el-main .clean_main_content{
    background-color: #FFFFFF;
    margin-left: -3%;
    min-height: 1100px;
    
    /* margin-bottom: 200px; */
  }
  
</style>