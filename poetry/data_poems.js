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
                src: "/image/lemon1.png", // 파일 필요
                startAt: 0,
                endAt: 4,
                style: {
                    position: "absolute",
                    top: "20%",      
                    left: "10%",
                    width: "80%",
                    transform: "",
                    zIndex: "5"
                }
            },
            {
                src: "/image/lemon2.png", // 파일 필요
                startAt: 2,
                endAt: 4,
                style: {
                    position: "absolute",
                    top: "42%",      
                    left: "15%",
                    width: "45%",
                    transform: "",
                    zIndex: "5"
                }
            },
            {
                src: "/image/lemon3.png", // 파일 필요
                startAt: 4,
                endAt: 4,
                style: {
                    position: "absolute",
                    top: "60%",      
                    left: "30%",
                    width: "55%",
                    transform: "",
                    zIndex: "5"
                }
            },
            {
                src: "/image/lemon4.png", // 파일 필요
                startAt: 5,
                endAt: 6,
                style: {
                    position: "absolute",
                    top: "40%",      
                    left: "20%",
                    width: "75%",
                    transform: "",
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
                src: "/image/red1.png",
                startAt: 0,
                endAt:1,
                style: {
                    position: "absolute",
                    top: "40%",   
                    left: "47%",  
                    width: "75%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            },
            {
                src: "/image/red2.png",
                startAt: 1,
                endAt:1, 
                style: {
                    position: "absolute",
                    top: "65%",   
                    left: "64%",  
                    width: "70%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                src: "/image/red3.png",
                startAt: 2,
                endAt:3, 
                style: {
                    position: "absolute",
                    top: "35%",   
                    left: "50%",  
                    width: "120%", 
                    transform: "translate(-50%, 40%) rotate(40deg)",
                    zIndex: "10"
                }
            },
            {
                src: "/image/red4.png",
                startAt: 4,
                endAt:5, 
                style: {
                    position: "absolute",
                    top: "50%",   
                    left: "50%",  
                    width: "75%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            }
            
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
                src: "/image/kimchi1.png",
                startAt: 0, // 1연부터 등장
                style: {
                    position: "absolute",
                    top: "70%",   
                    left: "50%",  
                    width: "135%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            },
            {
                src: "/image/kimchi2.png",
                startAt: 1, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "27%",   
                    left: "37%",  
                    width: "55%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                src: "/image/kimchi3.png",
                startAt: 2, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "45%",   
                    left: "72%",  
                    width: "65%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            }
            
            
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
                src: "/image/chicken.png",
                startAt: 0, // 1연부터 등장
                style: {
                    position: "absolute",
                    top: "50%",   
                    left: "53%",  
                    width: "97%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            }
           
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
                src: "/image/potato.png",
                startAt: 0, // 1연부터 등장
                endAt:2,
                style: {
                    position: "absolute",
                    top: "65%",   
                    left: "50%",  
                    width: "80%", 
                    transform: "translate(-50%, -50%)", 
                    zIndex: "5"
                }
            },
            {
                src: "/image/potato2.png",
                startAt: 2, // 3연부터 등장
                endAt:2,
                style: {
                    position: "absolute",
                    top: "40%",   
                    left: "40%",  
                    width: "70%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                src: "/image/potato3.png",
                startAt: 3, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "30%",   
                    left: "40%",  
                    width: "70%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            },
            {
                src: "/image/potato4.png",
                startAt: 4, // 3연부터 등장
                style: {
                    position: "absolute",
                    top: "60%",   
                    left: "60%",  
                    width: "60%", 
                    transform: "translate(-50%, -50%)",
                    zIndex: "10"
                }
            }
            
        ]
    },
    {
        id: 7,
        title: "가을 햇볕",
        author: "안도현",

        stanzas: [
            "가을 햇볕 한마당 고추 말리는 마을 지나가면\n가슴이 뛴다",
            "아가야\n저렇듯 맵게 살아야 한다",
            "호호 눈물 빠지며 밥 비벼먹는\n고추장도 되고",
            "그럴 때 속을 달래는 찬물의 빛나는\n사랑도 되고"
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
            
        ]
    },
    {
        id: 8,
        title: "어느 늦은 저녁 나는",
        author: "한강",

        stanzas: [
            "어느\n늦은 저녁 나는",
            "흰 공기에 담긴 밥에서\n김이 피어 올라오는 것을 보고 있었다",
            "그때 알았다\n무엇인가 영원히 지나가버렸다고\n지금도 영원히\n지나가버리고 있다고",
            "밥을 먹어야지",
            "나는 밥을 먹었다"
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
            
        ]
    }

];