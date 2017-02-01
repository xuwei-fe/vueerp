<style scoped>

</style>
<template>
	<div class="page-prod" :class="{ 'page-prod-mini' : isProdMini }">
		<div class="prod-sidebar" id="prodSidebar">
			<h3 class="prod-nav-title">统计分析</h3>
			<el-menu :default-active="prodActive">
				<el-menu-item index="audit-enterprise">
					<router-link to="/audit-enterprise">企业一览表</router-link>
				</el-menu-item>
				<el-menu-item index="audit-project">
					<router-link to="/audit-project">项目一览表</router-link>
				</el-menu-item>
				<el-menu-item index="audit-employee">
					<router-link to="/audit-employee">务工人员一览表</router-link>
				</el-menu-item>
				<el-menu-item index="audit-worktype">
					<router-link to="/audit-worktype">工种分布统计图</router-link>
				</el-menu-item>
				<el-menu-item index="audit-jsc">
					<router-link to="/audit-jsc">领导驾驶舱</router-link>
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