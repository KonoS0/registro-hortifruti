document.addEventListener('DOMContentLoaded', () => {
    const produtoInput = document.getElementById('produto');
    const quantidadeInput = document.getElementById('quantidade');
    const medidaSelect = document.getElementById('medida');
    const adicionarBtn = document.getElementById('adicionar-btn');
    const verTabelaBtn = document.getElementById('ver-tabela-btn');
    const produtosList = document.getElementById('produtos-list');

    // Dados dos produtos
    const produtos = {
        legumes: ["Abóbora Italiana KG | 6778-2",
                "Abóbora Jacaré KG | 5873-5",
                "Abóbora Maranhão KG | 32864-7",
                "Abóbora Menina KG | 6782-9",
                "Abóbora Moranga KG | 9021-7",
                "Abóbora Moranga Japonesa KG | 6785-0",
                "Abobrinha Jacarezinho Redonda KG | 32852-4",
                "Alho Granel KG | 4643-5",
                "Batata Asterix KG | 7914-3",
                "Batata Baroa KG | 380683-8",
                "Batata Bolinha KG 7887-0",
                "Batata Doce Branca KG | 3781-5",
                "Batata Doce Roxa | 6723-2",
                "Batata Inglesa KG | 6724-9",
                "Berinjela KG | 6725-6",
                "Beterraba KG | 6726-3",
                "Cara/Inhame KG | 6733-1",
                "Cebola Amarela | 6741-6",
                "Cebola Roxa KG | 6743-0",
                "Cenoura Vermelha KG | 6745-4",
                "Chuchu KG | 6749-2",
                "Couve Flor UN | 378-0",
                "Gengibre KG | 115-1",
                "Mandioca KG | 196-0",
                "Pepino KG | 244-8",
                "Pimentão Amarelo/Vermelho KG | 19993-3",
                "Pimentão Verde KG | 253-0",
                "Tomate Italiano KG | 7131-4",
                "Tomate Longa Vida KG | 6424-8",
            ],
        frutas: ["Abacate Avocado KG | 20963-2",
                "Abacate KG | 6769-0",
                "Abacaxi UN | 3044-1",
                "Ameixa Importada KG | 6817-8",
                "Ameixa Nacional KG | 29566-6",
                "Banana Caturra KG | 6719-5",
                "Banana Maçã KG | 6720-1",
                "Banana Ouro KG | 2839-4",
                "Banana Prata KG | 6721-8",
                "Banana da Terra KG | 6814-7",
                "Caja Manga KG | 867-9",
                "Caqui Fuiu KG | 101-4",
                "Caqui Rama Forte KG | 29399-0",
                "Carambola KG | 72962-6",
                "Coco Seco KG | 6750-8",
                "Goiaba Vermelha KG | 3317-6",
                "Kiwi Importado KG | 127-4",
                "Kiwi Nacional KG | 7931-0",
                "Laranja Bahia KG | 136-6",
                "Laranja Lima KG | 29091-3",
                "Laranja Pera Rio KG | 137-3",
                "Limão KG | 139-7",
                "Maçã Argentina/Chilena KG | 188-5",
                "Maçã Gran Smith KG | 6519-1",
                "Maçã Nacional Gala KG | 191-5",
                "Maçã Nacional Fuji KG | 190-8",
                "Maçã Pink Lady KG | 27547-7",
                "Mamão Formosa KG | 193-9",
                "Mamão Havai KG | 194-6",
                "Manga Espada KG | 6434-7",
                "Manga Palmer KG | 876-1",
                "Manga Rosa KG | 29136-1",
                "Manga Tomy KG | 197-7",
                "Maracujá Azedo KG | 198-4",
                "Melancia Baby KG | 80909-2",
                "Melancia KG | 201-1",
                "Melancia Pingo Doce KG | 27208-7",
                "Melão Amarelo KG | 202-8",
                "Melão Andino KG | 29166-8",
                "Melão Dino KG | 32921-7",
                "Melão Orange KG | 1454-0",
                "Melão Pele de Sapo KG | 29517-8",
                "Melão Rey | 21240-3",
                "Mexerica Carioca KG | 3503-3",
                "Mexerica Murcote KG | 5610-6",
                "Mexerica Ponkan KG | 203-5",
                "Nectarina Nacional KG | 7941-9",
                "Nectarina Importada KG | 235-6",
                "Pêra D'anjou KG | 70791-6",
                "Pêra Forelles KG | 24430-5",
                "Pêra Importada KG | 29125-3",
                "Pêra KG | 246-2",
                "Pêra Portuguesa KG | 1804-3",
                "Pera Williams KG | 16721-5",
                "Pêssego Importado KG | 525-8",
                "Pêssego Nacional KG | 377-3",
                "Pitaia KG | 25664-3"
            ],
        verduras:["Repolho Roxo KG | 336-0",
                "Repolho Verde KG | 335-3",
            ]
    };

    // Preencher a datalist com os produtos
    function preencherProdutos() {
        produtosList.innerHTML = '';
        const categorias = Object.keys(produtos);
        categorias.forEach(categoria => {
            produtos[categoria].forEach(produto => {
                const option = document.createElement('option');
                option.value = produto;
                produtosList.appendChild(option);
            });
        });
    }

    preencherProdutos();

    // Função para salvar os dados no Local Storage
    function salvarDados(dados) {
        localStorage.setItem('registrosPerdas', JSON.stringify(dados));
    }

    // Função para carregar os dados do Local Storage
    function carregarDados() {
        const dadosSalvos = localStorage.getItem('registrosPerdas');
        return dadosSalvos ? JSON.parse(dadosSalvos) : {};
    }

    adicionarBtn.addEventListener('click', () => {
        const produto = produtoInput.value.trim();
        const quantidade = parseFloat(quantidadeInput.value);
        const medida = medidaSelect.value;

        if (!produto || quantidade <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        let registros = carregarDados();
        // Cria uma chave única para o produto e a medida
        const chave = `${produto}-${medida}`;
        
        // Verifica se o produto já existe e soma a quantidade
        if (registros[chave]) {
            registros[chave].quantidade += quantidade;
        } else {
            registros[chave] = {
                produto: produto,
                quantidade: quantidade,
                medida: medida
            };
        }

        salvarDados(registros);
        alert('Dados adicionados com sucesso!');
        produtoInput.value = '';
        quantidadeInput.value = '1';
    });

    verTabelaBtn.addEventListener('click', () => {
        window.location.href = 'tabela.html';
    });
});