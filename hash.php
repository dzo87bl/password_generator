<?php
	
	/* security */
	/*if ( !empty( $_SERVER['SCRIPT_FILENAME'] ) && basename( __FILE__ ) == basename( $_SERVER['SCRIPT_FILENAME'] ) ) {
	    die ( 'You do not have sufficient permissions to access this page!' );
	}*/

	/* error reporting */
	error_reporting(E_ALL);
	ini_set('display_errors', 0);

	/* headers */
	header("Cache-Control: no-cache, must-revalidate");
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	
	/* get the q parameter from URL */
	$q = $_GET["q"];
	
	/* variables to return */
	$info = null;
	$error = 0;
	
	/* action */
	foreach (hash_algos() as $v) { 
        $r = hash($v, $q, false); 
        //printf("%-12s %3d %s\n", $v, strlen($r), $r);
		$info .= sprintf(
		'<div class="form-group">
			<label class="col-sm-2 control-label">%-12s</label>
			<div class="col-sm-1">
				%3d
			</div>
			<div class="col-sm-9">
				<p class="form-control-static">%s</p>
			</div>
		</div>', 
		$v, strlen($r), $r
		);
	}
	
	/* debug */
	/*ob_start();
	echo print_r($_REQUEST);
	$data = ob_get_clean();
	$fp = fopen('log.txt', 'w');
	fwrite($fp, $data);
	fclose($fp);*/
	
	/* return variables */
	$ret = array(
		'info' => $info,
		'error' => $error,
	);   
	echo json_encode($ret);

?>