/* detect visitor styling */
jQuery(function($) {

  $(document).ready(function(){

    var colorScheme = "light";

    function setColorScheme(){
      //alert(colorScheme);
      $('#colorscss').remove();
      let csslink = '<link id="colorscss" rel="stylesheet" href="components/themes/theme/css/'+colorScheme+'.css">';
      document.head.insertAdjacentHTML( 'beforeend', csslink );
    }


    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        colorScheme = event.matches ? "dark" : "light";
        setColorScheme();
    });

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      colorScheme = "dark";  // dark mode
    }else{
      colorScheme = "light";
    }

    setColorScheme();


  });
});
