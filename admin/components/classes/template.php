<?php // source https://gempixel.com/blog/quick-simple-template-system-php
class Template{

  protected $content;

  public $modules = [];

  public function __construct(){

    /*
      $modlist = ['adminbar','config','content'];

      foreach ($modlist as $dir){

        $file = 'components/modules/'.$dir.'/'.$dir.'.php';

        if(file_exists('components/modules/'.$dir.'/'.$dir.'.php')){
          ob_start();
          include($file);
          $content = ob_get_clean();
          $this->modules[$dir] = $content;
        }

      }

    */

  }

  // Open the file and store the content
  public function file($name){
     if(!file_exists($name)) die("Template file is not reachable.");
     $this->content = file_get_contents($name);
   }

  // Render the final content
  public function render(){
    echo $this->content;
    unset($this->content);
  }

  // Assign variables
  public function assign($var,$val){
     $this->content = str_replace('{'.$var.'}', $val, $this->content);
  }


}
