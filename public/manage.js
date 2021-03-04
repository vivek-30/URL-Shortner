$(document).ready(function(){
    // focus on main input
    $('#URL').focus(); 

    $('#clear').click((e)=>{
        $.ajax({
            type:'GET',
            url:'/links/clear',
            success:function(){
                location.reload();
            }
        });
    });
});