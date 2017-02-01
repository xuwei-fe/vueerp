<template>
    <div>
        <el-select placeholder="请选择" v-model="reg_province"  class="el-col-6">
            <el-option
            v-for="item in province"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
        <el-select placeholder="请选择" v-model="reg_city" class="el-col-6">
            <el-option
            v-for="item in city"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
        <el-select placeholder="请选择" v-model="reg_area" class="el-col-6">
            <el-option
            v-for="item in area"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
    </div>
</template>
<script>
//组件数据间传值有问题。
    import global from '../config/global'
    export default {
        props: ['reg_province','reg_city','reg_area'],
        data() {
            return {
                url:global.host + "SysArea/GetList?parameter.parentcode=",
                province:[],
                city: [],
                area:[],
                default:0,
                checkprovince:"",
                checkcity:"",
                checkarea:""
            };
        },
        created() {
                this.getProvince()
            },
        watch:{
            reg_province:"getCity",
            reg_city:"getArea"
        },
        methods: {
			getProvince: function() {//三级列表
				this.$http.get(this.url+this.default)
					.then((response) => {
                        this.province=response.data.data;
					})
					.catch(function(response) {
						console.log(response)
					})
			},
            getCity: function() {//三级列表
				this.$http.get(this.url+this.reg_province)
					.then((response) => {
                        this.city=response.data.data;
					})
					.catch(function(response) {
						console.log(response)
					})
			},
            getArea: function() {//三级列表
				this.$http.get(this.url+this.reg_city)
					.then((response) => {
                        this.area=response.data.data;
					})
					.catch(function(response) {
						console.log(response)
					})
			},
            changeselect:function(){
                alert("sdsdf")
            }
        }
    }
</script>