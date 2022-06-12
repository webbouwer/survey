<?php // source https://gempixel.com/blog/quick-simple-template-system-php
class Template{

  protected $content;

  public $modules = [];

  public function __construct(){

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

  public function searchDataList( $url, $var ){

    if (file_exists( $url ) && isset($var) ){

      $data = json_encode($var);

      $options = array(
          'http' => array(
              'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
              'method'  => 'POST',
              'content' => http_build_query($data)
          )
      );
      $context  = stream_context_create($options);
      $result = file_get_contents($url, false, $context);
      if ($result) {
        return $result;
      }
    }
    return false;


  }
}
