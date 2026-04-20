e.data.parent_id = undefined;
layui.use(['jquery','form'], function(){
    var form = layui.form;
    var $ = layui.$;

    var id = $("#id").val();
    if(id){
        $.ajax({
            type: 'GET',
            url: ctx + '/cate/getById?id=' + id,
            dataType: 'json',
            success: function(e){
                if(e.code == 0){
                    $("#categoryName").val(e.data.categoryName);
                    $("#description").val(e.data.description);
                    $("#parentId").val(e.data.parentId);

                }else{
                    layer.msg(e.msg);
                }
            },
            error: function(){
                layer.msg("服务器错误，请稍后再试");
            }
        });
    }

    form.on('submit(formDemo)', function(data){
        $.ajax({
            type: 'POST',
            url: ctx + '/cate/saveOrUpdate',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data.field),
            success: function(e){
                if(e.code == 0){
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                }
                layer.msg(e.msg);
            },
            error: function(){
                layer.msg("服务器错误，请稍后再试");
            }
        });
    });
});