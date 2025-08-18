document.addEventListener('DOMContentLoaded', () => {
    const playerOneName = document.getElementById('playerOneName');
    const playerOneNameField = document.getElementById('playerOneNameField');
    const playerOneNameButton = document.getElementById('playerOneNameButton');
    const playerOneScore = document.getElementById('playerOneScore');
    const playerOneAddScore = document.getElementById('playerOneAddScore');
    const playerOneDecreaseScore = document.getElementById('playerOneDecreaseScore');
    
    const playerTwoName = document.getElementById('playerTwoName');
    const playerTwoNameField = document.getElementById('playerTwoNameField');
    const playerTwoNameButton = document.getElementById('playerTwoNameButton');
    const playerTwoScore = document.getElementById('playerTwoScore');
    const playerTwoAddScore = document.getElementById('playerTwoAddScore');
    const playerTwoDecreaseScore = document.getElementById('playerTwoDecreaseScore');

    playerOneNameButton.addEventListener('click', () => {
        playerOneName.classList.toggle('hidden');
        playerOneNameField.classList.toggle('hidden');
        if (!playerOneNameField.classList.contains('hidden')) {
            playerOneNameField.value = playerOneName.textContent;
            playerOneNameField.focus();
            playerOneNameField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    playerOneName.textContent = playerOneNameField.value;
                    playerOneNameField.classList.add('hidden');
                    playerOneName.classList.remove('hidden');
                }
            })
        }
    })

    playerTwoNameButton.addEventListener('click', () => {
        playerTwoName.classList.toggle('hidden');
        playerTwoNameField.classList.toggle('hidden');
        if (!playerTwoNameField.classList.contains('hidden')) {
            playerTwoNameField.value = playerTwoName.textContent;
            playerTwoNameField.focus();
            playerTwoNameField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    playerTwoName.textContent = playerTwoNameField.value;
                    playerTwoNameField.classList.add('hidden');
                    playerTwoName.classList.remove('hidden');
                }
            })
        }
    })

    playerOneAddScore.addEventListener('click', () => {
        let score = parseInt(playerOneScore.textContent, 10);
        if (score < 9) {
            playerOneScore.textContent = "0" + String(score + 1);
        }
        else {
            playerOneScore.textContent = String(score + 1);
        }
    })

    playerOneDecreaseScore.addEventListener('click', () => {
        let score = parseInt(playerOneScore.textContent, 10);
        if (score < 1) {
            return;
        }
        if (score < 9) {
            playerOneScore.textContent = "0" + String(score - 1);
        }
        else {
            playerOneScore.textContent = String(score - 1);
        }
    })

    playerTwoAddScore.addEventListener('click', () => {
        let score = parseInt(playerTwoScore.textContent, 10);
        if (score < 9) {
            playerTwoScore.textContent = "0" + String(score + 1);
        }
        else {
            playerTwoScore.textContent = String(score + 1);
        }
    })

    playerTwoDecreaseScore.addEventListener('click', () => {
        let score = parseInt(playerTwoScore.textContent, 10);
        if (score < 1) {
            return;
        }
        if (score < 9) {
            playerTwoScore.textContent = "0" + String(score - 1);
        }
        else {
            playerTwoScore.textContent = String(score - 1);
        }
    })
})