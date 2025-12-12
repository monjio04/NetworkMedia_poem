/* main.js */

document.addEventListener("DOMContentLoaded", () => {
    // 1. 요소 선택
    const paperContainer = document.getElementById("paperContainer");
    const instructionText = document.querySelector(".instruction");
    const papers = document.querySelectorAll(".paper");
    
    // 상태 변수
    let isScattered = false;      
    let isTextShown = false;      
    let isScrolling = false;      

    // 2. 스크롤 이벤트 감지
    window.addEventListener("scroll", () => {
        // 왼쪽 긴 선이 끝나는 지점 (약 900px 근처)
        const triggerPoint = 850; 

        if (window.scrollY > triggerPoint && !isTextShown && !isScrolling) {
            triggerTextAnimation();
        }
    });

    // 3. 텍스트 등장 및 스크롤 잠금 애니메이션 함수
    function triggerTextAnimation() {
        isTextShown = true;
        isScrolling = true;

        // 1단계: 현재 위치에서 스크롤 즉시 잠금 & 텍스트 페이드인
        document.body.style.overflow = 'hidden'; 
        instructionText.classList.add('fade-in'); 

        // 2단계: 2초 동안 텍스트 감상 (CSS transition 시간과 동일)
        setTimeout(() => {
            // 3단계: 잠금 해제 및 종이 등장
            document.body.style.overflow = 'auto'; 
            isScrolling = false;
            
            if (!isScattered) {
                triggerScatterEffect();
            }

        }, 2000); 
    }

    // 4. 종이 흩뿌리기 함수
    function triggerScatterEffect() {
        isScattered = true;
        paperContainer.classList.add("scattered");
    }

    // 5. 종이 마우스 인터랙션 및 클릭 이벤트
    papers.forEach(paper => {
        // [기존] 마우스 움직임 효과
        paper.addEventListener("mousemove", (e) => {
            if (!isScattered) return;
            const rect = paper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const moveX = deltaX * 0.3;
            const moveY = deltaY * 0.3;
            paper.style.setProperty("--x", `${moveX}px`);
            paper.style.setProperty("--y", `${moveY}px`);
        });

        // [기존] 마우스 나갔을 때 초기화
        paper.addEventListener("mouseleave", () => {
            paper.style.setProperty("--x", "0px");
            paper.style.setProperty("--y", "0px");
        });

        // [추가] 클릭 시 페이지 이동
        paper.addEventListener("click", () => {
            // 종이가 흩뿌려진 상태일 때만 클릭 가능
            if (isScattered) {
                // 1. 화면이 서서히 사라지는 CSS 효과 실행 (페이드 아웃)
                document.body.classList.add('move-next');

                // 2. 0.5초(CSS transition 시간) 뒤에 실제로 페이지 이동
                setTimeout(() => {
                    window.location.href = '/poetry/poetry1.html';
                }, 500);
            }
        });
    });
});