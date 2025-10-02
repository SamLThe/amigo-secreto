let listaAmigos = [];


function adicionar() {
    let amigo = document.getElementById('nome-amigo');
    let nomeAmigo = amigo.value.toUpperCase().trim();

    if (nomeAmigo == '') {
        alert('Não é possível adicionar um amigo vazio!');
        amigo.focus();
        return;
    }


    let lista = document.getElementById('lista-amigos');

    if (listaAmigos.includes(nomeAmigo)) {
        alert('Amigo já adicionado!');
        amigo.value = '';
        amigo.focus();
        return;
    }

    listaAmigos.push(nomeAmigo);


    if (lista.textContent == '') {
        lista.textContent = amigo.value;
    } else {
        lista.textContent = lista.textContent + ', ' + amigo.value;
    }


    amigo.value = '';
    amigo.focus();


    atualizarLista();
    apagarSorteio();
}


function sortear() {
    apagarSorteio();
    
    if (listaAmigos.length < 4) {
        alert('Adicione pelo menos 4 amigos para sortear!');
        return;
    }

    embaralhar(listaAmigos);

    let sorteio = document.getElementById('lista-sorteio');
    for (let i = 0; i < listaAmigos.length; i++) {
        sorteio.innerHTML = sorteio.innerHTML + listaAmigos[i] +' --> ' + listaAmigos[(i + 1) % listaAmigos.length] + '<br/>';
    }
    document.getElementById('nome-amigo').focus();
}


function excluirAmigo(posicao) {
    listaAmigos.splice(posicao, 1);
    atualizarLista();
    apagarSorteio();
}


function embaralhar(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}


function apagarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';
}


function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';


    for (let i = 0; i < listaAmigos.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = listaAmigos[i];
       
        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });


        // Adiciona o parágrafo à lista
        lista.appendChild(paragrafo);
    }
}


function reiniciar() {
    listaAmigos = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
    document.getElementById('nome-amigo').value = '';
    document.getElementById('nome-amigo').focus();
}
