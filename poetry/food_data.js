const menuDB = {
    "바지락 칼국수": {
        tags: {
            color: "White",
            weather: ["Rain", "Snow", "Clouds", "Mist"],
            season: ["Spring", "Autumn", "Winter"],
            exclude_season: ["Summer"]
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
        image: "/image/pasta.png"
    },
    "꼬막 비빔밥": {
        tags: {
            color: "Red",
            weather: ["Clear"],
            season: ["Winter", "Spring"],
            exclude_season: ["Summer"]
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
        image: "/image/chogye.png"
    },
    "연어 메밀 소바": {
        tags: {
            color: "Red",
            weather: ["Clear", "Clouds"],
            season: ["Summer"],
            exclude_season: []
        },
        image: "/image/salmon_soba.png"
    },
    "열무 냉면": {
        tags: {
            color: "Green", 
            weather: ["Clear", "Clouds"], 
            season: ["All"],
            exclude_season: []
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
        image: "/image/cod_cheeks.png" 
    },
    "알탕": {
        tags: {
            color: "Red",
            weather: ["Snow", "Rain", "Clouds"], 
            season: ["Winter"],
            exclude_season: ["Summer"]
        },
        image: "/image/roe_stew.png" 
    },
    "김치찌개": {
        tags: {
            color: "Red", 
            weather: ["Snow", "Rain", "Mist"], 
            season: ["Winter", "Autumn"],      
            exclude_season: []
        },
        image: "/image/kimchi_jjigae.png" 
    },
    "보쌈": {
        tags: {
            color: "Brown", 
            weather: ["Clear", "Clouds", "Snow"], 
            season: ["Autumn", "Winter"], 
            exclude_season: []
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
        image: "/image/fried_chicken.png"
    },
    "치킨마요덮밥": {
        tags: {
            color: "Yellow", 
            weather: ["Clear", "Clouds", "Rain"], 
            season: ["All"], 
            exclude_season: []
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
        image: "/image/yukhoe_bibim.png"
    },
    "돌솥비빔밥": {
        tags: {
            color: "Brown", 
            weather: ["Rain", "Snow", "Mist"], 
            season: ["Winter", "Autumn"], 
            exclude_season: ["Summer"] 
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
        image: "/image/potato_ongsimi.png" 
    },
    "감자전": {
        tags: {
            color: "Yellow", 
            weather: ["Rain", "Mist"], 
            season: ["Summer", "Autumn"], 
            exclude_season: []
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
        image: "/image/gamjatang.png"
    },
    "제육볶음": {
        tags: {
            color: "Red", 
            weather: ["Rain", "Snow", "Clouds"], // 흐린 날 매운 거
            season: ["Autumn", "Winter", "All"], 
            exclude_season: []
        },
        image: "/image/jeyuk.png" // 이미지 경로 확인 필요
    },
    "된장찌개": {
        tags: {
            color: "Brown", 
            weather: ["ALL"], 
            season: ["All", "Winter"], 
            exclude_season: []
        },
        image: "/image/doenjang.png" // 이미지 파일명 확인 필요
    },
    "소고기무국": {
        tags: {
            color: "White", // 맑은 국물
            weather: ["Clear", "Snow", "Mist"], 
            season: ["Winter", "Autumn", "All"], 
            exclude_season: []
        },
        image: "/image/beef_radish.png" // 이미지 파일명 확인 필요
    },

};

const poemMap = {
    "조개껍질": {
        theme_color: "White",
        is_color_mode: false,
        recommendations: [
            { 
                menu: "바지락 칼국수", 
                custom_ment: {
                    default: "데굴데굴 굴러온 조개 껍데기의 이야기처럼, 바닷물 소리가 귓가에 맴도는 시예요. 조개의 향을 담아낸 따뜻한 국물 한 그릇, 오늘은 바지락 칼국수 어떠세요?",
                    weather: "빗소리가 바닷물 소리처럼 들리는 날, 껍데기 속에 숨은 조개처럼 마음도 웅크려져요. 김 오르는 국물에 바다 향을 담은 바지락 칼국수로 하루를 녹여보세요.",
                    season: "찬 바람이 불면 그리움도 더 깊어지죠. 시 속 조개 껍데기처럼 서로를 찾는 마음에 바지락의 따뜻함이 어울려요. 그리움까지 녹일 바지락 칼국수는 어떤가요?",
                    color: "아롱아롱 빛나는 조개 껍데기 색처럼, 부드럽고 포근한 바다의 색감이 떠오르는 날. 은은한 조개 향이 퍼지는 바지락 칼국수로 마음을 채워보세요."
                }
            },
            { 
                menu: "봉골레 파스타",
                custom_ment: {
                    default: "데굴데굴 굴러온 조개 껍데기의 작은 이야기. 바닷물 소리가 들릴 듯한 이 시에는 조개의 향을 올리브 오일에 담아낸 봉골레 파스타가 잘 어울려요.",
                    weather: "맑은 날, 아롱아롱 빛나는 조개와 바다의 짭조름함을 담은 산뜻한 오일 파스타는 어떤가요?",
                    season: "바람이 부드러워지는 계절, 아롱아롱 빛나는 조개 껍데기처럼 가볍고 산뜻한 바다의 맛이 생각나요. 오늘은 봉골레 파스타가 딱이에요.",
                    color:"바람이 부드러워지는 계절, 아롱아롱 빛나는 조개 껍데기처럼 가볍고 산뜻한 바다의 맛이 생각나요. 오늘은 봉골레 파스타가 딱이에요."
                }
            },
            { 
                menu: "꼬막 비빔밥",
                custom_ment: {
                    default: "껍데기 속에 꼭꼭 숨겨둔 바다의 맛. 손으로 하나하나 꺼내던 기억처럼 정성스러운 맛이 생각나는 날이에요. 오늘은 꼬막 비빔밥으로 바다를 비벼볼까요?",
                    weather: "햇살이 맑게 비치는 날, 바다도 마음도 또렷해지는 순간. 매콤한 양념에 바다 향을 더한 꼬막 비빔밥이 기분 좋게 어울려요.", 
                    season: "찬 바람이 지나가고 바다가 살이 오를 때. 껍데기 안에 숨은 계절을 비벼 꼬막 비빔밥으로 만나요.",
                    color:"붉은 양념이 입맛을 깨우는 순간, 조개 껍데기 안에 숨은 바다처럼 강렬하지만 정직한 맛. 오늘의 색은 붉은 빨강, 메뉴는 꼬막 비빔밥이에요."
                }
            }
        ]
    },
    "레몬과 들뜨던 청춘을": {
        theme_color: "Green", 
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "초계국수", 
                custom_ment: {
                    default: "레몬의 신맛이 입안에 맴도는 여름. 뜨거운 계절을 견디기 위해 코끝 찡한 초계국수는 어떤가요?",
                    weather: "햇빛이 너무 밝아 여름이 넘쳐 흐르는 날. 레몬 한 조각 띄운 듯 시원 상큼한 초계국수가 마음을 식혀줘요.",
                    season: "여름은 늘 갑작스럽고, 청춘은 늘 신맛이 남아요. 그 계절의 한 컷을 남기듯 오늘은 초계국수로 여름을 삼켜요.",
                    color:"여름은 늘 갑작스럽고, 청춘은 늘 신맛이 남아요. 그 계절의 한 컷을 남기듯 오늘은 초계국수로 여름을 삼켜요."
                }
            },
            { 
                menu: "연어 메밀 소바",
                custom_ment: {
                    default: "레몬의 씁쓸함처럼 쉽게 지나가지 않는 여름이 있어요. 차가운 메밀 위에 올린 붉은 연어처럼 선명하게 남는 청춘의 맛.",
                    weather: "맑다가도 흐려지는 하늘 아래, 여름의 감정은 늘 흔들리죠. 레몬처럼 상큼한 연어 메밀 소바로 여름을 그려나가보아요.",
                    season: "여름의 삶에서 쉽게 벗어날 수 없다는 걸 알게 될 때. 차갑게 식힌 메밀 위에 연어 메밀 소바를 올려요.",
                    color:"청춘의 한 컷처럼 또렷하게 남는 붉은 색. 여름의 기억은 연어 메밀 소바로 남아요."
                }
            },
            { 
                menu: "열무 냉면",
                custom_ment: {
                    default: "레몬처럼 먼저 닿는 새콤함. 곧이어 퍼지는 시원한 국물. 여름의 청춘은 이렇게 열무 냉면으로 식어가요.",
                    weather: "따사로운 햇볕 아래, 벗어날 수 없는 여름의 삷처럼 차갑고 새콤함에 중독되는 열무 냉면.",
                    season: "따사로운 햇볕 아래, 벗어날 수 없는 여름의 삷처럼 차갑고 새콤함에 중독되는 열무 냉면.",
                    color:"초록의 시원함 속에 여름을 심어두고. 한 젓가락마다 청춘이 아른거리는 열무 냉면."
                }
            }
        ]
    },
    "붉은 빛": {
        theme_color: "Red", 
        is_color_mode: false, 
        recommendations: [
            {
                menu: "대구뽈찜",
                custom_ment: {
                    default: "뽈찜을 먹습니다, 시가 그렇게 시작되듯. 볼을 부비며 살이 오른 대구처럼 붉고 뜨거운 마음이 남는 날이에요. 오늘은 대구뽈찜으로 그 붉은 빛을 마주해볼까요?",
                    weather: "비나 눈이 내려 바다가 흐릿해질수록, 매운 김이 더 선명해져요. 언 볼을 녹이듯 뜨겁게 올라오는 대구뽈찜이 잘 어울리는 날이에요.",
                    season: "찬 물을 맞으며 살이 오르는 계절. 동해의 시림과 남해의 온기가 겹쳐질 때, 제철의 붉은 맛 대구뽈찜이 가장 깊어져요.",
                    color: "대구 알처럼 붉은빛이 접시 위에 살아 있어요. 불처럼 오르는 매움과 살의 탄력이 만나는 색, 오늘의 붉음은 대구뽈찜이에요."
                }
            
            },
            { 
                 menu: "알탕",
                 custom_ment: {
                        default: "대구 알처럼 붉은빛이 여전한지 묻는 시처럼, 숟가락을 들면 먼저 색이 말을 걸어요. 뜨겁고 알알이 터지는 맛, 오늘은 알탕 어떠세요?",
                        weather: "눈이나 비가 내려 공기가 더 차가운 날엔, 속부터 데워줄 국물이 필요하죠. 붉게 끓어오르는 알탕이 몸과 마음을 붙잡아줘요.",
                        season: "겨울 바다의 시린 물을 견뎌낸 알들이 가장 단단해질 때. 제철의 붉은 국물, 이 계절엔 알탕이 제맛이에요.",
                        color: "알처럼 선명한 붉은색이 국물에 가득해요. 뜨거움과 생명이 함께 끓는 색, 오늘의 빨강은 알탕이에요."
                    }
            }
        ]
    },
    "추야일경": {
        theme_color: "Brown",
        is_color_mode: false, 
        recommendations: [
            {
                menu: "김치찌개",
                custom_ment: {
                    default: "밤이 깊어도 방 안은 아직 따뜻하고, 양념 냄새가 사람을 깨우는 시예요. 웅성거리던 김장 날 부엌의 온기처럼, 오늘은 김치찌개 한 냄비 어떠세요?",
                    weather: "하늘이 낮게 내려앉아 어둑한 날엔, 코끝을 맴도는 '싱싱한 양념 내음새'가 더 그리워집니다. 묵은지의 깊은 향이 눅눅한 기분을 개운하게 씻어줄 거예요.",
                    season: "가을에서 겨울로 넘어가는 밤, 시레기 삶는 냄새가 깊어질 때. 오래 끓여 더 진해진 김치찌개가 생각나는 계절이에요.",
                    color: "붉은 국물이 보글보글 끓어오르는 순간, 부엌의 밤이 살아나요. 오늘의 색은 붉은 빨강, 마음까지 데워주는 김치찌개예요."
                }
            },
            { 
                menu: "보쌈",
                custom_ment: {
                     default: "오가리며 석박디를 썰고, 모두 깨어 있던 밤의 풍경처럼. 함께 둘러앉아 천천히 먹기 좋은 보쌈, 오늘 상에 올려볼까요?",
                     weather: "하늘이 맑거나 구름이 낀 날, 눈까지 내려 더 고요해질 때. 갓 머무린 김치와 김 오르는 고기 한 점이 유난히 든든한 보쌈이 어울려요.",
                     season: "찬 바람이 들기 시작하면, 삶은 고기의 온기가 더 크게 느껴져요. 가을과 겨울 사이, 김장에는 보쌈이 가장 제 맛이에요.",
                     color: "잘 삶아낸 고기의 담담한 갈색 위로, 양념의 색이 곁들여져요. 과하지 않게 속을 채워주는 색, 오늘은 보쌈이에요."
            }
        }
        ]
    },
    "통닭구이": {
        theme_color: "Yellow", 
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "후라이드 치킨", 
                custom_ment: {
                    default: "나는 늙어가는데 너는 참 맛있게도 익었구나. 오늘 밤은 너의 그 바삭한 생을 빌려야겠다.",
                    weather: "비 오는 날의 치킨은 진리죠. 눅눅한 기분까지 바삭하게 튀겨버리세요.",
                    season: "뜨거운 여름밤, 시원한 맥주와 함께 이글거리는 청춘을 맛보세요."
                }
            },
            { 
                menu: "치킨마요덮밥",
                custom_ment: {
                    default: "'감칠맛 나게 뜯기고 싶다'던 바람처럼, 잘게 찢겨 밥과 하나 된 치킨의 깊은 풍미를 느껴보세요.",
                    weather: "마음이 헛헛한 날, 짭조름한 간장과 고소한 마요네즈가 빈속을 꽉 채워줄 겁니다.",
                    season: "화려했던 튀김옷을 벗고, 가장 부드럽고 순한 모습으로 당신의 한 끼가 되어줄게요."
                }
            }
        ]
    },
    "가을 햇볕": {
        theme_color: "Red", 
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "육회비빔밥", 
                custom_ment: {
                    default: "'호호 눈물 빠지며 밥 비벼 먹는' 그 맛! 고소한 육회에 매콤한 장을 더해, 인생의 희로애락을 쓱쓱 비벼 드세요.",
                    weather: "가을 햇볕처럼 선명한 선홍빛 육회! 맑은 날, 매콤한 고추장과 함께 당신의 입맛을 가장 신선하고 생동감 있게 깨워줄 메뉴입니다.",
                    season: "갖가지 재료가 어우러지는 한 그릇. 따사로운 가을 햇볕에 말린 고추장과 신선한 육회와 함께 풍요로운 맛을 즐겨보세요.",
                    color:"고추장 빛이 또렷하게 살아 있는 붉은 한 그릇. 가을 햇볕처럼 선명한 맛이 입안에 오래 남는 육회비빔밥이에요."
                             }
            },
            { 
                menu: "제육볶음", 
                custom_ment: {
                    default: "'맵게 살아야 한다는 말이 문득 마음에 남는 날이 있죠. 눈물 날 만큼 맵지만 결국 밥을 비비게 되는 제육볶음은 어떤가요?",
                    weather: "축 처지는 날씨엔 정신이 번쩍 드는 매운맛이 필요하죠. 불 앞에서 확 볶아낸 제육볶음의 매운맛이 당신의 기분을 좋게 만들어줄거에요.",
                    season: "가을 볕에 바짝 말린 고추의 맵싸한 향기! 그 태양의 에너지를 품은 제육의 붉은 양념이 당신의 계절을 뜨겁게 달굴 겁니다.",
                    color:"고추장 빛이 선명하게 올라오는 순간, 가슴이 먼저 뜨거워져요. 맵고 붉은 색처럼 단단하게 하루를 살아내게 하는 맛, 제육볶음 어떠세요?"
                }
            }
        ]
    },
    "감자의 맛": {
        theme_color: "White", 
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "감자옹심이", 
                custom_ment: {
                    default: "'화가 날 때는 모난 마음을 달래야겠다.' 동글동글 빚어낸 옹심이로 당신의 마음을 둥글게 어루만져 드릴게요.",
                    weather: "몸이 으슬으슬한 날, 따뜻하고 쫄깃한 옹심이가 당신을 가장 순하게 위로해 줍니다.",
                    season: "투박해 보이지만 속은 꽉 찬 맛. 호박이나 가지처럼 무르지 않은 쫄깃함이 매력적이죠."
                }
            },
            { 
                menu: "감자전", 
                custom_ment: {
                    default: "달지도 않고 무르지도 않은 '담담하고 차분한 중용의 맛'. 복잡한 세상 속에서 가장 순한 위로가 되어줄 거예요.",
                    weather: "빗소리와 함께 지글지글 익어가는 고소한 향기가, 복잡한 머릿속을 차분하게 비워줄 겁니다.",
                    season: "가장자리 바삭함과 안쪽의 쫀득함이 어우러져, 싱겁지 않은 인생의 즐거움을 선사합니다."
                }
            },
            { 
                menu: "감자탕",
                custom_ment: {
                    default: "통째로 들어간 감자의 넉넉함! 얼큰하게 속을 채우고, 다시 따뜻하고 부드러운 마음이 되어보아요.",
                    weather: "찬 바람 부는 날, 얼큰한 국물 속에 숨겨진 하얀 감자의 포근함이 언 몸을 녹여줄 거예요.",
                    season: "여럿이 둘러앉아 나누어 먹다 보면, 어느새 '화가 날 때'의 기억은 눈 녹듯 사라지죠."
                }
            }
        ]
    },
    "어느 늦은 저녁 나는": {
        theme_color: "White", // 흰 공기, 밥, 김(Steam)
        is_color_mode: false, 
        recommendations: [
            { 
                menu: "된장찌개", 
                custom_ment: {
                    default: "'밥을 먹어야지'라는 다짐처럼. 흰 쌀밥에 보글보글 끓는 구수한 된장찌개 한 숟가락이면, 다시 살아갈 힘이 생길 거예요.",
                    weather: "마음속에 비가 내리는 저녁, 투박한 뚝배기에서 피어오르는 따뜻한 온기가 당신의 차가운 손을 잡아줄 겁니다.",
                    season: "무언가 영원히 지나가 버린 것 같은 공허함. 어머니가 끓여주시던 그 깊은 맛으로 텅 빈 속을 든든히 채워보세요.",
                    color: "짙은 갈색 국물이 조용히 끓고 있어요. 화려하진 않아도 늘 믿고 먹던 색, 어머니의 된장찌개 같은 저녁이에요."
                }
            },
            { 
                menu: "소고기무국",
                custom_ment: {
                    default: "김이 모락모락 나는 흰 쌀밥 옆엔 맑은 무국이 제격이죠. 헛헛한 마음을 자극 없이 부드럽게 감싸줄 거예요.",
                    weather: "찬 바람에 마음이 시린 날, 달큰한 무와 고소한 소고기가 우러난 뜨끈한 국물이 속 깊은 위로를 건넵니다.",
                    season: "가을 무의 시원함이 담긴 국 한 그릇. 말없이 등을 토닥여주던 어머니의 손길처럼, 가장 순하고 따뜻한 맛.",
                    color: "투명한 국물 속에 무가 고요히 잠겨 있어요. 지나간 시간을 닮은 색, 어머니의 소고기무국 같은 저녁이에요."
                }
            }
        ]
    },
};