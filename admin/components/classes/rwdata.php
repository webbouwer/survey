<?php
// protected from outside
$pos = strpos($_SERVER['HTTP_REFERER'],getenv('HTTP_HOST'));
if($pos===false)
die('Restricted access');

class rwdata{

	private $s;
	public $f;

	public  function __construct(){

		$this->s = "38ob8734lkrp2382kbld2kbh9db2khbh9db2khb38obhrrkn8n49fdkj00"; // encryption key
		$this->f = "../data/"; // data folder

	}
	public function dataToFile($array = false, $filename){

		if(!is_dir( $this->f )){
			mkdir( $this->f );
		}
		// array to encrypted json
		$datastring = json_encode( $array );
		$encrypted = $this->encrypt( $this->s, $datastring );
		file_put_contents( $this->f . $filename, $encrypted );
	}

	public function dataFromFile( $filename ){
		// decrypted json to array
		$data = file_get_contents( $this->f . $filename );
		$decrypted = $this->decrypt( $this->s, $data );
		$arr = json_decode( $decrypted, true);
		return $arr;
	}

	// TODO: newKey / changeKey
	/*
	public function changeEncryptkey( $newkey ){
		$oldkey = $this->s;
		// get all files
		// each file replace encrypted data
		$data = file_get_contents( $this->f . $filename );
		$decrypted = $this->decrypt( $this->s, $data );
	}
	*/

  private function encrypt($key, $payload) {
    // php mcrypt_encrypt alternative:
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
    $encrypted = openssl_encrypt($payload, 'aes-256-cbc', $key, 0, $iv);
    return base64_encode($encrypted . '::' . $iv);
  }

  private function decrypt($key, $garble) {
    // php mcrypt_decrypt alternative:
    list($encrypted_data, $iv) = explode('::', base64_decode($garble), 2);
    return openssl_decrypt($encrypted_data, 'aes-256-cbc', $key, 0, $iv);
  }
}

?>
