document.addEventListener('DOMContentLoaded', () => {
    const tabelaCorpo = document.getElementById('tabela-corpo');
    const voltarBtn = document.getElementById('voltar-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Função para carregar os dados do Local Storage
    function carregarDados() {
        const dadosSalvos = localStorage.getItem('registrosPerdas');
        return dadosSalvos ? JSON.parse(dadosSalvos) : {};
    }

    // Função para renderizar a tabela
    function renderizarTabela() {
        const registros = carregarDados();
        tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de preencher

        if (Object.keys(registros).length === 0) {
            tabelaCorpo.innerHTML = '<tr><td colspan="3">Nenhum registro encontrado.</td></tr>';
            return;
        }

        // Iterar sobre os registros e criar as linhas da tabela
        for (const chave in registros) {
            const registro = registros[chave];
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${registro.produto}</td>
                <td>${registro.quantidade}</td>
                <td>${registro.medida}</td>
            `;
            tabelaCorpo.appendChild(tr);
        }
    }

    // 2. Adicionar o listener de evento para o botão de reset
    resetBtn.addEventListener('click', () => {
        // Pedir confirmação para o usuário
        const confirmar = confirm("Tem certeza que deseja limpar todos os registros de perdas?");
        if (confirmar) {
            localStorage.removeItem('registrosPerdas'); // 3. Remover os dados do Local Storage
            renderizarTabela(); // 4. Atualizar a tabela para refletir a mudança
            alert("Tabela limpa com sucesso!");
        }
    });

    renderizarTabela();

    voltarBtn.addEventListener('click', () => {
        window.location.href = 'main.html';
    });
});