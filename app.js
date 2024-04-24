
fetch('spill.json')
.then(response => response.json())
.then(dataArray => {
    if (!dataArray || dataArray.length < 4) {
        console.error('Ikke nok data for å spille.');
        return;
    }

    // Set initial scores
    let playerScore = 0;
    let computerScore = 0;

    // Adding event listener to the button
    document.getElementById('Roll').addEventListener('click', function() {
        const maxIndex = dataArray.length - 2; // Excludes the last two items

        // Generate random indexes ensuring they are within the allowed range
        const randomIndexes = {
            yd1: Math.floor(Math.random() * maxIndex),
            yd2: Math.floor(Math.random() * maxIndex),
            cd1: Math.floor(Math.random() * maxIndex),
            cd2: Math.floor(Math.random() * maxIndex)
        };

        // Set images and retrieve numbers
        const ids = ["yd1", "yd2", "cd1", "cd2"];
        let ydSum = 0, cdSum = 0;
        ids.forEach(id => {
            const element = document.getElementById(id);
            const data = dataArray[randomIndexes[id]];
            element.src = data.images;

            // Summing numbers
            if (id.startsWith('yd')) {
                ydSum += data.number;
            } else {
                cdSum += data.number;
            }
        });

        // Compare sums and update scores
        let result;
        if (ydSum > cdSum) {
            result = "Du vant!";
            playerScore++;
        } else if (cdSum > ydSum) {
            result = "Computer vant!";
            computerScore++;
        } else {
            result = "Det ble uavgjort!";
        }

        // Display the result and update the scoreboard
        document.getElementById("result").innerText = "Result: " + result;
        document.getElementById("playerScore").innerText = playerScore;
        document.getElementById("computerScore").innerText = computerScore;
    });
})
.catch(error => console.error('Error loading JSON file:', error));
