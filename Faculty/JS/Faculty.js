const wrappers = document.querySelectorAll(".wrapper");

wrappers.forEach((wrapper, index) => {
    const carousel = wrapper.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = wrapper.querySelectorAll("i");

    const carouselChildrens = [...carousel.children];
    const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    const totalCards = carouselChildrens.length;
    const totalRows = Math.ceil(totalCards / cardPerView);

    for (let i = 0; i < totalRows; i++) {
        const start = i * cardPerView;
        const end = Math.min(start + cardPerView, totalCards);

        const rowCards = carouselChildrens.slice(start, end);
        rowCards.forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });
    }

    // Remove the original cards from the carousel
    carouselChildrens.forEach(card => {
        card.remove();
    });

    carousel.scrollLeft = 0; // Set initial scroll position to the beginning

    carousel.classList.add("no-transition");
    carousel.classList.remove("no-transition");

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const scrollAmount = firstCardWidth;
            const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
            if (btn.id.startsWith("left")) {
                carousel.scrollLeft -= scrollAmount;
                if (carousel.scrollLeft < 0) {
                    carousel.scrollLeft = 0;
                }
            } else {
                carousel.scrollLeft += scrollAmount;
                if (carousel.scrollLeft > maxScroll) {
                    carousel.scrollLeft = maxScroll;
                }
            }
        });
    });

    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    });

    wrapper.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
    });

    wrapper.addEventListener("mouseleave", () => {
        autoPlay();
    });
});
// Add event listener to all "Download CV" buttons
// Add event listener to all "Download CV" buttons
// Add event listener to all "Download CV" buttons
document.querySelectorAll('.download-cv-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Get the path to the PDF file from the data-pdf attribute of the clicked button
        const pdfUrl = button.getAttribute('data-pdf');

        // Create an anchor element to trigger download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.target = '_blank';
        link.download = 'CV.pdf'; // Set the default download filename

        // Trigger click event to start download
        link.click();
    });
});

document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const expandedContent = card.querySelector('.expanded-content');

        // Create expanded card element
        const expandedCard = document.createElement('div');
        expandedCard.classList.add('expanded-card');

        // Copy content from original card to expanded card
        const cloneContent = card.cloneNode(true);
        cloneContent.classList.remove('card');
        expandedCard.appendChild(cloneContent);

        // Append expanded card to body
        document.body.appendChild(expandedCard);

        // Show expanded card
        expandedCard.classList.remove('hidden');

        // Close expanded card when clicked outside
        expandedCard.addEventListener('click', () => {
            expandedCard.classList.add('hidden');
            setTimeout(() => {
                expandedCard.remove();
            }, 300); // Delay removing expanded card to allow for transition
        });

        // Prevent click propagation inside expanded card
        expandedContent.addEventListener('click', event => {
            event.stopPropagation();
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const menuToggles = document.querySelectorAll('.menu-toggle');

    menuToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const navMenu = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.hidden = isExpanded;
        });
    });
});
