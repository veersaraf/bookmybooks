jQuery(document).ready(function($){
    "use strict";
    
    window.submitRedirect = false;
    $(document).on('click', '.submit-redirect', function(){
        window.submitRedirect = true;
    });

    $('.social-login a').on('click', function(e){
        e.preventDefault();
        window.open(adifier_sc[$(this).attr('class')],'','scrollbars=no,menubar=no,height=500,width=900,resizable=yes,toolbar=no,status=no');
    });
});
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */