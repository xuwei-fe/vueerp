<style lang="less" scoped>

/** login container banner begin */
.login-container {
	width: 1000px;
	margin: 0 auto;
	padding: 60px 0;
}
.login-container .banner {
	float: left;
	width: 538px;
	overflow: hidden;
}
/** slide begin */
.slide-wrap {
	width: 400px;
	height: 300px;
	overflow: hidden;
	margin: 50px auto 30px auto;
}
.slide {
	float: left;
	height: 100%;
	width: 100%;
}
.slide-control {
	text-align: center;
}
.slide-control span{
	display: inline-block;
	cursor: pointer;
	height: 16px;
	width: 16px;
	line-height: 1;
	background-color: #ddd;
	border-radius: 100%;
	margin: 0 5px;
}
.slide-control span.active {
	background-color: #0072c6;
}

/** login panel begin */
.login-panel {
    position: relative;
    width: 400px;
    height: 400px;
    float: right;
    border: 1px solid #ddd;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    padding: 0 30px;
    overflow: hidden;
	box-sizing: border-box;
	* {
		box-sizing: border-box;
	}
	.nav-tabs {
		border-bottom: 1px solid #ddd;
		li {
			list-style: none;
			font-size: 18px;
			padding: 0;
			text-align: left;
			width: 50%;
		}
	}
	.nav-tabs > li > a {
		border-width: 0 0 3px;
		border-color: transparent;
		display: block;
		padding: 15px;
		font-size: 16px;
		color: #666;
		text-align: center;
	}
	.nav-tabs > li.active > a,
	.nav-tabs > li.active > a:hover,
	.nav-tabs > li.active > a:focus {
		color: #555;
		cursor: default;
		background-color: #fff;
		border: 1px solid #ddd;
		border-bottom-color: transparent;
	}
	.nav-tabs > li.active > a, 
	.nav-tabs > li.active > a:focus, 
	.nav-tabs > li.active > a:hover {
		border-width: 0 0 3px;
		border-color: #eb3c00;
		cursor: pointer;
		text-decoration: none;
	}
	.nav-tabs > li > a:hover {
		color: #666;
		text-decoration: none;
	}
	.help-block {
		color: #eb3c00;
		margin-bottom: 0;
	}
	/** form begin */
	.tab-content {
		padding: 20px 0;
	}
	.tab-content > .tab-pane {
		display: none;
		visibility: hidden;
	}
	.tab-content > .active {
		display: block;
		visibility: visible;
	}
	.form-group {
		margin-bottom: 15px;
	}
	.input-group {
		width: 100%;
		position: relative;
		.input-group-addon {
			position: absolute;
			left: 10px;
			top: 10px;
			height: 20px;
			width: 30px;
			.icon-account, .icon-pwd {
				display: inline-block;
				height: 20px;
				width: 20px;
			}
			.icon-account {
				background: url(../../img/sprite.png) no-repeat 0 -50px;
			}
			.icon-pwd {
				background: url(../../img/sprite.png) no-repeat -20px -50px;
			}
		}
		.input-group-addon:after {
			position: absolute;
			right: 0;
			top: 0;
			content: '|';
			color: #eee;
		}
		.form-control {
			display: block;
			width: 100%;
			padding: 6px 12px;
			font-size: 14px;
			line-height: 1.42857143;
			color: #555;
			background-color: #fff;
			background-image: none;
			border: 1px solid #ccc;
			border-radius: 4px;
			-webkit-box-shadow: none;
					box-shadow: none;
					height: 40px;
			text-indent: 40px;
		}
		.form-control:focus {
			outline: 0;
			border-color: #ccc;
			-webkit-box-shadow: none;
					box-shadow: none;
		}
		.form-control::-moz-placeholder {
			color: #999;
			opacity: 1;
		}
		.form-control:-ms-input-placeholder {
			color: #999;
		}
		.form-control::-webkit-input-placeholder {
			color: #999;
		}
	}

	.btn {
		display: block;
		width: 100%;
		border-radius: 0;
		margin-bottom: 10px;
		font-size: 16px;
		height: 40px;
		outline: 0;
		border: 0;
		color: #fff;
		cursor: pointer;
	}
	.btn-login {
		background-color: #4bafd7;
	}
	.btn-reg {
		background-color: #55d455;
	}
	.login-link {
		position: absolute;
		right: 30px;
		bottom: 15px;
		color: #8d94a4;
	}
}

/** login footer begin */
.login-footer {
	width: 1000px;
	margin: 0 auto;
	padding: 20px 0 10px 0;
	border-top: 1px solid #f3f3f3;
	text-align: center;
	color: #666;
	font-size: 12px;
	line-height: 24px;
	p {
		margin-bottom: 0;
	}
}
.page-footer {
	color: #999;
	text-align: center;
	padding-bottom: 25px;
	.footer-link {
		background-color: #ebebeb;
		color: #333;
		font-size: 18px;
		padding: 25px 0 10px 0;
		margin-bottom: 25px;
		p {
			margin-bottom: 15px;
			a {
				margin: 0 20px;
			}
			strong {
				font-size: 24px;
				font-style: italic;
				font-weight: normal;
			}

			.icon-tel {
				display: inline-block;
				font-style: normal;
				height: 20px;
				width: 20px;
				background: url(../../img/sprite.png) no-repeat -50px -50px;
				vertical-align: middle;
			}
		}
	}
}


</style>
<template>
	<div>
		<v-wrapheader></v-wrapheader>
		<div class="login-container clearfix">
			<div class="banner">
				<div class="slide-wrap clearfix">
					<slider :pages="someList" :sliderinit="sliderinit" @slide='slide'>
						
					</slider>
				</div>

			</div>
			<div class="login-panel">
				<ul class="tab nav-tabs clearfix" role="tablist">
					<li role="presentation" class="active" style="float: left;">
						<a href="#accountLogin" role="tab" data-toggle="tab">账号登录</a>
					</li>
				</ul>
				<div class="tab-content">
					<!-- 账号登录 begin -->
					<div role="tabpanel" class="tab-pane active" id="accountLogin">
						<form class="login-form" id="loginForm"  v-on:submit.prevent="submit">

							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">
										<span class="icon-account"></span>
									</div>
									<input autocomplete="off" id="username" class="form-control" type="text" placeholder="用户名" v-model="form.username">
								</div>
								<span class="help-block" v-show="btn && !form.username">用户名不能为空</span>
							</div>

							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">
										<span class="icon-pwd"></span>
									</div>
									<input autocomplete="off" id="userpwd" class="form-control" type="password" v-model="form.name" placeholder="密码 / 动态口令">
								</div>
								<span class="help-block" v-show="btn && !form.username">密码不能为空</span>
								<span class="help-block" v-if="form.msg">{{form.msg}}</span>
							</div>

							<div class="form-group">
								<div class="checkbox">
									<el-checkbox label="记住密码" name="type"></el-checkbox>
								</div>
							</div>
							
							<button id="loginBtn01" class="btn btn-login">立即登录</button>
							<router-link style="text-decoration:none;" to="/enterprise-regenterprise"><button class="btn btn-reg">免费注册</button></router-link>
						</form>
					</div>
					<div class="login-link">
	                	<a href="javascript:ModifyChange();" id="modify">忘了密码？</a>
	                </div>
				</div>
			</div>
		</div>

		<!--footer begin-->
		<div class="page-footer">
			<div class="footer-link">
				<p><i class="icon-tel"></i>&nbsp;服务热线：<strong>021-22816010</strong></p>
				<p>
					<router-link to="">薪乐达简介</router-link>
					<router-link to="">薪乐达优势</router-link>
					<router-link to="">下载操作手册</router-link>
				</p>
			</div>
			<p>本系统支持IE9及以上、谷歌、火狐、360等浏览器。版权所有&copy;2016-2017 上海瓯速信息科技有限公司</p>
		</div>
		<!--footer begin-->
	</div>
		
</template>
<script>
	import slider from '../../components/slider'
    import { mapActions } from 'vuex'
    import { USER_SIGNIN } from 'store/user'
	// 引入全局变量
	import global from '../../config/global';
    export default {
        data() {
			return {
				btn: false, //true 已经提交过， false没有提交过
				form: {
					id: '',
					name: '',
					msg:'',
					token: ''
				},
				someList:[
					{
						title: '1',
						style:{
							// 'background':'#1bbc9b',
						},
						width:"400",
						height:"300",
						src:"http://img06.tooopen.com/images/20161101/tooopen_sy_184377491944.jpg"
					},
					{
						title: '2',
						style:{
							// 'background':'#1bbc9b',
						},
						width:"400",
						height:"300",
						src:"http://img06.tooopen.com/images/20161101/tooopen_sy_184377491944.jpg"
					},
					{
						title: '3',
						style:{
							// 'background':'#1bbc9b',
						},
						width:"400",
						height:"300",
						src:"http://img06.tooopen.com/images/20161101/tooopen_sy_184377491944.jpg"
					}
				],
				sliderinit: {
					currentPage: 1,
					// start: {},
					// end: {},
					// tracking: false,
					thresholdTime: 500,//滑动时间阈值判定距离
					thresholdDistance: 100,//滑动距离阈值
					// direction:'vertical',//垂直滚动
					loop:true,//无限循环
					autoplay:3000,//自动播放:时间[ms]
				}
			}
		},
		components: {
			slider
		},
		methods: { 
            ...mapActions([USER_SIGNIN]),
			submit() {
				this.btn = true
				if(!this.form.username || !this.form.name) return
				this.USER_SIGNIN(this.form)
				//this.$router.replace({ path: '/home' })//登陆不调接口
				//return;
				this.$http.get(global.host+"Login/GetLogin",{"emulateHTTP":true,"params":{"username":this.form.username,"password":this.form.name}})
				.then((response) => {
					if(response.body.ret){
						this.form.msg = response.body.msg
					}
					else{
						this.$router.replace({ path: '/home' })
						this.form = response.body.data
						this.USER_SIGNIN(this.form)
					}
				})
				.catch(function(response) {
					console.log(response)
				})
				//
			},
			turnTo (num) {
				// 传递事件 vue 2.0 传递事件修改了，好的写法应该直接写在空vue类中
				this.$children[0].$emit('slideTo', num);
			},
			slideNext () {
				this.$children[0].$emit('slideNext');
			},
			slidePre () {
				this.$children[0].$emit('slidePre');
			},
			appendslider(){
				this.someList.push({
					title: 'slidernew',
					style:{
						background:'#333',
						color:'#fff'
					}
				});
			},
			// 监听事件也发生了变化,需要指向一个子组件实例
			slide(pagenum){

			}
			
		}
    }
</script>