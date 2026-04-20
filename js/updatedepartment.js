layui.use(['jquery','form','laydate'], function(){
    var form = layui.form;
    var $ = layui.$;//重点处

    //id有值，表示不是新增
    var id = $("#id").val()
    if (id) {
        $.ajax({
            type : 'GET',
            url : ctx + '/department/getDepartmentById?id=' + id,
            dataType : 'json',
            success : function(e){
                console.log(e)
                if (e.code == 0) {
                    //e为后台返回的数据
                    $("#deptName").val(e.data.deptName);
                } else {
                    layer.msg(e.msg);
                }
            },
            error : function(){
                layer.msg("服务器开小差了，请稍后再试...");
            }
        });
    }

    //监听提交
    form.on('submit(formDemo)', function(data){
        $.ajax({
            type : 'POST',
            url : ctx + '/department/saveOrUpdateDepartment',
            dataType : 'json',
            contentType : 'application/json;charset=utf-8', //设置请求头信息
            data : JSON.stringify(data.field),
            success : function(e){
                //e为后台返回的数据
                if(e.code == 0){
                    //当你在iframe页面关闭自身时
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭
                }
                layer.msg(e.msg);
            },
            error : function(){
                layer.msg("服务器开小差了，请稍后再试...");
            }
        });
    });
});
