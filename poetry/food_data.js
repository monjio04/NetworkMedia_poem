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
            weather: "맑은 날, 가볍고 산뜻한 오일 파스타가 딱이에요.",
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
    },
    "초계국수": {
        tags: {
            color: "White", 
            weather: ["Sun", "Clear"], 
            season: ["Summer"],
            exclude_season: ["Winter"]
        },
        ment: {
            // [기본] 시의 '신맛'과 '시린 느낌'을 연결
            default: "입안에 감도는 레몬의 신맛 대신, 코끝 찡한 겨자의 톡 쏘는 맛으로 이 여름을 기억해요.",
            // [날씨] 더운 날
            weather: "뜨거운 햇살 아래, 뼛속까지 시린 살얼음 육수를 삼키며 여름의 열기를 식혀보아요.",
            // [계절] 여름
            season: "여름이 아닌 계절을 사랑할 수 없게 만드는, 가장 완벽한 여름의 맛입니다.",
            // [색깔] 투명/흰색
            color: "투명한 얼음 육수 속에 담긴 순수한 청춘의 에너지를 마셔보세요."
        },
        image: "/image/chogye.png"
    },

    "연어 메밀 소바": {
        tags: {
            color: "Red", // 연어의 붉은색
            weather: ["Clear", "Clouds"],
            season: ["Summer"],
            exclude_season: []
        },
        ment: {
            // [기본] 시의 '바다', '어항' 이미지 연결
            default: "바다를 담은 커다란 그릇 위로, 붉은 연어와 시원한 메밀면이 파도처럼 밀려옵니다.",
            // [날씨] 
            weather: "후회 없이 살아낸 오늘 하루, 이 달달하고 짭조름한 소바로 '여름의 한 컷'을 남겨보세요.",
            // [계절]
            season: "후회 없이 살아낸 오늘 하루, 이 달달하고 짭조름한 소바로 '여름의 한 컷'을 남겨보세요.",
            // [색깔] 붉은색
            color: "싱싱한 주황빛 연어처럼, 당신의 청춘도 가장 선명한 색으로 빛나고 있어요."
        },
        image: "/image/salmon_soba.png"
    },

    "열무 냉면": {
        tags: {
            color: "Green", 
            weather: ["Clear", "Rain", "Clouds"], 
            season: ["All"],
            exclude_season: []
        },
        ment: {
            // [기본] 시의 '새벽', '청춘' 이미지 연결
            default: "흔들리는 청춘이라도 배는 든든해야죠. 싱그러운 야채와 고기로 내일의 새벽을 맞이할 힘을 채워요.",
            // [날씨]
            weather: "기분이 가라앉는 날, 푸른 들판 같은 샐러드 위에서, 뜨거운 여름을 견뎌낼 건강한 에너지를 얻어가세요.",
            // [계절]
            season: "푸른 들판 같은 샐러드 위에서, 뜨거운 여름을 견뎌낼 건강한 에너지를 얻어가세요.",
            // [색깔] 초록색
            color: "싱그러운 초록빛 야채와 노릇한 고기가 어우러진, 후회 없는 건강한 한 끼입니다."
        },
        image: "/image/Naengmyeon.png"
    },

    "대구뽈찜": {
        tags: {
            color: "Red", 
            weather: ["Rain", "Snow", "Mist"], 
            season: ["Winter", "Autumn"],      
            exclude_season: []
        },
        ment: {
            // 시의 '볼에 불을 일으키다'는 표현 활용
            default: "차가운 볼에 불을 지피듯, 매콤하고 화끈한 양념이 매력적인 뽈찜입니다.",
            weather: "살이 에일 듯 추운 날, 당신의 체온을 가장 뜨겁게 높여줄 메뉴예요.",
            season: "한류와 난류가 만나 살이 오른 대구처럼, 제철의 풍미가 가득합니다.",
            color: "사랑을 나누듯 붉게 물든 양념이 식탁 위에 생기를 불어넣을 거예요."
        },
        image: "/image/cod_cheeks.png" 
    },

    "알탕": {
        tags: {
            color: "Red",
            weather: ["Snow", "Rain", "Clouds"], 
            season: ["Winter"],
            exclude_season: ["Summer"]
        },
        ment: {
            // 시의 '동해 시린 물', '붉은 빛' 활용
            default: "동해의 시린 물결도 녹여버릴, 붉고 뜨끈한 국물의 알탕입니다.",
            weather: "동백꽃처럼 꽁꽁 언 몸과 마음을 국물 한 모금으로 따뜻하게 감싸주세요.",
            season: "겨울바다의 붉은 보석 같은 알탕으로 든든하게 속을 채워보세요.",
            color: "대구 알처럼 선명한 붉은 빛이 당신의 볼을 다시 발그레하게 만들 거예요."
        },
        image: "/image/roe_stew.png" 
    },
    "김치찌개": {
        tags: {
            color: "Red", 
            weather: ["Snow", "Rain", "Mist"], // 흐린 날 국물
            season: ["Winter", "Autumn"],      // 겨울 음식
            exclude_season: []
        },
        ment: {
            // "양염 내음새가 싱싱도 하다" 인용
            default: "양념 냄새가 싱싱하게 감돌던 그 밤처럼, 푹 익은 김치 향이 입맛을 돋우는 찌개입니다.",
            weather: "찬 바람이 문풍지를 울리는 날, 보글보글 끓는 빨간 국물만큼 확실한 행복은 없죠.",
            season: "김장철의 분주함과 훈훈함을 뚝배기 한 그릇에 진하게 담아냈습니다.",
            color: "잘 익은 붉은 김치와 두툼한 고기가 어우러진, 한국인의 소울 푸드입니다."
        },
        image: "/image/kimchi_jjigae.png" 
    },
    "보쌈": {
        tags: {
            color: "Brown", 
            weather: ["Clear", "Clouds", "Snow"], 
            season: ["Autumn", "Winter"], // 김장철
            exclude_season: []
        },
        ment: {
            // "생강에 파에 청각에 마눌을 다지고" -> 김장 속재료와 고기
            default: "갖은 양념을 다져 김장을 마친 날, 갓 삶은 야들야들한 수육 한 점 어떠세요?",
            weather: "가족들이 옹기종기 모인 밤, 아삭한 갓 담근 김치와 든든한 고기로 몸과 마음을 채워보세요.",
            season: "토방의 햇콩두부와 갓 담근 김치, 그리고 따뜻한 고기가 만난 가을의 성찬입니다.",
            color: "윤기가 흐르는 고기에 붉은 김치소를 얹으면, 그곳이 바로 훈훈한 안방입니다."
        },
        image: "/image/bossam.png" 
    },
    "후라이드 치킨": {
        tags: {
            color: "Yellow", 
            weather: ["Rain", "Clear", "Sun"], 
            season: ["Summer", "All"], 
            exclude_season: []
        },
        ment: {
            // [기본] "너는 익어 가는구나" 인용 -> 노릇한 시각적 이미지 강조
            default: "시원한 바람이 부는 날, 닭다리 하나를 뜯으며 하루의 피로를 바삭하게 날려보세요.",
            // [날씨]
            weather: "늙어가는 것은 서글프다지만, 노릇하게 익어가는 것은 이토록 먹음직스럽네요.",
            // [계절]
            season: "불타오르는 인생처럼, 가장 뜨겁고 가장 치열하게 익어버린 살결을 맛보세요.",
            color: "당신의 시간도 저 황금빛 튀김옷처럼, 늙는 것이 아니라 맛있게 익어가고 있을 거예요."
        },
        image: "/image/fried_chicken.png"
    },

    "치킨마요덮밥": {
        tags: {
            color: "Yellow", 
            weather: ["Clear", "Clouds", "Rain"], 
            season: ["All"], 
            exclude_season: []
        },
        ment: {
            // [기본] "뜯기고 싶다" -> 잘게 찢겨진 형태와 연결
            default: "'감칠맛 나게 뜯기고 싶다'던 그 소원처럼, 잘게 찢겨 밥알 사이로 스며든 치킨의 맛을 느껴보세요.",
            // [날씨]
            weather: "마음이 헛헛한 날, 짭조름한 간장과 고소한 마요네즈가 당신의 빈속을 꽉 채워줄 겁니다.",
            // [계절]
            season: "화려했던 튀김옷을 벗고, 가장 부드럽고 순한 모습으로 당신의 한 끼가 되어줄게요.",
            // [색깔] 노랑+하양
            color: "부서지고 으깨져서 비로소 완성된, 비장하고도 달콤한 감칠맛의 세계입니다."
        },
        image: "/image/chicken_mayo.png"
    },
    "육회비빔밥": {
        tags: {
            color: "Red", 
            weather: ["Clear", "Clouds"], 
            season: ["All"],
            exclude_season: []
        },
        ment: {
            // [기본] "형형이 색색이 본새로 올려놓은 마음" 인용
            default: "어차피 뭉개질 것을 알면서도, 당신을 위해 '형형이 색색이' 공들여 쌓아 올린 마음을 드세요.",
            // [날씨]
            weather: "마음이 흐트러진 날, 선홍빛 육회와 오색 나물의 정갈함이 당신을 위로해 줄 거예요.",
            // [계절]
            season: "뒤섞이기 직전의 가장 화려한 순간! 찰나의 아름다움을 입안 가득 즐겨보세요.",
            // [색깔] 붉은색
            color: "붉은 육회와 노란 노른자가 섞이며 만들어내는, 가장 처절하고도 아름다운 맛의 조화입니다."
        },
        image: "/image/yukhoe_bibim.png"
    },

    "돌솥비빔밥": {
        tags: {
            color: "Brown", 
            weather: ["Rain", "Snow", "Mist"], 
            season: ["Winter", "Autumn"], 
            exclude_season: ["Summer"] 
        },
        ment: {
            // [기본] "숟가락을 삽날처럼 박아넣으며" 인용
            default: "시의 구절처럼 숟가락을 삽날처럼 꽂아보세요. 뜨겁게 얽히고설켜야 비로소 완성되는 맛입니다.",
            // [날씨]
            weather: "타닥타닥 타오르는 돌솥의 소리가, 복잡하게 엉킨 당신의 속을 시원하게 뚫어줄 거예요.",
            // [계절]
            season: "차가운 세상 속에서, 끝까지 식지 않고 당신의 편이 되어줄 뜨끈한 한 끼입니다.",
            // [색깔] 갈색 (누룽지)
            color: "바닥까지 벅벅 긁어 드세요. 상처 입고 눌어붙은 마음일수록 씹을수록 고소하니까요."
        },
        image: "/image/dolsot_bibim.png"
    },
    "감자옹심이": {
        tags: {
            color: "Brown", 
            weather: ["Rain", "Snow", "Mist"], 
            season: ["Winter", "Autumn"], 
            exclude_season: ["Summer"]
        },
        ment: {
            // [기본] "모난 마음을 달래야겠다" -> 둥근 모양과 식감
            default: "화가 날 때는 둥근 옹심이를 드세요. 뾰족하고 모난 마음이 국물처럼 부드럽게 풀릴 거예요.",
            // [날씨]
            weather: "몸이 으슬으슬한 날, 따뜻하고 쫄깃한 옹심이가 당신을 가장 순하게 위로해 줍니다.",
            // [계절]
            season: "투박해 보이지만 속은 꽉 찬 맛. 호박이나 가지처럼 무르지 않은 쫄깃함이 매력적이죠.",
            // [색깔]
            color: "화려하지 않은 수수한 빛깔 속에, 그 어떤 산해진미보다 깊은 넉넉함이 담겨 있습니다."
        },
        image: "/image/potato_ongsimi.png" 
    },

    "감자전": {
        tags: {
            color: "Yellow", 
            weather: ["Rain", "Mist"], 
            season: ["Summer", "Autumn"], 
            exclude_season: []
        },
        ment: {
            // [기본] "중용의 맛", "달지도 무르지도 않은"
            default: "고구마처럼 달지도, 가지처럼 무르지도 않은 '담담하고 차분한 중용의 맛'을 느껴보세요.",
            // [날씨]
            weather: "빗소리와 함께 지글지글 익어가는 고소한 향기가, 복잡한 머릿속을 차분하게 비워줄 겁니다.",
            // [계절]
            season: "가장자리 바삭함과 안쪽의 쫀득함이 어우러져, 싱겁지 않은 인생의 즐거움을 선사합니다.",
            // [색깔]
            color: "노릇노릇하게 익은 감자전 한 장이면, 세상 부러울 것 없는 넉넉한 마음이 됩니다."
        },
        image: "/image/potato_jeon.png"
    },

    "감자탕": {
        tags: {
            color: "Red", 
            weather: ["Snow", "Rain", "Clouds"], 
            season: ["Winter", "Autumn"], 
            exclude_season: ["Summer"]
        },
        ment: {
            // [기본] "마음이 따뜻하고 넉넉해지네" -> 푸짐함
            default: "큼직한 통감자와 푸짐한 고기를 보세요. 한 그릇만 비워도 '마음이 따뜻하고 넉넉해'집니다.",
            weather: "찬 바람 부는 날, 얼큰한 국물 속에 숨겨진 하얀 감자의 포근함이 언 몸을 녹여줄 거예요.",
            season: "여럿이 둘러앉아 나누어 먹다 보면, 어느새 '화가 날 때'의 기억은 눈 녹듯 사라지죠.",
            color: "투박한 껍질 속 하얀 속살처럼, 붉은 국물 속에 숨겨진 부드러운 위로를 맛보세요."
        },
        image: "/image/gamjatang.png"
    }
    
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
    "레몬과 들뜨던 청춘을": {
        theme_color: "Green", // 샐러드의 싱그러움 + 청춘의 푸르름
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "초계국수", 
                // "신맛을 삼켜 마시자"는 시구 인용
                custom_ment: "레몬의 신맛 대신, 코끝 찡한 겨자 맛 육수를 가녀린 목 뒤로 시원하게 삼켜 마시자구요!"
            },
            { 
                menu: "연어 메밀 소바",
                // "바다를 담은 어항", "여름의 한 컷" 인용
                custom_ment: "바다를 담은 커다란 그릇 안에서, 연어와 함께 달달한 여름의 한 컷을 남겨보세요."
            },
            { 
                menu: "열무 냉면",
                // "내일의 새벽", "청춘" 인용
                custom_ment: "내일의 새벽을 위해, 풀내음 가득한 샐러드와 든든한 고기로 청춘의 허기를 달래보아요."
            }
        ]
    },
    "붉은 빛": {
        theme_color: "Red", 
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "대구뽈찜", 
                // "볼에 불을 일으키고 싶었지요" 인용 -> 화끈한 맛으로 연결
                custom_ment: "그때 볼에 불을 일으키고 싶었던 마음처럼, 화끈한 뽈찜으로 당신의 시린 볼을 붉게 데워보세요." 
            },
            { 
                menu: "알탕",
                // "대구 알처럼 붉은 빛이 당신 볼에도 여전합니까" 인용 -> 안부를 묻는 느낌
                custom_ment: "'대구 알처럼 붉은 빛이, 당신 볼에도 여전합니까?' 뜨끈한 국물로 그날의 안부를 전합니다."
            }
        ]
    },
    "추야일경": {
        theme_color: "Brown", // 흙, 된장, 나무의 색감
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "김치찌개", 
                custom_ment: "'양념 내음새가 싱싱도 하다'는 구절처럼, 푹 끓여낸 김치찌개의 깊은 향을 즐겨보세요." 
            },
            { 
                menu: "보쌈",
                custom_ment: "밤새 오가리와 석박지를 썰며 고생한 사람들과 함께, 갓 삶은 보쌈을 즐겨보세요"
            }
        ]
    },
    "통닭구이": {
        theme_color: "Yellow", 
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "후라이드 치킨", 
                custom_ment: "나는 늙어가는데 너는 참 맛있게도 익었구나. 오늘 밤은 너의 그 바삭한 생을 빌려야겠다." 
            },
            { 
                menu: "치킨마요덮밥",
                custom_ment: "'감칠맛 나게 뜯기고 싶다'던 바람처럼, 잘게 찢겨 밥과 하나 된 치킨의 깊은 풍미를 느껴보세요."
            }
        ]
    },"그게 비빔밥이라고 본다": {
        theme_color: "Red", 
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "육회비빔밥", 
                // 시의 주제: 뭉개짐의 미학 + 정성
                custom_ment: "'형형이 색색이 본새로 올려놓은 마음', 비록 비벼지면 사라질 모습이라도 그 정성만큼은 당신 것입니다." 
            },
            { 
                menu: "돌솥비빔밥",
                // 시의 행동: 숟가락을 삽날처럼 + 격렬한 비빔
                custom_ment: "숟가락을 삽날처럼 꽂아라! 인생도 밥도, 뜨겁게 부대끼고 얽히고설킬 때가 가장 맛있는 법이니까요."
            }
        ]
    },
    "감자의 맛": {
        theme_color: "White", 
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "감자옹심이", 
                // "모난 마음을 달래야겠다" -> 둥글게 빚은 음식
                custom_ment: "'화가 날 때는 모난 마음을 달래야겠다.' 동글동글 빚어낸 옹심이로 당신의 마음을 둥글게 어루만져 드릴게요." 
            },
            { 
                menu: "감자전", 
                // "담담하고 차분한 중용의 맛" -> 자극적이지 않은 본연의 맛
                custom_ment: "달지도 않고 무르지도 않은 '담담하고 차분한 중용의 맛'. 복잡한 세상 속에서 가장 순한 위로가 되어줄 거예요." 
            },
            { 
                menu: "감자탕",
                // "마음이 따뜻하고 넉넉해지네" -> 든든한 포만감
                custom_ment: "통째로 들어간 감자의 넉넉함! 얼큰하게 속을 채우고, 다시 따뜻하고 부드러운 마음이 되어보아요."
            }
        ]
    }

};