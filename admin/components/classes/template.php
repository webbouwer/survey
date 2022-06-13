<?php // source https://gempixel.com/blog/quick-simple-template-system-php
class Template{

  protected $content;

  public $scripts = [];
  public $modules = [];

  public function __construct(){

      // register  js, css and tpl file urls from modules (folder)
      //$modules[] = ['name'=>'','js'=>[],'css'=>[]]
      
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
