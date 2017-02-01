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
			<v-projectnav></v-projectnav>
            <div class="proj-cnt">
				<ul class="projectdetail clearfix">
					<li>
						<label>工程名称：</label>
						<span>{{projData.name}}</span>
					</li>
					<li>
						<label>中标工程名：</label>
						<span>{{projData.zbgcm}}</span>
					</li>
					<li>
						<label>别名：</label>
						<span>{{projData.bname}}</span>
					</li>
					<li>
						<label>监督注册号：</label>
						<span>{{projData.sno}}</span>
					</li>
					<li>
						<label>工程类别：</label>
						<span>{{projData.type}}</span>
					</li>
					<li>
						<label>临时工程：</label>
						<span>{{projData.istemp}}</span>
					</li>
					<li>
						<label>工程造价(万元)：</label>
						<span>{{projData.cost}}</span>
					</li>
					<li>
						<label>工程状态：</label>
						<span>{{projData.status}}</span>
					</li>
					<li>
						<label>责任书编号：</label>
						<span>{{projData.zno}}</span>
					</li>
					<li>
						<label>总投资：</label>
						<span>{{projData.invest}}</span>
					</li>
					<li>
						<label>总面积：</label>
						<span>{{projData.squre}}</span>
					</li>
					<li>
						<label>监管类别：</label>
						<span>{{projData.jglb}}</span>
					</li>
					<li>
						<label>用途：</label>
						<span>{{projData.purpose}}</span>
					</li>
					<li>
						<label>项目进度：</label>
						<span>{{projData.dqjd}}</span>
					</li>
					<li>
						<label>建设工程规划许可证：</label>
						<span>{{projData.sgno}}</span>
					</li>
					<li>
						<label>道路面积：</label>
						<span>{{projData.dlmj}}</span>
					</li>
					<li>
						<label>桥梁面积：</label>
						<span>{{projData.qlmj}}</span>
					</li>
					<li>
						<label>轨道长度：</label>
						<span>{{projData.gdcd}}</span>
					</li>
					<li>
						<label>省：</label>
						<span>{{projData.province}}</span>
					</li>
					<li>
						<label>市：</label>
						<span>{{projData.city}}</span>
					</li>
					<li>
						<label>区：</label>
						<span>{{projData.area}}</span>
					</li>
					<li>
						<label>工程地点：</label>
						<span>{{projData.addr}}</span>
					</li>
					<li>
						<label>是否骏工：</label>
						<span>{{projData.iscomplete}}</span>
					</li>
					<li>
						<label>是否停工：</label>
						<span>{{projData.isstop}}</span>
					</li>
					<li>
						<label>开工日期：</label>
						<span>{{projData.startdate}}</span>
					</li>
					<li>
						<label>竣工日期：</label>
						<span>{{projData.jgno}}</span>
					</li>
					<li>
						<label>竣工备案号：</label>
						<span>{{projData.qlmj}}</span>
					</li>
					<li>
						<label>是否临时工程：</label>
						<span>{{projData.istemp}}</span>
					</li>
					<li>
						<label>主体阶段：</label>
						<span>{{projData.ztjd}}</span>
					</li>
					<li>
						<label>当前阶段：</label>
						<span>{{projData.dqjd}}</span>
					</li>
					<li>
						<label>录入日期：</label>
						<span>{{projData.cdate}}</span>
					</li>
					<li>
						<label>中标工程名：</label>
						<span>{{projData.zbgcm}}</span>
					</li>
					<li>
						<label>别名：</label>
						<span>{{projData.bname}}</span>
					</li>
				</ul>
				<div class="zlmb">质量目标：<span>{{projData.zlmb}}</span></div>
				<div class="sbzl">申报质量：<span>{{projData.sbzl}}</span></div>

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
                loading: false,
				error: null,
				projData:"",
				projUrl: global.host + 'Project/QueryProjectDetail',
				projParam: {
					params: {
						token: '',
						parameter: ""
					}
				},
				enterprisetypeurl:global.host + "SysDict/Get",
				entertab:""
            }
		},
		computed: mapState({ user: state => state.user }),
		created() {
            this.fetchData()
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
					})
					.catch(function(response){
						vm.error = response.toString()
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
			handleClick(tab, event) {
				console.log(tab, event);
			},
			projectcompany(index){
				this.$router.push({ 
					name: 'project-companydetail', 
					params: {
						id: this.projParam.params.parameter,
						companyname:index
					}
				})
			}
		}
	}
</script>

<style>

</style>
