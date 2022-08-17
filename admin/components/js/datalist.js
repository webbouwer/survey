
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
                            textdata += '<td class="element field-'+key+'" data-nr="'+idx+'" data-field="'+key+'"><span class="inputbox">'+value+'</span></td>';
                        });
                        textdata += '<td><button type="button" class="small view">view</button>';
                        textdata += '<button type="button" class="small edit">edit</button>';
                        textdata += '<button type="button" class="small copy">copy</button>';
                        textdata += '<button type="button" class="small delete">delete</button></td>';
                        textdata += '</tr>';
                    }

                });

                //console.log(datalist);
                if( !container ){
                  return datalist;
                }else{
                  //$('body').prepend('<div id="messagebox"></div>');
                  container.html('');
                  container.append('<table id="datalist">'+fielddata + '' +textdata +'</table>');
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
					console.log(senddata);
			})
			.fail( function( data ) {
					console.log('failed to save data');
			});

		}

    function copyDataListRow( tocopy ){

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

    function previewDataView( idx ){

        var fields = datalist['fields'];
        var row = datalist[idx];
        let html = '';

        // previewbox
        html += '<div id="editbox" data-nr="'+idx+'"><h3>Data Preview</h3>';

        html += '<div class="container">';

        html += '<div class="header"><div class="headertitle"><h1>'+row['title']+'</h1></div></div>';

        html += '<div class="intro"><div class="subtitle"><h2>'+row['subtitle']+'</h2></div>';
        html += '<div class="desc"><p>'+row['desc']+'</p></div>';
        html += '<div class="intro_title"><h5>'+row['intro_title']+'</h5></div>';
        html += '<div class="intro_text"><p>'+row['intro_text']+'</p></div>';
        html += '<div class="intro_subtext"><p>'+row['intro_subtext']+'</p></div>';
        html += '</div>';

        html += '<div class="main">';

        html += '<div class="top"><div class="survey_title"><h3>'+row['survey_title']+'</h3></div>';
        html += '<div class="survey_start"><p>'+row['survey_start']+'</p></div></div>';

        // survey box html
        let json = JSON.parse(row['json']);

        html += '<div class="slides">0/'+json.length+'</div>';



        html += '<div class="bottom">';

        html += '<div class="survey_end"><p>'+row['survey_end']+'</p></div></div>';
        html += '</div>';

        html += '</div>';
        html += '</div>';

        return html;
    }


        /* edit example box
        html += '<div id="surveybox" data-nr="'+idx+'"><h3>Data Edit</h3>';

        $.each(row, function( fieldkey, fieldvalue) {
          if( fieldkey != 'json'){
            html += '<div class="element row" data-nr="'+idx+'" data-field="'+fieldkey+'">';
            html += ''+fields[fieldkey]+': <span class="inputbox">'+fieldvalue+'</span>';
            html += '</div>';
          }
        });

        let json = JSON.parse(row['json']); //JSON.stringify();

        $.each(json, function( key, value) {

          html += '<div data-nr="'+idx+'" class="entry json">';
          $.each(value, function( rkey, rvalue) {
          html += '<div class="element" data-field="'+rkey+'">';
          if( $.isArray(rvalue) ){
            html += '<div class="subelements" data-field="'+rkey+'">';
            let c = 0;
            $.each(rvalue, function( fkey, fvalue) {
              html += '<div data-field="'+fkey+'">'+fkey+': <span class="inputbox">'+fvalue+'</span></div>';
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
        */


    function editDataView( idx ){

      var fields = datalist['fields'];
      var row = datalist[idx];
      let html = '';

      // editbox
      html += '<div id="editbox" data-nr="'+idx+'"><h3>Data Edit</h3>';

      $.each(row, function( fieldkey, fieldvalue) {
        if( fieldkey != 'json'){
          html += '<div class="element row" data-nr="'+idx+'" data-field="'+fieldkey+'">';
          html += ''+fields[fieldkey]+': <span class="inputbox">'+fieldvalue+'</span>';
          html += '</div>';
        }
      });

      let json = JSON.parse(row['json']); //JSON.stringify();

      $.each(json, function( key, value) {

        html += '<div data-nr="'+idx+'" class="entry json">';
        $.each(value, function( rkey, rvalue) {
        html += '<div class="element" data-field="'+rkey+'">';
        if( $.isArray(rvalue) ){
          html += '<div class="subelements" data-field="'+rkey+'">';
          let c = 0;
          $.each(rvalue, function( fkey, fvalue) {
            html += '<div data-field="'+fkey+'">'+fkey+': <span class="inputbox">'+fvalue+'</span></div>';
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

      let previewdata = previewDataView( rowid )
      addOverlay('dataview', previewdata);

    }

    function editDataRow(rowid){

      let data = editDataView( rowid )
      addOverlay('dataview', data);

    }

    function copyDataRow(row){
      var dialog = confirm('copy: '+datalist[row]['id']+'?');
      if (dialog) {
        let toCopy = { 'nr': row };
  			copyDataListRow( toCopy );
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
		$('body').on('click touchstart', '#datalist .inputbox:not(.edit),#editbox .row .inputbox:not(.edit)', function() {
	    let txt = $(this).html().trim();
	    let inp = $('<input class="textinput" type="text" value="' + txt + '" />');
	    $(this).addClass('edit');
	    $(this).html(inp);
			$('body').find('#datalist .inputbox.edit input.textinput,#editbox .row .inputbox.edit input.textinput').select();
	  });

	  $('body').on('blur', '#datalist .inputbox.edit input.textinput,#editbox .row .inputbox.edit input.textinput', function() {
	    let txt = $(this).val();
			let toSave = { 'nr': $(this).parent().parent().data('nr'), 'field': $(this).parent().parent().data('field'), 'content': txt };
			saveDataList( toSave );
	    $(this).parent().removeClass('edit').html(txt);
      //if( toSave.field == 'id' ){ //id changed
        let container = $('#datalist').parent();

        setMessagebox('Saved!', 2000);
        //alert('saved!');
        setTimeout( function(){
          getTableData( container );
        }, 10);
      //}
	  });

    $('body').on('keyup','#datalist .inputbox.edit input.textinput,#editbox .row .inputbox.edit input.textinput',function(){ // selector ? [contenteditable=true]
        if(event.keyCode==13){
            $(this).blur();
        }
    });


    // inline edit datalist[row][]'json'] editbox
		$('body').on('click touchstart', '#editbox .json .inputbox:not(.edit)', function() {

	    let txt = $(this).html().trim();
	    let inp = $('<input class="textinput" type="text" value="' + txt + '" />');
	    $(this).addClass('edit');
	    $(this).html(inp);
			$('body').find('#editbox .json .inputbox.edit input.textinput').select();
	  });

	  $('body').on('blur', '#editbox .json .inputbox.edit input.textinput', function() {

	    let txt = $(this).val();
      let obj = $(this).parent().removeClass('edit').html(txt);
      let json = {};
      // row
      $('#editbox .entry.json').each(function (i, e) {
        json[i] = {}; // the json row
        $(e).find('.element').each(function (f, v) {
          json[i][$(v).data('field')] = $(v).find('.inputbox').text(); // string
          if($(v).find('.subelements').length > 0){
            json[i][$(v).data('field')] = new Array();
            $(v).find('.subelements div').each(function (a, b) {
              json[i][$(v).data('field')][a] = $(b).find('.inputbox').text(); // array
            });
          }
        });
      });
      // fields
      console.log('saving sub elements to json variable');
      let data = { 'nr': $('#editbox').data('nr'), 'field': 'json', 'content': JSON.stringify(json) };
      //let toSave = JSON.stringify(data); alert( toSave );
			saveDataList( data );

      setMessagebox('Saved!', 1200);
	    $(this).parent().removeClass('edit').html(txt);

        let container = $('#datalist').parent();
        setTimeout( function(){
          getTableData( container );
        }, 10);

	  });

    $('body').on('keyup','#editbox .json .inputbox.edit input.textinput',function(){ // selector ? [contenteditable=true]
        if(event.keyCode==13){
            $(this).blur();
        }
    });

    /* Message box layer moved in content.js
    function setMessagebox(msg, time = false){

      if( $('body').find('#messagebox .formmessage').length < 1){
        $('#messagebox').append('<div class="formmessage"></div>');
      }
      $('body').find('#messagebox .formmessage').fadeOut( 300, function(){
        $('body').find('#messagebox .formmessage').html(msg).fadeIn(500);
      });
      if( time ){
        setTimeout( function(){
          $('body').find('#messagebox .formmessage').fadeOut(500);
        }, time);
      }

    }
    */

    /* Data row actions */
    $('body').on('click touchstart', '#datalist .entry button.view', function() {
      let row =$(this).closest('tr').data('nr');
      viewDataRow(row);
    });

    $('body').on('click touchstart', '#datalist .entry button.edit', function() {
      let row =$(this).closest('tr').data('nr');
      editDataRow(row);
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
      getTableData( $('#maincontent') );
      removeOverlay();
    });

    getTableData( $('#maincontent') );

  }); // end ready

});
