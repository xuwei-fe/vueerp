<style scoped>

</style>
<template>
	<div class="page-prod" :class="{ 'page-prod-mini' : isProdMini }">
		<div class="prod-sidebar" id="prodSidebar">
			<h3 class="prod-nav-title">企业管理</h3>
			<el-menu :default-active="prodActive">
				<el-menu-item index="enterprise-list">
					<router-link to="/enterprise-list">企业列表</router-link>
				</el-menu-item>
				<el-menu-item index="enterprise-department">
					<router-link to="/enterprise-department">企业人员管理</rouer-link>
				</el-menu-item>
				<el-menu-item index="enterprise-history">
					<router-link to="/enterprise-history">企业变更历史记录</router-link>
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