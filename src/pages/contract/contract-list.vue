<style scoped>

</style>
<template>
	<div>
		<div class="breadcrumb">合同管理</div>

		<!-- 搜索条件 -->
		<div class="search-box">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="getParam.params.parameter.fullname" placeholder="姓名" ></el-input>
				</el-form-item><el-form-item>
					<el-input v-model="getParam.params.parameter.ent_id" placeholder="单位名称" ></el-input>
				</el-form-item><el-form-item>
					<el-button type="primary" @click="getContract">搜索</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- toolbar -->
		<div class="toolbar">
			<el-button class="btn-add" type="text" size="small" @click="addContract">新增</el-button>
			<el-button class="btn-del" type="text" size="small" @click="deleteContract">删除所选</el-button>
			<!--<el-button class="btn-export" type="text" size="small" @click="deleteContract">导出</el-button>-->
		</div>

		<!--列表数据-->
		<template>
			<el-table :data="contractData" highlight-current-row @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
    			</el-table-column>
				<el-table-column prop="contract_no" label="合同编号">
				</el-table-column>
				<el-table-column prop="ent_name" label="所属单位">
				</el-table-column>
				<el-table-column prop="fullname" label="姓名">
				</el-table-column>
				<el-table-column prop="idcardno" label="身份证号">
				</el-table-column>
				<el-table-column label="所属区域">
					<template scope="scope">
						{{ scope.row.province }} {{ scope.row.city }} {{ scope.row.area }}
					</template>
				</el-table-column>
				<el-table-column prop="joindate" label="入职日期">
				</el-table-column>
				<el-table-column prop="leftdate" label="离职日期">
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope" track-by="$index">
						<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="text" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--分页-->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="currentSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="dataTotal">
			</el-pagination>
		</template>
		<!-- 新增合同 -->
		<el-dialog title="新增合同" v-model="dialogAddFormVisible">
			<div style="margin-bottom: 15px;color:#FF4949;padding: 8px;">请先输入员工身份证号，确认是否可添加该员工合同</div>
			<el-form :model="formAddContract" :rules="formContractRules" ref="formAddContract">
				<el-form-item label="身份证号：" :label-width="labelWidth" prop="idcardno">
					<el-input v-model="formAddContract.idcardno"></el-input>
					<el-button type="primary" style="margin-top: 8px;width:80px;" @click="cidCheck">查询</el-button>
				</el-form-item>
				<div v-show="!isAddDisabled">
					<el-form-item label="员工姓名：" :label-width="labelWidth">
						<el-input v-model="formAddContract.fullname" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="合同编号：" :label-width="labelWidth" prop="contract_no">
						<el-input v-model="formAddContract.contract_no"></el-input>
					</el-form-item>
					<el-form-item label="选择单位：" :label-width="labelWidth" prop="ent_id">
						<el-select :loading="enterpriseLoading" v-model="formAddContract.ent_id" placeholder="请选择单位">
							<el-option
							v-for="item in enterprise"
							:label="item.name"
							:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="工作岗位：" :label-width="labelWidth" prop="position">
						<el-input v-model="formAddContract.position"></el-input>
					</el-form-item>
					<el-form-item label="入职日期：" :label-width="labelWidth" prop="joindate">
						<el-date-picker v-model="formAddContract.joindate" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="离职日期：" :label-width="labelWidth" prop="leftdate">
						<el-date-picker v-model="formAddContract.leftdate" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="签字日期：" :label-width="labelWidth" prop="signdate">
						<el-date-picker v-model="formAddContract.signdate" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="所属地区：" :label-width="labelWidth">
						<v-region v-model="formAddContract.region"
						:province="formAddContract.province" 
						:city="formAddContract.city" 
						:area="formAddContract.area" 
						@emitRegionChange="addRegionChange"
						>
						</v-region>
					</el-form-item>
					<el-form-item label="上传附件：" :label-width="labelWidth">
						<el-upload
						:action="uploadFilesUrl"
						:on-preview="handlePreview"
						:on-remove="handleRemove">
						<el-button size="small" type="primary">点击上传</el-button>
						<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>
				</div>
			</el-form>
			<div v-show="!isAddDisabled" slot="footer" class="dialog-footer" style="text-align:left;padding-left:150px; margin-top: -30px;">
				<el-button type="primary" style="width:160px" @click="formContractSave('formAddContract')">保存</el-button>
				<el-button type="gray" style="width:160px" @click="dialogAddFormVisible = false">取消</el-button>
			</div>
		</el-dialog>

		<!-- 编辑合同 -->
		<el-dialog title="编辑合同" v-model="dialogEditFormVisible">
			<div style="margin-bottom: 15px;color:#FF4949;padding: 8px;">请先输入员工身份证号，确认是否可添加该员工合同</div>
			<el-form :model="formEditContract" :rules="formContractRules" ref="formEditContract">
				<el-form-item label="身份证号：" :label-width="labelWidth" prop="idcardno">
					<el-input v-model="formEditContract.idcardno" :disabled="true"></el-input>
				</el-form-item>
			
				<el-form-item label="员工姓名：" :label-width="labelWidth">
					<el-input v-model="formEditContract.fullname" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="合同编号：" :label-width="labelWidth" prop="contract_no">
					<el-input v-model="formEditContract.contract_no"></el-input>
				</el-form-item>
				<el-form-item label="选择单位：" :label-width="labelWidth" prop="ent_id">
					<el-select :loading="enterpriseLoading" v-model="formEditContract.ent_id" placeholder="请选择单位">
						<el-option
						v-for="item in enterprise"
						:label="item.name"
						:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="工作岗位：" :label-width="labelWidth" prop="position">
					<el-input v-model="formEditContract.position"></el-input>
				</el-form-item>
				<el-form-item label="入职日期：" :label-width="labelWidth" prop="joindate">
					<el-date-picker v-model="formEditContract.joindate" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="离职日期：" :label-width="labelWidth" prop="leftdate">
					<el-date-picker v-model="formEditContract.leftdate" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="签字日期：" :label-width="labelWidth" prop="signdate">
					<el-date-picker v-model="formEditContract.signdate" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="所在省：" :label-width="labelWidth">
					<el-select placeholder="请选择省" v-model="formEditContract.province" @change="regionChange('province')">
						<el-option
						v-for="item in provinces"
						:label="item.name"
						:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所在市：" :label-width="labelWidth">
					<el-select placeholder="请选择市" v-model="formEditContract.city" @change="regionChange('city')">
						<el-option
						v-for="item in cities"
						:label="item.name"
						:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所在区：" :label-width="labelWidth">
					<el-select placeholder="请选择区" v-model="formEditContract.area" @change="regionChange('area')">
						<el-option
						v-for="item in areas"
						:label="item.name"
						:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上传附件：" :label-width="labelWidth">
					
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:left;padding-left:150px; margin-top: -30px;">
				<el-button type="primary" style="width:160px" @click="formContractSave('formEditContract')">保存</el-button>
				<el-button type="gray" style="width:160px" @click="dialogEditFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
    export default {
    	data: function (){
		    return {
				enterprise: [],
				enterpriseLoading: true,
				contractData: [],
				//数据分页参数
				dataTotal: 0,
				currentPage: 1,
				currentSize: 10,
				//获取合同列表参数
				getUrl: global.host + 'Contract/GetContracts',
				getParam: {
					params: {
						token: '',
						pagesize: '',
						pageindex: '',
						parameter: {
							contract_no: '',
							ent_name: '',
							fullname: '',
							idcardno: '',
							joindate: '',
							leftdate: '',
							province: '',
							city: '',
							area: ''
						}
					}
				},
				//新增合同参数
				isAddDisabled: true,
				dialogAddFormVisible: false,
				labelWidth: '140px',
				formAddContract: {
					id: '',			//id编号
					idcardno: '',	//身份证
					fullname: '',	//员工姓名
					emp_id: '',
					contract_no: '',	//合同编号
					ent_id: '',	//所属单位
					position: '',	//工作岗位
					joindate: '',	//入职日期
					leftdate: '',	//离职日期
					signdate: '',	//签字日期
					province: '',	//省
					city: '',	//市
					area: '',	//区
					AttrachmentPath: [],	//合同附件,
					cuser: '',	//当前用户名（编辑）
				},
				//编辑合同参数
				dialogEditFormVisible: false,
				formEditContract: {
					idcardno: '',	//身份证
					fullname: '',	//员工姓名
					emp_id: '',
					contract_no: '',	//合同编号
					ent_id: '',	//所属单位
					position: '',	//工作岗位
					joindate: '',	//入职日期
					leftdate: '',	//离职日期
					signdate: '',	//签字日期
					province: '',	//省
					city: '',	//市
					area: '',	//区
					attachment: [],	//合同附件
					muser: ''	//当前用户名（编辑）
				},
				//合同编辑保存参数验证
				formContractRules: {
					idcardno: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' }
					],
					// fullname: [
					// 	{ required: true, message: '请输入项目名称', trigger: 'blur' }
					// ],
					contract_no: [
						{ required: true, message: '请输入合同编号', trigger: 'blur' }
					],
					ent_id: [
						{ required: true, type:'number', message: '请选择所属单位', trigger: 'change' }
					],
					position: [
						{ required: true, message: '请输入工作岗位', trigger: 'blur' }
					],
					joindate: [
						{ required: true, type: 'date', message: '请选择入职日期', trigger: 'change' }
					],
					leftdate: [
						{ required: true, type: 'date', message: '请选择离职日期', trigger: 'change' }
					],
					signdate: [
						{ required: true, type: 'date', message: '请选择签字日期', trigger: 'change' }
					],
					region: [
						{ required: true, message: '请选择所属地区', trigger: 'change'}
					],
				},	
				//保存参数			
				formParam: {
					token: '',
					parameter: {
						'Contract': {},
						'Contract_Attach': []
					}
				},
				//省市区数据
				regionData: [],
				currentRegion: {
					province: '',
					city: '',
					area: ''
				},
				regionCount: 0,
				provinces: [],
				cities: [],
				areas: [],
				//复选框选择合同列表数据
				multipleSelection: [],
				selectedContractId: [],
				//上传附件
				uploadFilesUrl: global.host + 'Sys/UploadStream'
		    }
    	},
		created() {
			this.getContract()
			this.getEnterprise()
		},
		computed: {
			...mapState({ user: state => state.user }),
		},
		methods: {
			//获取单位列表数据
			getEnterprise: function(){
				var vm = this
				vm.$http.get(global.host + 'Enterprise/GetListAllByQueryCondition',{
					'params': {
						token: vm.user.token,
						parameter: {
							AccountName: vm.user.id
						}
					}
				}).then((response) => {
					vm.enterpriseLoading = false
					vm.enterprise = response.body.data
				}).catch(function(response){
					console.log(response)
				})
			},
			//获取合同列表
			getContract: function(){
				var vm = this
				vm.getParam.params.token = vm.user.token
				vm.getParam.params.pagesize = vm.currentSize
				vm.getParam.params.pageindex = vm.currentPage
				vm.$http.get(vm.getUrl,vm.getParam)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return false
						}
						vm.contractData = response.body.data
						vm.dataTotal = response.body.total
						for(var i=0; i<vm.contractData.length; i++){
							vm.contractData[i].region = vm.contractData[i].province + ' ' + vm.contractData[i].city + ' ' + vm.contractData[i].area
						}
					})
					.catch(function(response){
						console.log(response)
					})
			},
			//分页方法
			handleSizeChange: function(val){
		    	this.currentSize = val
		    	this.getContract()
		    },
		    handleCurrentChange: function(val){
		    	this.currentPage = val
		    	this.getContract()
		    },
			//根据身份证查询员工
			cidCheck: function(){
				var vm = this
				vm.$http.get(global.host + 'Contract/GetEmployeeByCardNo',{
					'params': {
						token: vm.user.token,
						parameter: vm.formAddContract.idcardno
					}
				}).then((response) => {
					//判断是否有此员工，若有则显示更多信息，并且将姓名自动赋值且不可更改
					if(response.body.data == null){
						//返回没有员工信息
						return
					}
					vm.formAddContract.fullname = response.body.data.fullname
					vm.formAddContract.emp_id = response.body.data.emp_id
					vm.isAddDisabled = false

				}).catch(function(response){
					console.log(response)
				})
			},
			getContractId: function(){
				var vm = this
				vm.$http.get(global.host + 'Contract/GetContractIdInstance',{
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if(response.body.ret !== 0){
						alert(response.body.msg)
						return false
					}
					vm.formAddContract.id = response.body.data
					console.log(vm.formAddContract.id)
				}).catch(function(response){

				})
			},
			addRegionChange: function(selectedObj){
				var vm = this
				vm.formAddContract.province = selectedObj.province
				vm.formAddContract.city = selectedObj.city
				vm.formAddContract.area = selectedObj.area
				if(vm.formAddContract.province != '' && vm.formAddContract.city != '' && vm.formAddContract.area != ''){
					vm.formAddContract.region = vm.formAddContract.province + vm.formAddContract.city + vm.formAddContract.area
				}else{
					vm.formAddContract.region = ''
				}
			},
			//新增合同
			addContract: function(){
				var vm = this
				vm.isAddDisabled = true,
				vm.formAddContract.id = '',			//id编号
				vm.formAddContract.idcardno = '',	//身份证
				vm.formAddContract.fullname = '',	//员工姓名
				vm.formAddContract.contract_no = '',	//合同编号
				vm.formAddContract.ent_id = '',	//所属单位
				vm.formAddContract.position = '',	//工作岗位
				vm.formAddContract.joindate = '',	//入职日期
				vm.formAddContract.leftdate = '',	//离职日期
				vm.formAddContract.signdate = '',	//签字日期
				vm.formAddContract.province = '',	//省
				vm.formAddContract.city = '',	//市
				vm.formAddContract.area = '',	//区
				vm.dialogAddFormVisible = true,
				vm.formAddContract.attrachmentPath = []
			},
			//编辑合同
			handleEdit(idx, row){//idx表示行索引，row表示参数及对应数据
				this.dialogEditFormVisible = true
				this.formEditContract.idcardno = row.idcardno
				this.formEditContract.fullname = row.fullname
				this.formEditContract.contract_no = row.contract_no
				this.formEditContract.ent_id = row.ent_id
				this.formEditContract.position = row.position
				this.formEditContract.joindate = row.joindate
				this.formEditContract.leftdate = row.leftdate
				this.formEditContract.signdate = row.signdate
				this.formEditContract.province = row.province
				this.formEditContract.city = row.city
				this.formEditContract.area = row.area
				this.regionCount = 0
			},
			//保存合同
			formContractSave(formName){
				var vm = this
				
				vm.$refs[formName].validate((valid) => {
					if(valid){
						var _url = ''
						if(formName == 'formEditContract'){
							_url = global.host + 'Contract/EditContract'
							vm.formParam.parameter = vm.formEditContract
						}
						if(formName == 'formAddContract'){
							_url = global.host + 'Contract/AddContractAndAttach'
							vm.formParam.parameter.Contract = vm.formAddContract
						}
						vm.formParam.token = vm.user.token
						vm.formParam.parameter.Contract.joindate = global.formatDate(vm.formParam.parameter.Contract.joindate)
						vm.formParam.parameter.Contract.leftdate = global.formatDate(vm.formParam.parameter.Contract.leftdate)
						vm.formParam.parameter.Contract.signdate = global.formatDate(vm.formParam.parameter.Contract.signdate)
						vm.formParam.parameter.Contract_Attach = vm.attachment

						vm.$http.post(_url,vm.formParam)
							.then((response) => {
								if(response.body.ret !== 0){
									alert(response.body.msg)
									return false
								}
								this.$message({
									message: '合同保存成功',
									type: 'success'
								})
								vm.dialogEditFormVisible = false
								vm.getContract()
							})
							.catch(function(response){

							})
					}else{
						console.log('error submit')
						return false;
					}
				})
				
				
			},
			//获取省市区数据
			getRegions: function(){
                var vm = this
                vm.param.params.token = vm.user.token
                vm.$http.get(vm.url,vm.param)
                    .then((response) => {
                        vm.regionData = response.body.data
                    })
                    .catch(function(response){
                        console.log(response)
                    })
            },
			//省市区联动数据筛选
			_filter: function(pid){
                var vm = this
                var result = []
                var items = vm.regionData
                for(var i=0; i<items.length; i++){
                    if(items[i].parentcode == pid){
                        result.push(items[i])
                    }
                }
                return result
            },
			//根据下拉选中的code值或者默认赋给的name值全部转换成code值
			_selected: function(model){
				var vm = this
				var _code = model
				if (typeof model === 'string') {//name值
					for(item in vm.regionData){
						if(item[name] == model){
							_code = item[code]
							return
						}
					}
				}
				return _code
			},
			regionChange: function(field){
				console.log(this.regionCount)
				if(this.regionCount > 2){
					if (field === 'province') {
						this.formEditContract.city = ''
						this.formEditContract.area = ''
						//将this.formEditContract.province获取的name（默认初始值）或者code值全部转换成code，然后重新加载cities下拉数据
						var _code = this._selected(this.formEditContract.province)
						this.cities = this._filter(_code)
					}
					if (field === 'city') {
						this.formEditContract.area = ''
						//重新加载areas下拉数据
						//将this.formEditContract.city获取的name（默认初始值）或者code值全部转换成code，然后重新加载areas下拉数据
						var _code = this._selected(this.formEditContract.city)
						this.areas = this._filter(_code)
					}
				}
				
				this.regionCount++
			},
			//删除合同数据
			deleteRow: function(idx,row){
				var vm = this
				vm.$confirm('确认删除该记录吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					//确认删除后的操作
					vm.$http.post(global.host + 'Contract/DeleteContract',{
						token: vm.user.token,
						parameter: [{
							id: row.id
						}]
					}).then((response) => {
						vm.getContract()
					}).catch(function(response){
						console.log(response)
					})
				}).catch(() => {
					//取消操作
				});
			},
			//表格选择数据checkbox事件
			handleSelectionChange: function(val){
				this.multipleSelection = val
			},
			//删除合同数据
			deleteContract: function(){
				var vm = this
				
				vm.$confirm('确认删除该记录吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					//确认删除后的操作
					vm.$http.post(global.host + 'Contract/DeleteContract',{
						token: vm.user.token,
						parameter: this.multipleSelection
					}).then((response) => {
						vm.getContract()
					}).catch(function(response){
						console.log(response)
					})
				}).catch(() => {
					//取消操作
				});
			},
			//上传附件
			handlePreview:function(file){
				console.log(file)
			},
			handleRemove:function(file, fileList){
				console.log(file)
			},
			handleSuccess: function(response, file, fileList){
				console.log(response)
				var _file = {
					_url: response.data,
					_name: file.name
				}
				this.formAddContract.attachment.push(_file) //工程附件
			}
		}
    }
</script>