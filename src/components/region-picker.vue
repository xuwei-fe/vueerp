<template>
    <div>
        <el-select v-model="provinceSelected" @change="emitRegionChange('provinceSelected')" placeholder="请选择" class="el-col-7" style="padding-right: 10px;">
            
            <el-option
            v-for="item in provinces"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
        <el-select  v-model="citySelected" @change="emitRegionChange('citySelected')" placeholder="请选择" class="el-col-7" style="padding-right: 10px;">
           <el-option
            v-for="item in cities"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
        <el-select v-model="areaSelected" @change="emitRegionChange('areaSelected')" placeholder="请选择" class="el-col-7" style="padding-right: 10px;">
           
            <el-option
            v-for="item in areas"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
    </div>
</template>
<script>
    import global from '../config/global'
    import { mapState } from 'vuex'

    export default {
        props: {
            province: {},
            city: {},
            area: {},
            placeholder: {
                type: Object,
                default () {
                    return {
                        province: '请选择',
                        city: '请选择',
                        area: '请选择'
                    }
                }
            }
        },
        data() {
            return {
                url: global.host + "SysArea/GetList",
                param: {
                    params: {
                        token: '',
                        parameter: {
                            id: '',
                            code: '',
                            name: '',
                            parentcode: '',
                            level: ''
                        }
                    }
                },
                region: {},
                rootCode: 0,
                current: {
                    province: {
                        id: '',
                        code: '',
                        name: '',
                        parentcode: '',
                        level: ''
                    },
                    city: {
                        id: '',
                        code: '',
                        name: '',
                        parentcode: '',
                        level: ''
                    },
                    area: {
                        id: '',
                        code: '',
                        name: '',
                        parentcode: '',
                        level: ''
                    }
                }
            }
        },
        created: function(){
            this.getRegion()
        },
        computed: {
            ...mapState({ user: state => state.user}),
            provinces () {
                return this._filter(this.rootCode)
            },
            cities () {
                return this._filter(this.provinceSelected)
            },
            areas () {
                return this._filter(this.citySelected)
            },
            provinceSelected: {
                get () {
                    return this._selected(this.rootCode, this.current.province.code || this.province)
                },
                set (value) {
                    this.current.province.code = value //得到的值是item.code
                }
            },
            citySelected: {
                get () {
                    return this._selected(this.provinceSelected, this.current.city.code || this.city)
                },
                set (value) {
                    this.current.city.code = value
                }
            },
            areaSelected: {
                get () {
                    return this._selected(this.citySelected, this.current.area.code || this.area)
                },
                set (value) {
                    this.current.area.code = value
                }
            }
        },
        methods: {
            getRegion: function(){
                var vm = this
                vm.token = vm.user.token
                vm.$http.get(vm.url)
                    .then((response) => {
                        vm.region = response.body.data
                    })
                    .catch(function(response){
                        console.log(response)
                    })
            },
            _filter: function(pid){//筛选数据
                var vm = this
                var result = []
                var items = vm.region
                for(var i=0; i<items.length; i++){
                    if(items[i].parentcode == pid){
                        result.push(items[i])
                    }
                }
                return result
            },
            _selected (pid, model) {
                return model
            },
            emitRegionChange(field){
                if (field === 'provinceSelected') {
                    this.citySelected = function(){ return this._selected(this.provinceSelected, this.current.city.code) }
                    this.areaSelected = function(){ return this._selected(this.citySelected, this.current.area.code) }
                }
                if (field === 'citySelected') {
                    this.areaSelected = function(){ return this._selected(this.citySelected, this.current.area.code) }
                }
                
                this.$emit('emitRegionChange',{
                    province: this.getRegionName(this.provinceSelected),
                    city: this.getRegionName(this.citySelected),
                    area: this.getRegionName(this.areaSelected)
                })
            },
            getRegionName(regionCode) {
                var items = this.region
                var name = ''
                for(var i=0; i<items.length; i++){
                    if(items[i].code == regionCode){
                        name = items[i].name
                    }
                }
                return name
            }
        }
    }
</script>