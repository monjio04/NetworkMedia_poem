// 현재 보여줄 시의 인덱스
let currentPoemIndex = 0;
// 현재 보여줄 연(문단)의 인덱스
let currentStanzaIndex = 0;
// 애니메이션 중인지 확인
let isAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
    const menuWrapper = document.getElementById('menuWrapper');
    
    // 1. 데이터 로드
    loadPoemData(currentPoemIndex);

    // 2. 애니메이션 스케줄링
    setTimeout(() => {
        if(menuWrapper) menuWrapper.classList.add('slide-up');
    }, 500);

    setTimeout(() => {
        if(menuWrapper) menuWrapper.classList.add('open-book');
        
        setTimeout(() => {
            showTitleAndAuthor();
        }, 3000); // 3초 뒤 제목 등장
    }, 2500);

    // 휠 이벤트 (passive: false로 설정해야 preventDefault 사용 가능)
    window.addEventListener('wheel', handleScroll, { passive: false });
});

function loadPoemData(index) {
    if (typeof poems === 'undefined' || !poems[index]) {
        console.error("데이터를 불러올 수 없습니다.");
        return;
    }

    const poem = poems[index];
    const titleEl = document.getElementById('dispTitle');
    const authorEl = document.getElementById('dispAuthor');

    if (titleEl) titleEl.innerText = poem.title;
    if (authorEl) authorEl.innerText = poem.author;
    
    // 첫 연 렌더링
    renderStanza(poem.stanzas[0]);
    
    // 첫 화면 영상 상태 체크
    checkVideoVisibility(0, poem.stanzas.length);
}

// poetry.js의 showTitleAndAuthor 함수 교체

function showTitleAndAuthor() {
    const header = document.getElementById('poemHeader');
    const bodyContainer = document.getElementById('poemBodyContainer');
    
    // 1. 제목/작가 등장
    if (header) header.classList.add('fade-in');
    
    // 2. 시간차를 두고 본문(1연) 등장할 때 -> Shell도 같이 등장
    setTimeout(() => {
        if (bodyContainer) bodyContainer.classList.add('fade-in');

        // [추가] 1연이 나올 때 shell(조개1)도 같이 페이드인
        const shell1 = document.getElementById('shell-layer-1');
        if (shell1) {
            shell1.classList.add('visible');
        }

    }, 1000); // 1초 뒤 실행
}

// 연(문단) 렌더링 함수
function renderStanza(text) {
    const container = document.getElementById('poemBodyContainer');
    if (!container) return; 
    
    container.innerHTML = ''; 
    
    const explicitLines = text.split('\n');
    const finalRows = [];

    explicitLines.forEach(line => {
        let remainingText = line;
        if (remainingText.length === 0) return; 

        while (remainingText.length > 15) {
            finalRows.push(remainingText.substring(0, 15));
            remainingText = remainingText.substring(15);
        }
        if (remainingText.length > 0) {
            finalRows.push(remainingText);
        }
    });

    const columns = 15;
    const rowWidth = '540px'; 

    const topLine = document.createElement('div');
    topLine.className = 'horizontal-line';
    topLine.style.width = rowWidth;
    container.appendChild(topLine);

    finalRows.forEach(line => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'poem-row';
        rowDiv.classList.add('mode-dense');
        
        const chars = line.split('');

        chars.forEach(char => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (char === ' ') {
                cell.innerHTML = '&nbsp;';
            } else {
                cell.innerText = char;
            }
            rowDiv.appendChild(cell);
        });

        const remainingCells = columns - chars.length;
        if (remainingCells > 0) {
            for (let i = 0; i < remainingCells; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'cell';
                rowDiv.appendChild(emptyCell);
            }
        }

        container.appendChild(rowDiv);
    });

    const bottomLine = document.createElement('div');
    bottomLine.className = 'horizontal-line';
    bottomLine.style.width = rowWidth;
    container.appendChild(bottomLine);

    updateIllustration(currentStanzaIndex);
}

// [핵심 수정] 스크롤 핸들러
function handleScroll(e) {
    e.preventDefault();

    const bodyContainer = document.getElementById('poemBodyContainer');
    // 애니메이션 중이거나, 아직 내용이 안 떴으면 무시
    if (!bodyContainer || !bodyContainer.classList.contains('fade-in') || isAnimating) return;

    const poem = poems[currentPoemIndex];
    const totalStanzas = poem.stanzas.length;

    if (e.deltaY > 0) { 
        // [아래로 휠]
        if (currentStanzaIndex < totalStanzas - 1) {
            // 다음 연으로 넘어감
            changeStanza(currentStanzaIndex + 1);
        } else {
            // [추가] 마지막 연인데 또 내렸다? -> 영수증(메뉴 추천) 발급!
            // script.js에 있는 함수 호출
            if (typeof showResultModal === 'function') {
                showResultModal(poem.title);
            }
        }
    } else { 
        // [위로 휠]
        if (currentStanzaIndex > 0) {
            changeStanza(currentStanzaIndex - 1);
        }
    }
}

function changeStanza(nextIndex) {
    isAnimating = true;
    const bodyContainer = document.getElementById('poemBodyContainer');
    const poem = poems[currentPoemIndex];

    bodyContainer.style.opacity = '0';

    setTimeout(() => {
        currentStanzaIndex = nextIndex;
        renderStanza(poem.stanzas[currentStanzaIndex]);
        
        checkVideoVisibility(currentStanzaIndex, poem.stanzas.length);

        bodyContainer.style.opacity = '1';
        setTimeout(() => { isAnimating = false; }, 2000);
    }, 2000);
}

// 영상 제어 함수
function checkVideoVisibility(currentIndex, totalLength) {
    const video = document.getElementById('illustrationVideo');
    if (!video) return;

    if (currentIndex === totalLength - 1) {
        video.classList.add('visible');
        video.play().catch(e => console.log("재생 오류:", e));
    } else {
        video.classList.remove('visible');
        setTimeout(() => {
            if (!video.classList.contains('visible')) {
                video.pause();
            }
        }, 2000);
    }
}


// poetry.js의 updateIllustration 함수 교체

// poetry.js의 updateIllustration 함수 교체

function updateIllustration(index) {
    const oldImg = document.getElementById('illustrationImg');
    if (oldImg) oldImg.remove();

    let shell1 = document.getElementById('shell-layer-1');
    let shell2 = document.getElementById('shell-layer-2');
    const insideFace = document.querySelector('.paper-b .inside-face');
    if (!insideFace) return;

    // 태그 생성 (없을 경우)
    if (!shell1) {
        shell1 = document.createElement('img');
        shell1.id = 'shell-layer-1';
        shell1.className = 'illustration-item shell-basic'; 
        shell1.src = '/image/shell.png'; 
        insideFace.prepend(shell1); 
    }
    if (!shell2) {
        shell2 = document.createElement('img');
        shell2.id = 'shell-layer-2';
        shell2.className = 'illustration-item shell-overlay'; 
        shell2.src = '/image/shell2.png'; 
        insideFace.prepend(shell2); 
    }

    // --- [로직 수정됨] ---

    // (A) Shell 1: 여기서는 강제로 켜지 않음! 
    // -> showTitleAndAuthor 함수에서 켜줄 것임.
    // -> 한 번 켜진 이후에는 계속 떠 있으므로 별도 처리가 필요 없음.


    // (B) Shell 2: 3연(index 2)부터 보임 (기존 유지)
    if (index >= 2) {
        shell2.classList.add('visible');
    } else {
        shell2.classList.remove('visible');
    }
}