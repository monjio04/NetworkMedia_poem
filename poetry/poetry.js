let currentPoemIndex = 0;
let currentStanzaIndex = 0;
let isAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
    const menuWrapper = document.getElementById('menuWrapper');
    loadPoemData(currentPoemIndex);

    setTimeout(() => { menuWrapper.classList.add('slide-up'); }, 500);
    setTimeout(() => {
        menuWrapper.classList.add('open-book');
        setTimeout(() => { showTitleAndAuthor(); }, 3000);
    }, 2500);

    window.addEventListener('wheel', handleScroll, { passive: false });
});

function loadPoemData(index) {
    const poem = poems[index];
    document.getElementById('dispTitle').innerText = poem.title;
    document.getElementById('dispAuthor').innerText = poem.author;
    renderStanza(poem.stanzas[0]);
}

function showTitleAndAuthor() {
    document.getElementById('poemHeader').classList.add('fade-in');
    setTimeout(() => {
        document.getElementById('poemBodyContainer').classList.add('fade-in');
    }, 1000);
}

// [핵심 수정] 연(문단) 렌더링 함수
function renderStanza(text) {
    const container = document.getElementById('poemBodyContainer');
    container.innerHTML = ''; 
    
    // 1. 먼저 사용자가 입력한 줄바꿈(\n)을 기준으로 나눕니다.
    // 예: ["울언니 바닷가에서 조개를 따옴", "아롱아롱 조개 껍데기"]
    const explicitLines = text.split('\n');
    
    const finalRows = [];

    // 2. 각 줄을 검사해서 15자가 넘으면 쪼갭니다.
    explicitLines.forEach(line => {
        let remainingText = line;
        
        // 텍스트가 있거나(빈 줄이라도 표현하고 싶다면 조건 수정 가능)
        // 여기서는 내용이 있는 경우에만 처리
        if (remainingText.length === 0) {
             // 만약 빈 줄(\n\n)도 원고지 한 줄을 차지하게 하고 싶다면:
             // finalRows.push(""); 
             return; 
        }

        // 15글자씩 잘라서 배열에 담기
        while (remainingText.length > 15) {
            finalRows.push(remainingText.substring(0, 15));
            remainingText = remainingText.substring(15);
        }
        
        // 15자 이하로 남은 나머지(혹은 원래 짧았던 줄)를 마지막에 추가
        if (remainingText.length > 0) {
            finalRows.push(remainingText);
        }
    });

    // 3. 모드 설정 (항상 15칸 모드)
    const isDense = true; 
    const columns = 15;
    const rowWidth = '540px'; 

    // 상단 선 생성
    const topLine = document.createElement('div');
    topLine.className = 'horizontal-line';
    topLine.style.width = rowWidth;
    container.appendChild(topLine);

    // 4. 최종 계산된 줄(finalRows)을 렌더링
    finalRows.forEach(line => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'poem-row';
        rowDiv.classList.add('mode-dense'); // 항상 15칸 모드
        
        const chars = line.split('');

        // 글자 셀 생성
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

        // 남은 칸 빈 셀로 채우기 (15 - 현재 줄 글자 수)
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

    // 하단 선 생성
    const bottomLine = document.createElement('div');
    bottomLine.className = 'horizontal-line';
    bottomLine.style.width = rowWidth;
    container.appendChild(bottomLine);
}

function handleScroll(e) {
    const bodyContainer = document.getElementById('poemBodyContainer');
    if (!bodyContainer.classList.contains('fade-in') || isAnimating) return;

    const poem = poems[currentPoemIndex];
    const totalStanzas = poem.stanzas.length;

    if (e.deltaY > 0) {
        if (currentStanzaIndex < totalStanzas - 1) changeStanza(currentStanzaIndex + 1);
    } else {
        if (currentStanzaIndex > 0) changeStanza(currentStanzaIndex - 1);
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
        bodyContainer.style.opacity = '1';
        setTimeout(() => { isAnimating = false; }, 1000);
    }, 1000);
}