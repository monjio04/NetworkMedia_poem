const poems = [
    // ======================================================
    // [1번 시] 조개껍질
    // ======================================================
    {
        id: 1,
        title: "조개껍질",
        author: "윤동주",

        stanzas: [
            "아롱아롱 조개 껍데기\n울언니 바닷가에서\n주워온 조개 껍데기", 
            "여긴 북쪽 나라요\n조개는 귀여운 선물\n장난감 조개 껍데기",
            "데굴데굴 굴리며 놀다\n짝 잃은 조개 껍데기\n한 짝을 그리워 하네",
            "아롱아롱 조개 껍데기\n나처럼 그리워 하네\n물 소리 바닷물 소리"
        ],
        
        // 2. 일러스트 이미지 설정
        objects: [
            {
                src: "/image/shell.png",
                startAt: 0, // 1연부터 등장
                style: {
                    position: "absolute",
                    top: "25%",   
                    left: "70%",  
                    width: "40%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            },
            {
                src: "/image/shell2.png",
                startAt: 2, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "48%",   
                    left: "40%",  
                    width: "60%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                type: "video",       // ✨ 핵심: 이것은 비디오다! 라고 알려줌
                src: "/video/ocean.mp4",
                startAt: 3,          // ✨ 핵심: 4연(index 3)부터 등장
                style: {
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "45%",
                    objectFit: "cover",
                    mixBlendMode: "multiply",
                    //opacity: "0.8",
                    zIndex: "1",      // 이미지가 가려지지 않게 뒤로 배치
                
                    "mask-image": "linear-gradient(to top, black 85%, transparent 100%)",
                    "-webkit-mask-image": "linear-gradient(to top, black 85%, transparent 100%)"
                }
            },
            
        ]
    },

    // ======================================================
    // [2번 시] 레몬과 들뜨던 청춘을
    // ======================================================
    {
        id: 2,
        title: "레몬과 들뜨던 청춘을",
        author: "차정은",
        
         stanzas: [

            "원래 여름을 맞이할 계절은 겨울이잖아",
            "여름이 아닌 계절을 사랑하고겨울의 나약한 헛됨이 으스러지지 않도록",
            "레몬의 신맛이 입안에 감돌면시리게 짜인 세상을 후회 없게 살아보자\n그렇게 달달한 여름의 한 컷을 남겨보자",
            "뜨겁고 신맛에 중독되어 그렇게 여름의 삶에서 벗어날 수없는 것을 알게 된다면",
            "발버둥 쳤던 모든 것들이 바다를 담은 커다란 어항에 금이 가버린 것이 아닐까",
            "우리가 기억했던 여름은 그저 청춘의 한 컷일 뿐이니\n상상하면 입에 고이는 레몬의 씁쓸함과 시린맛을 느껴보자\n그렇게 여름을 그리며 만들어가자"
            ,"내일의 새벽에는 청춘 속 레몬을 가득 심어 상기시고\n입안에 머금은 레몬의 신맛은가녀린 목뒤로 삼켜 마시자"

        ],
        
        objects: [
            {
                src: "image/lemon.png", // 파일 필요
                startAt: 0,
                style: {
                    position: "absolute",
                    top: "30%",      
                    left: "50%",
                    width: "30%",
                    transform: "translate(-50%, -50%) rotate(15deg)",
                    zIndex: "5"
                }
            }
        ]
    },
        {
        id: 3,
        title: "붉은 빛",
        author: "손택수",

        stanzas: [
            "뽈찜을 먹습니다 대구는 볼을부비며\n사랑을 나누는 버릇이 있다지요", 
            "한때 저도 그러하였습니다 이쁜 것이 보이면 먼저\n볼을 부비고 싶었지요\n볼에 불을 일으키고 싶었지요",
            "볼이 떨어져나갈 듯 치운 날이었어요\n大口처럼 벌어진 진해만과 가덕만 사이",
            "한류와 난류도 볼을 부비면서\n살이 오르는 곳",
            "동백처럼 탱탱 언 볼에 감아드린\n목도리도 제 살갗이었습니다\n동해 시린 물을 맞던 남해 물결이었습니다",
            "대구 알처럼 붉은빛이,\n당신 볼에도 여전합니까"
        ],
        
        // 2. 일러스트 이미지 설정
        objects: [
            {
                src: "/image/shell.png",
                startAt: 0, // 1연부터 등장
                style: {
                    position: "absolute",
                    top: "25%",   
                    left: "70%",  
                    width: "40%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            },
            {
                src: "/image/shell2.png",
                startAt: 2, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "48%",   
                    left: "40%",  
                    width: "60%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                type: "video",       // ✨ 핵심: 이것은 비디오다! 라고 알려줌
                src: "/video/ocean.mp4",
                startAt: 3,          // ✨ 핵심: 4연(index 3)부터 등장
                style: {
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "45%",
                    objectFit: "cover",
                    mixBlendMode: "multiply",
                    //opacity: "0.8",
                    zIndex: "1",      // 이미지가 가려지지 않게 뒤로 배치
                
                    "mask-image": "linear-gradient(to top, black 85%, transparent 100%)",
                    "-webkit-mask-image": "linear-gradient(to top, black 85%, transparent 100%)"
                }
            },

            
            
        ]
    },
    {
        id: 4,
        title: "추야일경",
        author: "백석",

        stanzas: [
            "닭이 두 홰나 울었는데\n안방 큰방은 홰즛하니 당등을하고\n인간들은 모두 웅성웅성 깨여있어서들", 
            "오가리며 석박디를 썰고\n생강에 파에 청각에 마눌을 다지고",
            "시레기를 삶는 훈훈한 방안에는\n양염 내음새가 싱싱도 하다",
            "밖에는 어데서 물새가 우는데\n토방에선 햇콩두부가 고요히 숨이 들어갔다"
        ],
        
        // 2. 일러스트 이미지 설정
        objects: [
            {
                src: "/image/shell.png",
                startAt: 0, // 1연부터 등장
                style: {
                    position: "absolute",
                    top: "25%",   
                    left: "70%",  
                    width: "40%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            },
            {
                src: "/image/shell2.png",
                startAt: 2, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "48%",   
                    left: "40%",  
                    width: "60%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                type: "video",       // ✨ 핵심: 이것은 비디오다! 라고 알려줌
                src: "/video/ocean.mp4",
                startAt: 3,          // ✨ 핵심: 4연(index 3)부터 등장
                style: {
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "45%",
                    objectFit: "cover",
                    mixBlendMode: "multiply",
                    //opacity: "0.8",
                    zIndex: "1",      // 이미지가 가려지지 않게 뒤로 배치
                
                    "mask-image": "linear-gradient(to top, black 85%, transparent 100%)",
                    "-webkit-mask-image": "linear-gradient(to top, black 85%, transparent 100%)"
                }
            },  
            
        ]
    },{
        id: 5,
        title: "통닭구이",
        author: "김옥종",

        stanzas: [
            "나는 늙어 가는데\n너는 익어 가는구나",
            "내 생도 한번쯤은\n감칠맛 나게 뜯기고 싶다."
        ],
        
        // 2. 일러스트 이미지 설정
        objects: [
            {
                src: "/image/shell.png",
                startAt: 0, // 1연부터 등장
                style: {
                    position: "absolute",
                    top: "25%",   
                    left: "70%",  
                    width: "40%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            },
            {
                src: "/image/shell2.png",
                startAt: 2, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "48%",   
                    left: "40%",  
                    width: "60%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                type: "video",       // ✨ 핵심: 이것은 비디오다! 라고 알려줌
                src: "/video/ocean.mp4",
                startAt: 3,          // ✨ 핵심: 4연(index 3)부터 등장
                style: {
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "45%",
                    objectFit: "cover",
                    mixBlendMode: "multiply",
                    //opacity: "0.8",
                    zIndex: "1",      // 이미지가 가려지지 않게 뒤로 배치
                
                    "mask-image": "linear-gradient(to top, black 85%, transparent 100%)",
                    "-webkit-mask-image": "linear-gradient(to top, black 85%, transparent 100%)"
                }
            },  
            
        ]
    },
    {
        id: 6,
        title: "감자의 맛",
        author: "이해인",

        stanzas: [
            "통째로 삶은\n하얀 감자를\n한 개만 먹어도",
            "마음이 따뜻하고\n부드럽고 넉넉해지네",
            "고구마처럼 달지도 않고\n호박이나 가지처럼\n무르지도 않으면서",
            "싱겁지 않은\n담담하고 차분한\n중용의 맛",
            "화가 날 때는\n감자를 먹으면서\n모난 마음을 달래야겠다"
        ],
        
        // 2. 일러스트 이미지 설정
        objects: [
            {
                src: "/image/shell.png",
                startAt: 0, // 1연부터 등장
                style: {
                    position: "absolute",
                    top: "25%",   
                    left: "70%",  
                    width: "40%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            },
            {
                src: "/image/shell2.png",
                startAt: 2, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "48%",   
                    left: "40%",  
                    width: "60%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                type: "video",       // ✨ 핵심: 이것은 비디오다! 라고 알려줌
                src: "/video/ocean.mp4",
                startAt: 3,          // ✨ 핵심: 4연(index 3)부터 등장
                style: {
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "45%",
                    objectFit: "cover",
                    mixBlendMode: "multiply",
                    //opacity: "0.8",
                    zIndex: "1",      // 이미지가 가려지지 않게 뒤로 배치
                
                    "mask-image": "linear-gradient(to top, black 85%, transparent 100%)",
                    "-webkit-mask-image": "linear-gradient(to top, black 85%, transparent 100%)"
                }
            },  
            
        ]
    },
    {
        id: 7,
        title: "그게 비빔밥이라고 본다",
        author: "윤성학",

        stanzas: [
            "기억해\n그때 당신이 했던 말\n전주비빔밥이든, 골동반이든,궁중비빔밥이든\n혹은 새싹비빔밥이든",
            "재료 다듬어 준비하고 각색 웃기 부쳐 올리고\n갖은 양념 대령하고",
            "그때 당신이 했던 말\n수저를 내려놓으며,\n그럼 뭘해\n이렇게 뭐가 뭔지 모르게 한군데 부대껴",
            "품새 뭉개지고 빛깔마다 헝클어져버렸네\n나 참, 참 나 닮았네",
            "그러다 다시 대접에 숟가락을 삽날처럼 박아넣으며\n정색 반색 했던 말",
            "뭉게지고 흐트러지고 얽히고설킬 것\n다 알면서도\n보기 좋게 먹기 좋게 장만하고",
            "한입 크기 다듬어\n형형이 색색이 본새로 올려놓은 마음\n나는 그걸 비빔밥이라 본다던"
        ],
        
        // 2. 일러스트 이미지 설정
        objects: [
            {
                src: "/image/shell.png",
                startAt: 0, // 1연부터 등장
                style: {
                    position: "absolute",
                    top: "25%",   
                    left: "70%",  
                    width: "40%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            },
            {
                src: "/image/shell2.png",
                startAt: 2, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "48%",   
                    left: "40%",  
                    width: "60%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                type: "video",       // ✨ 핵심: 이것은 비디오다! 라고 알려줌
                src: "/video/ocean.mp4",
                startAt: 3,          // ✨ 핵심: 4연(index 3)부터 등장
                style: {
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "45%",
                    objectFit: "cover",
                    mixBlendMode: "multiply",
                    //opacity: "0.8",
                    zIndex: "1",      // 이미지가 가려지지 않게 뒤로 배치
                
                    "mask-image": "linear-gradient(to top, black 85%, transparent 100%)",
                    "-webkit-mask-image": "linear-gradient(to top, black 85%, transparent 100%)"
                }
            },  
            
        ]
    }

];