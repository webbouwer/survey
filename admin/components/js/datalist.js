
jQuery(function($){

    $(document).ready(function(){

    var datalist;

    var dataUrl = 'components/classes/datalist.php'; // protected

    getTableData = function( container = false ){

        $.ajax({
            type: 'POST',
            url: dataUrl,
            //data: {json: JSON.stringify(json_data)},
            dataType: 'json',

        }).done( function( data ) {

            //console.log('done');
            //console.log(data);

            var fielddata = '';
            var textdata = '';

            if( data['fields'] ){

                datalist = data;
								let fields = data['fields'];
                $.each(data, function(idx, obj) {

                    if(idx == 'fields'){
                        let fieldrow = ''; // header columns
                        $.each(obj, function(fkey, fieldname) {
                          datalist[idx][fkey] = fieldname;
                          if( fkey == 'id' || fkey == 'title' || fkey == 'desc')
                            fieldrow += '<th class="fieldname">'+fieldname+'</th>';
                        });
                        fielddata += '<tr class="fieldrow">'+fieldrow+'';
                        fielddata += '<th><button type="button" class="small new">Add new</button></th>';
                        fielddata += '</tr>';
                    }else{
                        textdata += '<tr id="nr'+idx+'" data-nr="'+idx+'" class="entry">'; // data columns
                        $.each(obj, function( key, value) {
                          datalist[idx][key] = value;
                          if( key == 'id' || key == 'title' || key == 'desc')
                            textdata += '<td class="element" data-nr="'+idx+'" data-field="'+key+'"><span class="inputbox">'+value+'</span></td>';
                        });
                        textdata += '<td><button type="button" class="small view">view</button>';
                        textdata += '<button type="button" class="small copy">copy</button>';
                        textdata += '<button type="button" class="small delete">delete</button></td>';
                        textdata += '</tr>';
                    }

                });

                //console.log(datalist);
                if( !container ){
                  return datalist;
                }else{
                  container.html('<table id="datalist">'+fielddata + '' +textdata +'</table>');
                }

            }

        })
        .fail( function( data ) {
            console.log('failed to collect data');
            //console.log(data);
        });
    }

		function saveDataList( tosave ){

			var senddata =  { 'data': tosave, 'action': 'save' };
      //console.log( senddata.data );
			$.ajax({
					type: 'POST',
					url: dataUrl,
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
					//console.log('done');
			})
			.fail( function( data ) {
					console.log('failed to save data');
			});

		}

    function copyDataList( tocopy ){

			var senddata =  { 'data': tocopy, 'action': 'copy' };
      //console.log( senddata.data );
			$.ajax({
					type: 'POST',
					url: dataUrl,
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
        // reload table
        let container = $('#datalist').parent();
        getTableData( container );
				//console.log('copied');
			})
			.fail( function( data ) {
					console.log('failed to copy');
			});

		}

    function deleteDataListRow( todelete ){

			var senddata =  { 'data': todelete, 'action': 'delete' };
      //console.log( senddata.data );
			$.ajax({
					type: 'POST',
					url: dataUrl,
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
        // reload table
        let container = $('#datalist').parent();
        getTableData( container );
				//console.log('deleted');
			})
			.fail( function( data ) {
					console.log('failed to delete');
			});

		}

    function newDataListRow(){

			var senddata =  { 'data': {}, 'action': 'new' };
			$.ajax({
					type: 'POST',
					url: dataUrl,
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
        // reload table
        let container = $('#datalist').parent();
        getTableData( container );
				//console.log('new data added');
			})
			.fail( function( data ) {
					console.log('failed to create new data');
			});

		}


    function editDataRow( idx ){

      var fields = datalist['fields'];
      var row = datalist[idx];

      let html = '<div id="editbox">';

      html += '<div class="element" data-nr="'+idx+'" data-field="title">';
      html += '<div class="title">'+fields['title']+': <span class="inputbox">'+row.title+'</span></div>';
      html += '</div>';

      let json = JSON.parse(row['json']); //JSON.stringify();

      $.each(json, function( key, value) {

        html += '<div id="nr'+idx+'" class="entry">';
        $.each(value, function( rkey, rvalue) {
        html += '<div class="element json" data-nr="'+idx+'" data-field="'+rkey+'">';
        if( $.isArray(rvalue) ){
          html += '<div class="subelements json" data-field="'+rkey+'">';
          let c = 0;
          $.each(rvalue, function( fkey, fvalue) {
            html += '<div class="json" data-field="'+fkey+'" data-field="'+c+'">'+fkey+': <span class="inputbox">'+fvalue+'</span></div>';
            c++;
          });
          html += '</div>';
        }else{
          html += ''+rkey+': <span class="inputbox">'+rvalue+'</span>';
        }
        html += '</div>';
        });
        html += '</div>';

      });
      html += '</div>';
      return html;
    }


    function viewDataRow(rowid){

      let data = editDataRow( rowid )
      addOverlay('dataview', data);

    }

    function copyDataRow(row){
      var dialog = confirm('copy: '+datalist[row]['id']+'?');
      if (dialog) {
        let toCopy = { 'nr': row };
  			copyDataList( toCopy );
      }
    }

    function deleteDataRow(row){
      var dialog = confirm('delete: '+datalist[row]['id']+'?');
      if (dialog) {
        let toDelete = { 'nr': row };
        deleteDataListRow( toDelete );
      }
    }





    // inline edit datalist
		$('body').on('click touchstart', '#datalist .inputbox:not(.edit)', function() {

	    let txt = $(this).html().trim();
	    let inp = $('<input class="textinput" type="text" value="' + txt + '" />');

	    $(this).addClass('edit');
	    $(this).html(inp);
			$('body').find('#datalist .inputbox.edit input.textinput').select();
	  });

	  $('body').on('blur', '#datalist .inputbox.edit input.textinput', function() {
	    let txt = $(this).val();
			let toSave = { 'nr': $(this).parent().parent().data('nr'), 'field': $(this).parent().parent().data('field'), 'content': txt };
			saveDataList( toSave );
	    $(this).parent().removeClass('edit').html(txt);

      if( toSave.field == 'id'){ //id changed
        let container = $('#datalist').parent();
        setTimeout( function(){
          getTableData( container );
        }, 10);
      }

	  });

    $('body').on('keyup','#datalist .inputbox.edit input.textinput',function(){ // selector ? [contenteditable=true]
        if(event.keyCode==13){
            $(this).blur();
        }
    });

    // inline edit datalist-editbox
		$('body').on('click touchstart', '#editbox .inputbox:not(.edit)', function() {

	    let txt = $(this).html().trim();
	    let inp = $('<input class="textinput" type="text" value="' + txt + '" />');

	    $(this).addClass('edit');
	    $(this).html(inp);
			$('body').find('#editbox .inputbox.edit input.textinput').select();
	  });

	  $('body').on('blur', '#editbox .inputbox.edit input.textinput', function() {
	    let txt = $(this).val();
      if( $(this).parent().parent().hasClass('json') ){
        console.log('saving sub elements to json variable');
      }else{
        console.log('saving element to field in row');
      }
      /*
			let toSave = { 'nr': $(this).parent().parent().data('nr'), 'field': $(this).parent().parent().data('field'), 'content': txt };
			saveDataList( toSave );
      */
	    $(this).parent().removeClass('edit').html(txt);
      /*
      if( toSave.field == 'id'){ //id changed
        let container = $('#datalist').parent();
        setTimeout( function(){
          getTableData( container );
        }, 10);
      }
      */
	  });

    $('body').on('keyup','#editbox .inputbox.edit input.textinput',function(){ // selector ? [contenteditable=true]
        if(event.keyCode==13){
            $(this).blur();
        }
    });

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



    /* Data row actions */
    $('body').on('click touchstart', '#datalist .entry button.view', function() {
      let row =$(this).closest('tr').data('nr');
      viewDataRow(row);
    });

    $('body').on('click touchstart', '#datalist .entry button.copy', function() {
      let row =$(this).closest('tr').data('nr');
      copyDataRow(row);
    });

    $('body').on('click touchstart', '#datalist .entry button.delete', function() {
      let row =$(this).closest('tr').data('nr');
      deleteDataRow(row);
    });

    $('body').on('click touchstart', '#datalist button.new', function() {
      newDataListRow();
    });

    $('body').on('click touchstart', '.closeOverlay', function() {
      removeOverlay();
    });

  }); // end ready

});
