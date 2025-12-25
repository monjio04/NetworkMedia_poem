document.addEventListener("DOMContentLoaded", () => {
    if (typeof poems === 'undefined') {
        console.error("에러: data_poems.js가 로드되지 않았습니다.");
        return; 
    }

    const paperContainer = document.getElementById("paperContainer");
    const instructionText = document.querySelector(".instruction");
    const papers = document.querySelectorAll(".paper");
    
    let isScattered = false;      
    let isTextShown = false;      
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTextShown) {
                triggerTextAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(instructionText);

    function triggerTextAnimation() {
        isTextShown = true;

        document.body.style.overflow = 'hidden'; 
        instructionText.classList.add('fade-in'); 

        setTimeout(() => {
            document.body.style.overflow = 'auto'; 
            
            if (!isScattered) {
                triggerScatterEffect();
            }

        }, 1500); 
    }

    function triggerScatterEffect() {
        isScattered = true;
        paperContainer.classList.add("scattered");
    }

    const shuffledPoems = [...poems].sort(() => Math.random() - 0.5);

    papers.forEach((paper, index) => {
        const matchedPoem = shuffledPoems[index % shuffledPoems.length];

        paper.addEventListener("mousemove", (e) => {
            if (!isScattered) return;
            if (window.matchMedia("(hover: hover)").matches) {
                const rect = paper.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                const moveX = deltaX * 0.3;
                const moveY = deltaY * 0.3;
                paper.style.setProperty("--x", `${moveX}px`);
                paper.style.setProperty("--y", `${moveY}px`);
            }
        });

        paper.addEventListener("mouseleave", () => {
            paper.style.setProperty("--x", "0px");
            paper.style.setProperty("--y", "0px");
        });
        
        paper.addEventListener("click", () => {
            if (isScattered) {
                document.body.classList.add('move-next');
                setTimeout(() => {
                    window.location.href = `/poetry/poetry.html?id=${matchedPoem.id}`;
                }, 500);
            }
        });
    });
});