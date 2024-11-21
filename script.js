document.addEventListener("DOMContentLoaded", () => {
    const clueItems = document.querySelectorAll(".clue-item");
    const clueText = document.getElementById("clue");
    const finalMessage = document.getElementById("final-message");
    const gameContainer = document.getElementById("game-container");
    const heartGame = document.getElementById("heart-game");

    // Reveal next clue on click
    clueItems.forEach((item, index) => {
        if (index > 0) item.style.visibility = "hidden"; // Hide all but the first

        item.addEventListener("click", () => {
            const message = item.dataset.message;
            clueText.textContent = message;

            if (index < clueItems.length - 1) {
                clueItems[index + 1].style.visibility = "visible";
            } else {
                clueText.hidden = true;
                gameContainer.style.display = "block";  // Show the game container
                startHeartMovement(); // Start the mini-game
            }
        });
    });

    // Random movement for the heart
    function moveHeart() {
        const containerWidth = gameContainer.offsetWidth;
        const containerHeight = gameContainer.offsetHeight;

        const heartSize = heartGame.offsetWidth;

        const randomX = Math.random() * (containerWidth - heartSize);
        const randomY = Math.random() * (containerHeight - heartSize);

        heartGame.style.left = `${randomX}px`;
        heartGame.style.top = `${randomY}px`;
    }

    // Start moving the heart at regular intervals
    function startHeartMovement() {
        moveHeart(); // Initial movement
        setInterval(moveHeart, 1000); // Move every second
    }

    // Winning the game
    heartGame.addEventListener("click", () => {
        // Hide the game container
        gameContainer.style.display = "none";
        clueText.hidden = true; // Hide clue text if still visible

        // Show the final message by changing display to block
        finalMessage.style.display = "block";  // Show final message

        // Confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    });

    // Add stars effect on mousemove
    document.body.addEventListener("mousemove", (e) => {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = `${e.pageX}px`;
        star.style.top = `${e.pageY}px`;
        document.body.appendChild(star);

        setTimeout(() => star.remove(), 1000);
    });
});
