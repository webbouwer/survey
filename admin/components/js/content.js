jQuery(function($){

    $(document).ready(function(){

        /* Page layer */
        addOverlay = function( id, content = 'Oooops something is missing..', type = false )
        {
          if(!type) type = 'layer'; // box, bar, note

          let layer = $('<div id="'+id+'" style="display:none;" class="overLayScreen '+type+'"><div class="framecontainer outermargin"><div class="contentbox">'+content+'</div><button type=button class="closeOverlay"><span>close</span></button></div></div>');

          if( $('body').find('.overLayScreen').length > 0){
            $('body').find('.overLayScreen').fadeOut(500, function(){
              $(this).remove();
              $('body').append(layer);
              layer.fadeIn(500);
            });
          }else{
            $('body').append(layer);
            layer.fadeIn(500);
          }

        }

        removeOverlay = function(){
          $('body').find('.overLayScreen').fadeOut(500, function(){
            $(this).remove();
          });
        }

        setMessagebox = function(msg, time = false){

          if( $('body').find('#messagebox').length < 1){
            $('body').prepend('<div id="messagebox"></div>');
          }
          if( $('body').find('#messagebox .formmessage').length < 1){
            $('#messagebox').append('<div class="formmessage"></div>');
          }
          $('body').find('#messagebox .formmessage').fadeOut( 300, function(){
            $('body').find('#messagebox .formmessage').html(msg).fadeIn(500);
          });
          if( !time ){
            let time = 3000;
          }
          setTimeout( function(){
            $('body').find('#messagebox .formmessage').fadeOut(500);
          }, time);

        }


    });

});
