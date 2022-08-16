jQuery(function($){


    $(document).ready(function(){

      var configDataUrl = 'admin/components/classes/config.php';

      if( $('body').find('#messagebox .loginmessage').length < 1){
        $('#loginbox').append('<div id="messagebox"><div class="loginmessage"></div></div>');
      }

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


              $('body').find('#messagebox .loginmessage').fadeOut( 300, function(){
                $('body').find('#messagebox .loginmessage').html('Login confirmed; redirecting..').fadeIn(300);
                setTimeout( function(){
                  $('body').find('#messagebox .loginmessage').fadeOut(200);
                }, 700);
                setTimeout( function(){
                    window.location.href = 'admin/index.php';
                }, 1200);
              });


            }else{

              //return data;
              $('body').find('#messagebox .loginmessage').fadeOut( 300, function(){
                $('body').find('#messagebox .loginmessage').html(data['msg']).fadeIn(500);
                setTimeout( function(){
                  $('body').find('#messagebox .loginmessage').fadeOut();
                }, 4000);
              });

            }
          })
          .fail( function( data ) {
              console.log('failed to collect data');
              //console.log(data);
          });
      }
      //$('body').on( 'click touchstart', '#loginbox #go', function(e){
      $("#loginbox form").submit(function (e) {
        e.preventDefault();
        getConfigDataTable();
      });


    });
});
