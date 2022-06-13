jQuery(function($){

    $(document).ready(function(){

      var adminbox = $('#adminbar');
      var headerbox = $('#headcontent');
      var actionbox = $('#maincontent');
      var footerbox = $('#footcontent');

      let adminmenu = {
        'home': 'Dashboard',
        'send': 'Send',
        //'activityadmin': 'Activity',
        'data': 'Data',
        'config': 'Config',
        'logout': 'Logout',
      }

        function createMenu( id, data, container){
          let menu = $('<ul id="'+id+'"></ul>');
          $.each(adminmenu, function(k, v) {
            menu.append('<li class="'+k+'">'+v+'</li>');
          });
          container.prepend( menu );
        }
        createMenu( "adminmenu", adminmenu, adminbox);


      function homePage(){
        window.location.href = 'index.php';
      }

      function getConfigs(){
        getConfigDataTable( actionbox );
      }

      function getEmailMarkup(){
        actionbox.html('<div><h1>Versturen</h1><p>Vul in en verstuur</p><div id="emaildata"></div></div>');
        markupEmailForm( $('#emaildata') );
      }

      function logOut(){
        window.location.href = '../logout.php';
      }

      $('body').on('click touchstart', '#adminbar .home', function() {
        homePage();
      });

      $('body').on('click touchstart', '#adminbar .send', function() {
        getEmailMarkup();
      }); 

      $('body').on('click touchstart', '#adminbar .data', function() {
        getTableData( actionbox );
      });
      $('body').on('click touchstart', '#adminbar .config', function() {
        getConfigs();
      });

      $('body').on('click touchstart', '#adminbar .logout', function() {
        logOut();
      });

    });

});
