// 全局引入layui核心模块
layui.use(['table','jquery','form','layer'], function(){
    var table = layui.table;
    var form = layui.form;
    var $ = layui.$;
    var layer = layui.layer;

    table.render({
        elem: '#table-user'
        ,id: 'table-user'
        ,height: 558
        ,url: ctx + '/user/list'
        ,method: 'get'
        ,even: true
        ,page: true
        ,request: {
            pageName: 'page'
            ,limitName: 'limit'
        }
        ,cols: [[
            {field: 'id', title: '用户ID', sort: true, fixed: 'left', width: 80}
            ,{field: 'userName', title: '用户名', sort: true, width: 80}
            ,{field: 'name', title: '真实姓名', width: 120}
            ,{field: 'gender', title: '性别', width: 80}
            ,{field: 'phone', title: '联系电话', width: 120}
            ,{field: 'school', title: '学院', width: 120}
            ,{field: 'major', title: '专业', width: 120}
            ,{field: 'classes', title: '班级', width: 80}
            ,{field: 'status', title: '状态', width: 80, templet: function(d){
                    return d.status == 1 ?
                        '<span class="layui-badge layui-bg-green">正常</span>' :
                        '<span class="layui-badge layui-bg-gray">禁用</span>';
                }}
            ,{fixed: 'right', title: '操作', align:'center', toolbar: '#barUser', width: 200}
        ]]
    });

    table.on('tool(table-user)', function(obj){
        var data = obj.data;
        var layEvent = obj.event;

        if(layEvent === 'detail'){
            layer.open({
                type: 2,
                title: '用户详情',
                area: ['600px', '400px'],
                shadeClose: false,
                closeBtn: 1,
                content: ctx + '/user/editUI?id=' + data.id + '&flag=1',
                end: function(){

                }
            });
        }
        else if(layEvent === 'del'){
            layer.confirm('确定删除该用户吗？', {icon: 3, title:'提示'}, function(index){
                layer.close(index);
                $.ajax({
                    type: 'GET',
                    url: ctx + '/user/delete/' + data.id,
                    dataType: 'json',
                    success: function(res){
                        if(res.code == 200){
                            obj.del();
                            layer.msg(res.msg, {icon: 1});
                        }else{
                            layer.msg(res.msg, {icon: 2});
                        }
                    },
                    error: function(){
                        layer.msg("服务器异常，请稍后再试！", {icon: 5});
                    }
                });
            });
        }
        else if(layEvent === 'edit'){
            layer.open({
                type: 2,
                title: '编辑用户',
                area: ['600px', '400px'],
                shadeClose: false,
                closeBtn: 1,
                content: ctx + '/user/editUI?id=' + data.id,
                end: function(){
                    table.reload('table-user');
                }
            });
        }

        else if(layEvent === 'editPwd'){
            layer.open({
                type: 2,
                title: '修改密码',
                area: ['500px', '300px'],
                shadeClose: false,
                closeBtn: 1,
                content: ctx + '/pages/updatepwd.jsp?id=' + data.id,
                end: function(){
                    table.reload('table-user');
                }
            });
        }
    });

    $("#add").on("click", function(){
        layer.open({
            type: 2,
            title: '新增用户',
            area: ['600px', '400px'],
            shadeClose: false,
            closeBtn: 1,
            content: ctx + '/user/editUI',
            end: function(){
                table.reload('table-user', {
                    where: {},
                    page: {
                        curr: 1
                    }
                });
            }
        });
    });

    $("#search-button").on("click", function(){
        table.reload('table-user', {
            where: {
                userName: $("#username").val()
            },
            page: {
                curr: 1
            }
        });
    });
});