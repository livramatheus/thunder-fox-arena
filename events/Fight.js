export default class Fight {

    constructor(Player1, Player2, Stage) {
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.Stage   = Stage;
        this.timerId = null;
        this.timer   = 10;

        Player1.changePosition('left');
        this.decreaseTimer();
    }

    checkWinner() {
        clearTimeout(this.timerId);
        const displayText = document.querySelector("#display-text");
        displayText.style.display = 'flex';
    
        if (this.Player1.health > this.Player2.health) return displayText.innerHTML = 'Player 1 Wins';
        if (this.Player1.health < this.Player2.health) return displayText.innerHTML = 'Player 2 Wins';
        return displayText.innerHTML = 'Draw';
    }

    decreaseTimer() {
        if (this.timer > 0) {
            this.timer -= 1;
            document.querySelector("#timer").innerHTML = this.timer;
    
            this.timerId = setTimeout(() => {
                this.decreaseTimer();
            }, 1000);
        } else {
            this.checkWinner();
        }
    }

}