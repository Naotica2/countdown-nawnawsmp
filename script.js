        // Initialize libraries
        AOS.init();
        feather.replace();
        
        // Create sakura petals
        function createSakura() {
            const container = document.getElementById('sakura-container');
            for (let i = 0; i < 15; i++) {
                const sakura = document.createElement('div');
                sakura.classList.add('sakura');
                
                // Random properties
                const size = Math.random() * 20 + 10;
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 10 + 5;
                const delay = Math.random() * 5;
                
                sakura.style.width = `${size}px`;
                sakura.style.height = `${size}px`;
                sakura.style.left = `${left}%`;
                sakura.style.top = `-${size}px`;
                sakura.style.animationDuration = `${animationDuration}s`;
                sakura.style.animationDelay = `${delay}s`;
                
                container.appendChild(sakura);
            }
        }
        
        // Countdown timer with persistent state
        function updateCountdown() {
            const releaseDate = new Date('January 5, 2026 00:00:00').getTime();
            let now = new Date().getTime();
            
            // Check if we have a saved timestamp
            const lastUpdate = localStorage.getItem('lastCountdownUpdate');
            if (lastUpdate) {
                const timePassed = now - parseInt(lastUpdate);
                const savedDistance = parseInt(localStorage.getItem('countdownDistance'));
                
                // Calculate new distance accounting for time passed since last update
                const distance = Math.max(0, savedDistance - timePassed);
                
                // Save current state
                localStorage.setItem('countdownDistance', distance);
                localStorage.setItem('lastCountdownUpdate', now);
                
                // Time calculations
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Display results
                document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
                document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
                document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
                
                // Progress bar calculation (from today to release date)
                const totalDuration = releaseDate - new Date('January 1, 2024 00:00:00').getTime();
                const elapsed = totalDuration - distance;
                const progress = Math.min(100, (elapsed / totalDuration) * 100);
                document.getElementById('progress-bar').style.width = `${progress}%`;
            } else {
                // First time initialization
                const distance = releaseDate - now;
                localStorage.setItem('countdownDistance', distance);
                localStorage.setItem('lastCountdownUpdate', now);
                
                // Time calculations
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Display results
                document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
                document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
                document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
                
                // Progress bar calculation (from today to release date)
                const totalDuration = releaseDate - new Date('January 1, 2024 00:00:00').getTime();
                const elapsed = now - new Date('January 1, 2024 00:00:00').getTime();
                const progress = Math.min(100, (elapsed / totalDuration) * 100);
                document.getElementById('progress-bar').style.width = `${progress}%`;
            }
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createSakura();
            updateCountdown();
            setInterval(updateCountdown, 1000);
            
            // Clear storage if countdown is complete (optional)
            window.addEventListener('beforeunload', () => {
                const distance = localStorage.getItem('countdownDistance');
                if (distance && parseInt(distance) <= 0) {
                    localStorage.removeItem('countdownDistance');
                    localStorage.removeItem('lastCountdownUpdate');
                }
            });
           // Anime.js animation for countdown boxes
            anime({
                targets: '.countdown-box div',
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 1500,
                delay: anime.stagger(200),
                easing: 'easeOutElastic'
            });
        });