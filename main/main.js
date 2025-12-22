/* main.js */

document.addEventListener("DOMContentLoaded", () => {
    // 0. [중요] 데이터가 잘 로드되었는지 확인
    if (typeof poems === 'undefined') {
        console.error("❌ 에러: data_poems.js가 로드되지 않았습니다. HTML을 확인해주세요.");
        // 데이터가 없으면 가짜 데이터라도 만들어서 에러 방지 (선택사항)
        // poems = [{ id: 1 }]; 
        return; 
    }

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
        const triggerPoint = 850; 

        if (window.scrollY > triggerPoint && !isTextShown && !isScrolling) {
            triggerTextAnimation();
        }
    });

    // 3. 텍스트 등장 및 스크롤 잠금 애니메이션 함수
    function triggerTextAnimation() {
        isTextShown = true;
        isScrolling = true;

        document.body.style.overflow = 'hidden'; 
        instructionText.classList.add('fade-in'); 

        setTimeout(() => {
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

    // ============================================================
    // 5. [수정됨] 랜덤 시 배정 및 클릭 이벤트 연결
    // ============================================================

    // (1) 시 목록을 무작위로 섞습니다 (셔플)
    const shuffledPoems = [...poems].sort(() => Math.random() - 0.5);

    papers.forEach((paper, index) => {
        
        // (2) 종이마다 시 하나씩 짝지어주기
        // 시 개수보다 종이가 많을 경우를 대비해 % 연산자 사용 (반복 배정)
        const matchedPoem = shuffledPoems[index % shuffledPoems.length];

        // [기존 유지] 마우스 움직임 효과
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

        // [기존 유지] 마우스 나갔을 때 초기화
        paper.addEventListener("mouseleave", () => {
            paper.style.setProperty("--x", "0px");
            paper.style.setProperty("--y", "0px");
        });

        // [수정됨] 클릭 시 해당 시의 ID를 가지고 페이지 이동
        paper.addEventListener("click", () => {
            // 종이가 흩뿌려진 상태일 때만 클릭 가능
            if (isScattered) {
                // 1. 페이드 아웃 효과
                document.body.classList.add('move-next');

                // 2. 0.5초 뒤 페이지 이동 (랜덤 배정된 ID 사용!)
                setTimeout(() => {
                    // 폴더 구조에 맞춰 경로 설정 (poetry 폴더 안에 있다면 아래 유지)
                    window.location.href = `../poetry/poetry.html?id=${matchedPoem.id}`;
                }, 500);
            }
        });
    });
});