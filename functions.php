<?php

// find current file folder
function get_current_file_url($Protocol='http://') {
   return $Protocol.$_SERVER['HTTP_HOST'].str_replace($_SERVER['DOCUMENT_ROOT'], '', realpath(__DIR__));
}
$thislink = get_current_file_url($Protocol='https://');

function encrypt($key, $payload) {
    // php mcrypt_encrypt alternative:
      $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
      $encrypted = openssl_encrypt($payload, 'aes-256-cbc', $key, 0, $iv);
      return base64_encode($encrypted . '::' . $iv);
}
function decrypt($key, $garble) {
    // php mcrypt_decrypt alternative:
    list($encrypted_data, $iv) = explode('::', base64_decode($garble), 2);
    return openssl_decrypt($encrypted_data, 'aes-256-cbc', $key, 0, $iv);
}
