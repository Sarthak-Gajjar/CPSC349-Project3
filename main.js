let board = document.getElementsByClassName('tile');

let ways_to_win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let player1 = 'X';
let player2 = 'O';
let turn = 0;
let total_rows = 8;

for (let i = 0; i < board.length; i++) {
    board[i].addEventListener('click', (e) => {
        if (turn == 0) {
            board[i].textContent = player1;
            check_winner()
            turn = 1;
        }
        else {
            board[i].textContent = player2;
            check_winner()
            turn = 0;
        }
    })
}


function check_winner() {
    var win = false;
    var playerSelections = new Array();

    if (currentPlayer == 0)
        playerSelections = player1;
    else
	playerSelections = player2;
    
    if (playerSelections.length >= size) {
       
        // check if any 'winners' are also in your selections 
        for (i = 0; i < winners.length; i++) {
            var sets = winners[i];  // winning hand
            var setFound = true;
            
            for (r = 0; r < sets.length; r++) {
                // check if number is in current players hand
                // if not, break, not winner
                var found = false;
                
                // players hand
                for (s = 0; s < playerSelections.length; s++) {
                    if (sets[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }

                // value not found in players hand
                // not a valid set, move on
                if (found == false) {
                    setFound = false;
                    break;
                }
            }

            if (setFound == true) {
                win = true;
                break;
            }
        }
    }

    return win;
};
