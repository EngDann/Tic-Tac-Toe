// Executa o código após o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os quadrados do tabuleiro
    const squares = document.querySelectorAll(".container-main-game button");
    // Elemento para exibir o jogador atual
    let playerDisplay = document.querySelector(".current_player");
    // Define o jogador atual como "X" inicialmente
    let currentPlayer = "X";
    // Mostra qual jogador tem a vez atual
    playerDisplay.textContent = `Current Turn: Player ${currentPlayer}`;
    // Elemento para exibir mensagem ao fim do jogo
    let gameEndMessage = document.querySelector(".phrase_end");
    // Flag para indicar se o jogo terminou
    let isGameOver = false;

    // Adiciona evento de clique em cada quadrado do tabuleiro
    squares.forEach((square) => {
        square.addEventListener("click", handleSquareClick);
    });

    // Função chamada ao clicar em um quadrado
    function handleSquareClick(e) {
        // Se o jogo acabou, não faz nada
        if (isGameOver) return;
        // Converte NodeList para Array para facilitar manipulação
        const squareArray = Array.from(squares);
        // Encontra o índice do quadrado clicado
        const index = squareArray.indexOf(e.target);
        // Checa se o quadrado já está marcado
        if (squareArray[index].textContent === "") {
            // Marca o quadrado com o símbolo do jogador atual
            squareArray[index].textContent = currentPlayer;
            // Verifica se há um vencedor ou se o jogo empatou
            if (checkWinner() || checkDraw()) {
                gameEndMessage.textContent = "Thank you for playing! 🫶";
                isGameOver = true;
            } else {
                // Troca o jogador
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                playerDisplay.textContent = `Current Turn: Player ${currentPlayer}`;
            }
        }
    }

    // Verifica se há um vencedor
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        // Percorre cada combinação de vitória
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            // Checa se o jogador atual venceu
            if (
                squares[a].textContent === currentPlayer &&
                squares[b].textContent === currentPlayer &&
                squares[c].textContent === currentPlayer
            ) {
                playerDisplay.textContent = `Player "${currentPlayer}" wins!`;
                return true; // Retorna verdadeiro se encontrou uma combinação vencedora
            }
        }
        return false; // Retorna falso se não encontrou uma combinação vencedora
    }

    // Verifica se o jogo empatou
    function checkDraw() {
        const squareArray = Array.from(squares);
        // Checa se todos os quadrados estão marcados
        if (squareArray.every((square) => square.textContent)) {
            playerDisplay.textContent = "It's a draw!";
            return true;
        }
        return false;
    }

    // Reseta o jogo para o estado inicial
    function reset() {
        squares.forEach((square) => {
            square.textContent = ""; // Limpa todos os quadrados
        });
        currentPlayer = "X"; // Reseta o jogador inicial para "X"
        playerDisplay.textContent = `Current Turn: Player ${currentPlayer}`; // Atualiza a exibição do jogador atual
        gameEndMessage.textContent = ""; // Limpa a mensagem de fim de jogo
        isGameOver = false; // Indica que o jogo está ativo novamente
    }

    // Seleciona o botão de reset e adiciona evento de clique para resetar o jogo
    let resetButton = document.querySelector(".btn-reset");
    resetButton.addEventListener("click", reset);
});
