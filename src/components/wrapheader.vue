<style lang="less" scoped>
.navbar {
	border-bottom: 1px solid #ebebeb;
	height: 80px;
}

.login-topbar .navbar-header {
	float: left;
}
.login-topbar .navbar-right {
	float: right;
	height: 80px;
	margin: 0;
}
.login-topbar .navbar-brand {
	color: #333;
	float: left;
	display: inline-block;
	margin: 12px;
	background: url(../img/loginlogo.png) no-repeat left center;
	height: 50px;
	width: 315px;
}
.login-topbar .navbar-nav > li {
	float: left;
	margin-left: 30px;
}
.login-topbar .navbar-nav > li > a {
	color: #666;
	height: 80px;
	line-height: 80px;
	padding-top: 0;
	padding-bottom: 0;
}
.login-topbar .nav li a,
.login-topbar .nav li a:hover,
.login-topbar .nav li a:active,
.login-topbar .nav li a:focus {
	background-color: transparent;
}
.login-topbar .nav li a:hover {
	text-decoration: underline;
}
</style>
<template>
    <div class="navbar">
        <div class="wrap">
            <div class="login-topbar">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#"></a>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <router-link slot="right" to="/download">下载客户端</router-link>
                    </li>
                    <li>
                        <router-link slot="right" to="/help">帮助与文档</router-link>
                    </li>
                    <li>
                        <router-link slot="right" to="/about">关于</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>