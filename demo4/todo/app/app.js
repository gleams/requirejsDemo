/**
 * Created by jiangh on 2016-06-27.
 */
define(['./tool'],function (tool) {
    var $jsInput = $('.jsInput'),
        $jsAdd = $('.jsAdd'),
        $jsList = $('.jsList'),
        items = null,
        num = 0,
        temp = '';

    //简单的模板代码
    temp = '<tr>' +
                '<td><span class="jsNum">{num}</span></td>'+
                '<td>{value}</td>' +
                '<td><input type="button" value="删除"/></td>' +
            '</tr>';

    $jsAdd.on('click',function () {
        if(!$jsInput.val()){
            alert('事项不能这空');
            return;
        }
        items = {
            value:$jsInput.val(),
            num:++num
        };
        $jsList.find('tbody').append(tool.temp(items,temp));
    });

    $jsList.delegate('input','click',function () {
        var $this = $(this);
        $this.closest('tr').remove();
    });

    return $jsAdd;
});