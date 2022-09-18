<?php
try {
    $conn = mysqli_connect("localhost", "root");
} catch (Exception $e) {
    echo 'ops';
    exit;
}

// ---------------------------------

try {
    mysqli_select_db($conn, "hospital");
} catch (\Throwable $th) {
    echo 'ops';
    exit;
}

// ---------------------------------

$usuario = $_POST['txt_usuario'];
$senha = $_POST['txt_senha'];

// ---------------------------------

$query = "SELECT * FROM medico WHERE usuario = '$usuario' and senha = '$senha'";
$result_query = mysqli_query($conn, $query); 
if(mysqli_num_rows($result_query) > 0){

    $tokemDeValidacao = mt_rand();
    $query = "SELECT * FROM tokem WHERE usuario = '$usuario'"; 
    $result_query = mysqli_query($conn, $query);

    if(mysqli_num_rows($result_query) == 0){ //verificando se existe tokem já criado
        $sql = "INSERT INTO tokem(usuario, tokem) VALUES ('$usuario', '$tokemDeValidacao')";
        if (mysqli_query($conn, $sql)) { 
            echo $tokemDeValidacao;
        } 
    }else {
        $sql = "UPDATE tokem SET tokem = '$tokemDeValidacao' WHERE usuario = '$usuario'";
        if (mysqli_query($conn, $sql)) { 
            echo $tokemDeValidacao;
        } 
        
    }
}
mysqli_close($conn);

?>