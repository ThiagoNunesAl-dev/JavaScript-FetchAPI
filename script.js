let url = "https://5f975ae242706e0016956fcb.mockapi.io/api/categorias";

let inputTituloCategoria = document.querySelector("#inputTituloCategoria");
let inputIdCategoria = document.querySelector("#inputIdCategoria");

let btnCadastrar = document.querySelector("#btnCadastrar");
let btnEditar, btnDeletar;

let corpoTabela = document.querySelector("#corpoTabela");

let linha, colunas;

let editando = false;

const listar = () => {
    fetch(url)
    .then(response => response.json())
    .then(response => preencherTabela(response))
    .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: nyous.suport@gmail.com"));
}

const preencherTabela = (categorias) => {
    corpoTabela.innerHTML = "";

    categorias.forEach(categoria => {
        linha = document.createElement("tr");
        colunas = [document.createElement("td"), document.createElement("td"), document.createElement("td")];
        btnEditar = document.createElement("button");
        btnDeletar = document.createElement("button");

        btnEditar.type = "submit";
        btnDeletar.type = "submit";

        btnEditar.innerHTML = "Editar";
        btnDeletar.innerHTML = "Deletar";

        btnEditar.className = "btn btn-primary";
        btnDeletar.className = "btn btn-danger";

        btnDeletar.style.marginLeft = "10px";

        btnEditar.setAttribute("onclick", "editar(" + categoria.id + ")");
        btnDeletar.setAttribute("onclick", "deletar(" + categoria.id + ")");
        
        colunas[0].innerHTML = categoria.id;
        colunas[1].innerHTML = categoria.titulo;
        colunas[2].appendChild(btnEditar);
        colunas[2].appendChild(btnDeletar);

        for(let c=0; c<3; c++)
            linha.appendChild(colunas[c]);
        corpoTabela.appendChild(linha);
    });
}

const deletar = (id) => {
    fetch(url + "/" + id, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(response => {
        alert("Categoria deletada com sucesso.");
        listar();
    })
    .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: nyous.suport@gmail.com"));
}

const editar = (id) => {
    fetch(url + "/" + id)
    .then(response => response.json())
    .then(response => {
        inputIdCategoria.value = response.id;
        inputTituloCategoria.value = response.titulo;
        editando = true;
        btnCadastrar.innerHTML = "Editar";
    })
    .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: nyous.suport@gmail.com"));
}

btnCadastrar.onclick = (event) => {
    event.preventDefault();

    let categoria = {
        titulo: inputTituloCategoria.value
    }

    let metodo = (inputIdCategoria.value === "" ? "POST" : "PUT");
    let urlPostOuPut = (inputIdCategoria.value === "" ? url : url + "/" + inputIdCategoria.value);

    limparCampos();

    fetch(urlPostOuPut, {
        method: metodo,
        body: JSON.stringify(categoria),
        headers: {
            "content-type": "application/json"
        } 
    })
    .then(response => response.json())
    .then(response => {
        if(metodo==="POST")
            alert("Categoria cadastrada com sucesso.");
        else 
            alert("Categoria editada com sucesso.");
        listar();
    })
    .catch(err => alert(err + ". Mande um email para a nossa equipe de suporte: nyous.suport@gmail.com"));

    if(editando) {
        btnCadastrar.innerHTML = "Cadastrar";
        editando = false;
    }
}

const limparCampos = () => {
    inputIdCategoria.value = "";
    inputTituloCategoria.value = "";
}

window.onload = listar;