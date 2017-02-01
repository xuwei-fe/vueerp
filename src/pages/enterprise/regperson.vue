<template>
              <el-form ref="form" :model="Enterprise" label-width="120px">
              <el-form-item label="登陆账号" class="el-col-12">
                <el-input v-model="Enterprise.parameter.UsrAccount.username"></el-input>
                <span class="help-block" v-show="btn&&!Enterprise.parameter.UsrAccount.username">登陆账号不能为空</span>
              </el-form-item>
              <el-form-item label="登陆密码" class="el-col-12">
                <el-input v-model="Enterprise.parameter.UsrAccount.password"></el-input>
                <span class="help-block" v-show="btn&&!Enterprise.parameter.UsrAccount.password">登陆密码不能为空</span>
              </el-form-item>
              <el-form-item label="姓名" class="el-col-12">
                <el-input v-model="Enterprise.parameter.UsrEmployee.fullname"></el-input>
                <span class="help-block" v-show="btn&&!Enterprise.parameter.UsrEmployee.fullname">姓名不能为空</span>
              </el-form-item>
              <el-form-item label="电话" class="el-col-12">
                <el-input v-model="Enterprise.parameter.UsrEmployee.mobile"></el-input>
                <span class="help-block" v-show="btn&&!Enterprise.parameter.UsrEmployee.mobile">电话不能为空</span>
              </el-form-item>
              <el-form-item label="身份证号" class="el-col-12">
                <el-input v-model="Enterprise.parameter.UsrEmployee.idcardno"></el-input>
                <span class="help-block" v-show="btn&&!Enterprise.parameter.UsrEmployee.idcardno">身份证号不能为空</span>
              </el-form-item>
              <el-form-item label="联系地址" class="el-col-12">
                <el-input v-model="Enterprise.parameter.UsrEmployee.addr"></el-input>
                <span class="help-block" v-show="btn&&!Enterprise.parameter.UsrEmployee.addr">联系地址不能为空</span>
              </el-form-item>
              <button type="button" @click="personsubmit" class="el-button el-button--primary"><span>保存</span></button>
          </el-form>
</template>
<script>
// 引入全局变量
	import global from '../../config/global';
	export default {
		data: function(){
			return {
        btn:false,//默认不显示
        checked: true,
				Enterprise:{
        "token": "cfce8f7a-3346-401e-bb47-fd3a7269bcba",
        "pagesize": 2,
        "pageindex": 3,
        "parameter": {
          "UsrEmployee": {
            "fullname": "测试人员test",
            "idcardno": "909981988042858848",
            "mobile": "15990890981",
            "addr": "上海市"
          },
          "EnterpriseUser": {
            "id":524688633135105,
            "ent_id": 524187665793025,
            "position": "项目经理",
            "joindate": "2014-12-01",
            "leftdate": "2016-12-28"
          },
          "UsrAccount": {
            "username": "test005",
            "password": "123456"
          }
        }
      },//企业基本信息
        UpdateEnterpriseurl:global.host + "Enterprise/SaveEnterpriseUser"
      }
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': ''
		},
		methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      personsubmit(){
        this.btn=true;
        if(!this.Enterprise.parameter.UsrAccount.username || !this.Enterprise.parameter.UsrAccount.password|| !this.Enterprise.parameter.UsrEmployee.fullname|| !this.Enterprise.parameter.UsrEmployee.mobile|| !this.Enterprise.parameter.UsrEmployee.idcardno|| !this.Enterprise.parameter.UsrEmployee.addr) return;
          this.$http.post(this.UpdateEnterpriseurl,this.Enterprise)
					.then((response) => {
            if(response.body.ret==1){
              this.$router.replace({ path: '/enterprise-list' })
            }
            else{
              alert(response.body.msg)
            }
					})
					.catch(function(response) {
						console.log(response)
					})
      }
		}
	}
</script>

<style>

</style>
