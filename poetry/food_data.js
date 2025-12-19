// ==========================================
// 1. 데이터베이스 (DB) - data.js
// ==========================================

// [MenuDB] 모든 메뉴의 상세 정보
const menuDB = {
    "바지락 칼국수": {
        tags: {
            color: "White",
            weather: ["Rain", "Snow", "Clouds", "Mist"],
            season: ["Spring", "Autumn", "Winter"],
            exclude_season: ["Summer"]
        },
        ment: {
            default: "시원한 바지락 국물이 일품인 메뉴예요.",
            weather: "비 오는 날, 뜨끈하고 시원한 국물 생각나지 않으세요?",
            season: "쌀쌀한 바람이 불 땐, 따뜻한 칼국수가 최고죠.",
            color: "하얀 파도 거품 같은 바지락 칼국수 어떠세요?"
        },
        image: "/image/noodle.png"
    },
    "봉골레 파스타": {
        tags: {
            color: "Yellow",
            weather: ["Clear", "Clouds"],
            season: ["All"],
            exclude_season: []
        },
        ment: {
            default: "바다 향이 은은하게 퍼지는 오일 파스타예요.",
            weather: "맑은 날, 가볍고 산뜻한 오일 파스타가 딱이에요./n맑은 날, 가볍고 산뜻한 오일 파스타가 딱이에요./n맑은 날, 가볍고 산뜻한 오일 파스타가 딱이에요.",
            season: "",
            color: "은은한 조개 빛깔을 닮은 봉골레 파스타예요."
        },
        image: "/image/pasta.png"
    },
    "꼬막 비빔밥": {
        tags: {
            color: "Red",
            weather: ["Clear"],
            season: ["Winter", "Spring"],
            exclude_season: ["Summer"]
        },
        ment: {
            default: "쫄깃한 식감과 매콤한 양념의 조화!",
            weather: "",
            season: "지금이 딱 제철! 통통하게 살이 오른 꼬막을 즐겨보세요.",
            color: "강렬한 붉은 양념이 입맛을 돋워줄 거예요."
        },
        image: "/image/bibimbap.png"
    }
    // ... 메뉴가 늘어나면 여기에 계속 추가
};

// [PoemMap] 시와 메뉴 매핑 정보
const poemMap = {
    "조개껍질": {
        theme_color: "White",
        is_color_mode: false,
        recommendations: [
            { 
                menu: "바지락 칼국수", 
                custom_ment: "시 속의 조개 껍데기처럼, 바다 내음 가득한 칼국수 한 그릇 어때요?" 
            },
            { 
                menu: "봉골레 파스타",
                custom_ment: "데굴데굴 굴러가는 조개들처럼 귀여운 봉골레 파스타는 어때요?"
            },
            { 
                menu: "꼬막 비빔밥",
                custom_ment: "조개의 쫄깃함을 제대로 느끼고 싶다면, 꼬막 비빔밥이 딱이죠."
            }
        ]
    },
    "붉은 노을": {
        theme_color: "Red",
        is_color_mode: true
    }
};