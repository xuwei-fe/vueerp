<style lang="less" scoped>
    .departmentleft{
        width:300px;
    }
    .departmentright{
        margin-left:20px;
    }
    .seltext{
        margin-bottom:20px;
    }
</style>
<template>
        <div>
            <div class="seltext">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="企业名称">
                        <el-select filterable remote :remote-method="GetListAll" @change="changealert" v-model="company" :loading="loading"  placeholder="请选择企业名称">
                            <el-option
                                v-for="item in options"
                                :label="item.name"
                                :key="item.value"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <el-row>
                <el-col :span="6">
                    <div class="departmentleft">
                            <div id="tree-container">
                                <ul id = "tree" class = "tree">
                                    <v-tree v-for = "node in data" :node = "node"  @checknode="checknode">
                                    </v-tree>
                                </ul>
                            </div>
                    </div>
                </el-col>
                <el-col :span="18">
                        <div class="departmentright">
                            <el-button @click="addent(false)">添加部门</el-button>
                            <el-button @click="childrenaddent(true)">添加子部门</el-button>
                            <el-button @click="addent(true)">修改部门名称</el-button>
                            <el-button @click="deldialogopen()">删除部门</el-button>
                            <el-button>新增企业人员</el-button>
                            <el-button>删除选中行</el-button>
                            <el-table
                                :data="tableData"
                                style="width: 100%;margin-top:20px;">
                                <el-table-column
                                    prop="EmpName"
                                    label="人员名称"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="Idcardno"
                                    label="身份证号"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="Mobile"
                                    label="手机号">
                                </el-table-column>
                                <el-table-column
                                    prop="Address"
                                    label="联系地址">
                                </el-table-column>
                                <el-table-column
                                    prop="Position"
                                    label="职位">
                                </el-table-column>
                                <el-table-column
                                    prop="Joindate"
                                    label="入职日期">
                                </el-table-column>
                                <el-table-column
                                    prop="Leftdate"
                                    label="离职日期">
                                </el-table-column>
                            </el-table>
                        </div>
                </el-col>
            </el-row>
            
            
            <el-dialog title="添加部门" v-model="dialogVisible" size="tiny">
                <span>
                    <el-form label-width="80px">
                    <el-form-item label="部门名字">
                        <el-input v-model="addEmpName"></el-input>
                    </el-form-item>
                </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="savecompany">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="添加子部门" v-model="childrendialog" size="tiny">
                <span>
                    <el-form label-width="120px">
                        <el-form-item label="部门名字">
                            <span>{{addEmpName}}</span>
                        </el-form-item>
                        <el-form-item label="子部门名字">
                            <el-input v-model="childName"></el-input>
                        </el-form-item>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="childrendialog = false">取 消</el-button>
                    <el-button type="primary" @click="savechildcompany">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="提示" v-model="delpartdialog" size="tiny">
                <span>你确定要删除部门嘛</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delpartdialog = false">取 消</el-button>
                    <el-button type="primary" @click="deldepart">确 定</el-button>
                </span>
            </el-dialog>
        </div>
</template>
<script>
// 引入全局变量
	import global from '../../config/global';
    import { mapState } from 'vuex'
	export default {
		data: function(){
			return {
                a:[
                    {text:"item1",
                    children:[
                        {text:"item4",IsChecked:"true"},
                        {text:"item5",IsChecked:"true"}
                    ]
                    },
                    {type:"folder",text:"item2",
                    children:[
                        {text:"item4",IsEnable:"true"},
                        {text:"item5",IsEnable:"true",
                            children:[
                                {text:"item2"},
                                {text:"item3",IsEnable:"false"}
                            ]
                        }
                    ]
                    },
                    {text:"item3",IsEnable:"false"}
                ],
                delpartdialog:false,//删除部门弹框
                data:"",
                childrendialog:false,
                tableData: [],
                 options: [],
                company: '',
                dialogVisible:false,
                GetListAllurl:global.host +"Enterprise/GetListAll",//企业名称
                Gettreeurl:global.host +"Enterprise/GetEnterpriseDepartmentTreeByEntId",//企业部门树
                getformurl:global.host +"Enterprise/GetEnterpriseUserList",//获取表格数据
                SaveDepartmenturl:global.host +"Enterprise/SaveEnterpriseDepartment",//保存部门
                delDepartmenturl:global.host +"Enterprise/DeleteEnterpriseDepartment",//删除部门
                ent_id:{ //部门ID
                    "name":"",
                    "id":""
                },
                addEmpName:"",//添加部门名字
                childName:"",//添加子部门名字
                }
                
        },
        created() {
			this.defGetListAll();
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': '',
		},
        computed: mapState({ user: state => state.user }),
	    methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            GetListAll(query){
                this.options=[];//这里不清空this.company会自动赋值上去
                if(query){
                    this.$http.get(this.GetListAllurl, { "params": { "token": this.user.token,"parameter":query} })
					.then((response) => {
                        this.options=response.body.data;
                        //this.company=this.options[0].id
                        
					})
					.catch(function (response) {
						console.log(response)
					})
                }
                else{
                    this.options=[];
                }
                
            },
            defGetListAll(query){
                    this.$http.get(this.GetListAllurl, { "params": { "token": this.user.token,"parameter":query} })
					.then((response) => {
                        this.options=response.body.data;
                        this.company=this.options[0].id;
                        
					})
					.catch(function (response) {
						console.log(response)
					})
                
            },
            Gettree(){
                var vm=this;
                if(!this.company){this.options[0].id="1"}
                 this.$http.get(this.Gettreeurl, { "params": { "token": this.user.token,"parameter":this.company} })
					.then((response) => {
                        //this.options=response.body.data;
                        this.data=[response.body.data];
                        this.getform(this.data[0]);
                        vm.ent_id=vm.data[0];
					})
					.catch(function (response) {
						console.log(response)
					})
            },
            getform(obj){
                this.$http.get(this.getformurl, { "params": { "token": this.user.token,"parameter":{"EntId":obj.id}} })
					.then((response) => {
                        //this.options=response.body.data;
                        this.tableData=response.body.data
					})
					.catch(function (response) {
						console.log(response)
					})
            },
            checknode(obj){
                this.ent_id=obj;
                this.getform(obj)
            },
            addent(flag){
                var vm=this;
                
                if(flag){
                    vm.addEmpName=vm.ent_id.name
                }
                else{
                    vm.addEmpName="";
                }
                this.dialogVisible=true;
            },
            childrenaddent(flag){
                var vm=this;
                
                if(flag){
                    vm.addEmpName=vm.ent_id.name
                }
                else{
                    vm.addEmpName="";
                }
                
                this.childrendialog=true;
            },
            savecompany(){
                var vm=this;
                this.$http.post(this.SaveDepartmenturl, { "token": this.user.token,"parameter":{"parentid":vm.ent_id.id,"ent_id":vm.ent_id.ent_id,"name":vm.addEmpName,"id":vm.ent_id.id}})
                .then((response) => {
                    if(!response.body.ret){
                        alert("保存成功");
                        this.dialogVisible=false;
                        this.childrendialog=false;
                    }
                })
                .catch(function (response) {
                    console.log(response)
                })
            },
            savechildcompany(){
                var vm=this;
                this.$http.post(this.SaveDepartmenturl, { "token": this.user.token,"parameter":{"parentid":vm.ent_id.id,"ent_id":vm.ent_id.ent_id,"name":vm.childName}})
                .then((response) => {
                    if(!response.body.ret){
                        alert("保存成功");
                        this.dialogVisible=false;
                        this.childrendialog=false;
                    }
                })
                .catch(function (response) {
                    console.log(response)
                })
            },
            deldialogopen(){
                this.delpartdialog=true;
            },
            deldepart(){
                var vm=this;
                this.$http.post(this.delDepartmenturl, { "token": this.user.token,"parameter":vm.ent_id.id})
                .then((response) => {
                    if(!response.body.ret){
                        this.delpartdialog=false;
                    }
                })
                .catch(function (response) {
                    console.log(response)
                })
            },
            changealert(){
                this.Gettree();
            }

            
		}
	}
</script>

<style>

</style>
