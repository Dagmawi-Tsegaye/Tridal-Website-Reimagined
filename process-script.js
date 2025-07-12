/*
 * =========================================
 * JAVASCRIPT FOR: PROCESS PAGE (WOW FACTOR)
 * =========================================
 * This script handles the interactive animations
 * for the timeline on process.html.
 * =========================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // Select the necessary elements from the DOM.
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.querySelector('.timeline-progress');
    const revealElements = document.querySelectorAll('.timeline .reveal');

    // Do nothing if the timeline element doesn't exist on the page.
    if (!timeline) {
        return;
    }

    // --- ANIMATION 1: Draw the progress line on scroll ---

    const handleScroll = () => {
        // Get the top and height of the entire timeline section.
        const timelineTop = timeline.offsetTop;
        const timelineHeight = timeline.offsetHeight;
        
        // Calculate the starting point for the animation (top of the timeline section).
        const startScroll = timelineTop;
        // Calculate the ending point (bottom of the timeline section).
        const endScroll = timelineTop + timelineHeight;

        // Get the current vertical scroll position of the window.
        const currentScroll = window.pageYOffset;

        // Calculate the user's scroll progress within the timeline section.
        // It's a value from 0 (at the top) to 1 (at the bottom).
        let progress = (currentScroll - startScroll) / (timelineHeight - window.innerHeight);
        
        // Clamp the progress value between 0 and 1 to prevent it from going out of bounds.
        progress = Math.max(0, Math.min(1, progress));

        // Calculate the height the progress bar should have based on the scroll progress.
        const progressHeight = progress * timelineHeight;

        // Apply the calculated height to the progress bar element.
        if (timelineProgress) {
            timelineProgress.style.height = `${progressHeight}px`;
        }
    };

    // --- ANIMATION 2: Reveal content boxes as they enter the view ---

    // Create an Intersection Observer to watch for when elements become visible.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible in the viewport)...
            if (entry.isIntersecting) {
                // ...add the 'is-revealed' class to trigger the CSS animation.
                entry.target.classList.add('is-revealed');
                // Stop observing the element once it has been revealed.
                observer.unobserve(entry.target);
            }
        });
    }, {
        // The animation will trigger when the element is 10% visible.
        threshold: 0.1 
    });

    // Tell the observer to watch each of the timeline containers.
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Add an event listener to run the handleScroll function every time the user scrolls.
    window.addEventListener('scroll', handleScroll);
});