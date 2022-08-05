

jQuery(function($){


    $(document).ready(function(){

    var configDataUrl = 'components/classes/config.php'; // protected

    var datalist;

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

                datalist = data;
								let fields = data['fields'];

                $.each(data, function(idx, obj) {

                    if(idx != 'fields'){

                        textdata += '<div class="profile" data-nr="'+idx+'">';
                        textdata += '<div class="titlebox">';
                        textdata += '<h3><span class="profile">'+obj['profile']+'</span></h3><p><span class="sender">'+obj['sender']+'</span></p>';
                        textdata += '<p><span class="email_address">'+obj['email_address']+'</span></p></div>';
                        textdata += '<div class="editbox">';
                        /*
                        $.each(obj, function( key, value) {
                          if( key == 'admin_pass'){
                            textdata += '<div class="formfield" data-nr="'+idx+'" data-field="'+key+'"><span>'+fields[key]+': </span><span class="inputbox password"><input style="border:none;" class="password" type="password" value="'+value+'"/></span></div>';
                          }else{
                            textdata += '<div class="formfield" data-nr="'+idx+'" data-field="'+key+'"><span>'+fields[key]+': </span><span class="inputbox">'+value+'</span></div>';
                          }
                        });
                        */
                    }

                    textdata += '</div></div>';

                });


                if( !container ){
                  return data;
                }else{
                  container.html('<div class="configlist">' +textdata+'</div>');
                }

            }

        })
        .fail( function( data ) {
            console.log('failed to collect data');
            //console.log(data);
        });
    }

    editDataRow = function( idx ){

      var fields = datalist['fields'];
      var row = datalist[idx];

      let html = '<div id="editbox" data-nr="'+idx+'"><h3>Edit Data</h3>';

      $.each(row, function( fieldkey, fieldvalue) {
        if( fieldkey != 'json'){
          if( fieldkey == 'admin_pass'){
            html += '<div class="element row" data-nr="'+idx+'" data-field="'+fieldkey+'">';
            html += ''+fields[fieldkey]+': <span class="inputbox password"><input style="border:none;" class="password" type="password" value="'+fieldvalue+'"/></span>';
            html += '</div>';
          }else{
            html += '<div class="element row" data-nr="'+idx+'" data-field="'+fieldkey+'">';
            html += ''+fields[fieldkey]+': <span class="inputbox">'+fieldvalue+'</span>';
            html += '</div>';
          }
        }
      });
      return html;
    }


    viewDataRow = function(rowid){

      let data = editDataRow( rowid )
      addOverlay('dataview', data);

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
					console.log('data saved');
					//console.log(data);
			})
			.fail( function( data ) {
					console.log('failed to save data');
					//console.log(data);
			});

		}




		$('body').on('click touchstart', '#editbox .inputbox:not(.edit)', function() {

      let txt = $(this).html().trim();
      if( $(this).find('input').hasClass('password') ){
        txt = $(this).find('input').val();
        $(this).html('');
      }
         let type = 'text';
	       let inp = $('<input class="textinput" type="text" value="' + txt + '" />');

	    $(this).addClass('edit');
	    $(this).html(inp);
			$('body').find('#editbox .inputbox.edit input.textinput').select();

	  });

	  $('body').on('blur', '#editbox .inputbox.edit input.textinput', function() {
      let nr = $(this).parent().parent().data('nr');
	    let txt = $(this).val();
      let field = $(this).parent().parent().data('field');
			let toSave = { 'nr': nr, 'field': field, 'content': txt };
			saveConfigData( toSave );

      if( $(this).parent().hasClass('password') ){
        txt = '<input style="border:none;" class="password" type="password" value="'+txt+'"/>'
      }
      $(this).parent().removeClass('edit').html(txt);

      let container = $('.configlist').parent();
      setTimeout( function(){
        getConfigDataTable( container );
      }, 10);

	  });

    $('body').on('keyup','#editbox .inputbox.edit input.textinput',function(){ // selector ? [contenteditable=true]
        if(event.keyCode==13){
            $(this).blur();
        }
    });

    /* Data row actions */
    $('body').on('click touchstart', '.configlist .profile .titlebox', function() {
      let row =$(this).closest('.profile').data('nr');
      viewDataRow(row);
    });

    $('body').on('click touchstart', '.closeOverlay', function() {
      removeOverlay();
    });

    getConfigDataTable( $('#maincontent') );

  });// end ready

});
