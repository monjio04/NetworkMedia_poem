// ============================================================
// 1. 전역 설정 및 초기화
// ============================================================

// URL 파라미터 확인 (예: ?id=2)
const urlParams = new URLSearchParams(window.location.search);
const poemId = parseInt(urlParams.get('id')) || 1; 

// poems 배열(data_poems.js)에서 해당 ID 찾기
let currentPoemIndex = poems.findIndex(p => p.id === poemId);
if (currentPoemIndex === -1) {
    console.warn("해당 ID의 시를 찾을 수 없어 첫 번째 시를 로드합니다.");
    currentPoemIndex = 0;
}

// 상태 변수
let currentStanzaIndex = 0;
let isAnimating = false;
let currentState = { 
    weather: "Clear", // 기본값
    season: "Spring"  // 기본값
};

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 1. 환경 정보 수집 (계절/날씨)
    updateSeason();
    fetchWeather();

    // 2. 시 데이터 로드 (영상, 이미지, 텍스트)
    loadPoemData(currentPoemIndex);

    // 3. 책 펼치는 애니메이션 스케줄링
    const menuWrapper = document.getElementById('menuWrapper');
    
    // 책 올라오기
    setTimeout(() => {
        if(menuWrapper) menuWrapper.classList.add('slide-up');
    }, 500);

    // 책 펼쳐지기
    setTimeout(() => {
        if(menuWrapper) menuWrapper.classList.add('open-book');
        
        // 제목 등장 (약간의 딜레이 후)
        setTimeout(() => {
            showTitleAndAuthor();
        }, 2500); 
    }, 2500);

    // 4. 스크롤 이벤트 등록 (passive: false 중요)
    window.addEventListener('wheel', handleScroll, { passive: false });
});


// ============================================================
// 2. 시(Poem) 렌더링 및 연출 로직
// ============================================================

function loadPoemData(index) {
    const poem = poems[index];
    if (!poem) return;

    // (1) 텍스트 설정
    const titleEl = document.getElementById('dispTitle');
    const authorEl = document.getElementById('dispAuthor');
    if (titleEl) titleEl.innerText = poem.title;
    if (authorEl) authorEl.innerText = poem.author;
    
    // (2) 배경 비디오 설정 (스타일 동적 적용)
   

    // (3) 일러스트 객체 생성
    initObjects(poem.objects);

    // (4) 첫 연 렌더링
    renderStanza(poem.stanzas[0]);
    
    // (5) 초기 이미지 상태 설정 (아무것도 안 보임)
    updateObjectVisibility(-1);
}

// 제목과 작가 등장 애니메이션
function showTitleAndAuthor() {
    const header = document.getElementById('poemHeader');
    const bodyContainer = document.getElementById('poemBodyContainer');
    
    if (header) header.classList.add('fade-in');
    
    setTimeout(() => {
        if (bodyContainer) bodyContainer.classList.add('fade-in');
        
        // 제목이 뜰 때 1연에 해당하는 이미지 등장
        updateObjectVisibility(0);
        
        // 배경 영상 보이기 (스타일의 opacity가 0이면 여기서 켜줘야 함)
        const video = document.getElementById('illustrationVideo');
        if(video) {
             video.classList.add('visible');
             video.play().catch(e => console.log("자동 재생 차단됨:", e));
        }
    }, 1000);
}

// 이미지 태그 생성 (data_poems.js 기반)
function initObjects(objectsData) {
    const container = document.querySelector('.paper-b .inside-face');
    if (!container) return;
    
    // 기존 것들 싹 지우기
    container.innerHTML = ''; 
    // (참고: HTML에 박혀있는 <video> 태그가 있다면 그것도 지워집니다. 아주 좋습니다.)

    if (!objectsData) return;

    objectsData.forEach((obj, idx) => {
        let el;

        // 1. 타입이 비디오라면 <video> 태그 생성
        if (obj.type === 'video') {
            el = document.createElement('video');
            el.muted = true;      // 소리 끄기 (자동재생 필수조건)
            el.loop = true;       // 반복 재생
            el.playsInline = true; // 모바일 호환
            // 비디오는 바로 src에 넣습니다.
            el.src = obj.src;
        } 
        // 2. 아니면 그냥 <img> 태그 생성
        else {
            el = document.createElement('img');
            el.src = obj.src;
        }

        el.className = 'illustration-item'; 
        el.id = `obj-${idx}`;
        
        // 스타일 적용
        if (obj.style) Object.assign(el.style, obj.style);
        
        container.prepend(el);
    });
}

// [수정] 스크롤 시 보이기/숨기기 + 비디오 재생/정지 처리
// [수정됨] 스크롤 시 보이기/숨기기 (endAt 로직 추가됨)
// [수정됨] 디버깅용 로그가 포함된 함수
function updateObjectVisibility(stanzaIndex) {
    const poem = poems[currentPoemIndex];
    if (!poem.objects) return;

    console.log(`🔍 현재 연(Index): ${stanzaIndex} 확인 중...`);

    poem.objects.forEach((obj, idx) => {
        const el = document.getElementById(`obj-${idx}`);
        if (!el) return;

        // 1. 시작 조건
        const isAfterStart = stanzaIndex >= obj.startAt;
        
        // 2. 종료 조건 (endAt이 없거나, 현재 연이 endAt보다 작거나 같으면 통과)
        const isBeforeEnd = obj.endAt === undefined || stanzaIndex <= obj.endAt;

        // ★ 감시 로그 출력 (F12 콘솔에서 확인 가능)
        console.log(` - 이미지[${idx}] 조건: 시작(${obj.startAt})~끝(${obj.endAt}) / 현재(${stanzaIndex})`);
        console.log(`   👉 결과: 시작지남(${isAfterStart}) && 안끝남(${isBeforeEnd}) = ${isAfterStart && isBeforeEnd ? "보임" : "숨김"}`);

        if (isAfterStart && isBeforeEnd) {
            el.classList.add('visible');
            el.style.opacity = (obj.type === 'video') ? "0.6" : "1";
            if (obj.type === 'video') el.play().catch(e => {});
        } else {
            el.classList.remove('visible'); // 여기서 visible 클래스가 빠져야 사라짐
            el.style.opacity = "";
            if (obj.type === 'video') {
                el.pause();
                el.currentTime = 0;
            }
        }
    });
}

// 시 텍스트 그리드 렌더링 (원고지 효과)
function renderStanza(text) {
    const container = document.getElementById('poemBodyContainer');
    if (!container) return; 
    
    container.innerHTML = ''; 
    
    // 15자 줄바꿈 로직
    const explicitLines = text.split('\n');
    const finalRows = [];
    explicitLines.forEach(line => {
        let remainingText = line;
        if (remainingText.length === 0) return; 
        while (remainingText.length > 15) {
            finalRows.push(remainingText.substring(0, 15));
            remainingText = remainingText.substring(15);
        }
        if (remainingText.length > 0) finalRows.push(remainingText);
    });

    const columns = 15;
    const rowWidth = '540px'; 
    
    // 상단 선
    const topLine = document.createElement('div');
    topLine.className = 'horizontal-line';
    topLine.style.width = rowWidth;
    container.appendChild(topLine);

    // 글자 칸 생성
    finalRows.forEach(line => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'poem-row mode-dense';
        
        const chars = line.split('');
        chars.forEach(char => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerHTML = (char === ' ') ? '&nbsp;' : char;
            rowDiv.appendChild(cell);
        });

        // 남은 칸 채우기
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

    // 하단 선
    const bottomLine = document.createElement('div');
    bottomLine.className = 'horizontal-line';
    bottomLine.style.width = rowWidth;
    container.appendChild(bottomLine);
}

// 스크롤 핸들러
function handleScroll(e) {
    e.preventDefault();

    const bodyContainer = document.getElementById('poemBodyContainer');
    // 애니메이션 중이거나 내용이 없으면 무시
    if (!bodyContainer || !bodyContainer.classList.contains('fade-in') || isAnimating) return;

    const poem = poems[currentPoemIndex];
    const totalStanzas = poem.stanzas.length;

    if (e.deltaY > 0) { 
        // [아래로 스크롤]
        if (currentStanzaIndex < totalStanzas - 1) {
            changeStanza(currentStanzaIndex + 1);
        } else {
            // 마지막 연에서 스크롤 -> 영수증 모달 오픈!
            showResultModal(poem.title);
        }
    } else { 
        // [위로 스크롤]
        if (currentStanzaIndex > 0) {
            changeStanza(currentStanzaIndex - 1);
        }
    }
}

// 연 전환 애니메이션
function changeStanza(nextIndex) {
    isAnimating = true;
    const bodyContainer = document.getElementById('poemBodyContainer');

    // 1. 사라짐
    bodyContainer.style.opacity = '0';

    setTimeout(() => {
        // 2. 내용 교체
        currentStanzaIndex = nextIndex;
        renderStanza(poems[currentPoemIndex].stanzas[currentStanzaIndex]);
        
        // 3. 이미지 업데이트
        updateObjectVisibility(currentStanzaIndex);

        // 4. 나타남
        bodyContainer.style.opacity = '1';
        
        setTimeout(() => { isAnimating = false; }, 2000);
    }, 2000);
}


// ============================================================
// 3. 날씨 및 계절 API 로직 (완전판)
// ============================================================

function updateSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) currentState.season = "Spring";
    else if (month >= 6 && month <= 8) currentState.season = "Summer";
    else if (month >= 9 && month <= 11) currentState.season = "Autumn";
    else currentState.season = "Winter";
    
    console.log(`🌸 현재 계절: ${currentState.season}`);
}

function fetchWeather() {
    if (!navigator.geolocation) {
        console.log("위치 정보를 사용할 수 없습니다.");
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Open-Meteo API 호출
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const code = data.current_weather.weathercode;
                let weatherMain = "Clear";

                // [WMO 코드 매핑 완전판]
                if (code <= 1) weatherMain = "Clear";
                else if (code <= 3) weatherMain = "Clouds";
                else if (code <= 48) weatherMain = "Mist";
                else if (code >= 51 && code <= 67) weatherMain = "Rain";
                else if (code >= 71 && code <= 77) weatherMain = "Snow";
                else if (code >= 80 && code <= 82) weatherMain = "Rain";
                else if (code >= 85 && code <= 86) weatherMain = "Snow";
                else if (code >= 95) weatherMain = "Thunderstorm";
                else weatherMain = "Clouds";

                currentState.weather = weatherMain;
                console.log(`🌤 날씨 업데이트: ${weatherMain} (Code: ${code})`);
            })
            .catch(err => {
                console.error("날씨 API 에러:", err);
            });
    }, () => {
        console.log("위치 권한 차단됨. 기본값(Clear) 사용.");
    });
}


// ============================================================
// 4. 추천 알고리즘 및 영수증 UI (완전판)
// ============================================================

const modal = document.getElementById('recommend-modal');
let isModalShown = false;

// [핵심] 메뉴 추천 알고리즘
function recommendMenu(poemTitle) {
    const poemInfo = poemMap[poemTitle];
    
    if (!poemInfo) {
        console.error(`❌ 에러: food_data.js에 '${poemTitle}' 정보가 없습니다.`);
        return null;
    }

    let candidates = [];
    const { weather, season } = currentState;

    // 1. 후보군 선정
    if (poemInfo.is_color_mode && poemInfo.theme_color) {
        // [색감 모드]
        Object.keys(menuDB).forEach(menuName => {
            const mData = menuDB[menuName];
            if (mData.tags.color === poemInfo.theme_color) {
                candidates.push({ name: menuName, ...mData, source: "color_mode" });
            }
        });
    } else {
        // [일반 모드]
        if (poemInfo.recommendations) {
            poemInfo.recommendations.forEach(item => {
                const mData = menuDB[item.menu];
                if (mData) {
                    candidates.push({ 
                        name: item.menu, 
                        ...mData, 
                        custom_ment: item.custom_ment,
                        source: "normal_mode"
                    });
                }
            });
        }
    }

    // 2. 점수 계산 (가중치 부여)
    let scoredCandidates = [];

    candidates.forEach(candidate => {
        // 제외 계절 필터링
        if (candidate.tags.exclude_season && candidate.tags.exclude_season.includes(season)) return;

        let score = 1;
        let reason = "default";

        // 날씨 가중치 (+50점)
        if (candidate.tags.weather.includes(weather)) {
            score += 50;
            reason = "weather";
        }
        // 계절 가중치 (+10점)
        else if (candidate.tags.season.includes(season) || candidate.tags.season.includes("All")) {
            score += 10;
            if (reason === "default") reason = "season";
        }
        // 색상 가중치 (+30점)
        if (candidate.source === "normal_mode" && 
            poemInfo.theme_color && 
            candidate.tags.color === poemInfo.theme_color) {
            score += 30;
            if (reason === "default") reason = "color";
        }

        scoredCandidates.push({ ...candidate, score, reason });
    });

    if (scoredCandidates.length === 0) return { name: "추천 메뉴 없음", desc: "조건에 맞는 메뉴를 찾지 못했어요.", image: "" };

    // 3. 룰렛 돌리기 (가중치 랜덤)
    const totalScore = scoredCandidates.reduce((acc, cur) => acc + cur.score, 0);
    let randomNum = Math.random() * totalScore;
    let selectedMenu = null;

    for (const item of scoredCandidates) {
        randomNum -= item.score;
        if (randomNum <= 0) {
            selectedMenu = item;
            break;
        }
    }

    // 4. 멘트 선정
    let finalDesc = selectedMenu.ment.default;
    
    if (selectedMenu.reason === "weather" && selectedMenu.ment.weather) finalDesc = selectedMenu.ment.weather;
    else if (poemInfo.is_color_mode && selectedMenu.ment.color) finalDesc = selectedMenu.ment.color;
    else if (selectedMenu.reason === "season" && selectedMenu.ment.season) finalDesc = selectedMenu.ment.season;
    else if (selectedMenu.custom_ment) finalDesc = selectedMenu.custom_ment;
    else if (selectedMenu.reason === "color" && selectedMenu.ment.color) finalDesc = selectedMenu.ment.color;

    return {
        name: selectedMenu.name,
        desc: finalDesc,
        image: selectedMenu.image || "image/default_food.png",
        colorCode: selectedMenu.tags.color
    };
}

// 영수증 모달 표시 함수
function showResultModal(currentPoemTitle) {
    if (isModalShown) return;
    
    console.log(`🧾 영수증 발행: [${currentPoemTitle}]`);

    const result = recommendMenu(currentPoemTitle);
    if(!result) return;

    // UI 업데이트 유틸리티 실행
    createWongojiTitle();
    updateReceiptDateTime();

    // HTML 내용 채우기
    const nameEl = document.querySelector('.menu-name');
    const descEl = document.querySelector('.menu-desc');
    const imgEl = document.getElementById('menuImg'); 
    
    if(nameEl) nameEl.innerText = result.name;
    if(descEl) descEl.innerHTML = `"${result.desc}"`;
    if(imgEl) {
        imgEl.src = result.image; 
    }
    
    // 모달 보여주기
    if(modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        
        // [중요] 모달이 뜬 직후 글자 크기 자동 조절 실행
        setTimeout(() => {
            fitTextToReceipt();
        }, 10);
    }
    isModalShown = true;
}


// ============================================================
// 5. 영수증 UI 유틸리티 함수들 (완전판)
// ============================================================

// 5-1. 영수증 글자 크기 자동 조절 (넘치면 줄이기)
function fitTextToReceipt() {
    const body = document.querySelector('.receipt-body');
    const desc = document.querySelector('.menu-desc');
    const imgContainer = document.querySelector('.menu-image-container');
    
    if (!body || !desc) return;

    // 초기화
    let fontSize = 16;
    desc.style.fontSize = fontSize + 'px';
    desc.style.webkitLineClamp = 'unset'; 

    if(imgContainer) imgContainer.style.display = 'flex';

    // 1단계: 글자 줄이기
    while (body.scrollHeight > body.clientHeight && fontSize > 11) {
        fontSize -= 0.5;
        desc.style.fontSize = fontSize + 'px';
    }

    // 2단계: 그래도 넘치면 이미지 숨기기
    if (body.scrollHeight > body.clientHeight) {
        if(imgContainer) {
            imgContainer.style.display = 'none'; 
        }
        
        // 이미지 없앤 공간만큼 글자 다시 키워보기
        fontSize = 16;
        desc.style.fontSize = fontSize + 'px';
        while (body.scrollHeight > body.clientHeight && fontSize > 11) {
            fontSize -= 0.5;
            desc.style.fontSize = fontSize + 'px';
        }
    }
    
    // 마무리: 말줄임표 처리 복구
    desc.style.webkitLineClamp = '5'; 
}

// 5-2. 원고지 스타일 제목 생성
function createWongojiTitle() {
    const titleEl = document.getElementById('receiptTitle');
    if (!titleEl) return;

    const text = titleEl.innerText; 
    titleEl.innerHTML = ''; 

    for (let char of text) {
        const span = document.createElement('span');
        span.className = 'wongoji-char';
        if (char === ' ') span.innerHTML = '&nbsp;';
        else span.innerText = char;
        titleEl.appendChild(span);
    }
}

// 5-3. 날짜/시간/날씨 아이콘 업데이트 (이미지 매핑 포함)
function updateReceiptDateTime() {
    const dateEl = document.getElementById('receipt-date');
    const timeSlotEl = document.getElementById('receipt-time-slot');
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // [이미지 매핑 테이블]
    const weatherImageMap = {
        'Clear': '/image/sun.png',        
        'Clouds': '/image/cloud.png',     
        'Rain': '/image/rain.png',        
        'Snow': '/image/snow.png',        
        'Mist': '/image/mist.png',        
        'Thunderstorm': '/image/thunder.png', 
        'Unknown': '/image/sun.png'   
    };

    const currentWeather = currentState.weather || 'Clear';
    const weatherSrc = weatherImageMap[currentWeather] || '/image/sun.png';

    // 시간대 텍스트 계산
    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;
    let timeSlotText = "야식 메뉴";

    if (totalMinutes >= 360 && totalMinutes <= 600) timeSlotText = "아침 메뉴";
    else if (totalMinutes > 600 && totalMinutes <= 930) timeSlotText = "점심 메뉴";
    else if (totalMinutes > 930 && totalMinutes <= 1320) timeSlotText = "저녁 메뉴";

    // HTML 업데이트
    if (dateEl) {
        dateEl.innerHTML = `${year}/${month}/${day} <img src="${weatherSrc}" class="weather-icon-img" alt="${currentWeather}">`;
    }
    
    if (timeSlotEl) {
        timeSlotEl.innerText = timeSlotText;
    }
}

// 5-4. 바코드 클릭 시 처음으로 돌아가기
const barcodeBtn = document.querySelector('.barcode');
if (barcodeBtn) {
    barcodeBtn.addEventListener('click', () => {
        if(confirm('처음 화면으로 돌아가시겠습니까?')) {
            window.location.reload();
        }
    });
}