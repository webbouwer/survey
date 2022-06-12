jQuery(function($){

    $(document).ready(function(){

      var adminbox = $('#adminbar');
      var headerbox = $('#headcontent');
      var actionbox = $('#maincontent');
      var footerbox = $('#footcontent');

      let adminmenu = {
        'home': 'Dashboard',
        //'sendadmin': 'Send',
        //'activityadmin': 'Activity',
        //'survey': 'Surveys',
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

      function logOut(){
        window.location.href = '../logout.php';
      }

      $('body').on('click touchstart', '#adminbar .home', function() {
        homePage();
      });

      $('body').on('click touchstart', '#adminbar .config', function() {
        getConfigs();
      });


      $('body').on('click touchstart', '#adminbar .logout', function() {
        logOut();
      });

    });

});
