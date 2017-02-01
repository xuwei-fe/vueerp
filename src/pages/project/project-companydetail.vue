<style lang="less" scoped>
	.clearfix::before, 
	.clearfix::after {
	    content: "";
	    display: table;
	}
	.clearfix::after {
	    clear: both;
	}
    .page-container {
		margin-top: 60px;
	}
	.portlet-title {
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
		margin-bottom: 30px;
		line-height: 30px;
		.left {
			float: left;
		}
		.right {
			float: right;
		}
		h3 {
			color: #333;
			font-size: 14px;
			font-weight: bold;
			margin: 0;
			float: left;
			margin-right: 30px;
		}
		.el-button {
			padding-top: 9px;
			vertical-align: top;
		}
	}
	.projectdetail{
		width:100%;
		font-size: 16px;
		li{
			margin:10px;
			width:40%;
			float:left;
		}
	}
	.zlmb{
		font-size: 16px;
	}
	.sbzl{
		font-size: 16px;
		margin-top:10px;
	}
	.enterpriseullist{
		li{
			font-size:14px;
			line-height:24px;
		}
	}
	.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-form-item{
	  margin-bottom:0px;
  }
  .el-form-item__label{
	  padding:5px 12px 5px 0;
  }
  .Schedult{
	  margin:0 5px;
		
	}
.blue{
	color: blue;
}
.red{
	color: red;
}
.black{
	color: black;
}
	.Schedult:after{ 
		content:">";
		margin-left:5px;
	}
	.Schedult:last-child:after{ 
		content:"";
	}
	.leftentprise{
		padding-top: 15px;
		display: block;
		width: 77px;
		height: 35px;
		position: absolute;
		border-right: 1px solid #ccc;
		margin-right: 90px;
	}
	.pspanmargin{
		span{
			margin:0 10px;
		}
	}
	.cjtable{
		border:1px solid #ccc;
		margin-top:10px;
		.cjtype{
			font-size: 16px;
			color:#999;
			text-align:center;
		}
	}
	.bigxmbox{
		margin-top:20px;
		border:1px solid #ccc;
		padding:0 20px 20px 20px;
		.xmbox{
			padding-bottom:10px;
			border-bottom:1px solid #ccc;
			height: 30px;
			line-height: 30px;
			a{
				float:right;
				font-size:12px;
			}
		}
	}
	.gluserdialog{
		.el-form-item{
			margin-bottom:10px;
		}
	}
	.detailheader{
		img{
			width:60px;
			height:60px;
			float:left;
			display:inline-block;
			margin-top:10px;
		}
		h1{
			margin: 0;
			font-weight: normal;
			span{
				font-size:12px;
				margin-left:20px;
				var{
					color: blue;
					font-style: normal;
				}
			}
		}
		p{
			margin-top:5px;
		}
	}
</style>
<template>
	<div>
		<v-header></v-header>
		<div>
			<div class="detailheader">
				<img :src="projectAllMessage.BarCode">
				<div style="float:left;margin-top:10px;">
					<h1>{{projectAllMessage.Project.name}}<span>中标工程名：<var>{{projectAllMessage.Project.zbgcm}}</var></span></h1>
					<p>项目进度：
						<span :class="projectstate(item.State)" v-for="item in projectAllMessage.Schedult">{{item.Progress}}</span>
					</p>
				</div>
			</div>
			<div style="clear:both"></div>
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="项目首页">
					<el-row :gutter="20">
						<el-col :span="8">
							<el-carousel indicator-position="outside">
								<el-carousel-item v-for="item in 4">
								<h3>{{ item }}</h3>
								</el-carousel-item>
							</el-carousel>
						</el-col>
						<el-col :span="16">
							<el-form label-width="80px">
								<el-form-item label="工程造价">
									<span>{{projectAllMessage.Project.cost}}</span>
								</el-form-item>
								<el-form-item label="项目地址">
									<span>{{projectAllMessage.Project.addr}}</span>
								</el-form-item>
								<el-form-item label="所属企业">
									<span>{{projectAllMessage.JsEntName}}</span>
								</el-form-item>
								<el-form-item label="工程类型">
									<span>{{projectAllMessage.Project.type}}</span>
								</el-form-item>
								<el-form-item label="建筑面积">
									<span>{{projectAllMessage.Project.squre}}</span>
								</el-form-item>
								<el-form-item label="工程用途">
									<span>{{projectAllMessage.Project.purpose}}</span>
								</el-form-item>
								<el-form-item label="项目总监">
									<span>{{projectAllMessage.Project.usr_xmzj}}：{{projectAllMessage.Project.usr_xmzj_mobile}}</span>
								</el-form-item>
								<el-form-item label="项目经理">
									<span>{{projectAllMessage.Project.usr_xmjl}}：{{projectAllMessage.Project.usr_xmzj_mobile}}</span>
								</el-form-item>
								<el-button type="warning">查看详情</el-button>
							</el-form>
						</el-col>
					</el-row>
					<div class="bigxmbox">
						<h3 class="xmbox">
							项目人员
							<a href="javascript:;">查看更多</a>
						</h3>
						<el-tabs  @tab-click="handleClick">
							<el-tab-pane label="管理人员">
								<el-table
								:data="projectAllMessage.ProjectEnteriseUser"
								style="width: 100%">
									<el-table-column
										prop="position"
										label="职位"
										width="180">
									</el-table-column>
									<el-table-column
										prop="fullname"
										label="姓名"
										width="180">
									</el-table-column>
									<el-table-column
										prop="mobile"
										label="联系电话">
									</el-table-column>
									<el-table-column
										prop="cardtype"
										label="证件类型"
										width="180">
									</el-table-column>
									<el-table-column
										prop="idcardno"
										label="证件号码"
										width="180">
									</el-table-column>
								</el-table>
							</el-tab-pane>
							<el-tab-pane label="务工人员">
								<el-table
								:data="projectAllMessage.ProjectEmployees"
								style="width: 100%">
									<el-table-column
										prop="fullname"
										label="姓名"
										width="180">
									</el-table-column>
									<el-table-column
										prop="sex"
										label="性别"
										width="180">
									</el-table-column>
									<el-table-column
										prop="idcardno"
										label="身份证号">
									</el-table-column>
									<el-table-column
										prop="worktype"
										label="工种"
										width="180">
									</el-table-column>
									<el-table-column
										prop="usergroup"
										label="班组"
										width="180">
									</el-table-column>
								</el-table>
							</el-tab-pane>
						</el-tabs>
					</div>
					<div class="bigxmbox">
						<h3 class="xmbox">
							参建单位
							<a href="javascript:;">查看更多</a>    
						</h3>
						<div v-for="item in projectAllMessage.ProjectEnterprises">
							<div class="cjtable">
								<el-row :gutter="20">
									<el-col :span="3">
										<p>&nbsp;</p>
										<p class="cjtype">{{item.ent_type}}</p>
									</el-col>
									<el-col :span="7">
										<p>单位名称：{{item.ent_name}} </p>
										<p>法人代表：{{item.frdb}}</p>
										<p>项目负责人：{{item.xmfzr}}</p>
									</el-col>
									<el-col :span="6">
										<p>&nbsp;</p>
										<p>资质等级：{{item.zzdj}}</p>
										<p>项目负责人：{{item.xmfzr}}</p>
									</el-col>
									<el-col :span="6">
										<p>&nbsp;</p>
										<p>资格证书号码：{{item.zgzshm}}</p>
									</el-col>
									<el-col :span="2"></el-col>
								</el-row>
							</div>
						</div>
					</div>
					<div class="bigxmbox">
						<h3 class="xmbox">
							项目地图信息
						</h3>
						<div>
							<div style="margin:10px 0;">地址：{{projectAllMessage.Project.addr}}</div>
							<div id="allmap" style="height: 400px;"></div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="项目详情">
					<el-button type="primary" @click="baseedit = true">编辑</el-button>
					<ul class="projectdetail clearfix">
						<li>
							<label>工程名称：</label>
							<el-input v-model="baseprojData.name" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.name}}</span>
						</li>
						<li>
							<label>中标工程名：</label>
							<el-input v-model="baseprojData.zbgcm" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.zbgcm}}</span>
						</li>
						<li>
							<label>别名：</label>
							<el-input v-model="baseprojData.bname" v-if="baseedit"></el-input>
							<span  v-if="!baseedit">{{baseprojData.bname}}</span>
						</li>
						<li>
							<label>监督注册号：</label>
							<el-input v-model="baseprojData.sno" v-if="baseedit"></el-input>
							<span  v-if="!baseedit">{{baseprojData.sno}}</span>
						</li>
						<li>
							<label>工程类别：</label>
							<el-input v-model="baseprojData.type" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.type}}</span>
						</li>
						<li>
							<label>临时工程：</label>
							<el-input v-model="baseprojData.istemp" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.istemp}}</span>
						</li>
						<li>
							<label>工程造价(万元)：</label>
							<el-input v-model="baseprojData.cost" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.cost}}</span>
						</li>
						<li>
							<label>工程状态：</label>
							<el-input v-model="baseprojData.status" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.status}}</span>
						</li>
						<li>
							<label>责任书编号：</label>
							<el-input v-model="baseprojData.zno" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.zno}}</span>
						</li>
						<li>
							<label>总投资：</label>
							<el-input v-model="baseprojData.invest" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.invest}}</span>
						</li>
						<li>
							<label>总面积：</label>
							<el-input v-model="baseprojData.squre" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.squre}}</span>
						</li>
						<li>
							<label>监管类别：</label>
							<el-input v-model="baseprojData.jglb" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.jglb}}</span>
						</li>
						<li>
							<label>用途：</label>
							<el-input v-model="baseprojData.purpose" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.purpose}}</span>
						</li>
						<li>
							<label>项目进度：</label>
							<el-input v-model="baseprojData.dqjd" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.dqjd}}</span>
						</li>
						<li>
							<label>建设工程规划许可证：</label>
							<el-input v-model="baseprojData.sgno" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.sgno}}</span>
						</li>
						<li>
							<label>道路面积：</label>
							<el-input v-model="baseprojData.dlmj" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.dlmj}}</span>
						</li>
						<li>
							<label>桥梁面积：</label>
							<el-input v-model="baseprojData.qlmj" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.qlmj}}</span>
						</li>
						<li>
							<label>轨道长度：</label>
							<el-input v-model="baseprojData.gdcd" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.gdcd}}</span>
						</li>
						<li>
							<label>省：</label>
							<el-input v-model="baseprojData.province" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.province}}</span>
						</li>
						<li>
							<label>市：</label>
							<el-input v-model="baseprojData.city" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.city}}</span>
						</li>
						<li>
							<label>区：</label>
							<el-input v-model="baseprojData.area" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.area}}</span>
						</li>
						<li>
							<label>工程地点：</label>
							<el-input v-model="baseprojData.addr" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.addr}}</span>
						</li>
						<li>
							<label>是否骏工：</label>
							<el-input v-model="baseprojData.iscomplete" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.iscomplete}}</span>
						</li>
						<li>
							<label>是否停工：</label>
							<el-input v-model="baseprojData.isstop" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.isstop}}</span>
						</li>
						<li>
							<label>开工日期：</label>
							<el-input v-model="baseprojData.startdate" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.startdate}}</span>
						</li>
						<li>
							<label>竣工日期：</label>
							<el-input v-model="baseprojData.jgno" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.jgno}}</span>
						</li>
						<li>
							<label>竣工备案号：</label>
							<el-input v-model="baseprojData.qlmj" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.qlmj}}</span>
						</li>
						<li>
							<label>是否临时工程：</label>
							<el-input v-model="baseprojData.istemp" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.istemp}}</span>
						</li>
						<li>
							<label>主体阶段：</label>
							<el-input v-model="baseprojData.ztjd" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.ztjd}}</span>
						</li>
						<li>
							<label>当前阶段：</label>
							<el-input v-model="baseprojData.dqjd" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.dqjd}}</span>
						</li>
						<li>
							<label>录入日期：</label>
							<el-input v-model="baseprojData.cdate" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.cdate}}</span>
						</li>
						<li>
							<label>中标工程名：</label>
							<el-input v-model="baseprojData.zbgcm" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.zbgcm}}</span>
						</li>
						<li>
							<label>别名：</label>
							<el-input v-model="baseprojData.bname" v-if="baseedit"></el-input>
							<span v-if="!baseedit">{{baseprojData.bname}}</span>
						</li>
					</ul>
				<div class="zlmb">质量目标：<span>{{baseprojData.zlmb}}</span></div>
				<div class="sbzl">申报质量：<span>{{baseprojData.sbzl}}</span></div>
				<el-button type="primary" @click="baseedit = false">保存</el-button>
				</el-tab-pane>
				<el-tab-pane label="项目人员">
					<el-tabs @tab-click="handleClick">
						<el-tab-pane label="管理人员" >
							<el-button type="gray" size="small" @click="gldialog">新增</el-button>
							<div style="float:right; margin-bottom:10px;">
								<el-input v-model="EnterpriseUsers.fullname" placeholder="请输入姓名" style="width:100px;"></el-input>
								<el-button type="primary" @click="EnterpriseUsersUrl()">查询</el-button>
							</div>
							<el-table
							:data="EnterpriseUsers"
							style="width: 100%">
								<el-table-column
									prop="position"
									label="职位"
									width="180">
								</el-table-column>
								<el-table-column
									prop="fullname"
									label="姓名"
									width="180">
								</el-table-column>
								<el-table-column
									prop="mobile"
									label="联系电话">
								</el-table-column>
								<el-table-column
									prop="cardtype"
									label="证件类型"
									width="180">
								</el-table-column>
								<el-table-column
									prop="idcardno"
									label="证件号码"
									width="180">
								</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="务工人员" >
							<el-table
								:data="QueryProjectwg"
								style="width: 100%">
									<el-table-column
										prop="fullname"
										label="姓名"
										width="180">
									</el-table-column>
									<el-table-column
										prop="sex"
										label="性别"
										width="180">
									</el-table-column>
									<el-table-column
										prop="idcardno"
										label="身份证号">
									</el-table-column>
									<el-table-column
										prop="worktype"
										label="工种"
										width="180">
									</el-table-column>
									<el-table-column
										prop="usergroup"
										label="班组"
										width="180">
									</el-table-column>
								</el-table>
						</el-tab-pane>
					</el-tabs>
				</el-tab-pane>
				<el-tab-pane label="参建单位">
					<el-button type="primary" size="small" @click="getEnterprise">新建参建单位</el-button>
					<div v-for="item in companytable">
						<div class="cjtable">
							<el-row :gutter="20">
								<el-col :span="3">
									<p>&nbsp;</p>
									<p class="cjtype">{{item.Project_enterprise.ent_type}}</p>
								</el-col>
								<el-col :span="7">
									<p>单位名称：{{item.Project_enterprise.entname}} </p>
									<p>法人代表：{{item.Project_enterprise.frdb}}</p>
									<p>项目负责人：{{item.Project_enterprise.xmfzr}}</p>
								</el-col>
								<el-col :span="6">
									<p>&nbsp;</p>
									<p>资质等级：{{item.Project_enterprise.zzdj}}</p>
									<p>项目负责人：{{item.Project_enterprise.xmfzr}}</p>
								</el-col>
								<el-col :span="4">
									<p>&nbsp;</p>
									<p>资格证书号码：{{item.Project_enterprise.zgzshm}}</p>
								</el-col>
								<el-col :span="4">
									<p>&nbsp;</p>
									<p class="pspanmargin">
										<a href="javascript:;" @click="editerprisebut(item.Project_enterprise.id)">编辑</a>
										<a href="javascript:;" @click="delentprise(item.Project_enterprise.id)">删除</a>
									</p>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="项目履历">
					<el-table
						:data="projData"
						style="width: 100%">
							<el-table-column
								prop="title"
								label="标题"
								width="180">
							</el-table-column>
							<el-table-column
								prop="prj_name"
								label="工程名称"
								width="180">
							</el-table-column>
							<el-table-column
								prop="mtime"
								label="变更时间"
								width="180">
							</el-table-column>
							<el-table-column
								prop="muser"
								label="变更人">
							</el-table-column>
							<el-table-column
								prop="ip"
								label="IP">
							</el-table-column>
							<el-table-column inline-template :context="_self" label="操作" width="160" align="center">
								<span>
									<el-button type="text" size="small" @click="handleViewlvli($index)">查看</el-button>
								</span>
							</el-table-column>
						</el-table>
				</el-tab-pane>
			</el-tabs>
		</div>
		<el-dialog title="管理用户界面" v-model="gluser" size="tiny" class="gluserdialog">
			<el-form ref="form" :model="form" label-width="160px">
				<el-form-item  label="企业名称">
					<el-select placeholder="请选择企业" @change="clickgluser(updateEnterpriseUser.parameter.ProjectEnterpriseUser.ent_id)" v-model="updateEnterpriseUser.parameter.ProjectEnterpriseUser.ent_id">
						<el-option
						v-for="item in companytable"
						:label="item.Project_enterprise.ent_name"
						:value="item.Project_enterprise.ent_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item  label="企业人员">
					<el-select placeholder="请选择企业人员" v-model="entpriseempid" @change="changelist(entpriseempid)">
						<el-option
						v-for="item in EnterpriseUser"
						:label="item.EmpName"
						:value="item.EmpId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="岗位">
					<el-input v-model="updateEnterpriseUser.parameter.ProjectEnterpriseUser.position"></el-input>
				</el-form-item>
				<el-form-item label="是否拥有登录权限">
					<el-checkbox v-model="checked"></el-checkbox>
				</el-form-item>
				<el-form-item label="管理模版" v-show="checked">
					<el-select v-model="selectmoban" placeholder="请选择">
						<el-option
						v-for="item in selectmobanlist"
						:label="item.name"
						:value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分派权限" v-if="checked">
					<div id="tree-container">
                        <ul id = "tree" class = "tree">
                            <v-tree v-for = "node in treedata" :node = "node">
                            </v-tree>
                        </ul>
                    </div>
				</el-form-item>
				<el-form-item label="用户名" v-if="checked">
					<el-input v-model="updateEnterpriseUser.parameter.UserName"></el-input>
				</el-form-item>
				<el-form-item label="密码" v-if="checked">
					<el-input v-model="updateEnterpriseUser.parameter.Password"></el-input>
				</el-form-item>
				<el-form-item label="重复密码" v-if="checked">
					<el-input v-model="updateEnterpriseUser.parameter.PasswordValidate"></el-input>
				</el-form-item>
			</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="gluser = false">取 消</el-button>
					<el-button type="primary" @click="Adduser">保存</el-button>
				</span>
		</el-dialog>
		<el-dialog title="新建参建单位" size="tiny" v-model="glenterprise" class="gluserdialog">
			<el-form label-width="120px">
				<el-form-item label="企业">
					<el-select v-model="bindcompany" placeholder="请选择">
						<el-option
						v-for="item in bindcompanylist"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="法人代表">
					<el-input v-model="bindenterprise.parameter.Contacts"></el-input>
				</el-form-item>
				<el-form-item label="资质等级">
					<el-input v-model="bindenterprise.parameter.EnterpriseLevel"></el-input>
				</el-form-item>
				<el-form-item label="资格证书号码">
					<el-input v-model="bindenterprise.parameter.CorporationIdcardno"></el-input>
				</el-form-item>
				<el-form-item label="企业技术负责人电话">
					<el-input v-model="bindenterprise.parameter.ContactsMobile"></el-input>
				</el-form-item>
				<el-form-item label="负责人电话">
					<el-input v-model="bindenterprise.parameter.ContactsMobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="glenterprise = false">取 消</el-button>
				<el-button type="primary" @click="bindenterprisesubmit">保存</el-button>
			</span>
		</el-dialog>
		<el-dialog title="编辑参建单位" size="tiny" v-model="editerprisedialog" class="gluserdialog">
			<el-form label-width="160px">
				<el-form-item label="企业">
					<span>{{editerprise.parameter.ent_name}}</span>
				</el-form-item>
				<el-form-item label="法人代表">
					<el-input v-model="editerprise.parameter.frdb"></el-input>
				</el-form-item>
				<el-form-item label="资质等级">
					<el-input v-model="editerprise.parameter.zzdj"></el-input>
				</el-form-item>
				<el-form-item label="资格证书号码">
					<el-input v-model="editerprise.parameter.zgzshm"></el-input>
				</el-form-item>
				<el-form-item label="企业技术负责人电话">
					<el-input v-model="editerprise.parameter.xmfzr"></el-input>
				</el-form-item>
				<el-form-item label="负责人电话">
					<el-input v-model="editerprise.parameter.xmfzrdh"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editerprisedialog = false">取 消</el-button>
				<el-button type="primary" @click="editsubmit">保存</el-button>
			</span>
		</el-dialog>
		<el-dialog title="编辑用户界面" v-model="edituserdialog" size="tiny">
			<el-form ref="form" :model="form" label-width="160px">
				<el-form-item  label="企业人员">
					<span>{{ProjectEnterprise.fullname}}</span>
				</el-form-item>
				<el-form-item label="岗位">
					<el-input v-model="ProjectEnterprise.gw"></el-input>
				</el-form-item>
				<el-form-item label="是否拥有登录权限">
					<el-checkbox v-model="checked2"></el-checkbox>
				</el-form-item>
				<el-form-item label="管理模版" v-show="checked2">
					<el-select v-model="editmoban" placeholder="请选择">
						<el-option
						v-for="item in selectmobanlist"
						:label="item.name"
						:value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分派权限" v-if="checked2">
					<div id="tree-container">
                        <ul id = "tree" class = "tree">
                            <v-tree v-for = "node in treedata" :node = "node">
                            </v-tree>
                        </ul>
                    </div>
				</el-form-item>
				<el-form-item label="用户名" v-if="checked2">
					<el-input v-model="updateEnterpriseUser.parameter.UserName"></el-input>
				</el-form-item>
				<el-form-item label="密码" v-if="checked2">
					<el-input v-model="updateEnterpriseUser.parameter.Password"></el-input>
				</el-form-item>
				<el-form-item label="重复密码" v-if="checked2">
					<el-input v-model="updateEnterpriseUser.parameter.PasswordValidate"></el-input>
				</el-form-item>
			</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="gluser = false">取 消</el-button>
					<el-button type="primary" @click="edituser">保存</el-button>
				</span>
		</el-dialog>
		<el-dialog title="变更用户界面" v-model="changedialog" size="tiny">
			<el-form label-width="160px">
				<el-form-item  label="企业人员">
					<span>{{changelistnum.fullname}}</span>
				</el-form-item>
				<el-form-item label="岗位">
					<span>{{changelistnum.gw}}</span>
				</el-form-item>
				<el-form-item label="企业用户">
					<el-select v-model="changepersonnun" placeholder="请选择">
						<el-option
						v-for="item in changeperson"
						:label="item.EmpName"
						:value="item.EmpId">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="changedialog = false">取 消</el-button>
					<el-button type="primary" @click="changepersonsubmit(changelistnum.id)">保存</el-button>
				</span>
		</el-dialog>
		<el-dialog title="工程变更明细" size="tiny" v-model="glenterpriseengine">
			<el-form :model="companytablelvli" label-width="80px">
				<el-form-item label="操作人">
					{{companytablelvli.muser}}
				</el-form-item>
				<el-form-item label="操作IP">
					{{companytablelvli.ip}}
				</el-form-item>
				<el-form-item label="工程名称">
					{{companytablelvli.prj_name}}
				</el-form-item>
				<el-form-item label="标题">
					{{companytablelvli.title}}
				</el-form-item>
				<el-form-item label="变更之前的内容">
					{{companytablelvli.oldvalue}}
				</el-form-item>
				<el-form-item label="变更之后的内容">
					{{companytablelvli.newvalue}}
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="提示" v-model="cjdwdialog" size="tiny">
			<span>您确定删除此项目？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cjdwdialog = false">取 消</el-button>
				<el-button type="primary" @click="delentprisedialog">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import '../../css/base.css'
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function(){
			return {
				cjdwdialog:false,
				delitem:"",//当前删除项目的ID
				entpriseempid:"",
				baseedit:false,
				tableData:"",//临时
				activeName:"",
				bindcompany:"",//绑定企业列表
				bindcompanylist:"",
				changelistnum:"",
				changeperson:"",//变更人员下拉选择
				changepersonnun:"",//变更人员绑定
				getpersonurl:global.host + "ProjectEnterpriseUser/ChangePersonnel",//变更人员保存URL
				inodeKey: "id",
				changedialog:false,
				edituserdialog:false,
				editerprisedialog:false,
				checked:false,
				checked2:false,
				glenterprise:false,
				gluser:false,//管理用户弹框
                loading: false,
				error: null,
				projData:"",
				baseprojData:"",
                ProjectEnterpriseurl:global.host + 'Project/QueryProjectEnterprise',//查询企业名字，参建单位
				GetEnterpriseUserurl:global.host + "Enterprise/GetEnterpriseUserList",//企业人员
				GetEnterpriseurl:global.host + 'Enterprise/GetEnterprise',//根据id来获取企业信息
				GetProjectEnterprisesurl:global.host + 'ProjectEnterprise/GetProjectEnterprises',//关联用户前数据查询
				updateenterurl:global.host + 'ProjectEnterpriseUser/Add',//管理用户保存URL
				editenterurl:global.host + 'ProjectEnterpriseUser/Update',//编辑用户保存URL
				ProjectBindurl:global.host + 'Project/ProjectBindEnterprise',//关联用户保存URL
				UpdateEnterpriseurl:global.host + 'ProjectEnterprise/UpdateEnterprise',//保存编辑修改
				treeurl:global.host + 'Authority/GetMenuAthorityTreeByCompareEmpId',//树URL
				getuserinfourl:global.host + 'Login/GetUserInfo',//获取用户ID
				DelUser:global.host + 'ProjectEnterpriseUser/Delete',//删除用户
				getProjectEnterpriseUserurl:global.host + 'ProjectEnterpriseUser/GetProjectEnterpriseEmp',//编辑用户前查询
				editUser:global.host + 'ProjectEnterpriseUser/Update',//编辑用户
				GetProjectListurl:global.host + 'authority/GetProjectListByEmpId',//删除用户
				GetTemplateAuthorityurl:global.host + 'Authority/GetTemplateListByToken',//查看模版列表
				GetAuthorityurl:global.host + 'Authority/GetTemplateAnthoritysByToken',//查看模版列表权限的ID
				GetEnterpriseListByFuncType:global.host + 'Enterprise/GetEnterpriseListByFuncType',//为了绑定企业选择项
				getprojecturl:global.host + 'Project/GetProjectAllMessage',//项目全过程
				projUrl: global.host + 'ProjectHistory/GetList',//工程列表履历
				projlvliUrl: global.host + 'ProjectHistory/Get',//工程列表履历详细
				baseprojUrl: global.host + 'Project/QueryProjectDetail',//基本信息
				QueryProjectUserEmployeeUrl: global.host + 'Project/QueryProjectUserEmployee',//查询务工人员
				QueryProjectEnterpriseUsersUrl: global.host + 'Project/QueryProjectEnterpriseUsers',//查询管理人员
				DeleteEnterpriseUrl: global.host + 'ProjectEnterprise/DeleteEnterprise',//删除参建单位URL
				companytablelvli:"",//工程履历
				EnterpriseUser:[],//企业人员列表
				value:"",
				Enterprise:"",//企业信息数据
				authorit:"",//已勾模版ID
				editmoban:"",//编辑模版
				returnarr:[],//已勾选的权限
				EnterpriseUsers:"",//管理人员
				QueryProjectwg:"",//务工人员
				glenterpriseengine:false,//项目履历弹框
				projParam: {
					params: {
						prj_id:"",
						token: '',
						parameter: {"prj_id":""}
					}
				},
				updateEnterpriseUser:{   //管理用户保存提交参数
					"token": "",
					"parameter": {
						"ProjectEnterpriseUser": {
							"prj_id": '',
							"ent_id": '',
							"emp_id": '',
							"position": ""
						},
						IsAuthrity:false,
						AuthrityNos:{
							id:[]
						},
						PrjIds:"",
						UserName:"",
						Password:"",
						PasswordValidate:""
					}
				},
				editEnterpriseUserparam:{   //编辑用户保存提交参数
					"token": "",
					"parameter": {
						"ProjectEnterpriseUser": {
							id:"",
							"prj_id": '',
							"ent_id": '',
							"emp_id": '',
							"position": ""
						},
						IsAuthrity:false,
						AuthrityNos:{
							id:[]
						},
						PrjIds:"",
						UserName:"",
						Password:"",
						PasswordValidate:""
					}
				},
				selectmoban:"",
				selectmobanlist:"",
				data:[],
				treedata:"",
				flag:true,
				defaultProps: {
					children: 'Children',
					label: 'name',
				},
				bindenterprise:{
						"token": "",
						"parameter": {
							"id": "",
							"prj_id":"",
							"prj_name": "",
							"ent_id": "",
							"ent_name": "",
							"ent_type": "",
							"remark": "",
							"frdb": "",
							"zzdj": "",
							"zgzshm": "",
							"xmfzr": "",
							"xmfzrdh": ""
						}
				},//关联单位
				editerprise:{
					"token": "",
					"parameter": {
						"id": "",
						"prj_id":"",
						"prj_name": "",
						"ent_id": "",
						"ent_name": "",
						"ent_type": "",
						"remark": "",
						"frdb": "",
						"zzdj": "",
						"zgzshm": "",
						"xmfzr": "",
						"xmfzrdh": ""
					}
				},//编辑企业
				enterprisetypeurl:global.host + "SysDict/Get",
				entertab:"",
				companytable:"",
				Employeeid:"",
				bancompang:true,
				companytitle:"",
				ProjectEnterprise:"",//编辑用户界面数据
				binddata:"",
				projectAllMessage:{
					"Project":"",
					"Schedult":"",
					"ProjectEnterprises":"",
					"ProjectEmployees":"",
					"ProjectEnteriseUser":""
				}
            }
		},
		computed: mapState({ user: state => state.user }),
		created() {
			this.getproject();
			this.getenterprisetype();
            this.QueryProjectEnterprise();
			this.GetUserInfo_token();
			this.fetchData();
			this.baseproject();
			this.EnterpriseUsersUrl();//可以改成选项卡点了之后跑的AJAX务工人员
			this.QueryProjectUser();//可以改成选项卡点了之后跑的AJAX管理人员
		},
        watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': 'QueryProjectEnterprise',
			"selectmoban":"treeAuthority",
			"editmoban":"treeAuthority1"
		},
		methods: {
			changelist(obj){
				console.log("asd")
				var data={"params":{"token":this.user.token,"parameter":{"employee_id":obj}}}
				this.$http.get(this.GetProjectListurl,data)
					.then((response) => {
						var tmparr=[];
						for(var i=0;i<response.body.data.length;i++){
							tmparr.push(response.body.data[i].id)
						}
						tmparr.push(this.$route.params.id)
						this.updateEnterpriseUser.parameter.PrjIds=tmparr;
					})
					.catch(function(response){
						this.error = response.toString()
					})
				var datatmp={"params":{"token":this.user.token,"parameter":obj}}
				this.$http.get(global.host + 'Authority/GetAccount',datatmp)
					.then((response) => {
						this.updateEnterpriseUser.parameter.IsAuthrity=response.body.data>0?1:0;
						this.checked=response.body.data>0;
					})
					.catch(function(response){
						this.error = response.toString()
					})
				this.treemothod(obj);
				
			},
			gldialog(){ //新增企业用户
				this.gluser=true;
				
			},
			treemothod(obj){
				var tree={"params":{"token":this.user.token,"parameter":{"OldEmployeeId":this.Employeeid,"NewEmployeeId":obj}}}
				this.$http.get(this.treeurl,tree)
					.then((response) => {
						this.treedata=[response.body.data];
						this.updateEnterpriseUser.parameter.AuthrityNos.id.push(response.body.treedata.id);
					})
					.catch(function(response){
						this.error = response.toString()
					})	
			},
			getenterprisetype:function(){
				this.$http.get(this.enterprisetypeurl,{"params":{"type":"enterprisetype"}})
					.then((response) => {
						this.entertab=response.body;
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			projectcompany(){
				this.$router.push({ 
					name: 'project-companydetail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
			attachment(){
				this.$router.push({ 
					name: 'project-attachmentsdetail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
			mapdetail(){
				this.$router.push({ 
					name: 'project-mapdetail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
			resume(){
				this.$router.push({ 
					name: 'project-enginedetail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
            QueryProjectEnterprise(){
                var data={"params":{"token":this.user.token,"parameter":{"prj_id":this.$route.params.id}}}
                this.$http.get(this.ProjectEnterpriseurl,data)
					.then((response) => {
						//console.log(response.body.data[0].Project_enterprise.ent_name)
						this.companytable=response.body.data;
						this.binddata=response.body.data[0].Project_enterprise.ent_type
						
						var tmpdata={"params":{"token":this.user.token,"parameter":this.binddata}}
						this.$http.get(this.GetEnterpriseListByFuncType,tmpdata)
							.then((response) => {
								this.bindcompanylist=response.body.data;
							})
							.catch(function(response){
								this.error = response.toString()
							})	
						
					})
					.catch(function(response){
						this.error = response.toString()
					})
				
			},
			clickgluser(ent_id){// 企业人员
				
				var data={"params":{"token":this.user.token,"parameter":{"EntId":ent_id}}}
				//this.updateEnterpriseUser.parameter.ProjectEnterpriseUser.ent_id=ent_id;//用于保存的ID
				this.$http.get(this.GetEnterpriseUserurl,data)
					.then((response) => {
						this.EnterpriseUser=response.body.data
						console.log(this.EnterpriseUser)
						//this.companytable=response.body.data;
					})
					.catch(function(response){
						this.error = response.toString()
					})
					this.selectmobanmethod();
				
			},
			selectmobanmethod(){		//企业模版
				var datatmp={"params":{"token":this.user.token}}
				this.$http.get(this.GetTemplateAuthorityurl,datatmp)
					.then((response) => {

						this.selectmobanlist=response.body.data
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			getEnterprise(obj){//企业基本信息
				this.glenterprise=true;
				var data={"params":{"token":this.user.token,"parameter":this.$route.params.id}}
				this.$http.get(this.GetEnterpriseurl,data)
					.then((response) => {
						this.Enterprise=response.body.data.Enterprise;
						this.bindenterprise.parameter=response.body.data.Enterprise;
					})
					.catch(function(response){
						this.error = response.toString()
					})
					
			},
			editerprisebut(obj){
				this.editerprisedialog=true;
				var data={"params":{"token":this.user.token,"parameter":obj}}
				this.$http.get(this.GetProjectEnterprisesurl,data)
					.then((response) => {
						this.editerprise.parameter=response.body.data;
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			treearr(arr){
				for(var i=0;i<arr.length;i++){
						if(arr[i].IsChecked==true){
							this.returnarr.push(arr[i].id)
						}
						this.treearr(arr[i].Children)
					}
					return this.returnarr;
			},
			Adduser(){   //添加用户保存按钮
				var arr=this.treedata;
				var tmparr=this.treearr(arr);
				this.updateEnterpriseUser.token=this.user.token;
				this.updateEnterpriseUser.parameter.ProjectEnterpriseUser.prj_id=this.$route.params.id;
				this.updateEnterpriseUser.parameter.AuthrityNos=tmparr
				this.updateEnterpriseUser.parameter.ProjectEnterpriseUser.emp_id=this.entpriseempid
				this.$http.post(this.updateenterurl,this.updateEnterpriseUser)
					.then((response) => {
						if(response.body.ret=="0"){
							alert("添加人员成功");
							this.gluser=false;
						}
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			edituser(){
				var vm=this;
				var arr=this.treedata;
				var tmparr=this.treearr(arr);
				this.editEnterpriseUserparam.token=this.user.token;
				this.editEnterpriseUserparam.parameter.PrjIds=tmparr;
				this.editEnterpriseUserparam.parameter.ProjectEnterpriseUser.position=this.ProjectEnterprise.gw;
				this.$http.post(this.editenterurl,this.editEnterpriseUserparam)
					.then((response) => {
						if(response.body.ret=="0"){
							alert("编辑人员成功")	
							vm.edituserdialog=false
						}
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			bindenterprisesubmit(){//保存绑定企业
				this.bindenterprise.token=this.user.token;
				this.bindenterprise.parameter.prj_id=this.$route.params.id;
				this.bindenterprise.parameter.ent_id=this.bindcompany
				this.$http.post(this.ProjectBindurl,this.bindenterprise)
					.then((response) => {
						this.glenterprise=false;
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			treeAuthority(){
				var vm=this;
				var data={"params":{"token":this.user.token,"parameter":{"name":this.selectmoban}}}
				this.$http.get(this.GetAuthorityurl,data)
					.then((response) => {
						vm.authorit=response.body.data;
						var tmpauthor=[];	
						var auth=vm.authorit;
						var arr=vm.treedata;
						function tree(arr){
							for(var i=0;i<arr.length;i++){
								if(arr[i].IsEnable==false){
									for(var j=0;j<auth.length;j++){
										if(arr[i].id==auth[j][id]){
											arr[i].IsChecked=true;
										}
									}
								}
								tree(arr[i].Children)
							}
						}
						tree(arr)
					})
					.catch(function(response){
						this.error = response.toString()
					})
				
			},
			treeAuthority1(){
				var vm=this;
				var data={"params":{"token":this.user.token,"parameter":{"name":this.editmoban}}}
				this.$http.get(this.GetAuthorityurl,data)
					.then((response) => {
						vm.authorit=response.body.data;
						var tmpauthor=[];	
						var auth=vm.authorit;
						var arr=vm.treedata;
						function tree(arr){
							for(var i=0;i<arr.length;j++){
								if(arr[i].IsEnable==false){
									for(var j=0;j<auth.length;i++){
										if(arr[i].id==auth[j][id]){
											arr[i].IsChecked=true;
										}
									}
								}
								tree(arr[i].Children)
							}
						}
						tree(arr)
					})
					.catch(function(response){
						vm.error = response.toString()
					})

			},
			editsubmit(){
				this.editerprise.token=this.user.token;
				this.editerprise.parameter.prj_id=this.$route.params.id;
				this.$http.post(this.UpdateEnterpriseurl,this.editerprise)
					.then((response) => {
						this.editerprisedialog=false;
						
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			handleNodeClick(data) {
			},
			DeleteEnterpriseUser(obj,index){//删除企业用户
				var data={
						"token": this.user.token,
						"parameter": {
							"id": obj[index].projectEnterpriseUserId
						}
					}
				this.$http.post(this.DelUser,data)
					.then((response) => {
						if(response.body.ret="0"){
							obj.splice(index, 1);//删除当前行
						}
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			editEnterpriseUser(obj,index){		//编辑企业前获取数据
				this.treemothod(obj[index].id);
				this.edituserdialog=true;
				var data={
						params:{
							"token": this.user.token,
							"parameter": {
								"id": obj[index].projectEnterpriseUserId
							}
						}
					}
					
				this.selectmobanmethod();
				this.$http.get(this.getProjectEnterpriseUserurl,data)
					.then((response) => {
						this.ProjectEnterprise=response.body.data;
						this.editEnterpriseUserparam.parameter.IsAuthrity=response.body.data>0?1:0;
						this.checked2=response.body.data>0;
						this.editEnterpriseUserparam.parameter.IsAuthrity=this.checked2?1:0;
						this.editEnterpriseUserparam.parameter.ProjectEnterpriseUser.id=response.body.data.id;
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			GetUserInfo_token(){
				var data={"params":{"token":this.user.token}}
				this.$http.get(this.getuserinfourl,data)
					.then((response) => {
						this.Employeeid=response.body.data.Employee.id;
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			ChangePerson(entid,obj,index){
				var datanum={
						params:{
							"token": this.user.token,
							"parameter": {
								"id": obj[index].projectEnterpriseUserId
							}
						}
					}
				
				this.$http.get(this.getProjectEnterpriseUserurl,datanum)		//单独的一个人员
					.then((response) => {
						this.changelistnum=response.body.data;
					})
					.catch(function(response){
						this.error = response.toString()
					})

				this.changedialog=true;
				var data={"params":{"token":this.user.token,"parameter":{"EntId":entid}}}
				this.$http.get(this.GetEnterpriseUserurl,data)		//企业人员列表
					.then((response) => {
						this.changeperson=response.body.data;
						for(var i=0;i<this.changeperson.length;i++){
							if(this.changelistnum.projectEnterpriseUserId==this.changeperson[i].EmpId){
								this.changeperson.splice(i, 1);
							}
						}
					})
					.catch(function(response){
						this.error = response.toString()
					})
					//this.selectmobanmethod();
			},
			changepersonsubmit(obj){//变更保存按钮
				var data={"token":this.user.token,"parameter":{"emp_id":this.changepersonnun,"id":obj}}
				this.$http.post(this.getpersonurl,data)		//企业人员列表
				.then((response) => {
					if(response.body.ret=="0"){
						alert("变更人员成功")
					}
				})
				.catch(function(response){
					this.error = response.toString()
				})
			},
			getproject(){
				var vm=this;
				var data={params:{"token":this.user.token,"parameter":this.$route.params.id,pagesize:"6"}}
				this.$http.get(this.getprojecturl,data)		//项目全过程
				.then((response) => {
					vm.projectAllMessage=response.body.data;
					vm.mapRender();
				})
				.catch(function(response){
					this.error = response.toString()
				})
			},
			handleViewlvli(index){
				var vm=this;
				vm.glenterpriseengine=true;
				var id=vm.projData[index].id;
				var data={"params":{"token":this.user.token,"parameter":{"id":id}}}
				this.$http.get(this.projlvliUrl,data)
					.then((response) => {
						this.companytablelvli=response.body.data;
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			fetchData: function(){
				var vm = this
				vm.projParam.params.parameter.prj_id = this.$route.params.id
				vm.projParam.params.token = vm.user.token
				vm.$http.get(vm.projUrl,vm.projParam)
					.then((response) => {
						if(response.body.data == null) return;
						vm.projData = response.body.data;
					})
					.catch(function(response){
						vm.error = response.toString()
					})
			},
			baseproject: function(){
				var vm = this
				vm.error = vm.post = null
				vm.loading = true
				vm.projParam.params.parameter = this.$route.params.id
				vm.projParam.params.token = vm.user.token
				vm.$http.get(vm.baseprojUrl,vm.projParam)
					.then((response) => {
						if(response.body.data == null) return;
						vm.loading = false
						vm.baseprojData = response.body.data;
					})
					.catch(function(response){
						vm.error = response.toString()
					})
			},
			mapRender(){
				var vm=this;
				var mapstr=this.projectAllMessage.Project.location.split(",")
				// 百度地图API功能
				var map = new BMap.Map("allmap");
				var point = new BMap.Point(mapstr[0],mapstr[1]);
				map.centerAndZoom(point, 12);
				var marker = new BMap.Marker(point);// 创建标注
				map.addOverlay(marker);             // 将标注添加到地图中
				map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
				map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
				//marker.enableDragging() //禁止拖拽
				marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			},
			QueryProjectUser(){//查询务工人员
				var vm=this;
				var data={params:{"token":this.user.token,"parameter":this.$route.params.id,pagesize:"6"}}
				this.$http.get(this.QueryProjectUserEmployeeUrl,data)		
				.then((response) => {
					this.QueryProjectwg=response.body.data
				})
				.catch(function(response){
					this.error = response.toString()
				})
			},
			EnterpriseUsersUrl(){//查询管理人员
				var vm=this;
				var data={params:{"token":this.user.token,"parameter":{"fullname":this.EnterpriseUsers.fullname,"prj_id":this.$route.params.id},pagesize:"6"}}
				this.$http.get(this.QueryProjectEnterpriseUsersUrl,data)		
				.then((response) => {
					this.EnterpriseUsers=response.body.data
				})
				.catch(function(response){
					this.error = response.toString()
				})
			},
			delentprise(id){//删除参建单位弹框
				this.cjdwdialog = true;
				this.delitem=id;
				
			},
			delentprisedialog(){//删除参建单位
				var vm=this;
				var data={"token":this.user.token,"parameter":{"id":this.delitem}}
				this.$http.post(this.DeleteEnterpriseUrl,data)		
				.then((response) => {
					if(response.body.ret=="0"){
						this.cjdwdialog = false;
						alert("删除成功")
					}
				})
				.catch(function(response){
					this.error = response.toString()
				})
			},
			projectstate(State){//项目进度
				console.log(State)
				var tempclass="";
				if(State=="2"){
					return 'Schedult blue'
				}
				else if(State=="1"){
					return 'Schedult red'
				}
				else{
					return 'Schedult black'
				}
			}
		}
	}
</script>

<style>

</style>
