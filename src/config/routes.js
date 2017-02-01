import App from '../app'
export default [
    {
        path: '/login', //登录
        meta: { auth: false },
        name: '登录',
        hidden: true,//不显示在导航中
        component: resolve => require(['../pages/login/'], resolve)
    },
    {
        path: '/signout', //退出
        name: 'signout',
        title: '退出',
        hidden: true,//不显示在导航中
        component: resolve => require(['../pages/signout/'], resolve)
    },
    {
        path: '/home', //首页
        name: 'home',
        title: '首页',
        component: resolve => require(['../pages/home/'], resolve),
        redirect: '/general',
        children: [
            {
                path: '/general', //常用功能
                name: 'general',
                title: '常用功能',
                iconCls: 'icon-general',
                component: resolve => require(['../pages/general/index.vue'], resolve),
                redirect: '/general-index',
                children: [
                    {
                        path: '/general-index', //平台首页
                        name: 'general-index',
                        title: '平台首页',
                        component: resolve => require(['../pages/general/home.vue'], resolve)
                    },
                    {
                        path: '/general-message', //我的消息
                        name: 'general-message',
                        title: '我的消息',
                        component: resolve => require(['../pages/general/message.vue'], resolve)
                    }
                ]
            },
            {
                path: '/xingzheng', //行政机构
                name: 'xingzheng',
                title: '行政机构',
                iconCls: 'icon-xingzheng',
                component: resolve => require(['../pages/xingzheng/index.vue'], resolve),
                redirect: '/xingzheng-enterprise',
                children: [
                    {
                        path: '/xingzheng-enterprise', //单位列表
                        name: 'xingzheng-enterprise',
                        title: '单位列表',
                        component: resolve => require(['../pages/xingzheng/enterprise.vue'], resolve)
                    },
                    {
                        path: '/xingzheng-employee', //单位人员
                        name: 'xingzheng-employee',
                        title: '单位人员',
                        component: resolve => require(['../pages/xingzheng/employee.vue'], resolve)
                    }
                ]
            },
            {
                path: '/enterprise', //企业管理
                name: 'enterprise',
                title: '企业管理',
                iconCls: 'icon-enterprise',
                component: resolve => require(['../pages/enterprise/index.vue'], resolve), 
                redirect: '/enterprise-department',
                children: [
                    {
                        path: '/enterprise-department', //企业人员列表
                        name: 'enterprise-department',
                        title: '企业列表',
                        component: resolve => require(['../pages/enterprise/department.vue'], resolve)
                    },
                    {
                        path: '/enterprise-enterpriseInfo', //新增证书
                        name: 'enterprise-enterpriseInfo',
                        title: '新增证书',
                        component: resolve => require(['../pages/enterprise/enterpriseInfo.vue'], resolve)
                    },
                    {
                        path: '/enterprise-history', //人员注册
                        name: 'enterprise-history',
                        title: '企业变更历史记录',
                        component: resolve => require(['../pages/enterprise/enterprisehistory.vue'], resolve)
                    },
                    {
                        path: '/enterprise-list', //企业部门列表
                        name: 'enterprise-list',
                        title: '企业列表',
                        component: resolve => require(['../pages/enterprise/enterpriseList.vue'], resolve)
                    },
                    {
                        path: '/enterprise-details/:id', //企业详情列表
                        name: 'enterprise-details',
                        title: '企业详情',
                        component: resolve => require(['../pages/enterprise/enterprisedetails.vue'], resolve)
                    }

                ]
            },
            {
                path: '/project', //项目管理
                name: 'project',
                title: '项目管理',
                iconCls: 'icon-project',
                component: resolve => require(['../pages/project/index.vue'], resolve),
                redirect: '/project-under',
                children: [
                    {
                        path: '/project-under', //在建项目
                        name: 'project-under',
                        title: '在建项目',
                        component: resolve => require(['../pages/project/project-under.vue'], resolve)
                    },
                    {
                        path: '/project-completed', //已竣工项目
                        name: 'project-completed',
                        title: '已竣工项目',
                        component: resolve => require(['../pages/project/project-completed.vue'], resolve)
                    },
                    {
                        path: '/project-wList', //项目务工人员
                        name: 'project-wList',
                        title: '项目务工人员',
                        component: resolve => require(['../pages/project/project-wList.vue'], resolve)
                    },
                    {
                        path: '/project-add', //新增项目
                        name: 'project-add',
                        title: '新增项目',
                        iconCls: 'el-icon-message',
                        component: resolve => require(['../pages/project/project-add.vue'], resolve)
                    },
                    {
                        path: '/project-detail/:id', //项目详情
                        name: 'project-detail',
                        title: '项目详情',
                        component: resolve => require(['../pages/project/project-detail.vue'], resolve)
                    },
                    {
                        path: '/project-attachmentsdetail/:id', //项目详情上传附件
                        name: 'project-attachmentsdetail',
                        title: '项目详情',
                        component: resolve => require(['../pages/project/project-attachmentsdetail.vue'], resolve)
                    },
                    {
                        path: '/project-mapdetail/:id', //项目详情百度地图
                        name: 'project-mapdetail',
                        title: '项目详情百度地图',
                        component: resolve => require(['../pages/project/project-mapdetail.vue'], resolve)
                    },
                    {
                        path: '/project-enginedetail/:id', //项目详情工程
                        name: 'project-enginedetail',
                        title: '项目详情工程',
                        component: resolve => require(['../pages/project/project-enginedetail.vue'], resolve)
                    },
                    {
                        path: '/project-companydetail/:id', //项目单位详情
                        name: 'project-companydetail',
                        title: '项目单位详情',
                        component: resolve => require(['../pages/project/project-companydetail.vue'], resolve)
                    },
                ]
            },
            {
                path: '/attendance', //考勤管理
                name: 'attendance',
                title: '考勤管理',
                iconCls: 'icon-attendance',
                component: resolve => require(['../pages/attendance/index.vue'], resolve),
                redirect: '/attendance-record',
                children: [
                    {
                        path: '/attendance-record', //打卡原始记录
                        name: 'attendance-record',
                        title: '打卡原始记录',
                        component: resolve => require(['../pages/attendance/attendance-record.vue'], resolve)
                    },
                    {
                        path: '/attendance-day', //考勤日报表
                        name: 'attendance-day',
                        title: '考勤日报表',
                        component: resolve => require(['../pages/attendance/attendance-day.vue'], resolve)
                    },
                    {
                        path: '/attendance-month', //考勤月报表
                        name: 'attendance-month',
                        title: '考勤月报表',
                        component: resolve => require(['../pages/attendance/attendance-month.vue'], resolve)
                    },
                ]
            },
            {
                path: '/contract', //合同管理
                name: 'contract',
                title: '合同管理',
                iconCls: 'icon-contract',
                component: resolve => require(['../pages/contract/index.vue'], resolve),
                redirect: '/contract-list',
                children: [
                    {
                        path: '/contract-list', //合同列表
                        name: 'contract-list',
                        title: '合同列表',
                        component: resolve => require(['../pages/contract/contract-list.vue'], resolve)
                    },
                ]
            },
            {
                path: '/equipment', //设备管理
                name: 'equipment',
                title: '设备管理',
                iconCls: 'icon-equipment',
                component: resolve => require(['../pages/equipment/index.vue'], resolve),
                redirect: '/equipment-kaoqin',
                children: [
                    {
                        path: '/equipment-kaoqin', //考勤设备
                        name: 'equipment-kaoqin',
                        title: '考勤设备',
                        component: resolve => require(['../pages/equipment/equipment-kaoqin.vue'], resolve)
                    },
                    {
                        path: '/equipment-SFZReadManager', //身份证读卡器管理
                        name: 'equipment-SFZReadManager',
                        title: '身份证读卡器管理',
                        component: resolve => require(['../pages/equipment/equipment-SFZReadManager.vue'], resolve)
                    }
                ]
            },
            {
                path: '/audit', //统计分析
                name: 'audit',
                title: '统计分析',
                iconCls: 'icon-audit',
                component: resolve => require(['../pages/audit/index.vue'], resolve),
                redirect: '/audit-enterprise',
                children: [
                    {
                        path: '/audit-enterprise', //企业一览表
                        name: 'audit-enterprise',
                        title: '企业一览表',
                        component: resolve => require(['../pages/audit/audit-enterprise.vue'], resolve)
                    },
                    {
                        path: '/audit-project', //项目一览表
                        name: 'audit-project',
                        title: '项目一览表',
                        component: resolve => require(['../pages/audit/audit-project.vue'], resolve)
                    },
                    {
                        path: '/audit-employee', //人员一览表
                        name: 'audit-employee',
                        title: '人员一览表',
                        component: resolve => require(['../pages/audit/audit-employee.vue'], resolve)
                    },
                    {
                        path: '/audit-worktype', //工种分布统计分析
                        name: 'audit-worktype',
                        title: '工种分布统计分析',
                        component: resolve => require(['../pages/audit/audit-worktype.vue'], resolve)
                    },
                    {
                        path: '/audit-kaoqin', //考勤统计分析
                        name: 'audit-kaoqin',
                        title: '考勤统计分析',
                        component: resolve => require(['../pages/audit/audit-kaoqin.vue'], resolve)
                    },
                    {
                        path: '/audit-jsc', //领导驾驶舱
                        name: 'audit-jsc',
                        title: '领导驾驶舱',
                        component: resolve => require(['../pages/audit/audit-jsc.vue'], resolve)
                    },
                ]
            }
        ]
    },
    {
        path: '/help', //帮助文档
        name: 'help',
        title: '帮助文档',
        hidden: true,
        component: resolve => require(['../pages/help/'], resolve),
        children: [
            {
                path: '/help-qa', //常见问题
                name: 'help-qa',
                title: '常见问题',
                hidden: true,
                component: resolve => require(['../pages/help/help-qa.vue'], resolve)
            },
            {
                path: '/help-product', //产品文档
                name: 'help-product',
                title: '产品文档',
                hidden: true,
                component: resolve => require(['../pages/help/help-product.vue'], resolve)
            },
            {
                path: '/help-support', //技术支持
                name: 'help-support',
                title: '技术支持',
                hidden: true,
                component: resolve => require(['../pages/help/help-support.vue'], resolve)
            },
        ]
    },
    {
        meta: { auth: false },
        path: '/enterprise-regenterprise', //注册企业
        name: 'enterprise-regenterprise',
        title: '注册企业',
        component: resolve => require(['../pages/enterprise/regenterprise.vue'], resolve)
    },
    {
        meta: { auth: false },
        path: '/project-reg', //注册项目
        name: 'project-reg',
        title: '注册项目',
        component: resolve => require(['../pages/project/reg.vue'], resolve)
    },
    {
        path: '/about', //关于
        name: 'about',
        title: '关于',
        hidden: true,
        component: resolve => require(['../pages/about/'], resolve),
    },
    {
        path: '*', //其他页面，强制跳转到登录页面
        hidden: true,
        redirect: '/login'
    }
]