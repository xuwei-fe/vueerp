<style scoped>
.page-sidebar {
	-webkit-transition: all;
	transition: all;
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 180px;
    background-color: #364150;
    z-index: 100;
    overflow-x: hidden;
}
.page-sidebar .page-sidebar-collapse {
	color: #fff;
	cursor: pointer;
	height: 36px;
	background-color: #2b3643;
	line-height: 36px;
	text-align: center;
}
.page-sidebar .el-menu {
	background-color: transparent;
}
.page-sidebar .el-menu-item {
	line-height: 40px;
	height: 40px;
	color: #b4bcc8;
	border-bottom: 1px solid #3d4957;
}
.page-sidebar .el-menu-item:hover {
	background-color: rgba(0,24,143,.18);
}
.page-sidebar .el-menu-item.is-active {
	background-color: #ea632d;
}
.page-sidebar .el-menu-item a {
	color: #b4bcc8;
	display: block;
	height: 100%;
	width: 100%;
	text-decoration: none;
}
.page-sidebar .el-menu-item.is-active a {
	color: #fff;
}

.page-sidebar-mini .page-sidebar .title {
    visibility: hidden;
}
/** page sidebar end */

</style>
<template>
	<aside class="page-sidebar">
		<div class="page-sidebar-cnt">    		
			<div class="page-sidebar-collapse" @click="setMini"><i class="el-icon-menu"></i></div>
			<el-menu :default-active="menuActive" @select="handleProd">
				<el-menu-item index="enterprise">
					<router-link to="/enterprise">
					<i class="el-icon-message"></i>
					<span class="title">企业管理</span>
				</router-link>
				</el-menu-item>
				<el-menu-item index="project">
					<router-link to="/project">
						<i class="el-icon-message"></i>
						<span class="title">项目管理</span>
					</router-link>
				</el-menu-item>
				<el-menu-item index="3">
					<router-link to="/employment">
						<i class="el-icon-message"></i>
						<span class="title">人员管理</span>
					</router-link>
				</el-menu-item>
				<el-menu-item index="4">
					<router-link to="/attendance">
						<i class="el-icon-message"></i>
						
						<span class="title">考勤管理</span>
					</router-link>
				</el-menu-item>
				<el-menu-item index="5">
					<router-link to="/salary">
						<i class="el-icon-message"></i>
						<span class="title">薪资管理</span>
					</router-link>
				</el-menu-item>
				<el-menu-item index="6">
					<router-link to="/contract">
						<i class="el-icon-message"></i>
						<span class="title">合同管理</span>
					</router-link>
				</el-menu-item>
				<el-menu-item index="7">
					<router-link to="/audit">
						<i class="el-icon-message"></i>
						<span class="title">统计信息</span>
					</router-link>
				</el-menu-item>
			</el-menu>
		</div>
	</aside>
</template>
<script>
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import { ACTIVE } from 'store/activeList'
    export default {
    	data: function () {
    		return {
    			menuActive: ''
    		}
    	},
    	created () {
		    this.setMenuActive()
		},
		watch: {
		    // 如果路由有变化，会再次执行该方法
		    '$route': 'setMenuActive'
		},
    	computed: mapState({ 
            activeList: state => state.activeList
        }),
        methods: {
            ...mapActions([ACTIVE]),
            setMini() {
                this.ACTIVE({'isMini': !this.activeList.isMini})
            },
            setMenuActive (val) {
            	if(val) {
            		this.menuActive = val.name.split('-')[0]
            	}else{
            		this.menuActive = this.$route.name.split('-')[0]
            	}
            },
            handleProd() {
            	this.ACTIVE({'isProdMini': true})
            }
        }
    }
</script>