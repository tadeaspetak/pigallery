!(function (document) {
    const itemClassName = "carousel__photo";
    const items = document.getElementsByClassName(itemClassName);
    const totalItems = items.length;
    let slide = 0;
    let moving = true;

    // To initialise the carousel we'll want to update the DOM with our own classes
    function setInitialClasses() {
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("initial");
        items[0].classList.add("active");
        items[1].classList.add("next");
    }

    // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
    function disableInteraction() {
        moving = true;

        setTimeout(function () {
            moving = false
        }, 500);
    }

    function moveCarouselTo(slide) {

        // Check if carousel is moving, if not, allow interaction
        if (!moving) {

            // temporarily disable interactivity
            disableInteraction();

            // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
            var newPrevious = slide - 1,
                newNext = slide + 1,
                oldPrevious = slide - 2,
                oldNext = slide + 2;

            // Test if carousel has more than three items
            if ((totalItems - 1) >= 3) {

                // Checks if the new potential slide is out of bounds and sets slide numbers
                if (newPrevious <= 0) {
                    oldPrevious = (totalItems - 1);
                } else if (newNext >= (totalItems - 1)) {
                    oldNext = 0;
                }

                // Check if current slide is at the beginning or end and sets slide numbers
                if (slide === 0) {
                    newPrevious = (totalItems - 1);
                    oldPrevious = (totalItems - 2);
                    oldNext = (slide + 1);
                } else if (slide === (totalItems - 1)) {
                    newPrevious = (slide - 1);
                    newNext = 0;
                    oldNext = 1;
                }

                // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.

                // Based on the current slide, reset to default classes.
                items[oldPrevious].className = itemClassName;
                items[oldNext].className = itemClassName;

                // Add the new classes
                items[newPrevious].className = itemClassName + " prev";
                items[slide].className = itemClassName + " active";
                items[newNext].className = itemClassName + " next";

                setTimeout(() => moveNext(), parseInt(items[slide].dataset.time, 10) * 1000);
            }
        }
    }

    // Next navigation handler
    function moveNext() {

        // Check if moving
        if (!moving) {

            // If it's the last slide, reset to 0, else +1
            if (slide === (totalItems - 1)) {
                slide = 0;
            } else {
                slide++;
            }

            // Move carousel to updated slide
            moveCarouselTo(slide);
        }
    }

    // Previous navigation handler
    function movePrev() {

        // Check if moving
        if (!moving) {

            // If it's the first slide, set as the last slide, else -1
            if (slide === 0) {
                slide = (totalItems - 1);
            } else {
                slide--;
            }

            // Move carousel to updated slide
            moveCarouselTo(slide);
        }
    }

    // Initialise carousel
    function initCarousel() {
        setInitialClasses();
        moving = false;
        setTimeout(() => moveNext(), parseInt(items[0].dataset.time, 10) * 1000);
    }

    // make it rain
    initCarousel();

}(document));