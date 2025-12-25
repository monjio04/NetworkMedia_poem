document.addEventListener('DOMContentLoaded', () => {
    loadArchive();

    // 모달 배경 클릭 시 닫기 이벤트 등록
    const modalElement = document.getElementById('receipt-modal');
    if (modalElement) {
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                closeModal();
            }
        });
    }
});

// 보관함 데이터 로드 및 판자 생성 함수
function loadArchive() {
    const wrapper = document.getElementById('plank-wrapper');
    const archiveData = JSON.parse(localStorage.getItem('poem_receipt_archive')) || {};
    
    // 날짜 정렬 (최신 날짜가 위로 오게)
    const sortedDates = Object.keys(archiveData).sort((a, b) => new Date(b) - new Date(a));

    wrapper.innerHTML = '';

    sortedDates.forEach(date => {
        const dailyData = archiveData[date];
        
        // 데이터가 하나라도 있는지 확인
        const hasData = dailyData.morning || dailyData.lunch || dailyData.dinner;

        if (hasData) {
            // 나무 판자 생성
            const row = document.createElement('div');
            row.className = 'plank-row';

            // 날짜 라벨 생성
            const label = document.createElement('div');
            label.className = 'date-label';
            label.innerText = date;
            row.appendChild(label);

            // 식사별 영수증 생성 (아침, 점심, 저녁)
            const meals = ['morning', 'lunch', 'dinner'];
            
            meals.forEach(mealType => {
                if (dailyData[mealType] && dailyData[mealType].name) {
                    // 영수증 생성 함수 호출 (데이터, 식사타입, 날짜 전달)
                    const receiptHTML = createReceiptElement(dailyData[mealType], mealType, date);
                    row.appendChild(receiptHTML);
                }
            });

            // 판자를 화면에 추가
            wrapper.appendChild(row);
        }
    });
}

// 미니 영수증 생성 함수
function createReceiptElement(data, mealType, dateStr) {
    const div = document.createElement('div');
    div.className = 'mini-receipt'; 
    
    const randomRotate = Math.random() * 4 - 2; 
    div.style.transform = `rotate(${randomRotate}deg)`;
    
    div.style.cursor = 'pointer';

    const mealNameKO = { 'morning': '아침', 'lunch': '점심', 'dinner': '저녁' };
    
    const formattedDate = dateStr.replace(/-/g, '/');

    div.innerHTML = `
        <div class="pin"></div>
        
        <div class="wongoji-header">
             <img src="../image/title2.png" class="title-img-mini" alt="오늘의 시메추">
        </div>
        <div class="date-info-row">
            <span>${formattedDate} ☀</span>
            <span>${mealNameKO[mealType]} 메뉴</span>
        </div>

        <div class="receipt-body">
            <div class="menu-name">${data.name}</div>
            
            <img class="menu-img" 
                 src="${data.image}" 
                 alt="${data.name}" 
                 onerror="this.onerror=null; this.src='../image/default_food.png';">
                 
            <div class="menu-desc">
                "${data.desc}"
            </div>
        </div>

        <div class="receipt-footer">
            <div class="barcode">${Math.floor(Math.random() * 89999 + 10000)}</div>
        </div>
    `;
    
    div.onclick = () => {
        openModal(data, mealType, dateStr);
    };

    return div;
}

// 모달 열기 함수 (큰 영수증)
function openModal(data, mealType, dateStr) {
    const modal = document.getElementById('receipt-modal');
    const mealNameKO = { 'morning': '아침', 'lunch': '점심', 'dinner': '저녁' };
    
    const titleArea = document.getElementById('modal-title-area');
    if (titleArea) {
       titleArea.innerHTML = `<img src="../image/title.png" class="title-img-large" alt="오늘의 시메추">`;
    }

    // 텍스트 정보 채우기
    document.getElementById('modal-date').innerText = dateStr.replace(/-/g, '/') + " ☀";
    document.getElementById('modal-time').innerText = mealNameKO[mealType] + " 메뉴";
    document.getElementById('modal-menu-name').innerText = data.name;
    document.getElementById('modal-desc').innerText = `"${data.desc}"`;
    
    // 이미지 채우기
    const imgElement = document.getElementById('modal-img');
    imgElement.src = data.image;
    imgElement.onerror = () => { imgElement.src = '../image/pasta.png'; };

    // 바코드 설정 및 이동 기능
    const barcodeBtn = document.getElementById('modal-barcode');
    
    const displayCode = data.id 
        ? String(data.id).padStart(8, '0') 
        : Math.floor(Math.random() * 8999999 + 1000000);

    barcodeBtn.innerText = displayCode;
    // 바코드 클릭 시 시(Poetry) 페이지로 이동
    barcodeBtn.onclick = () => {
        if (data.id) {
            window.location.href = `../poetry/poetry.html?id=${data.id}&viewMode=true`;
        } else {
            alert("이 메뉴에 연결된 상세 정보를 찾을 수 없습니다.");
        }
    };

    modal.style.display = 'flex';
}

//모달 닫기 함수
function closeModal() {
    const modal = document.getElementById('receipt-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}