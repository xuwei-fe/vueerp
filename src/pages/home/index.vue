<style lang="less" scoped>
</style>
<template>
	<div>
		<v-header></v-header>
		<div class="page-container" :class="{ 'page-sidebar-mini' : isMini }">
			<div class="page-sidebar">
				<div class="page-sidebar-cnt">    		
					<div class="page-sidebar-collapse" @click="setMini"><i class="icon-fold"></i></div>
					<el-menu :default-active="activeMenu" @select="setMini(true)">
						<template v-for="(item,index) in $router.options.routes" v-if="item.name=='home'">
							<el-menu-item v-for="child in item.children" :index="child.name" :title="child.name">
								<router-link :to="child.path">
									<i :class="child.iconCls"></i>
									<span class="title">{{child.title}}</span>
								</router-link>
							</el-menu-item>
						</template>
					</el-menu>
				</div>
			</div>

			<router-view></router-view>
		</div>
	</div>
</template>
<script>
    export default {
        data: function (){
            return {
				isMini: false,
            	activeMenu: ''
            }
        },
        created() {
        	this.getMenuActive()
        },
        watch: {
        	$route(to,from){//监听路由改变
        		this.activeMenu = to.name.split('-')[0]
        	}
        },
        methods: {
           	setMini(val) {
				if(val === true){
					this.isMini = val
				}else{
					this.isMini = !this.isMini
				}
           	},
           	getMenuActive() {
           		this.activeMenu = this.$route.name.split('-')[0]
           	}
        }
    }
</script>