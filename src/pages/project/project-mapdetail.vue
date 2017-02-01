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
		<v-header></v-header>
		<div class="page-container">
			<div class="portlet-title clearfix">
				<div class="left">
					<h3>项目详情</h3>
					<router-link to='/project'>
						<el-button type="text" size="small">返回项目列表</el-button>
					</router-link>
				</div>
			</div>
			<v-projectnav></v-projectnav>
		</div>
		<div style="width:100%">
			<div id="allmap" style="height: 500px;"></div>
			<el-button type="primary" @click="savemap">保存</el-button>
		</div>
		
	</div>
</template>

<script>
	import '../../css/base.css'
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function(){
			return {
				gluser:false,//管理用户弹框
                loading: false,
				error: null,
				projData:"",
				projUrl: global.host + 'Project/QueryProjectDetail',
				GetEnterpriseUserurl:global.host + "Enterprise/GetEnterpriseUserList",//企业人员
				GetEnterpriseurl:global.host + 'Enterprise/GetEnterprise',//根据id来获取企业信息
				updatemapurl:global.host + 'Project/UpdateProjectLocation',//提交map 地址
				EnterpriseUser:"",//企业人员
				Enterprise:"",//企业信息数据
				projParam: {
					params: {
						token: '',
						parameter: ""
					}
				},
				enterprisetypeurl:global.host + "SysDict/Get",
				entertab:"",
				companytable:"",
				maplocation:""
            }
		},
		computed: mapState({ user: state => state.user }),
		created() {
            this.fetchData();
			
		},
		mounted(){
			//this.mapRender()
		},
        watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': 'fetchData'
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
						this.mapRender()
						
					})
					.catch(function(response){
						vm.error = response.toString()
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
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			projectcompany(){
				this.$router.push({ 
					name: 'project-companydetail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
			mapRender(){
				var vm=this;
				var mapstr=this.projData.location.split(",")
				// 百度地图API功能
				var map = new BMap.Map("allmap");
				var point = new BMap.Point(mapstr[0],mapstr[1]);
				map.centerAndZoom(point, 12);
				var marker = new BMap.Marker(point);// 创建标注
				map.addOverlay(marker);             // 将标注添加到地图中
				map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
				map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
				//marker.enableDragging() //禁止拖拽
				marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
				function showInfo(e){
					vm.maplocation=e.point.lng + ", " + e.point.lat
				}
				map.addEventListener("click", showInfo);
			},
			savemap(){
				var vm=this;
				this.$http.post(this.updatemapurl,{"token":vm.user.token,"parameter":{"location":vm.maplocation,"id":this.projParam.params.parameter}})
				.then((response) => {
					if(response.body.ret=="0"){
						alert(response.body.msg)
					}
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
