<?php
class rwdata{

	private $s;
	public $f;

	public  function __construct(){

		$this->s = "ld8734lkrp238hrrkn8n49fdkj00b4912kbh9db2khb38ob23ubdo8b"; // encryption key
		$this->f = "../data/"; // data folder

		if(!is_dir( $this->f )){
			mkdir( $this->f );
		}

	}
	public function dataToFile($array = false, $filename){
		// array to encrypted json
		$datastring = json_encode( $array );
		/* mcrypt is deprecated
        $encrypted  = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($this->s), $datastring, MCRYPT_MODE_CBC, md5(md5($this->s))));
        */
        $encrypted = $this->encrypt( $this->s, $datastring );
		file_put_contents( $this->f . $filename, $encrypted );
	}

	public function dataFromFile( $filename ){

		// decrypted json to array
		$data = file_get_contents( $this->f . $filename );
		/* mcrypt is deprecated:
        $decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($this->s), base64_decode($data), MCRYPT_MODE_CBC, md5(md5($this->s))), "\0");
        */
        $decrypted = $this->decrypt( $this->s, $data );
		$arr = json_decode( $decrypted, true);
		return $arr;
	}

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

/* encryptdata */
/*
		// https://stackoverflow.com/questions/9365541/what-is-the-best-way-to-encrypt-decrypt-a-json-string
		$rw = new readwrite;
		// variable data array to store
		$array = ['testing2'=>'A secret text', 'myver2'=>'more secrets', 'test2'=> 'okido2!', 'test3'=> 'okido3!'];
		// array to json & write encrypted string to file
		$rw->dataToFile( $array, 'contacts.json' );
		// get filedata & decrypt json string to array
		$arr = $rw->dataFromFile( 'contacts.json' );
		//output
		print_r($arr);

*/
?>
