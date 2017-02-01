<template>
              <el-form ref="form" :model="Enterprise" label-width="120px">
                <el-form-item label="证书编号" class="el-col-12">
                  <el-input v-model="Enterprise.parameter.parameter.no"></el-input>
                  <span class="help-block" v-show="btn&&!Enterprise.parameter.parameter.no">证书编号不能为空</span>
                </el-form-item>
                <el-form-item label="证书名称" class="el-col-12">
                  <el-input v-model="Enterprise.parameter.parameter.name"></el-input>
                  <span class="help-block" v-show="btn&&!Enterprise.parameter.parameter.name">证书名称不能为空</span>
                </el-form-item>
                <el-form-item label="资质类别" class="el-col-12">
                  <el-input v-model="Enterprise.parameter.parameter.type"></el-input>
                  <span class="help-block" v-show="btn&&!Enterprise.parameter.parameter.type">资质类别不能为空</span>
                </el-form-item>
                <el-form-item label="资质等级" class="el-col-12">
                  <el-input v-model="Enterprise.parameter.parameter.level"></el-input>
                  <span class="help-block" v-show="btn&&!Enterprise.parameter.parameter.level">资质等级不能为空</span>
                </el-form-item>
                <el-form-item label="发证日期" class="el-col-12">
                  <el-input v-model="Enterprise.parameter.parameter.organdate"></el-input>
                  <span class="help-block" v-show="btn&&!Enterprise.parameter.parameter.organdate">发证日期不能为空</span>
                </el-form-item>
                <el-form-item label="证书截止日期" class="el-col-12">
                  <el-input v-model="Enterprise.parameter.parameter.enddate"></el-input>
                  <span class="help-block" v-show="btn&&!Enterprise.parameter.parameter.enddate">证书截止日期不能为空</span>
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
				Enterprisezs:{
            "token": "",
            "pagesize": 0,
            "pageindex":1,
            "parameter":{
                "parameter":{
                  "id": 1,
                  "ent_id": 1,
                  "ent_name": "",
                  "ent_code": "",
                  "name": "",
                  "no": "",
                  "type": "",
                  "level": "",
                  "organdate": "",
                  "enddate": "",
                  "url": "",
                  "remark": ""
                }
            }
          },//证书基本信息
        UpdateEnterpriseurl:global.host + "Enterprise/SaveEnterpriseCert"
      }
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
        if(!this.Enterprise.parameter.parameter.username || !this.Enterprise.parameter.parameter.password|| !this.Enterprise.parameter.parameter.fullname|| !this.Enterprise.parameter.parameter.mobile|| !this.Enterprise.parameter.parameter.idcardno|| !this.Enterprise.parameter.parameter.addr) return;
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
