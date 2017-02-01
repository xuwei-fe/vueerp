<style lang="less" scoped>
.chart-wrap {
	position: relative;
	.legend-title {
		position: absolute;
		left: 0;
		top: 0;
		font-size: 12px;
	}
}
</style>
<template>
	<div>
		<!-- echarts -->

		<div class="portlet-title">工种分布</div>
		<div class="chart-wrap">
			<template>
				<div id="chartWorkTypes" style="width:100%;height:400px;"></div>
				<div class="legend-title">总计 <span style="color: #FF4949">{{ EmployeeTotal }}</span> 人,<span style="color: #FF4949">{{ workTypes.length }}</span>个工种</div>
			</template>
		</div>

	</div>
</template>
<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	import echarts from 'echarts'
    export default {
    	data: function (){
		    return {
				EmployeeTotal: 0,
				workTypes: [],
				workTypesUrl: global.host + 'Personal/GetListGroupByWorkType',
				chartWorkTypes: null,
				chartWorkTypesOption: null,
		    }
    	},
		created() {
			this.getWorkTypes()
		},
		computed: mapState({ user: state => state.user }),
		methods: {
			getWorkTypes: function() {
				var vm = this
				vm.$http.get(vm.workTypesUrl,{
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if(response.body.ret !== 0){
						alert(response.body.msg)
						return false
					}
					vm.workTypes = response.body.data
					vm.EmployeeTotal = response.body.data[0].EmployeeTotal
					var type = [], count = []
					for(var i=0; i<vm.workTypes.length; i++){
						type[i] = vm.workTypes[i].Worktype
						count[i] = vm.workTypes[i].EmployeeCount
					}

					for(var i=0; i<type.length; i++){
						vm.chartWorkTypesOption.legend.data.push({
							name: type[i],
							icon: 'circle'
						})

						vm.chartWorkTypesOption.xAxis.data.push(type[i])
						vm.chartWorkTypesOption.series.push({
							name: type[i],
							type: "bar",
							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'top',
										formatter: (function(){
											return type[i]+'\n{c}'
										})()
									}
								}
							},
							barWidth: 50,
							data: [count[i]]
						})
					}

					vm.chartWorkTypes.setOption(vm.chartWorkTypesOption)
						

				})
				.catch(function(response){
					console.log(response)
				})
			},
		},
		mounted: function(){
			var vm = this
			window.onresize = function(){
				vm.chartWorkTypes.resize()
			}
			vm.chartWorkTypes = echarts.init(document.getElementById('chartWorkTypes'))
			vm.chartWorkTypesOption = {
				title: {
                    text: '',
                    subtext: '',
                    padding: [0, 10],
                    textStyle: {
                    	fontSize: 12
                    },
                    left: 0
                },
                legend: {
                	data: [],
                	top: 30,
                	left: 5,
                	orient: 'vertical',
                	align: 'left'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    	shadowStyle: {
                    		opacity: 0
                    	}
                    },
                },
                grid: {
                    left: '260px',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                	name: '工种',
                    type: 'category',
                    show: false,
                    data: []
                },
                yAxis: {
                	name: '',
                    type: 'value'
                },
				series: [
					{
						name: '',
						type: "bar",
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: 'top',
									formatter: '{b}\n{c}'
								}
							}
						},
						data: []
					}
				]
			}
			vm.chartWorkTypes.setOption(vm.chartWorkTypesOption)
		}
    }
</script>