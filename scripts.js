const fs = require('fs');
const path = require('path');

// Caminho para salvar os dados
const dadosPath = path.join(__dirname, 'dados.json');

// Função para carregar os dados ao iniciar o programa
function carregarDados() {
    try {
        const dados = fs.readFileSync(dadosPath, 'utf-8');
        const bancadas = JSON.parse(dados);

        // Adicionar os itens da lista carregados
        bancadas.forEach(bancada => adicionarItemNaLista(bancada.numero, bancada.variedade));
    } catch (error) {
        console.log('Nenhum estado salvo encontrado. Iniciando com uma lista vazia.');
    }
}

// Função para salvar os dados
function salvarDados() {
    const lista = document.querySelectorAll('#bancadaLista li');
    const bancadas = Array.from(lista).map(item => {
        // Extrair texto sem incluir o botão "Remover"
        const texto = item.textContent.replace('Remover', '').trim(); // Remove o "Remover"
        const [numeroTexto, variedadeTexto] = texto.split('|').map(t => t.trim());
        const numero = numeroTexto.split(': ')[1];
        const variedade = variedadeTexto.split(': ')[1];
        return { numero, variedade };
    });
    fs.writeFileSync(dadosPath, JSON.stringify(bancadas, null, 2));
}

// Modifique a função de adicionar para também salvar os dados
function adicionarBancada() {
    const numeroBancada = document.getElementById("bancada").value;
    const variedade = document.getElementById("variedade").value;

    if (numeroBancada && variedade) {
        adicionarItemNaLista(numeroBancada, variedade);
        salvarDados();
        document.getElementById("bancadaForm").reset();
    } else {
        alert("Preencha todos os campos.");
    }
}

// Função que cria e adiciona o item na lista com botão de remover
function adicionarItemNaLista(numero, variedade) {
    const listaItem = document.createElement("li");
    listaItem.textContent = `Número da Bancada: ${numero} | Variedades Enxertadas: ${variedade}`;
    
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";

    botaoRemover.onclick = function() {
        listaItem.remove();
        salvarDados(); // Salvar o estado após remover
    };

    listaItem.appendChild(botaoRemover);
    document.getElementById("bancadaLista").appendChild(listaItem);
}

// Carregar dados ao iniciar o programa
window.onload = carregarDados;

