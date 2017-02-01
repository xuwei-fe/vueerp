<style scoped>

</style>
<template>
	<div class="page-prod" :class="{ 'page-prod-mini' : isProdMini }">
		<div class="prod-sidebar" id="prodSidebar">
			<h3 class="prod-nav-title">考勤管理</h3>
			<el-menu :default-active="prodActive">
				<el-menu-item index="attendance-record">
					<router-link to="/attendance-record">打卡原始记录</router-link>
				</el-menu-item>
				<el-menu-item index="attendance-day">
					<router-link to="/attendance-day">考勤日报表</router-link>
				</el-menu-item>
				<el-menu-item index="attendance-month">
					<router-link to="/attendance-month">考勤月报表</router-link>
				</el-menu-item>
			</el-menu>
		</div>

		<div class="prod-sidebar-collapse" @click="setProdMini"></div>

		<div class="prod-main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
    export default {
    	data: function (){
		    return {
				isProdMini: true,
		    	prodActive: ''
		    }
    	},
    	created() {
    		this.getProdActive()
    	},
    	watch: {
    		$route(to,from) {
    			this.prodActive = to.name
    		}
    	},
        methods: {
        	getProdActive() {
        		this.prodActive = this.$route.name
        	},
        	setProdMini() {
				this.isProdMini = !this.isProdMini
        	}
        }
    }
</script>