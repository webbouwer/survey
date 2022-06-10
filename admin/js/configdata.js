/*
* #configlist
* JQuery
* admin/js/adminview.js
* util/js/pagelayers.js
* admin/js/configdata.js
* - admin/classes/dataconfig.php
* - - admin/classes/rwdata.php
* - - - admin/classes/data/config.json
*/
jQuery(function($){


    $(document).ready(function(){

    var configDataUrl = 'classes/dataconfig.php'; // protected

    getConfigDataTable = function( container = false ){

        $.ajax({
            type: 'POST',
            url: configDataUrl,
            //data: {json: JSON.stringify(json_data)},
            dataType: 'json',
        }).done( function( data ) {

            //console.log('done');
            //console.log(data);

            var fielddata = '';
            var textdata = '';

            if( data['fields'] ){

								let fields = data['fields'];
                $.each(data, function(idx, obj) {

                    if(idx != 'fields'){
                        $.each(obj, function( key, value) {
                            textdata += '<div id="nr'+idx+'" class="entry"><div class="element" data-nr="'+idx+'" data-field="'+key+'">'+fields[key]+': <span class="inputbox">'+value+'</span></div></div>';
                        });
                    }

                });
                if( !container ){
                  return data;
                }else{
                  container.html('<a href="../logout.php">logout</a><div id="configlist">' +textdata+'</div>');
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
					console.log('failed to save data');
					//console.log(data);
			});

		}

    //getConfigDataTable( $('body') );



		$('body').on('click', '#configlist .inputbox:not(.edit)', function() {

	    let txt = $(this).html().trim();
	    let inp = $('<input class="textinput" type="text" value="' + txt + '" />');

	    $(this).addClass('edit');
	    $(this).html(inp);
			$('body').find('#configlist .inputbox.edit input.textinput').select();
	  });

	  $('body').on('blur', '#configlist .inputbox.edit input.textinput', function() {
	    let txt = $(this).val();
			let toSave = { 'nr': $(this).parent().parent().data('nr'), 'field': $(this).parent().parent().data('field'), 'content': txt };
			saveConfigData( toSave );
	    $(this).parent().removeClass('edit').html(txt);
	  });

    $('body').on('keyup','#configlist .inputbox.edit input.textinput',function(){ // selector ? [contenteditable=true]
        if(event.keyCode==13){
            $(this).blur();
        }
    });

  });// end ready
});
