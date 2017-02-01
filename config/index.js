module.exports = {
    devTest: { //部署到测试服务器上
        remotePath: '/xinledahtml/', //部署到服务器的路径
        host: '192.168.1.102', //ip地址
        user: 'administrator', //帐号
        pass: 'guangzhong777', //密码
        port: 9529 //端口
    },
    devDist: { //部署正式服务器上
        remotePath: '/xinledahtml/', //部署到服务器的路径
        host: '111.11.111.111', //ip地址
        user: 'root', //帐号
        pass: '88888888', //密码
        port: 22 //端口
    },
    publicPath: '/', //程序在网站根路径地址
    target: 'https://192.168.1.102:9529/' //连接的服务器地址
}