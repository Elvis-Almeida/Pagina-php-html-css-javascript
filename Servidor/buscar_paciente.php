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

$tokem = $_POST['tokem'];
$cpf = $_POST['txt_cpf'];

// ---------------------------------

$query = "SELECT * FROM tokem WHERE tokem = '$tokem'";
$result_query = mysqli_query($conn, $query); 
if(mysqli_num_rows($result_query) > 0){

    while ($row = $result_query->fetch_assoc()) {
        $usuario = $row['usuario'];
    }

    $query = "SELECT * FROM medico WHERE usuario = '$usuario'";
    $result_query = mysqli_query($conn, $query); 
    if(mysqli_num_rows($result_query) > 0){
        while ($row = $result_query->fetch_assoc()) {
            $senha = $row['senha'];
        }
        // echo 'acesso permitido';
    }else {
        // echo 'null';
    }

}
else {
    // echo 'null';
    exit;
}

$query = "SELECT * FROM paciente WHERE cpf = '$cpf' and medico = '$usuario'";
$result_query = mysqli_query($conn, $query); 
if(mysqli_num_rows($result_query) > 0){
while ($row = $result_query->fetch_assoc()) {
    echo $row['cpf'].'%'.$row['nome'].'%'.$row['idade'].'%'.$row['sexo'];
}
}
else {
    echo 'Não encontrado';
}
    
mysqli_close($conn);

?>

