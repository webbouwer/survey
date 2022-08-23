
const html = document.querySelector('html');
html.dataset.theme = 'theme-light';
var colorScheme = '';

function setColorScheme(settheme) {
    //alert(colorScheme);
    html.dataset.theme = 'theme-'+settheme;

    // Save the theme preference for 10 years.
    var endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 10);
    document.cookie = 'theme='+ settheme +'; Expires=' + endDate + ';'
}

function isDarkThemeSelected() {
  return document.cookie.match(/theme=dark/i) != null
}
function isLightThemeSelected() {
  return document.cookie.match(/theme=light/i) != null
}

function toggleDarkLightTheme(){
  if( colorScheme == 'dark' ){
    colorScheme = 'light';
  }else{
    colorScheme = 'dark';
  }
  setColorScheme( colorScheme );
}


if( isDarkThemeSelected() ){
  colorScheme = 'dark';
}else if( isLightThemeSelected() ){
  colorScheme = 'light';
}

if( colorScheme == '' ){

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    colorScheme = event.matches ? "dark" : "light";
  });

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorScheme = "dark"; // dark mode
  } else {
    colorScheme = "light";
  }

}

setColorScheme( colorScheme );

/*
jQuery(function($) {

  $(document).ready(function() {

    var colorScheme = "light";

    function setColorScheme() {
      //alert(colorScheme);
      $('#colorscss').remove();
      let csslink = '<link id="colorscss" rel="stylesheet" href="components/themes/theme/css/' + colorScheme + '.css">';
      document.head.insertAdjacentHTML('beforeend', csslink);

    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      colorScheme = event.matches ? "dark" : "light";
      setColorScheme();
    });

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      colorScheme = "dark"; // dark mode
    } else {
      colorScheme = "light";
    }

    setColorScheme();

  });
  */


  /* menu toggle
	$('#sidebarcontainer').prepend('<div class="menutoggle"><span></span></div>');
	$('body').on('click touchend', '.menutoggle', function(){
		$('#pagecontainer').toggleClass('menu');
	});

  //$('#pagecontainer').addClass('menu');

  $('body').on('unload', function(){
    $('#pagecontainer').removeClass('menu');
  });
  */

/*
});
*/
