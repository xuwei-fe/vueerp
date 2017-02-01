<style lang="less" scoped>
	.clearfix::before, 
	.clearfix::after {
	    content: "";
	    display: table;
	}
	.clearfix::after {
	    clear: both;
	}
    .page-container {
		margin-top: 60px;
	}
	.portlet-title {
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
		margin-bottom: 30px;
		line-height: 30px;
		.left {
			float: left;
		}
		.right {
			float: right;
		}
		h3 {
			color: #333;
			font-size: 14px;
			font-weight: bold;
			margin: 0;
			float: left;
			margin-right: 30px;
		}
		.el-button {
			padding-top: 9px;
			vertical-align: top;
		}
	}
	.projectdetail{
		width:100%;
		font-size: 16px;
		li{
			margin:10px;
			width:400px;
			float:left;
		}
	}
	.zlmb{
		font-size: 16px;
	}
	.sbzl{
		font-size: 16px;
		margin-top:10px;
	}
</style>
<template>
	<div>
        <el-button @click="baseinfo">基本信息</el-button>
        <el-button v-for="item in entertab" @click="projectcompany(item.name)">{{item.name}}</el-button>
        <el-button  @click="attachment">工程附件</el-button>
        <el-button  @click="mapdetail">百度地图</el-button>
        <el-button @click="resume">工程履历</el-button>
	</div>
</template>

<script>
	import global from '../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function(){
			return {
				entertab:"",
                enterprisetypeurl:global.host + "SysDict/Get",
                projParam: {
					params: {
						token: '',
						parameter: ""
					}
				},
                projUrl: global.host + 'Project/QueryProjectDetail',
            }
		},
		computed: mapState({ user: state => state.user }),
        watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': 'fetchData'
		},
        created() {
            this.fetchData();
			this.getenterprisetype();
		},
		methods: {
            fetchData: function(){
				var vm = this
				vm.error = vm.post = null
				vm.loading = true
				vm.projParam.params.parameter = this.$route.params.id
				vm.projParam.params.token = vm.user.token
				vm.$http.get(vm.projUrl,vm.projParam)
					.then((response) => {
						if(response.body.data == null) return;
						vm.loading = false
						vm.projData = response.body.data;
					})
					.catch(function(response){
						vm.error = response.toString()
					})
			},
            projectcompany(index){
				this.$router.push({ 
					name: 'project-companydetail', 
					params: {
						id: this.projParam.params.parameter,
						companyname:index
					}
				})
			},
			attachment(){
				this.$router.push({ 
					name: 'project-attachmentsdetail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
			mapdetail(){
				this.$router.push({ 
					name: 'project-mapdetail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
			resume(){
				this.$router.push({ 
					name: 'project-enginedetail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
            baseinfo(){
				this.$router.push({ 
					name: 'project-detail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
            getenterprisetype:function(){
				this.$http.get(this.enterprisetypeurl,{"params":{"type":"enterprisetype"}})
					.then((response) => {
						this.entertab=response.body;
					})
					.catch(function(response){
						this.error = response.toString()
					})
			}
		}
	}
</script>

<style>

</style>
