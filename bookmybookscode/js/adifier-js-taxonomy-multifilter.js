jQuery(document).ready(function($){
    "use strict";
    
    function startSelect2(){
        $('.taxonomy-multifilter:not(.select2-hidden-accessible)').each(function(){
            var $this = $(this);
            if( $this.parents('.reveal-after.hidden').length == 0 ){
                $this.select2();
            }
        });
    }

    $(document).on('adifier-reveal-after', function(){
        if( $('.taxonomy-multifilter').length > 0 ){
            $('.advert-location-wrap .taxonomy-multifilter').select2();
        }
    });

    $(document).on('change', '.taxonomy-multifilter', function(){
        var $this = $(this);
        var level = $this.data('level');
        var ajaxing = false;
        var $parent = $this.parent();
        var hideEmpty = $this.data('hide_empty');
        var $valueHolder = $parent.find('.taxonomy-value-holder');
        var value = $this.val();
        var hasChildren = $this.find('option:selected').data('children');
        var levels = $parent.find('select').length;

        //$valueHolder.val('').trigger('change');

        for( var i=level+1; i<levels; i++ ){
            $('.tm-level-'+i).select2('destroy');
            $('.tm-level-'+i).remove();
        }

        if( hideEmpty == true ){
            if( value == '' && level > 0 ){
                value = $parent.find('.tm-level-'+( level-1 )).val();
            }

            $valueHolder.val( value ).trigger( 'change' );
        }
        else if( hasChildren && value != '' && hideEmpty == false && $valueHolder.attr('id') == 'category' ){
            $('.category-custom-fields').html('');
        }
        else if( !hasChildren ){
            $valueHolder.val( value ).trigger( 'change' );
        }

        if( hasChildren && value != '' ){
            ajaxing = true;
            $parent.find('select').prop( 'disabled', true );
            if( hideEmpty == false && hasChildren ){
                $parent.append('<div class="text-center cf-loader"><i class="aficon-circle-notch aficon-spin"></i></div>');
            }
			$.ajax({
				url: adifier_data.ajaxurl,
				method: 'POST',
				data:{
					action:         'adifier_taxonomy_ajax_select',
					level:          level,
                    taxonomy:       $this.data('taxonomy'),
                    term_id:        value,
                    hide_empty:     hideEmpty
				},
				success: function( response ){
                    if( hideEmpty == false && hasChildren ){
                        $parent.find('.cf-loader').remove();
                    }
                    $parent.find('select').prop( 'disabled', false );
                    $parent.append( response );
					startSelect2();
				}
			});
        }
    });

    $(document).on('aficon-reset', function(){
        $('.taxonomy-multifilter-wrap select:not(.tm-level-0)').select2('destroy').remove();
        $('.taxonomy-multifilter-wrap .tm-level-0').val('');
        $('.taxonomy-multifilter-wrap .taxonomy-value-holder').val('');
    });

    startSelect2();
});
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */