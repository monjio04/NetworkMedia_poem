// ============================================================
// 1. 전역 설정 및 초기화
// ============================================================

// URL 파라미터 확인
const urlParams = new URLSearchParams(window.location.search);
const poemId = parseInt(urlParams.get('id')) || 1; 

const isViewMode = urlParams.get('viewMode') === 'true';

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
    weather: "Clear", 
    season: "Spring"  
};

// ============================================================
// 페이지 로드 시 실행
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    // 데이터 로드 및 환경 설정
    updateSeason();
    fetchWeather();
    loadPoemData(currentPoemIndex);

    const menuWrapper = document.getElementById('menuWrapper');
    const introMsg = document.getElementById('intro-message');
    
    const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    window.addEventListener('wheel', preventScroll, { passive: false });

    // 애니메이션 시퀀스 시작
    setTimeout(() => { if(menuWrapper) menuWrapper.classList.add('slide-up'); }, 100);
    setTimeout(() => {
        if(menuWrapper) menuWrapper.classList.add('open-book');
        
        setTimeout(() => {
            showTitleAndAuthor(); 
            
            setTimeout(() => {
                if (introMsg) introMsg.classList.add('visible'); 
                
                setTimeout(() => {
                    if (introMsg) introMsg.classList.remove('visible');
                    
                    setTimeout(() => {
                        
                        window.removeEventListener('wheel', preventScroll);
                        window.addEventListener('wheel', handleScroll, { passive: false });

                    }, 1000); 

                }, 3000); 
            }, 2000); 
        }, 1500); 
    }, 2000); 

    if (isViewMode) {
        const backBtn = document.getElementById('backToArchiveBtn');
        if (backBtn) {
            backBtn.style.display = 'block'; 
            backBtn.addEventListener('click', () => { window.history.back(); });
        }
    }
});
// ============================================================
// 2. 시(Poem) 렌더링 및 연출 로직
// ============================================================

function loadPoemData(index) {
    const poem = poems[index];
    if (!poem) return;

    const titleEl = document.getElementById('dispTitle');
    const authorEl = document.getElementById('dispAuthor');
    if (titleEl) titleEl.innerText = poem.title;
    if (authorEl) authorEl.innerText = poem.author;
    
    initObjects(poem.objects);
    renderStanza(poem.stanzas[0]);
    updateObjectVisibility(-1);
}

function showTitleAndAuthor() {
    const header = document.getElementById('poemHeader');
    const bodyContainer = document.getElementById('poemBodyContainer');
    
    if (header) header.classList.add('fade-in');
    
    setTimeout(() => {
        if (bodyContainer) bodyContainer.classList.add('fade-in');
        updateObjectVisibility(0);
        
        const video = document.getElementById('illustrationVideo');
        if(video) {
             video.classList.add('visible');
             video.play().catch(e => console.log("자동 재생 차단됨:", e));
        }
    }, 1000);
}

function initObjects(objectsData) {
    const container = document.querySelector('.paper-b .inside-face');
    if (!container) return;
    container.innerHTML = ''; 

    if (!objectsData) return;

    objectsData.forEach((obj, idx) => {
        let el;
        if (obj.type === 'video') {
            el = document.createElement('video');
            el.muted = true; el.loop = true; el.playsInline = true; el.src = obj.src;
        } else {
            el = document.createElement('img');
            el.src = obj.src;
        }
        el.className = 'illustration-item'; 
        el.id = `obj-${idx}`;
        if (obj.style) Object.assign(el.style, obj.style);
        container.prepend(el);
    });
}

function updateObjectVisibility(stanzaIndex) {
    const poem = poems[currentPoemIndex];
    if (!poem.objects) return;

    poem.objects.forEach((obj, idx) => {
        const el = document.getElementById(`obj-${idx}`);
        if (!el) return;

        const isAfterStart = stanzaIndex >= obj.startAt;
        const isBeforeEnd = obj.endAt === undefined || stanzaIndex <= obj.endAt;

        if (isAfterStart && isBeforeEnd) {
            el.classList.add('visible');
            el.style.opacity = (obj.type === 'video') ? "0.6" : "1";
            if (obj.type === 'video') el.play().catch(e => {});
        } else {
            el.classList.remove('visible');
            el.style.opacity = "";
            if (obj.type === 'video') { el.pause(); el.currentTime = 0; }
        }
    });
}

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
        if (remainingText.length > 0) finalRows.push(remainingText);
    });

    const columns = 15;
    const rowWidth = '540px'; 
    
    const topLine = document.createElement('div');
    topLine.className = 'horizontal-line';
    topLine.style.width = rowWidth;
    container.appendChild(topLine);

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
}

function handleScroll(e) {
    if (isModalShown) { e.preventDefault(); e.stopPropagation(); return; }
    
    e.preventDefault();
    const bodyContainer = document.getElementById('poemBodyContainer');
    if (!bodyContainer || !bodyContainer.classList.contains('fade-in') || isAnimating) return;

    const poem = poems[currentPoemIndex];
    const totalStanzas = poem.stanzas.length;

    if (e.deltaY > 0) { 
        if (currentStanzaIndex < totalStanzas - 1) {
            changeStanza(currentStanzaIndex + 1);
        } else {
            if(!isViewMode){
                showResultModal(poem.title);
            }else{
                return;
            }
        }
    } else { 
        if (currentStanzaIndex > 0) {
            changeStanza(currentStanzaIndex - 1);
        }
    }
}

function changeStanza(nextIndex) {
    isAnimating = true;
    const bodyContainer = document.getElementById('poemBodyContainer');
    bodyContainer.style.opacity = '0';

    setTimeout(() => {
        currentStanzaIndex = nextIndex;
        renderStanza(poems[currentPoemIndex].stanzas[currentStanzaIndex]);
        updateObjectVisibility(currentStanzaIndex);
        bodyContainer.style.opacity = '1';
        setTimeout(() => { isAnimating = false; }, 2000);
    }, 2000);
}


// ============================================================
// 3. 날씨 및 계절 API 로직
// ============================================================

function updateSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) currentState.season = "Spring";
    else if (month >= 6 && month <= 8) currentState.season = "Summer";
    else if (month >= 9 && month <= 11) currentState.season = "Autumn";
    else currentState.season = "Winter";
    console.log(`현재 계절: ${currentState.season}`);
}

function fetchWeather() {
    if (!navigator.geolocation) {
        console.log("위치 정보를 사용할 수 없습니다.");
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const code = data.current_weather.weathercode;
                let weatherMain = "Clear";
                // WMO 코드 매핑
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
            .catch(err => { console.error("날씨 API 에러:", err); });
    }, () => { console.log("위치 권한 차단됨. 기본값(Clear) 사용."); });
}


// ============================================================
// 4. 추천 알고리즘 및 영수증 UI
// ============================================================

const modal = document.getElementById('recommend-modal');
let isModalShown = false;

function recommendMenu(poemTitle) {
    const poemInfo = poemMap[poemTitle];
    if (!poemInfo) {
        console.error(`에러: data_poems.js에 '${poemTitle}' 정보가 없습니다.`);
        return null;
    }

    let candidates = [];
    const { weather, season } = currentState; // 현재 날씨, 계절

    // 후보군 선정 로직
    if (poemInfo.is_color_mode && poemInfo.theme_color) {
        //색깔 모드
        Object.keys(menuDB).forEach(menuName => {
            const mData = menuDB[menuName];
            if (mData.tags.color === poemInfo.theme_color) {
                candidates.push({ 
                    name: menuName, 
                    ...mData, 
                    custom_ment_obj: { default: "이 시의 색깔과 꼭 닮은 메뉴예요." },
                    source: "color_mode" 
                });
            }
        });
    } else {
        if (poemInfo.recommendations) {
            poemInfo.recommendations.forEach(item => {
                const mData = menuDB[item.menu];
                if (mData) {
                    candidates.push({ 
                        name: item.menu, 
                        ...mData, 
                        custom_ment_obj: item.custom_ment, 
                        source: "normal_mode"
                    });
                }
            });
        }
    }

    // 점수 계산
    let scoredCandidates = [];
    candidates.forEach(candidate => {
        if (candidate.tags.exclude_season && candidate.tags.exclude_season.includes(season)) return;
        
        let score = 1;
        let reason = "default"; // 추천 이유

        // 날씨 매칭
        if (candidate.tags.weather.includes(weather)) { 
            score += 50; 
            reason = "weather"; 
        }
        // 계절 매칭
        else if (candidate.tags.season.includes(season) || candidate.tags.season.includes("All")) { 
            score += 10; 
            if (reason === "default") reason = "season"; 
        }
        
        // 색깔 매칭 (일반 모드일 때도 테마 컬러와 같으면 가산점)
        if (candidate.source === "normal_mode" && poemInfo.theme_color && candidate.tags.color === poemInfo.theme_color) {
            score += 30; 
            if (reason === "default") reason = "color";
        }

        scoredCandidates.push({ ...candidate, score, reason });
    });

    if (scoredCandidates.length === 0) return { name: "추천 메뉴 없음", desc: "조건에 맞는 메뉴를 찾지 못했어요.", image: "" };

    // 랜덤 추첨
    const totalScore = scoredCandidates.reduce((acc, cur) => acc + cur.score, 0);
    let randomNum = Math.random() * totalScore;
    let selectedMenu = null;

    for (const item of scoredCandidates) {
        randomNum -= item.score;
        if (randomNum <= 0) { selectedMenu = item; break; }
    }

    let finalDesc = selectedMenu.custom_ment_obj.default; 

    if (selectedMenu.reason === "weather" && selectedMenu.custom_ment_obj.weather) {
        finalDesc = selectedMenu.custom_ment_obj.weather;
    } else if (selectedMenu.reason === "season" && selectedMenu.custom_ment_obj.season) {
        finalDesc = selectedMenu.custom_ment_obj.season;
    }
    
    // 만약 weather/season 멘트가 비어있다면 다시 default로 돌아감
    if(!finalDesc) finalDesc = selectedMenu.custom_ment_obj.default;

    return {
        name: selectedMenu.name,
        desc: finalDesc,
        image: selectedMenu.image || "../image/default_food.png",
        colorCode: selectedMenu.tags.color
    };
}

function getCurrentMealTime() {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    if (minutes >= 360 && minutes <= 660) return "morning"; 
    if (minutes > 660 && minutes <= 960) return "lunch";    
    return "dinner";                                        
}

//ID를 전역 변수에서 바로 가져옴
function saveReceiptToArchive(menuData, dateString) {
    let archive = JSON.parse(localStorage.getItem('poem_receipt_archive')) || {};
    if (!archive[dateString]) archive[dateString] = {};

    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    let mealTime = "dinner";
    if (minutes >= 360 && minutes <= 660) mealTime = "morning";
    else if (minutes > 660 && minutes <= 960) mealTime = "lunch";

    const savedId = poemId; 

    archive[dateString][mealTime] = {
        id: savedId,          
        name: menuData.name,
        desc: menuData.desc,
        image: menuData.image,
        timestamp: new Date().getTime()
    };

    localStorage.setItem('poem_receipt_archive', JSON.stringify(archive));
    console.log("저장 성공 (ID 포함):", archive[dateString][mealTime]); 
}

function showResultModal(currentPoemTitle) {
    if (isModalShown) return;
    console.log(`영수증 발행: [${currentPoemTitle}]`);

    const result = recommendMenu(currentPoemTitle);
    if(!result) return;

    createWongojiTitle();
    updateReceiptDateTime();

    const nameEl = document.querySelector('.menu-name');
    const descEl = document.querySelector('.menu-desc');
    const imgEl = document.getElementById('menuImg'); 
    
    if(nameEl) nameEl.innerText = result.name;
    if(descEl) descEl.innerHTML = `"${result.desc}"`;
    if(imgEl) { imgEl.src = result.image; }
    
    const today = new Date().toISOString().split('T')[0]; 
    
    saveReceiptToArchive(result, today);
    
    if(modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        setTimeout(() => { fitTextToReceipt(); }, 10);

        const backBtn = document.getElementById('backToMainBtn');
        if (backBtn) {
            backBtn.classList.add('visible');
            
            backBtn.onclick = function() {
                window.location.href = "../index.html?mode=select"; 
            };
        }
    }
    isModalShown = true;
}


// ============================================================
// 5. 영수증 UI 유틸리티 함수들
// ============================================================

function fitTextToReceipt() {
    const body = document.querySelector('.receipt-body');
    const desc = document.querySelector('.menu-desc');
    const imgContainer = document.querySelector('.menu-image-container');
    if (!body || !desc) return;

    let fontSize = 16;
    desc.style.fontSize = fontSize + 'px';
    desc.style.webkitLineClamp = 'unset'; 
    if(imgContainer) imgContainer.style.display = 'flex';

    while (body.scrollHeight > body.clientHeight && fontSize > 11) {
        fontSize -= 0.5;
        desc.style.fontSize = fontSize + 'px';
    }
    if (body.scrollHeight > body.clientHeight) {
        if(imgContainer) imgContainer.style.display = 'none'; 
        fontSize = 16;
        desc.style.fontSize = fontSize + 'px';
        while (body.scrollHeight > body.clientHeight && fontSize > 11) {
            fontSize -= 0.5;
            desc.style.fontSize = fontSize + 'px';
        }
    }
    desc.style.webkitLineClamp = '5'; 
}

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

function updateReceiptDateTime() {
    const dateEl = document.getElementById('receipt-date');
    const timeSlotEl = document.getElementById('receipt-time-slot');
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const weatherImageMap = {
        'Clear': '/image/sun.png', 'Clouds': '/image/cloud.png', 'Rain': '/image/rain.png',        
        'Snow': '/image/snow.png', 'Mist': '/image/mist.png', 'Thunderstorm': '/image/thunder.png', 'Unknown': '/image/sun.png'   
    };
    const currentWeather = currentState.weather || 'Clear';
    const weatherSrc = weatherImageMap[currentWeather] || '/image/sun.png';

    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;
    let timeSlotText = "저녁 메뉴";
    if (totalMinutes >= 360 && totalMinutes <= 660) timeSlotText = "아침 메뉴";
    else if (totalMinutes > 660 && totalMinutes <= 990) timeSlotText = "점심 메뉴";

    if (dateEl) { dateEl.innerHTML = `${year}/${month}/${day} <img src="${weatherSrc}" class="weather-icon-img" alt="${currentWeather}">`; }
    if (timeSlotEl) { timeSlotEl.innerText = timeSlotText; }
}

//더미 데이터
function initWelcomeData() {
    const hasInjected = localStorage.getItem('data_injected');
    
    if (hasInjected) {
        console.log("기존 방문자입니다. 데이터 초기화를 건너뜁니다.");
        return; 
    }

    let archive = {}; 

    archive["2025-12-23"] = {
        "morning": {
            id: 1,
            name: "소고기무국",
            desc: "찬 바람이 불어 하루가 더 조용해질 때, 지나가는 시간을 막지 않고 흘려보내듯 뜨끈한 무국 한 숟가락이 위로가 돼요.",
            image: "../image/beef_radish.png", 
            timestamp: new Date("2025-12-23T09:00:00").getTime()
        },
        "lunch": {
            id: 2,
            name: "꼬막 비빔밥",
            desc: "햇살이 맑게 비치는 날, 바다도 마음도 또렷해지는 순간. 매콤한 양념에 바다 향을 더한 꼬막 비빔밥이 기분 좋게 어울려요.",
            image: "../image/bibimbap.png", 
            timestamp: new Date("2025-12-23T12:30:00").getTime()
        },
        "dinner": {
            id: 3,
            name: "삼계탕",
            desc: "'너는 익어 가는구나'. 오랜 시간 뜨거움을 견디며 푹 고아낸 깊은 국물처럼, 우리의 시간도 깊고 진하게 우러나는 중일 거예요.",
            image: "../image/samgyetang.png",
            timestamp: new Date("2025-12-23T19:00:00").getTime()
        }
    };

    archive["2025-12-24"] = {
        "lunch": {
            id: 4,
            name: "감자전",
            desc: "빗소리와 함께 지글지글 익어가는 고소한 향기가, 복잡한 머릿속을 차분하게 비워줄 겁니다.",
            image: "../image/potato_jeon.png", 
            timestamp: new Date("2025-12-24T13:00:00").getTime()
        },
        "dinner": {
            id: 5,
            name: "후라이드 치킨",
            desc: "나는 늙어가는데 너는 참 맛있게도 익었구나. 오늘 밤은 너의 그 바삭한 생을 빌려야겠다.",
            image: "../image/fried_chicken.png", 
            timestamp: new Date("2025-12-24T20:00:00").getTime()
        }
    };

    localStorage.setItem('poem_receipt_archive', JSON.stringify(archive));
    localStorage.setItem('data_injected', 'true'); 
    
}

initWelcomeData();