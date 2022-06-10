/*
* #pagecontainer
* JQuery
* admin/js/adminview.js
* util/js/pagelayers.js
* admin/js/surveydata.js
* admin/js/configdata.js
* - admin/classes/datasurvey.php
* - admin/classes/dataconfig.php
* - - admin/classes/rwdata.php
* - - - admin/classes/data/data.json
* - - - admin/classes/data/config.json
*/
jQuery(function($){

    $(document).ready(function(){
    /* admin specific */

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
        let menu = $('<ul id="'+id+'"></ul>');
        $.each(adminmenu, function(k, v) {
          menu.append('<li class="'+k+'">'+v+'</li>');
        });
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

      $('body').on('click touchstart', '.homeadmin', function() {
        getDashboard();
      });

      $('body').on('click touchstart', '.sendadmin', function() {
        getSurveyMarkup();
      });

      $('body').on('click touchstart', '.activityadmin', function() {
        getActivities();
      });

      $('body').on('click touchstart', '.surveyadmin', function() {
        getSurveys();
      });

      $('body').on('click touchstart', '.configadmin', function() {
        getConfigs();
      });

      getDashboard();

    }); // end ready

});
