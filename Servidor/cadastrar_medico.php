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

$crm = $_POST["txt_crm"];
$nome = $_POST["txt_nome"];
$usuario = $_POST["txt_usuario"];
$senha = $_POST["txt_senha"];

// ---------------------------------

$query = "SELECT * FROM medico WHERE usuario = '$usuario' or crm = '$crm'";
$result_query = mysqli_query($conn, $query); 
if(mysqli_num_rows($result_query) > 0){
    
  echo 'Ops';
  exit;

}else{

    $sql = "INSERT INTO medico (crm, nome, especialidade, usuario, senha) VALUES ('$crm','$nome', 'medico', '$usuario', '$senha')";

    if (mysqli_query($conn, $sql)) {
        // echo "<br><h1>Cadastro realizado com sucesso</h1>";

        echo 'Cadastrado';
        exit;
    }

}

mysqli_close($conn);

?>


