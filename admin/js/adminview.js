jQuery(function($){

    const actionmenu = $('#actionmenu');
    const actionbox = $('#actionbox');

    //getConfigData( actionbox );
    //getSurveyData( actionbox );
    let adminmenu = {
      'homeadmin': 'Dashboard',
      'sendadmin': 'Send',
      'activityadmin': 'Activity',
      'surveyadmin': 'Surveys',
      'configadmin': 'Profile',
    }


    function createMenu( id, data, container){
      let menu = '<ul id="'+id+'">';
      $.each(adminmenu, function(k, v) {
        menu += '<li class="'+k+'">'+v+'</li>';
      });
      menu += '</ul>';
      container.html( menu );
    }
    createMenu( "adminmenu", adminmenu, actionmenu); //actionmenu.html( '<ul id="adminmenu"><li id="homeadmin">Home</li>..



    function getDashboard(){
      actionbox.html('<div><h1>Dashboard</h1><p>Kies een optie voor beheer</p></div>');
    }

    function getSurveyMarkup(){
      actionbox.html('<div><h1>Versturen</h1><p>Vul in en verstuur</p><div id="emaildata"></div></div>');
      markupEmailForm( $('#emaildata') );
    }

    function getActivities(){
      actionbox.html('<div><h1>Activity</h1><p>Bekijk actieve enquetes</p></div>');
    }

    function getSurveys(){
      getSurveyDataTable( actionbox );
    }

    function getConfigs(){
      getConfigDataTable( actionbox );
    }

    $('body').on('click', '.homeadmin', function() {
      getDashboard();
    });

    $('body').on('click', '.sendadmin', function() {
      getSurveyMarkup();
    });

    $('body').on('click', '.activityadmin', function() {
      getActivities();
    });

    $('body').on('click', '.surveyadmin', function() {
      getSurveys();
    });

    $('body').on('click', '.configadmin', function() {
      getConfigs();
    });

    $(document ).ready(function() {
      getDashboard();
    });

});
