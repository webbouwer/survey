
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

                datalist = [];
								let fields = data['fields'];
                datalist['fields'] = fields;
                $.each(data, function(idx, obj) {

                    datalist[idx] = [];

                    if(idx == 'fields'){
                        let fieldrow = ''; // header columns
                        $.each(obj, function(fkey, fieldname) {
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
                if( !container ){
                  //console.log(datalist);
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

      html += '<div class="title">'+fields['title']+':'+row.title+'</div>';

      let json = JSON.parse(row['json']); //JSON.stringify();

      $.each(json, function( key, value) {

        html += '<div id="nr'+idx+'" class="entry"><div class="element" data-nr="'+idx+'" data-field="'+key+'">'+key+': <span class="inputbox">'+JSON.stringify(value)+'</span></div></div>';

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





    // inline edit
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
