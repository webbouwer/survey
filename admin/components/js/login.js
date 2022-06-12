jQuery(function($){


    $(document).ready(function(){

      var configDataUrl = 'admin/components/classes/config.php';

      getConfigDataTable = function(){
        let nm = $("#name").val();
        let ps= $("#pass").val();
          $.ajax({
              type: 'POST',
              url: configDataUrl,
              data: {'action': 'login','name': nm ,'pass': ps },
              dataType: 'json',
          }).done( function( data ) {
            if( data['chk'] == 1){
              window.location.href = 'admin/index.php';
            }else{
              //return data;
              if( $('body').find('#loginbox .loginmessage').length < 1){
                $('#loginbox').append('<div class="loginmessage"></div>');
              }
              $('body').find('#loginbox .loginmessage').fadeOut( 300, function(){

                $('body').find('#loginbox .loginmessage').html(data['msg']).fadeIn(500);
              });
            }
            /*
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
                  //console.log(data);
                  return data;


              }
              */

          })
          .fail( function( data ) {
              console.log('failed to collect data');
              //console.log(data);
          });
      }

      $('body').on( 'click touchstart', '#loginbox #go', function(e){
        e.preventDefault();
        getConfigDataTable();
      });


    });
});
