// ==========================================
// 1. 전역 설정 및 상태 관리
// ==========================================

// 현재 상태 저장 (기본값 설정)
let currentState = {
    weather: "Clear", // 기본 날씨
    season: "Spring"  // 기본 계절
};

// ==========================================
// 2. 환경 정보 수집 (날씨 & 계절)
// ==========================================

// 2-1. 계절 계산 함수
function updateSeason() {
    const month = new Date().getMonth() + 1; // 1~12월
    if (month >= 3 && month <= 5) currentState.season = "Spring";
    else if (month >= 6 && month <= 8) currentState.season = "Summer";
    else if (month >= 9 && month <= 11) currentState.season = "Autumn";
    else currentState.season = "Winter";
    
    console.log(`🌸 현재 계절 설정: ${currentState.season}`);
}

// 2-2. 날씨 가져오기 (Open-Meteo API 사용)
function fetchWeather() {
    if (!navigator.geolocation) {
        console.log("브라우저가 위치 정보를 지원하지 않습니다.");
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

                // WMO 코드 변환
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
                console.log(`🌤 현재 날씨 업데이트: ${weatherMain} (Code: ${code})`);
            })
            .catch(err => {
                console.error("날씨 정보 실패:", err);
            });
    }, () => {
        console.log("위치 권한 차단됨. 기본값 사용.");
    });
}

// 초기화 실행
updateSeason();
fetchWeather();


// ==========================================
// 3. 핵심 알고리즘 (메뉴 추천 로직)
// ==========================================

function recommendMenu(poemTitle) {
    const poemInfo = poemMap[poemTitle];
    
    if (!poemInfo) {
        console.error(`❌ 에러: '${poemTitle}' 제목을 food_data.js에서 찾을 수 없습니다.`);
        return null;
    }

    let candidates = [];
    const { weather, season } = currentState;

    // --- [Step 1] 후보군 선정 ---
    if (poemInfo.is_color_mode && poemInfo.theme_color) {
        Object.keys(menuDB).forEach(menuName => {
            const mData = menuDB[menuName];
            if (mData.tags.color === poemInfo.theme_color) {
                candidates.push({ name: menuName, ...mData, source: "color_mode" });
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
                        custom_ment: item.custom_ment,
                        source: "normal_mode"
                    });
                }
            });
        }
    }

    // --- [Step 2] 점수 계산 ---
    let scoredCandidates = [];

    candidates.forEach(candidate => {
        if (candidate.tags.exclude_season && candidate.tags.exclude_season.includes(season)) return;

        let score = 1;
        let reason = "default";

        if (candidate.tags.weather.includes(weather)) {
            score += 50;
            reason = "weather";
        }
        else if (candidate.tags.season.includes(season) || candidate.tags.season.includes("All")) {
            score += 10;
            if (reason === "default") reason = "season";
        }
        if (candidate.source === "normal_mode" && 
            poemInfo.theme_color && 
            candidate.tags.color === poemInfo.theme_color) {
            score += 30;
            if (reason === "default") reason = "color";
        }

        scoredCandidates.push({ ...candidate, score, reason });
    });

    if (scoredCandidates.length === 0) return { name: "추천 메뉴 없음", desc: "조건에 맞는 메뉴를 찾지 못했어요." };

    // --- [Step 3] 룰렛 돌리기 ---
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

    // --- [Step 4] 멘트 선정 ---
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


// ==========================================
// 4. 화면 표시 로직 (UI 제어)
// ==========================================

const modal = document.getElementById('recommend-modal');
let isModalShown = false;

function showResultModal(currentPoemTitle) {
    if (isModalShown) return;
    
    console.log(`🧾 영수증 추천 시작: 제목 [${currentPoemTitle}]`);

    const result = recommendMenu(currentPoemTitle);
    
    if(!result) return;

    // UI 유틸리티 실행
    createWongojiTitle();
    updateReceiptDateTime();

    // HTML 요소 선택
    const nameEl = document.querySelector('.menu-name');
    const descEl = document.querySelector('.menu-desc');
    const imgEl = document.getElementById('menuImg'); 
    
    // 내용 업데이트
    if(nameEl) nameEl.innerText = result.name;
    if(descEl) descEl.innerHTML = `"${result.desc}"`;
    if(imgEl) {
        imgEl.src = result.image; 
    }
    
    // 모달 보여주기
    if(modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
    }
    isModalShown = true;
}

// [수정됨] 배경 클릭 시 닫히는 기능은 삭제되었습니다.
// 대신 바코드를 누르면 처음으로 돌아가는 기능 추가

const barcodeBtn = document.querySelector('.barcode');
if (barcodeBtn) {
    barcodeBtn.style.cursor = 'pointer';
    barcodeBtn.addEventListener('click', () => {
        // 새로고침 확인 (취향에 따라 confirm 없이 바로 reload 해도 됩니다)
        if(confirm('처음 화면으로 돌아가시겠습니까?')) {
            window.location.reload();
        }
    });
}


// ==========================================
// 5. 영수증 UI 유틸리티 함수
// ==========================================

// 5-1. 원고지 스타일 타이틀
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

// 5-2. 날짜 및 날씨 이미지 표시
function updateReceiptDateTime() {
    const dateEl = document.getElementById('receipt-date');
    const timeSlotEl = document.getElementById('receipt-time-slot');
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // [이미지 경로]
    // 파일명 앞에 '/'를 붙여서 절대경로로 인식하게 합니다.
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

    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;
    let timeSlotText = "야식 추천";

    if (totalMinutes >= 360 && totalMinutes <= 600) timeSlotText = "아침 메뉴";
    else if (totalMinutes > 600 && totalMinutes <= 930) timeSlotText = "점심 메뉴";
    else if (totalMinutes > 930 && totalMinutes <= 1320) timeSlotText = "저녁 메뉴";

    if (dateEl) {
        // 날짜 + 이미지 태그
        dateEl.innerHTML = `${year}/${month}/${day} <img src="${weatherSrc}" class="weather-icon-img" alt="${currentWeather}">`;
    }
    
    if (timeSlotEl) {
        timeSlotEl.innerText = timeSlotText;
    }
}

// script.js - fitTextToReceipt 함수 교체

function fitTextToReceipt() {
    const body = document.querySelector('.receipt-body');
    const desc = document.querySelector('.menu-desc');
    const imgContainer = document.querySelector('.menu-image-container');
    
    if (!body || !desc) return;

    // 1. 초기화 (폰트 16px, 이미지 보임)
    let fontSize = 16;
    desc.style.fontSize = fontSize + 'px';
    /* CSS에서 line-clamp를 썼다면 잠시 풀어줘야 정확히 계산됨 */
    desc.style.webkitLineClamp = 'unset'; 

    if(imgContainer) imgContainer.style.display = 'flex';

    // 2. 내용이 넘치면 -> 폰트 줄이기 (최소 11px까지)
    // scrollHeight(실제 내용 높이) > clientHeight(보이는 높이)
    while (body.scrollHeight > body.clientHeight && fontSize > 11) {
        fontSize -= 0.5;
        desc.style.fontSize = fontSize + 'px';
    }

    // 3. 폰트를 11px까지 줄였는데도 넘친다? -> 이미지 숨기기
    if (body.scrollHeight > body.clientHeight) {
        if(imgContainer) {
            imgContainer.style.display = 'none'; // 이미지 희생
        }
        
        // 이미지 없애고 다시 폰트 키워보기 (공간 확보됐으므로)
        fontSize = 16;
        desc.style.fontSize = fontSize + 'px';
        while (body.scrollHeight > body.clientHeight && fontSize > 11) {
            fontSize -= 0.5;
            desc.style.fontSize = fontSize + 'px';
        }
    }
    
    // 4. 마무리: 줄임표(...) 안전장치 다시 켜기
    desc.style.webkitLineClamp = '5'; 
}