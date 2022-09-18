function fechar(elemento){
    document.getElementsByClassName('caixaDeResposta')[0].style.display = 'none';
    document.getElementsByClassName('container1')[0].style.display = 'none';
    document.getElementsByClassName('container2')[0].style.display = 'none';
    document.getElementsByClassName('container3')[0].style.display = 'none';
    document.getElementsByClassName('container4')[0].style.display = 'none';
    document.getElementsByClassName('container5')[0].style.display = 'none';
    document.getElementsByClassName('container6')[0].style.display = 'none';

}

function abrir(elemento){
    fechar();
    document.getElementsByClassName('caixaDeResposta')[0].innerHTML = '';
    document.getElementsByClassName('caixaDeResposta')[0].style.display = 'block';
    document.getElementsByClassName(elemento)[0].style.display = 'block';
    
}

function cadastrarPaciente(){
    
    if(document.getElementById("txt_cpf").value.length == 0){
    document.getElementById("txt_cpf").focus();
        return false
    }
    if(document.getElementById("txt_nome").value.length == 0){
    document.getElementById("txt_nome").focus();
        return false
    }
    if(document.getElementById("txt_idade").value.length == 0){
    document.getElementById("txt_idade").focus();
        return false
    }
    if(document.getElementById("txt_sexo").value.length == 0){
    document.getElementById("txt_sexo").focus();
        return false
    }

    let tokem = window.localStorage.getItem('tokem');
    let cpf = document.getElementById('txt_cpf').value;
    let nomep = document.getElementById('txt_nome').value;
    let idade = document.getElementById('txt_idade').value;
    let sexo = document.getElementById('txt_sexo').value;
    
    let form = document.createElement('form');
    form.innerHTML = '<input name="tokem" id="tokem" value='+tokem+'><input name="txt_nome" value='+nomep+'><input name="txt_cpf" value='+cpf+'><input name="txt_idade" value='+idade+'><input name="txt_sexo" value='+sexo+'>'; 
    
    fetch('./Servidor/cadastrar_paciente.php', {
        method : "POST",
        body: new FormData(form),
        
        }).then(
            response => response.text() 
        ).then(
            resposta => {

                abrir('caixaDeResposta');
                if(resposta != '1' ){

                    document.getElementsByClassName('caixaDeResposta')[0].innerHTML = 'Ops, ' + resposta;

                }else{

                    document.getElementsByClassName('caixaDeResposta')[0].innerHTML = 'Paciente cadastrado com sucesso';

                    document.getElementById('txt_cpf').value = '';
                    document.getElementById('txt_nome').value = '';
                    document.getElementById('txt_idade').value = '';
                    document.getElementById('txt_sexo').value = '';

                }
            }
    );
    form.remove();
    
}

function buscarPaciente(remover){
    let cpf = '';
    if (remover) {
        cpf = document.getElementById('Rbtxt_cpf').value;
    }else{
        cpf = document.getElementById('Btxt_cpf').value;
    }

    let tokem = window.localStorage.getItem('tokem');
    let form = document.createElement('form');
    form.innerHTML = '<input name="tokem" id="tokem" value='+tokem+'><input name="txt_cpf" value='+cpf+'>'; 
    
    fetch('./Servidor/buscar_paciente.php', {
        method : "POST",
        body: new FormData(form),
        
        }).then(
            response => response.text() 
        ).then(
            resposta => {

                console.log(resposta);
                console.log(resposta.split(/%/g));
                console.log(resposta.split(/%/g).length);

                if (resposta.split(/%/g).length != 4) {

                    document.getElementsByClassName('caixaDeResposta')[0].innerHTML = 'Ops, paciente não encontrado';
                    cpf.value = '';

                }else{

                    let nomep = resposta.split(/%/g)[1];
                    let cpf = resposta.split(/%/g)[0];
                    let idade = resposta.split(/%/g)[2];
                    let sexo =resposta.split(/%/g)[3];

                if (remover) {

                    abrir('container6');
                    document.getElementById('Rtxt_cpf').value = cpf;
                    document.getElementById('Rtxt_nome').value = nomep;
                    document.getElementById('Rtxt_idade').value = idade;
                    document.getElementById('Rtxt_sexo').value = sexo;
                    
                }else{
                    abrir('container3');
                    editarPaciente(cpf, nomep, idade, sexo);
                }

                }

            }
    );
    form.remove();
    
}

function  editarPaciente(cpf, nomep, idade, sexo) {

    console.log(cpf, nomep, idade, sexo);

    document.getElementById('Etxt_cpf').value = cpf;
    document.getElementById('Etxt_nome').value = nomep;
    document.getElementById('Etxt_idade').value = idade;
    document.getElementById('Etxt_sexo').value = sexo;
}

function  editarPacienteEnviar(){

    if(document.getElementById("Etxt_cpf").value.length == 0){
    document.getElementById("Etxt_cpf").focus();
        return false
    }
    if(document.getElementById("Etxt_nome").value.length == 0){
    document.getElementById("Etxt_nome").focus();
        return false
    }
    if(document.getElementById("Etxt_idade").value.length == 0){
    document.getElementById("Etxt_idade").focus();
        return false
    }
    if(document.getElementById("Etxt_sexo").value.length == 0){
    document.getElementById("Etxt_sexo").focus();
        return false
    }

    let nomep = document.getElementById('Etxt_nome').value;
    let cpf = document.getElementById('Etxt_cpf').value;
    let idade = document.getElementById('Etxt_idade').value;
    let sexo = document.getElementById('Etxt_sexo').value;

    let tokem = window.localStorage.getItem('tokem');
    let form = document.createElement('form');
    form.innerHTML = '<input name="tokem" id="tokem" value='+tokem+'><input name="txt_nome" value='+nomep+'><input name="txt_cpf" value='+cpf+'><input name="txt_idade" value='+idade+'><input name="txt_sexo" value='+sexo+'>'; 

    
    fetch('./Servidor/atualizar_paciente.php', {
        method : "POST",
        body: new FormData(form),
        
        }).then(
            response => response.text() 
        ).then(
            resposta => {

                document.getElementsByClassName('container3')[0].style.display = 'none';

                if (resposta = 'Atualizou') {

                    document.getElementsByClassName('caixaDeResposta')[0].innerHTML = 'Paciente atualizado com sucesso';
                    
                }else{

                    document.getElementsByClassName('caixaDeResposta')[0].innerHTML = 'Ops, paciente não atualizado';

                }

            }
    );
    form.remove();

    
}

function mostrarPacientes() {
    abrir("container4");
    let tokem = window.localStorage.getItem('tokem');
    let container4 = document.getElementsByClassName("formPaci")[0];
    
    let form2 = document.createElement('form');
    form2.innerHTML = '<input name="tokem" id="tokem" value='+tokem+'>';

    fetch('./Servidor/mostrar_pacientes.php', {
        method : "POST",
        body: new FormData(form2),
        
        }).then(
            response => response.text() 
        ).then(
            resposta => {

                if (resposta != 'Não encontrado') {
                let lista = resposta.split(/&&/g);
                let form='';
                for(let i = 0; i < lista.length-1; i++) {

                    let temp = lista[i].split(/%/g);
                    form+='<h2>Paciente '+ (i+1) + ' - ' +temp[1]+'</h2> <form action="medico_logado.php" method="get" id="formcadas"><input required type="number" class="email" placeholder="CPF" name="txt_cpf" value="'+temp[0]+'" disabled=""><br/><input required type="text" class="pwd" placeholder="NOME" name="txt_nome" value="'+temp[1]+'" disabled=""><br/><input required type="number" class="pwd" placeholder="IDADE" name="txt_idade" value="'+temp[2]+'" disabled=""><br/><input required type="text" class="pwd" placeholder="SEXO" name="txt_sexo" value="'+temp[3]+'" disabled=""></form><br><br><br><br/>'
                    
                }

                container4.innerHTML = form;
                }else{
                    document.getElementsByClassName('caixaDeResposta')[0].innerHTML = 'Ops, você não tem paciente cadastrado';
                }
                    

            }
    );
    form2.remove();

}

function removerPaciente() {

    let cpf = document.getElementById('Rbtxt_cpf').value;
        
    let tokem = window.localStorage.getItem('tokem');
    let form = document.createElement('form');
    form.innerHTML = '<input name="tokem" id="tokem" value='+tokem+'><input name="txt_cpf" value='+cpf+'>'; 
    
    fetch('./Servidor/remover_paciente.php', {
        method : "POST",
        body: new FormData(form),
        
        }).then(
            response => response.text() 
        ).then(
            resposta => {

                document.getElementsByClassName('container6')[0].style.display = 'none';
                if (resposta == 'Ops') {
                    document.getElementsByClassName('caixaDeResposta')[0].innerHTML = 'Ops, não possivel remover';
                }else{
                    document.getElementsByClassName('caixaDeResposta')[0].innerHTML = 'Paciente removido com sucesso';
                }

            }
    );
    form.remove();  
    
}

function sair() {
    window.localStorage.setItem('tokem','');
    window.location.replace("./");
}

function naoClique() {
    window.location.replace("./Hackeando/Roubando/");
}

window.onload = function bemVindo() {
    let tokem = window.localStorage.getItem('tokem');
    let form2 = document.createElement('form');
    form2.innerHTML = '<input name="tokem" id="tokem" value='+tokem+'>';

    fetch('./Servidor/bemVindo.php', {
        method : "POST",
        body: new FormData(form2),
        
        }).then(
            response => response.text() 
        ).then(
            resposta => {

                document.getElementById('titulo').innerHTML = 'Seja bem vindo ' + resposta;
            }
    );
    form2.remove();

}