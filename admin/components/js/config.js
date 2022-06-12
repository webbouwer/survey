

jQuery(function($){


    $(document).ready(function(){

    var configDataUrl = 'components/classes/config.php'; // protected

    getConfigDataTable = function( container = false ){

        $.ajax({
            type: 'POST',
            url: configDataUrl,
            data: {'action': 'list', 'name': 'check' },
            dataType: 'json',
        }).done( function( data ) {

            var fielddata = '';
            var textdata = '';

            if( data['fields'] ){

								let fields = data['fields'];
                $.each(data, function(idx, obj) {

                    if(idx != 'fields'){
                        $.each(obj, function( key, value) {
                          if( key == 'admin_pass'){
                            textdata += '<div id="nr'+idx+'" class="entry"><div class="element" data-nr="'+idx+'" data-field="'+key+'">'+fields[key]+': <span class="inputbox password"><input style="border:none;" class="password" type="password" value="'+value+'"/></span></div></div>';
                          }else{
                            textdata += '<div id="nr'+idx+'" class="entry"><div class="element" data-nr="'+idx+'" data-field="'+key+'">'+fields[key]+': <span class="inputbox">'+value+'</span></div></div>';
                          }
                        });
                    }

                });
                if( !container ){
                  return data;
                }else{
                  container.html('<div id="configlist">' +textdata+'</div>');
                }

            }

        })
        .fail( function( data ) {
            console.log('failed to collect data');
            //console.log(data);
        });
    }

		saveConfigData = function( tosave ){

			//alert( JSON.stringify( tosave ) );

			var senddata =  { 'data': tosave, 'action': 'save' };
			$.ajax({
					type: 'POST',
					url: configDataUrl,
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
					//console.log('done');
					//console.log(data);
					//displayList(data); //(for admins)
					//alert( JSON.stringify( data ) );

			})
			.fail( function( data ) {
					//console.log('failed to save data');
					//console.log(data);
			});

		}

    //getConfigDataTable( $('body') );



		$('body').on('click touchstart', '#configlist .inputbox:not(.edit)', function() {

      let txt = $(this).html().trim();
      if( $(this).find('input').hasClass('password') ){
        txt = $(this).find('input').val();
        $(this).html('');
      }
         let type = 'text';
	       let inp = $('<input class="textinput" type="text" value="' + txt + '" />');

	    $(this).addClass('edit');
	    $(this).html(inp);
			$('body').find('#configlist .inputbox.edit input.textinput').select();

	  });

	  $('body').on('blur', '#configlist .inputbox.edit input.textinput', function() {
	    let txt = $(this).val();
			let toSave = { 'nr': $(this).parent().parent().data('nr'), 'field': $(this).parent().parent().data('field'), 'content': txt };
			saveConfigData( toSave );
      if( $(this).parent().hasClass('password') ){
        txt = '<input style="border:none;" class="password" type="password" value="'+txt+'"/>'
      }
      $(this).parent().removeClass('edit').html(txt);



	  });

    $('body').on('keyup','#configlist .inputbox.edit input.textinput',function(){ // selector ? [contenteditable=true]
        if(event.keyCode==13){
            $(this).blur();
        }
    });

  });// end ready

});
