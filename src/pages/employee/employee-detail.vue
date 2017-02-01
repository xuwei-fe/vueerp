<style lang="less" scoped>
    .breadcrumb {
		border-bottom: 1px solid #e7ecf1;
		color: #333;
		font-size: 14px;
		font-weight: bold;
		padding-bottom: 15px;
		margin-bottom: 15px;
		.title {
			margin-right: 30px;
		}
	}
	.portlet {
	}
	.portlet-title {
		background-color: #f5f5f5;
		font-size: 14px;
		font-weight: bold;
		padding: 8px 10px;
	}
	.portlet-title::before, 
	.portlet-title::after {
	    content: "";
	    display: table;
	}
	.portlet-title::after {
	    clear: both;
	}
	.user-basic {
		margin-bottom: 50px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		width: 100%;
		.avatar {
			width: 160px;
			overflow: hidden;
			text-align: center;
		}
		.avatar img {
			width: 160px;
			height: 180px;
			margin-top: 10px;
		}
		.info {
			list-style: none;
			margin: 0;
			padding-left: 20px;
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;
		}
		.info li {
			padding: 6px 0;
		}
		.iscert {
			margin-left: 30px;
			color: #25b925;
		}
	}

	.worklist {
		position: relative;
		padding-left: 15px;
		margin-top: 15px;
		margin-left: 10px;
		p {
			overflow: hidden; 
			text-overflow: ellipsis; 
			-webkit-text-overflow: ellipsis; 
			-o-text-overflow: ellipsis; 
			white-space: nowrap;
			margin: 0;
			padding: 3px 0;
			.col-l {
				color: #999;
			}
		}
		p:first-child {
			padding-left: 0;
		}
		
	}
	.worklist:before {
		content: '';
		position: absolute;
		display: block;
		width: 4px;
		height: 20px;
		background: #1980cc;
		top: 3px;
		left: 0;
	}
	.worklistMore {
		text-align: center;
		margin: 15px 0;
		cursor: pointer;
		color: #1980cc;
	}
	.portlet-cnt .comp-full-calendar {
		padding-left: 0;
		padding-right: 0;
	}
	.c-gray {
		color: #888;
	}
	.timePop .body {
		font-size: 14px;
	}
	.duty-top {
		margin-bottom: 15px;
		line-height: 1.8;
		font-size: 14px;
	}
	
</style>
<template>
	<div>
		<div class="breadcrumb">
			<span class="title">务工人员详情</span>
			<router-link to='/employee'>
				<el-button type="text" size="small">返回人员列表</el-button>
			</router-link>
		</div>

		<el-row :gutter="30" class="employee-cnt">
			<el-col :span="16">
				<div class="loading" v-if="personLoading">数据加载中...</div>
				<div class="user-basic" v-else>
					<div class="avatar">
						<div><img :src="person.Userpic"/></div>
						<div></div>
					</div>
					<ul class="info">
						<li><span class="c-gray">姓名：</span>{{ person.EmployeeName }} 
							<span class="iscert" v-if="person.Iscert">已实名认证</span><span class="iscert" v-else>未实名认证</span>
						</li>
						<li><span class="c-gray">性别：</span>{{ person.Sex }}</li>
						<li><span class="c-gray">身份证号：</span>{{ person.Idcardno }}</li>
						<li><span class="c-gray">出生日期：</span>{{ person.Birth.slice(0,10) }}</li>
						<li><span class="c-gray">籍贯：</span>{{ person.Native }}</li>
						<li><span class="c-gray">家庭地址：</span>{{ person.Homeaddr }}</li>
						<li><span class="c-gray">工种：</span>{{ person.Worktype }}</li>
						<li><span class="c-gray">手机：</span>{{ person.Mobile }}</li>
					</ul>
				</div>

				<el-row class="portlet">
					<div class="portlet-title">考勤信息</div>
					<div class="portlet-cnt">
						<full-calendar class="test-fc" :events="fcEvents"
						first-day='1' lang="zh"
						@changeMonth="changeMonth"
						@dayClick="dayClick">
						</full-calendar>
					</div>
				</el-row>
			</el-col>

			<el-col :span="8">
				<div class="portlet">
					<div class="portlet-title">工作履历</div>
					<div class="portlet-cnt">
						<div class="loading" v-if="worklistLoading">数据加载中...</div>
						<div class="worklist" v-for="work in worklist" v-else>
							<p>
								<span>{{ work.Joindate.slice(0,10) }}</span>
								<span v-if="work.Isonjob == 'Y' && work.Enddate == null">至今</span>
								<span v-else>{{ work.Enddate.slice(0,10) }}</span>
							</p>
							<p><span class="col-l">项目：</span>{{ work.PrjName }}</p>
							<p><span class="col-l">企业：</span>{{ work.EntName}}</p>
							<p><span class="col-l">负责人：</span>ss{{ TeamleaderName }}</p>
							<p><span class="col-l">联系电话：</span>ss{{ TeamleaderTel }}</p>
						</div>
						<div class="worklistMore" v-if="worklistMore" @click="getWorklistMore">查看更多履历</div>
					</div>
				</div>
			</el-col>

		</el-row>

		<el-dialog title="考勤详情" v-model="dialogDutyVisible" size="small">
			<div class="duty-top clearfix">
				<b>{{ person.EmployeeName }}</b>&nbsp;&nbsp;{{ selectDay }}</span>
			</div>
			<template>
				<el-table
					:data="dayDuty"
					style="width: 100%">
					<el-table-column
					prop="RecordTime"
					label="打卡时间"
					width="180">
					</el-table-column>
					<el-table-column
					prop="DevName"
					label="打卡机"
					width="180">
					</el-table-column>
					<el-table-column
					prop="Direction"
					label="进/出">
					</el-table-column>
					<el-table-column
					prop="PhotoPath"
					label="照片">
					<template scope="scope">
						<img :src="scope.row.PhotoPath" width="45" height="45" style="margin-top: 10px;"/>
					</template>
					</el-table-column>
				</el-table>
			</template>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogDutyVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		
	</div>
</template>
<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function(){
			return {
				personLoading: true,
				worklistLoading: true,
				error: null,
				person: {},
				personUrl: global.host + 'Personal/GetPersonalModel',
				personParam: {
					params: {
						token: '',
						parameter: {
							EmployeeId: ''
						}
					}
				},
				worklist: [],
				worklistUrl: global.host + 'Personal/GetEmpTrackByEmpId',
				worklistParam: {
					params: {
						token: '',
						pagesize: 5,
						pageindex: 1,
						parameter: {
							Idcardno: ''
						}
					}
				},
				worklistMore: false,
				//考勤
				dutyData: [],
				dutyUrl: global.host + 'Personal/GetDutyListByEmpId',
				dutyParam: {
					params: {
						token: '',
						parameter: {
							EmployeeId: ''
						}
					}
				},
				fcEvents: [],
				dialogDutyVisible: false,
				dayDuty: [],
				selectDay: ''
			}
		},
		created: function(){
			this.getEmployeeInfo()	//获取人员信息
			this.getEmployeeDuty()	//获取人员考勤
			//this.getEmployeeWork()	//获取人员履历
		},
		computed: mapState({ user: state => state.user }),
		watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': 'fetchData'
		},
		methods: {
			getEmployeeInfo: function(){
				var vm = this
				vm.personParam.params.parameter.EmployeeId = vm.$route.params.id
				vm.personParam.params.token = vm.user.token
				vm.$http.get(vm.personUrl,vm.personParam)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return false
						}
						vm.personLoading = false
						vm.person = response.body.data[0]
						vm.getEmployeeWork()
					})
					.catch(function(response){
						console.log(response)
					})
			},
			getEmployeeDuty: function(){
				var vm = this
				vm.dutyParam.params.parameter.EmployeeId = vm.$route.params.id
				vm.dutyParam.params.token = vm.user.token
				vm.$http.get(vm.dutyUrl,vm.dutyParam)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return false
						}
						vm.dutyData = response.body.data
						for(var i=0; i<vm.dutyData.length; i++){
							var _duty = vm.dutyData[i]
							var _fcEvent1 = {
								title1: '进场：' + _duty.FirstInRecordTime.slice(11),
								title2: '离场：' + _duty.LastOutRecordTime.slice(11),
								start: _duty.DateTimeNow.slice(0,10),
								end: _duty.DateTimeNow.slice(0,10),
								list: _duty.RecDutyList
							}
							vm.fcEvents.push(_fcEvent1)
						}
					})
					.catch(function(response){
						console.log(response)
					})

			},
			getEmployeeWork: function(){
				var vm = this
				vm.worklistParam.params.token = vm.user.token
				vm.worklistParam.params.parameter.Idcardno = vm.person.Idcardno
				vm.$http.get(vm.worklistUrl,vm.worklistParam)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return false
						}
						vm.worklistLoading = false
						vm.worklist = response.body.data
						console.log(response.body.data)
						if(response.body.pagecount > vm.worklistParam.params.pagesize * vm.worklistParam.params.pageindex){
							vm.worklistMore = true
						}
					})
					.catch(function(response){
						console.log(response)
					})
			},
			getWorklistMore: function() {
				++this.worklistParam.params.pageindex
				this.getEmployeeWork()
			},
			'changeMonth' (start, end, current) {
				console.log('changeMonth', start, end, current)
			},
			'eventClick' (event, jsEvent, pos) {
				console.log('eventClick', event, jsEvent, pos)
			},
			'dayClick' (day, jsEvent) {
				
				this.dialogDutyVisible = true
				this.dayDuty = day.events[0].list
				var d = new Date(day.date)
				var _year = d.getFullYear()
				var _month = d.getMonth() + 1
				var _day = d.getDate()
				var _date = _year + '-'
				if(_month < 10) {
					_date += '0' + _month + '-'
				}else{
					_date += _month + '-'
				}
				if(_day < 10) {
					_date += '0' + _day
				}else{
					_date += _day
				}
				this.selectDay = _date
			},
			'moreClick' (day, events, jsEvent) {
				//console.log('moreCLick', day, events, jsEvent)
			}
		},
		components : {
			'full-calendar' : require('../../fullCalendar')
		}
	}
</script>