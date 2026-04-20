layui.use(['jquery','form','laydate','layer'], function(){
    var form = layui.form;
    var $ = layui.$;
    var layer = layui.layer;

    var id = $("#id").val()
    var flag = $("#flag").val()
    if (id) {
        $("#userName").attr("disabled","disabled");

        if(flag){
            $("#userName").attr("disabled","disabled");
            $("#name").attr("disabled","disabled");
            $("#phone").attr("disabled","disabled");
            $("#school").attr("disabled","disabled");
            $("#major").attr("disabled","disabled");
            $("#classes").attr("disabled","disabled");
            $("#gender").attr("disabled","disabled");
            $("input[name='status']").attr("disabled",true);
            $("#submit").hide();
            $("#reset").hide();
        }

        $.ajax({
            type : 'GET',
            url : ctx + '/user/getUserInfoById?id=' + id,
            dataType : 'json',
            success : function(e){
                if (e.code == 200) {
                    $("#id").val(e.data.id);
                    $("#userName").val(e.data.userName);
                    $("#name").val(e.data.name);
                    $("#phone").val(e.data.phone);
                    // 设置状态单选框
                    if (e.data.status == 1) {
                        $("input[name='status'][value='1']").prop("checked", true);
                    } else {
                        $("input[name='status'][value='0']").prop("checked", true);
                    }
                    form.render('radio');
                } else {
                    layer.msg(e.msg);
                }
            },
            error : function(){
                layer.msg("服务器开小差了，请稍后再试...");
            }
        });
    }

    form.on('submit(formDemo)', function(data){
        // 检查密码字段，如果为空则设置为null
        if(!data.field.password){
            data.field.password = null;
        }

        data.field.status = parseInt(data.field.status);

        $.ajax({
            type : 'POST',
            url : ctx + '/user/saveOrUpdate',
            dataType : 'json',
            contentType: 'application/json',
            data : JSON.stringify(data.field),
            success : function(e){
                if(e.code == 200){
                    layer.msg(e.msg, {icon: 1});
                    setTimeout(function(){
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        parent.layui.table.reload('table-user', {
                            where: {},
                            page: {
                                curr: 1
                            }
                        });
                    }, 500);
                } else {
                    layer.msg(e.msg, {icon: 2});
                }
            },
            error : function(){
                layer.msg("服务器开小差了，请稍后再试...");
            }
        });
    });
});
