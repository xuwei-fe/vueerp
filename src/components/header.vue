<style lang="less" scoped>
/** page header begin */
.page-header {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;	
	height: 50px;
	border: 0;
	background: #2b3643;
	z-index: 999;
	margin: 0;
	padding: 0;
	box-shadow: inset 0 -3px 3px rgba(0,0,0,.1);
}
.page-header .wrap {
	padding: 0 15px;
}
.page-header .navbar,
.page-header .nav {
	margin: 0;
	padding: 0;
	border: 0;
}
.page-header .logo {
	float: left;
	height: 30px;
	width: 80px;
	background: url(../img/logo.png) no-repeat center;
	margin-top: 10px;
	margin-left: 10px;
}
.page-header .el-menu {
  background-color: transparent;
}
.page-header .el-menu--horizontal .el-menu-item:hover {
  background-color: #146bc0;
  border-bottom: 0
}
.page-header .el-menu--horizontal .el-menu-item {
  border-bottom: 0;
  color: #a8c6e6;
}
.page-header .el-menu-item a {
	display: block;
	color: #d5e0f0;
	text-decoration: none;
}
.page-header .right-nav .el-menu {
  float: right;
}
.page-header .right {
	text-align: right;
	height: 100%;
	color: #fff;
}
.page-header .right > a {
	display: inline-block;
	color: #fff;
	cursor: pointer;
	line-height: 50px;
	text-decoration: none;
	padding: 0 15px;
}
.page-header .right > a:hover {
	background-color: #146bc0;
}
/** page header end */
</style>
<template>
	<header class="page-header">
		<el-row>
			<el-col :span="12">
				<router-link v-if="user.username" to="/home">
					<div class="logo"></div>
				</router-link>
			</el-col>
			<el-col :span="12" class="right">
				<router-link v-if="user.username" to="/home" class="fzwrite">{{user.id}}</router-link>
				<a @click.stop="dialogVisible = true">退出</a>
			</el-col>
		</el-row>
		<el-dialog title="提示" v-model="dialogVisible" size="tiny">
			<span>你确定退出登陆吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sucess">确 定</el-button>
			</span>
		</el-dialog>
	</header>
</template>
<script>
    import { mapState } from 'vuex'
	import { USER_SIGNOUT } from 'store/user'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				dialogVisible: false,
			};
		},
        computed: mapState({ user: state => state.user }),
		methods: {
			...mapActions([USER_SIGNOUT]),
	    	sucess:function(){
				this.USER_SIGNOUT()
				this.$router.replace({ path: '/login' })
				this.dialogVisible=false;id
			}
    	}
    }
</script>