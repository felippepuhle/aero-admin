<?php 

if(!is_dir('uploads')) {
	mkdir('uploads');
}

$response = array();
$response['files'] = array();

foreach($_FILES as $file) {
	$newFile = array();
	$newFile['name'] = $file['name'][0];
	$newFile['size'] = $file['size'][0];
	$newFile['type'] = $file['type'][0];
	$newFile['error'] = $file['error'][0];
	$newFile['url'] = './uploads/' . $newFile['name'];

    $response['files'][] = $newFile;

	move_uploaded_file($file['tmp_name'][0], $newFile['url']);

}

echo json_encode($response);