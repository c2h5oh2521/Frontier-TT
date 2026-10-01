/* ════════════════════════════════════════════════════════════
   사이트 내용은 이 파일만 고치면 됩니다 (모든 페이지가 함께 사용)
   ※ 시즌 결과, 베팅 금액, 순위는 전부 '샘플 값'입니다. 실제 설정에 맞게 바꿔주세요.
   ※ 사진은 assets/img/ 폴더에 올리고 img:"assets/img/파일명.jpg" 로 연결합니다.
      비워두면 자동으로 빈 이미지 칸이 표시됩니다.
   ════════════════════════════════════════════════════════════ */

/* ── 팀 · 멤버 ── 
   role: rider / operator   soon:true 이면 COMING SOON 카드
   쓰지 않는 항목은 지워도 됩니다 */
window.TEAMS = [
  {id:"astra", name:"Astra Aero", kr:"아스트라 에어로", color:"#a78bfa", colorName:"Purple",
   field:"군수 · 우주항공", pursuit:"공기역학적 완벽, 압도적인 직선 속도 추구.",
   members:[
     {role:"rider", en:"Tobias Kirsch", kr:"토비아스 키르슈", age:25, sex:"남", nation:"독일(GER)",
      looks:"187cm · 마른 체구, 흑발, 자안(紫眼), 날카로운 인상",
      persona:"천재. 오차 없는 계획과 수행력, 강한 승부욕. 예민하고 까칠함.",
      speech:"반말", mbti:"ISFJ", lang:["EN","GER"], img:""},
     {role:"operator", en:"Verney Labossière", kr:"베르네 라보시에르", age:32, sex:"남", nation:"프랑스(FRA)",
      lang:["EN","FRA"], img:""}
   ]},
  {id:"viper", name:"Viper-Sec", kr:"바이퍼-섹", color:"#34d399", colorName:"Green",
   field:"글로벌 사이버 보안", pursuit:"철벽 방어망, 정보전 통제, 치밀한 해킹 추구.",
   members:[
     {role:"rider", en:"Terence Tunnell", kr:"테렌스 턴넬", age:26, sex:"남", nation:"캐나다(CAN)", lang:["EN"], img:""},
     {role:"operator", soon:true}
   ]},
  {id:"volt", name:"Volt Core", kr:"볼트 코어", color:"#f472b6", colorName:"Pink",
   field:"미디어 · 에너지 음료", pursuit:"어그레시브한 가속, 극한의 스릴과 쇼맨십 추구.",
   members:[ {role:"rider", soon:true}, {role:"operator", soon:true} ]},
  {id:"kurosawa", name:"Kurosawa H.I.", kr:"쿠로사와 중공업", alt:"黑澤重工業", color:"#e0343c", colorName:"Red",
   field:"전통 기계공학", pursuit:"무식할 만큼의 내구도. 바닥에 처박혀도 멈추지 않는 강철 돌파력.",
   members:[
     {role:"rider", en:"Tsunemori Tsuyano", kr:"츠네모리 츠야노", alt:"常森艶野", age:21, sex:"여", nation:"일본(JPN)",
      looks:"173cm · 잔근육, 흑발 숏컷, 적안, 웃는 상",
      persona:"보수적인 기업 안에서 실력으로 인정받은 샛별. 밝고 싹싹함.",
      speech:"존댓말", mbti:"ENFP", lang:["EN","JPN"], img:""},
     {role:"operator", soon:true}
   ]},
  {id:"neuro", name:"Neuro-Medica", kr:"뉴로-메디카", color:"#f4f6f8", colorName:"White",
   field:"첨단 생명공학 · 의료", pursuit:"라이더의 피로도 최소화. 생체 데이터로 극한의 생존율을 입증.",
   members:[
     {role:"rider", en:"Jeffrey Roth", kr:"제프리 로스", age:42, sex:"남", nation:"미국(USA)",
      looks:"188cm · 근육질, 백발 짧은 머리, 흑안, 흉터 다수. 양다리 기계의족",
      bio:"TT의 전설. 최고령이자 최다 우승 기록을 계속 갱신 중.",
      persona:"능글맞음.", speech:"반말", mbti:"ESTJ", lang:["EN"], img:""},
     {role:"operator", en:"Kang Hyo-jun", kr:"강효준", age:27, sex:"남", nation:"한국(KOR)",
      looks:"177cm · 마른 체구, 흑발 흑안, 무테안경, 날카로운 눈매",
      bio:"고학력자. 해킹 대회 우승 다수.",
      persona:"무뚝뚝함.", speech:"존댓말", mbti:"ISTJ", lang:["EN","KOR"], img:""}
   ]},
  {id:"junk", name:"Junk-Yard", kr:"정크-야드 신디케이트", color:"#c2693c", colorName:"Rust",
   field:"슬럼가 고철 연합", pursuit:"규격 외 개조, 날것의 생존.",
   about:"비공식 팀이지만 슬럼 출신 성공자들의 막대한 후원으로 TT 진출에 성공했고, 브랜드화로 명맥을 이어가고 있다.",
   members:[
     {role:"rider", en:"Tessare", kr:"테사레", alt:"본명 불명", age:28, sex:"남", nation:"호주(AUS)",
      looks:"192cm · 거구, 왼쪽 안대(실명)", lang:["EN"], img:""},
     {role:"operator", en:"Nabi", kr:"나비", alt:"본명 불명", age:18, sex:"여", nation:"국적 불명",
      looks:"163cm · 마른 체구, 백금발 포니테일, 주황안, 고양이상, 캐주얼 복장",
      persona:"틱틱거림.", speech:"반말", mbti:"ISTP", lang:["EN"], img:""}
   ]}
];

/* ── 시즌 ── */
window.SEASON = {
  label: "시즌 캘린더",                          // 예: "2XXX 시즌 캘린더"
  nextRaceStart: "2026-11-14T20:00:00+09:00",   // 다음 라운드 스타트 시각(한국 시간)
  points: [25, 18, 15, 12, 10, 8],              // 순위별 승점 (1위부터)

  /* 무대: img(대표 사진), long(상세 설명, 문단별), risk(핵심 변수) */
  stages: {
    s1:{name:"구 17지구", type:"도심 서킷", km:150, img:"",
        desc:"도심 폐허 구조물. 빌딩풍과 전파 장애를 뚫는 전술적 돌파.", risk:"빌딩풍, 전파 장애",
        long:["한때 수많은 사람이 살았던 도심이 그대로 폐허가 된 구역입니다. 무너진 빌딩 사이를 관통하는 코스로, 고층 건물 틈에서 갑자기 꺾여 들어오는 빌딩풍이 기체를 흔들어 놓습니다.",
              "구조물이 전파를 가로막아 오퍼레이터의 스캔과 통신이 끊기기 쉽습니다. 라이더의 직관과 오퍼레이터의 경로 판단이 어긋나지 않는 팀만이 속도를 유지할 수 있습니다."]},
    s2:{name:"에덴 폐기구역", type:"자연 오프로드", km:180, img:"",
        desc:"비포장 황톳길. 오퍼레이터의 실시간 시계 세정 제어가 관건.", risk:"황톳길, 시야 확보",
        long:["문명이 버린 뒤 자연이 되찾은 구역입니다. 포장도로 하나 없는 황톳길을 달리며, 노면 상태가 바이크의 부상 높이를 계속 흔들어 그라운드 이펙트 붕괴가 잦습니다.",
              "흙먼지로 시야가 쉽게 막히기 때문에 오퍼레이터의 실시간 시계 세정 제어가 승부를 가릅니다. 내구도를 앞세운 팩토리에게 유리한 무대로 꼽힙니다."]},
    s3:{name:"블루-타이드 수몰 구역", type:"수면 코스", km:160, img:"",
        desc:"해수면 활주. 물보라 적응과 수분 저항 기술 시험.", risk:"물보라, 수분 저항",
        long:["바닷물에 잠긴 구역입니다. 기체는 수면 위를 활주하며, 물보라가 바이저를 때리고 수분 저항이 속도를 갉아먹습니다.",
              "물보라에 적응하는 라이더의 감각과 수분 저항을 이겨내는 기체 설계가 함께 시험됩니다."]},
    s4:{name:"크랙 마운틴 밸리", type:"고산 테크니컬", km:200, img:"",
        desc:"급격한 고도차와 좁은 트랙. 지형 스캔의 한계 시험.", risk:"고도차, 좁은 트랙",
        long:["갈라진 산악 협곡을 따라 달리는 코스입니다. 급격한 고도차와 폭이 좁은 트랙이 이어져, 속도를 내는 것만큼 속도를 줄여야 할 순간을 아는 것이 중요합니다.",
              "지형 스캔의 한계를 시험하는 무대로, 오퍼레이터가 놓친 굴곡 하나가 그대로 충돌로 이어집니다."]},
    s5:{name:"메가 댐 '리바이어던'", type:"버티컬 월", km:140, img:"",
        desc:"파이프 수로와 댐 사면을 원심력으로 역주행. 야간 소나 의존.", risk:"수직 사면, 야간 시야",
        long:["거대한 댐의 파이프 수로와 사면을 원심력으로 붙어서 달리는 수직 코스입니다. 거리는 8대 무대 중 가장 짧지만, 한 번의 실수가 곧 코스 이탈입니다.",
              "야간에 열려 시야를 믿을 수 없고, 오퍼레이터의 소나 정보에 전적으로 의존해 달립니다."]},
    s6:{name:"파메스 사막", type:"붉은 평야", km:250, img:"",
        desc:"소금 지대 최고속 측정. 에너지 배분 관리형 레이싱.", risk:"에너지 배분, 최고속 유지",
        long:["붉은 평야와 소금 지대가 끝없이 이어지는 최장 250km 코스입니다. 한계 속도를 측정하기에 가장 적합한 무대로 꼽힙니다.",
              "순수한 속도 싸움처럼 보이지만, 에너지를 어디서 쓰고 어디서 아끼느냐를 관리하는 레이스입니다."]},
    s7:{name:"디먼 해협", type:"극지 빙하", km:170, img:"",
        desc:"얼음 분쇄물 사이 주행. 저온 방전과 헬멧 결빙 대처.", risk:"저온 방전, 헬멧 결빙",
        long:["부서진 빙하 조각이 떠다니는 극지의 해협입니다. 얼음 분쇄물 사이를 빠져나가야 하며, 저온으로 인한 기체 방전과 헬멧 결빙이라는 이중의 위협이 따릅니다.",
              "버티는 시간이 길어질수록 기체와 라이더 모두 소모됩니다."]},
    s8:{name:"스카이폴 브릿지", type:"챔피언십 파이널", km:180, img:"", final:true,
        desc:"고공 교량 단절부를 도약하는 공중 활공. 강풍과 자세 제어.", risk:"강풍, 도약 후 자세 제어",
        long:["고공에 걸린 거대한 교량입니다. 끊어진 구간을 도약해 건너는 공중 활공이 핵심이며, 강풍 속에서 자세를 잡지 못하면 그대로 낙하합니다.",
              "시즌의 마지막 라운드로 챔피언십의 승자가 결정되는 무대입니다. 다른 무대와 달리 추첨 없이 고정되어 있습니다."]}
  },

  /* 라운드
     status: done / next / wait / final
     finish: 완주 팀을 순위순으로 (승점 자동 계산)  dnf: 리타이어 팀  firstStop: 최초 정지 팀
     pot: pool(총 베팅액), top(최대 당첨금), hit(메인 예측 적중률 %)   */
  rounds: [
    {stage:"s3", status:"done", finish:["neuro","astra","kurosawa","junk"], dnf:["viper"], firstStop:"viper",
     pot:{pool:412, top:38.4, hit:31}},
    {stage:"s1", status:"done", finish:["astra","neuro","viper","kurosawa"], dnf:["junk"], firstStop:"junk",
     pot:{pool:538, top:22.1, hit:44}},
    {stage:"s6", status:"done", finish:["neuro","kurosawa","astra"], dnf:["junk","viper"], firstStop:"junk",
     pot:{pool:705, top:91.7, hit:18}},
    {stage:"s2", status:"done", finish:["kurosawa","neuro","astra","junk","viper"], dnf:[], firstStop:null,
     pot:{pool:861, top:12.6, hit:52}},
    {stage:"s5", status:"next"},
    {status:"wait"},
    {status:"wait"},
    {stage:"s8", status:"final"}
  ]
};

/* ── 프론티어 팟 ── */
window.POT = {
  unit: "M CR",                                   // 금액 단위 (M = 백만, CR = 크레딧)
  carry: {value:142, note:"R04 미적중 이월분"},     // 다음 라운드 이월 상금
  odds: [                                          // 다음 라운드 우승 배당
    {team:"neuro", odds:2.6},
    {team:"astra", odds:3.4},
    {team:"kurosawa", odds:3.9},
    {team:"viper", odds:7.5},
    {team:"junk", odds:12.0}
  ]
};

/* ── 뉴스 ── (위에 있을수록 최신)
   body: 문단 배열 / html: 직접 만든 HTML을 넣고 싶을 때 (body 대신) / link: 외부 링크 버튼 */
window.NEWS = [
  {cat:"독점 인터뷰", title:"대표 기사 제목이 들어갈 자리입니다", date:"2XXX.00.00",
   body:["여기에 기사 본문이 들어갑니다. 문단은 따옴표로 묶어 한 줄씩 추가하세요.","두 번째 문단입니다. 길이 제한 없이 넣을 수 있고, 펼친 상태에서 읽게 됩니다."],
   link:null},
  {cat:"레이스 리포트", title:"라운드 04 결과와 넥스트 드로우 현장", date:"2XXX.00.00",
   body:["기사 본문이 들어갑니다."], link:null},
  {cat:"테크니컬 데이", title:"팩토리별 신형 쿨링 규정 해석", date:"2XXX.00.00",
   body:["기사 본문이 들어갑니다."], link:null},
  {cat:"H-FIA 공지", title:"규정 제12조 위반 적발 사례 공개", date:"2XXX.00.00",
   body:["기사 본문이 들어갑니다."], link:{label:"원문 보기", url:"#"}}
];
