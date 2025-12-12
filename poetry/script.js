// ==========================================
// 1. 전역 설정 및 상태 관리
// ==========================================

// API 키가 필요 없습니다! (Open-Meteo 사용)

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

// 2-2. 날씨 가져오기 (Open-Meteo API 사용 - 완전 무료/No Key)
function fetchWeather() {
    if (!navigator.geolocation) {
        console.log("브라우저가 위치 정보를 지원하지 않습니다.");
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Open-Meteo API 호출 (현재 위치 기준)
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Open-Meteo는 날씨를 '숫자 코드(WMO)'로 줍니다.
                // 이것을 우리 프로젝트용 단어(Clear, Rain 등)로 변환해야 합니다.
                const code = data.current_weather.weathercode;
                let weatherMain = "Clear"; // 변환된 날씨 저장 변수

                // [WMO 코드 변환 로직]
                // 0,1: 맑음 / 2,3: 흐림 / 45,48: 안개 / 51~: 비, 눈 등
                if (code <= 1) weatherMain = "Clear";
                else if (code <= 3) weatherMain = "Clouds";
                else if (code <= 48) weatherMain = "Mist";
                else if (code >= 51 && code <= 67) weatherMain = "Rain"; // 이슬비, 비
                else if (code >= 71 && code <= 77) weatherMain = "Snow"; // 눈
                else if (code >= 80 && code <= 82) weatherMain = "Rain"; // 소나기
                else if (code >= 85 && code <= 86) weatherMain = "Snow"; // 눈보라
                else if (code >= 95) weatherMain = "Rain"; // 천둥번개
                else weatherMain = "Clouds"; // 그 외는 흐림 처리

                currentState.weather = weatherMain;
                console.log(`🌤 현재 날씨 업데이트(Open-Meteo): ${weatherMain} (Code: ${code})`);
            })
            .catch(err => {
                console.error("날씨 정보 가져오기 실패:", err);
                console.log("기본값(Clear)을 사용합니다.");
            });
    }, () => {
        console.log("위치 권한이 차단되었습니다. 기본값(Clear)을 사용합니다.");
    });
}

// 초기화 실행
updateSeason();
fetchWeather();


// ==========================================
// 3. 핵심 알고리즘 (메뉴 추천 로직)
// ==========================================

function recommendMenu(poemTitle) {
    // food_data.js의 poemMap에서 정보 찾기
    const poemInfo = poemMap[poemTitle];
    
    if (!poemInfo) {
        console.error(`❌ 에러: '${poemTitle}' 제목을 food_data.js에서 찾을 수 없습니다. (띄어쓰기 확인필요)`);
        return null;
    }

    let candidates = [];
    const { weather, season } = currentState;

    // --- [Step 1] 후보군 선정 ---
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

    // --- [Step 2] 점수 계산 ---
    let scoredCandidates = [];

    candidates.forEach(candidate => {
        // 여름 제외 필터
        if (candidate.tags.exclude_season && candidate.tags.exclude_season.includes(season)) return;

        let score = 1;
        let reason = "default";

        // 날씨 가중치
        if (candidate.tags.weather.includes(weather)) {
            score += 50;
            reason = "weather";
        }
        // 계절 가중치
        else if (candidate.tags.season.includes(season) || candidate.tags.season.includes("All")) {
            score += 10;
            if (reason === "default") reason = "season";
        }
        // 색감 가중치
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
        // [수정] DB에 있는 이미지 경로를 그대로 반환
        image: selectedMenu.image || "image/default_food.png", // 이미지가 없으면 기본 이미지
        colorCode: selectedMenu.tags.color
    };
}


// ==========================================
// 4. 화면 표시 로직 (UI 제어)
// ==========================================

const modal = document.getElementById('recommend-modal');
let isModalShown = false; // 중복 실행 방지용
// 2. showResultModal 함수 수정 (이미지 태그 연결)
function showResultModal(currentPoemTitle) {
    if (isModalShown) return;
    
    console.log(`🧾 영수증 추천 시작: 제목 [${currentPoemTitle}]`);

    const result = recommendMenu(currentPoemTitle);
    
    if(!result) return;

    // UI 유틸리티 실행
    createWongojiTitle();
    updateReceiptDateTime();

    // HTML 업데이트
    const nameEl = document.querySelector('.menu-name');
    const descEl = document.querySelector('.menu-desc');
    const imgEl = document.getElementById('menuImg'); // [신규] 이미지 태그 선택
    
    if(nameEl) nameEl.innerText = result.name;
    if(descEl) descEl.innerHTML = `"${result.desc}"`;
    
    // [신규] 이미지 소스 업데이트
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

// 모달 닫기 이벤트 (검은 배경 클릭 시)
if(modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            // 다시 시를 감상하고 또 추천받고 싶다면 아래 주석 해제
            // isModalShown = false; 
        }
    });
}

// ==========================================
// 5. 영수증 UI 유틸리티 함수 (신규 추가)
// ==========================================

// 5-1. 원고지 스타일 타이틀 생성 함수
function createWongojiTitle() {
    const titleEl = document.getElementById('receiptTitle');
    if (!titleEl) return;

    // HTML에 적힌 텍스트 가져오기 (예: "오늘의 시메추")
    const text = titleEl.innerText; 
    titleEl.innerHTML = ''; // 기존 텍스트 비움

    // 한 글자씩 <span> 태그로 감싸서 넣기
    for (let char of text) {
        const span = document.createElement('span');
        span.className = 'wongoji-char';
        
        // [수정 핵심] 공백(띄어쓰기)일 경우 특수문자(&nbsp;)로 처리
        if (char === ' ') {
             // 공백이 너비를 가질 수 있도록 &nbsp; 삽입
            span.innerHTML = '&nbsp;';
        } else {
            span.innerText = char;
        }
        
        titleEl.appendChild(span);
    }
}

// 5-2. 날짜 및 시간대 계산 함수
function updateReceiptDateTime() {
    const dateEl = document.getElementById('receipt-date');
    const timeSlotEl = document.getElementById('receipt-time-slot');
    
    const now = new Date();
    
    // 날짜 포맷팅 (YYYY/MM/DD)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // 시간대 매핑 로직
    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;

    let timeSlotText = "";
    let timeIcon = "";

    // 아침: 06:00 ~ 10:00 (360분 ~ 600분)
    if (totalMinutes >= 360 && totalMinutes <= 600) {
        timeSlotText = "아침 메뉴";
        timeIcon = "🔆";
    }
    // 점심: 10:01 ~ 15:30 (601분 ~ 930분)
    else if (totalMinutes > 600 && totalMinutes <= 930) {
        timeSlotText = "점심 메뉴";
        timeIcon = "☀️";
    }
    // 저녁: 15:31 ~ 22:00 (931분 ~ 1320분)
    else if (totalMinutes > 930 && totalMinutes <= 1320) {
        timeSlotText = "저녁 메뉴";
        timeIcon = "🌙";
    }
    // 야식: 22:01 ~ 05:59 (나머지 시간)
    else {
        timeSlotText = "야식 메뉴";
        timeIcon = "✨";
    }

    // HTML 업데이트
    if (dateEl) {
        // 날짜 + 아이콘
        dateEl.innerHTML = `${year}/${month}/${day} <span class="time-icon">${timeIcon}</span>`;
    }
    if (timeSlotEl) {
        timeSlotEl.innerText = timeSlotText;
    }
}

/* script.js 맨 아래쪽 함수 수정 */

function showResultModal(currentPoemTitle) {
    if (isModalShown) return;
    
    console.log(`🧾 영수증 추천 시작: 제목 [${currentPoemTitle}]`);

    const result = recommendMenu(currentPoemTitle);
    
    if(!result) {
        console.log("추천 결과가 없어 모달을 띄우지 않습니다.");
        return;
    }

    // UI 유틸리티 실행
    createWongojiTitle();     // 원고지 타이틀 생성
    updateReceiptDateTime();  // 날짜/시간 업데이트

    // HTML 요소 선택
    const nameEl = document.querySelector('.menu-name');
    const descEl = document.querySelector('.menu-desc');
    
    // 👇 [수정] 여기 주석(//)을 지우고 올바른 ID('menuImg')를 사용해야 합니다!
    const imgEl = document.getElementById('menuImg'); 
    
    // 텍스트 업데이트
    if(nameEl) nameEl.innerText = result.name;
    if(descEl) descEl.innerHTML = `"${result.desc}"`;
    
    // 👇 [수정] 이미지 업데이트 코드 활성화
    if (!imgEl) {
        alert("비상! HTML에서 id='menuImg'를 못 찾겠어요!");
    } else {
        imgEl.src = result.image; 
    }
    
    // 모달 보여주기
    if(modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
    }
    isModalShown = true;
}