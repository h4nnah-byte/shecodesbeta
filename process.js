
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded fired. Initializing script.");

    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    const sections = document.querySelectorAll('.game-screen');
    const waypoints = document.querySelectorAll('.waypoint');
    const progressIndicator = document.querySelector('.progress-indicator');

    console.log("Prev Button:", prevButton);
    console.log("Next Button:", nextButton);
    console.log("Sections found:", sections.length, sections);
    console.log("Waypoints found:", waypoints.length, waypoints);

    let currentStop = 0;
    const totalStops = sections.length;

    console.log("Initial currentStop:", currentStop);
    console.log("Total stops:", totalStops);

    const updateDisplay = () => {
        console.log("updateDisplay called. currentStop:", currentStop);

        // Update sections visibility
        sections.forEach((section, index) => {
            if (index === currentStop) {
                section.classList.remove('hidden');
                section.classList.add('current-stop'); // Add for current active section styling if needed
                console.log(`Showing section: ${section.id}`);
            } else {
                section.classList.add('hidden');
                section.classList.remove('current-stop');
                console.log(`Hiding section: ${section.id}`);
            }
        });

        // Update waypoints active state
        waypoints.forEach((waypoint, index) => {
            if (index === currentStop) {
                waypoint.classList.add('active');
                console.log(`Activating waypoint: ${waypoint.textContent}`);
            } else {
                waypoint.classList.remove('active');
                console.log(`Deactivating waypoint: ${waypoint.textContent}`);
            }
        });

        // Update progress indicator
        if (progressIndicator) {
            progressIndicator.textContent = `STEP ${currentStop + 1} OF ${totalStops}`;
            console.log(`Progress indicator updated to: ${progressIndicator.textContent}`);
        }

        // Update button states
        if (prevButton) {
          prevButton.disabled = currentStop === 0;
        }
        if (nextButton) {
          nextButton.disabled = currentStop === totalStops - 1;
        }
        console.log(`Buttons disabled state: Prev=${prevButton? prevButton.disabled : 'N/A'}, Next=${nextButton? nextButton.disabled : 'N/A'}`);
    };

    const navigate = (direction) => {
        console.log(`Navigate called with direction: ${direction}, currentStop before: ${currentStop}`);
        if (direction === 'next' && currentStop < totalStops - 1) {
            currentStop++;
        } else if (direction === 'prev' && currentStop > 0) {
            currentStop--;
        }
        console.log(`currentStop after navigation logic: ${currentStop}`);
        updateDisplay();
        // Optional: add smooth scroll to top of main content
        document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
    };

    waypoints.forEach(waypoint => {
        waypoint.addEventListener('click', (e) => {
            const stopIndex = parseInt(e.currentTarget.dataset.stop);
            console.log(`Waypoint clicked: ${stopIndex}, currentStop before: ${currentStop}`);
            if (!isNaN(stopIndex)) {
                currentStop = stopIndex;
                console.log(`currentStop updated by waypoint click: ${currentStop}`);
                updateDisplay();
                document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    if (nextButton) {
      nextButton.addEventListener('click', () => navigate('next'));
    }
    if (prevButton) {
      prevButton.addEventListener('click', () => navigate('prev'));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            navigate('next');
        } else if (e.key === 'ArrowLeft') {
            navigate('prev');
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }
    });

    updateDisplay(); // Initial call
});
