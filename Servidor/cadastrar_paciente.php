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

$tokem =  $_POST['tokem'];
$cpf =    $_POST['txt_cpf'];
$nome =   $_POST['txt_nome'];
$idade =  $_POST['txt_idade'];
$sexo =   $_POST['txt_sexo'];

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
    echo 'null';
    exit;
}

$query = "SELECT * FROM paciente WHERE cpf = '$cpf'";
$result_query = mysqli_query($conn, $query); 
if(mysqli_num_rows($result_query) > 0){
    echo "CPF já cadastrado";
    exit;
}

$sql = "INSERT INTO paciente(cpf, medico, nome, idade, sexo) VALUES ('$cpf','$usuario', '$nome', '$idade', '$sexo')";
if (mysqli_query($conn, $sql)) {
    
    echo '1';

} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
exit;
    
mysqli_close($conn);

?>

