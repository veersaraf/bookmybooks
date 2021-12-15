(function( $ ) {
 
    $.fn.adifierMapConsent = function() {
 
        this.each(function() {
            if( adifier_map_data.ask_map_consent == true ){
                $(this).css('position', 'relative');
                $(this).append('<a href="javascript:;" class="af-button visitor-map-consent">'+adifier_map_data.consent_map_text+'</a>');
                $(document).on( 'click', '.visitor-map-consent', function(){
                    $(document).trigger('adifierMapStart');
                    $('.visitor-map-consent').remove();
                    document.cookie = "adifier_consent_cookie=1; expires=\"1296000000\"; path=/";
                });				
            }
            else{
                $(document).trigger('adifierMapStart');
            }
        });
 
        return this;
 
    };
 
}( jQuery ));
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */