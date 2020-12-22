var tbody = document.querySelector('table tbody') /* tbody está dentro do table*/
var aluno = {};

function Cadastrar() {

    aluno.Nome = document.querySelector('#nome').value;
    aluno.Sobrenome = document.querySelector('#sobrenome').value;
    aluno.Telefone = document.querySelector('#telefone').value;
    aluno.Ra = document.querySelector('#ra').value;

    console.log(aluno) //apagar

    if (aluno.Id === undefined || aluno.Id === 0) {
        SalvarEstudantes('POST', 0, aluno);
    } else {

        SalvarEstudantes('PUT', aluno.Id, aluno)
    }
    CarregarEstudantes();
    $('#myModal').modal('hide')
}



function NovoAluno() {
    var btnSalvar = document.querySelector('#btnSalvar')
    var tituloModal = document.querySelector('#tituloModal')
    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';

    aluno = {};

    btnSalvar.textContent = 'Cadastrar';

    tituloModal.textContent = 'Cadastrar Aluno';

    $('#myModal').modal('show')
}

function Cancelar() {
    var btnSalvar = document.querySelector('#btnSalvar')
    var tituloModal = document.querySelector('#tituloModal')
    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';

    aluno = {};

    btnSalvar.textContent = 'Cadastrar';

    tituloModal.textContent = 'Cadastrar Aluno';

    $('#myModal').modal('hide')
}


function CarregarEstudantes() {
    tbody.innerHTML = '';

    var xhr = new XMLHttpRequest();

    xhr.open('GET', `https://localhost:44314/api/Aluno`, true);

    xhr.onload = function() {
        var estudantes = JSON.parse(this.responseText);
        for (var indice in estudantes) {

            AdicionaLinha(estudantes[indice]);
        }
    }

    xhr.send();
}

function SalvarEstudantes(metodo, id, corpo) {
    var xhr = new XMLHttpRequest();

    if (id === undefined || id === 0) {
        id = '';
    }

    xhr.open(metodo, `https://localhost:44314/api/Aluno/${id}`, false);

    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(corpo)); //transforma o json em string

}

CarregarEstudantes();

function EditarEstudante(estudante) {
    var btnSalvar = document.querySelector('#btnSalvar')
    var tituloModal = document.querySelector('#tituloModal')
    document.querySelector('#nome').value = estudante.Nome;
    document.querySelector('#sobrenome').value = estudante.Sobrenome;
    document.querySelector('#telefone').value = estudante.Telefone;
    document.querySelector('#ra').value = estudante.Ra;

    btnSalvar.textContent = 'Salvar';

    tituloModal.textContent = `Editando Aluno ${estudante.Nome}`;

    aluno = estudante;
    console.log(aluno) //apagar

}



function DeletarEstudante(id) {
    var xhr = new XMLHttpRequest();

    xhr.open('DELETE', `https://localhost:44314/api/Aluno/${id}`, false);

    xhr.send();

}

function ExcluirEstudante(estudante) {

    bootbox.confirm(`Tem certeza que deseja excluir o estudante ${estudante.Nome} ?`, function(result) {
        console.log('This was logged in the callback: ' + result);
        if (result == true) {
            DeletarEstudante(estudante.Id);
            CarregarEstudantes();
        }
    });


}


function AdicionaLinha(estudante) {
    var trow = `<tr>
                    <td>${estudante.Nome}</td>
                    <td>${estudante.Sobrenome}</td>
                    <td>${estudante.Telefone}</td>
                    <td>${estudante.Ra}</td>
                    <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal"  onclick='EditarEstudante(${JSON.stringify(estudante)})'>Editar</button>
                    <button class="btn btn-danger" onclick='ExcluirEstudante(${JSON.stringify(estudante)})'>Deletar</button>
                    </td>
                </tr>
                `
    tbody.innerHTML += trow;
}