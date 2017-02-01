export default{
    host: "http://192.168.1.102:9528/api/",
    formatDate(d,istime){
        if(d==''){
                return null
        }
        if(istime){
            return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
        }
        else{
            return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
        }
    },

}