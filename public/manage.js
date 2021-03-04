$(document).ready(function(){
    // focus on main input
    $('#URL').focus(); 

    // update number of clicks on UI by reloading the page.
    // $.ajax({
    //     type: 'GET',
    //     url: '/:link',
    //     success: function(){
    //         location.href = '/';
    //         location.reload();
    //     }
    // });

    $('#clear').click((e)=>{
        $.ajax({
            type: 'GET',
            url: '/links/clear',
            success: function(){
                location.reload();
            }
        });
    });
});