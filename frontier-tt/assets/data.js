/* ════════════════════════════════════════════
   사이트 내용은 이 파일만 고치면 됩니다
   (모든 페이지가 이 데이터를 함께 씁니다)
   ════════════════════════════════════════════ */
window.SEASON = {
  label: "시즌 캘린더",                         // 예: "2XXX 시즌 캘린더"
  nextRaceStart: "2026-11-14T20:00:00+09:00",  // 다음 라운드 스타트 시각(한국 시간)

  // 8대 무대 (id는 아래 rounds에서 참조)
  stages: {
    s1:{name:"구 17지구", type:"도심 서킷", km:150, desc:"도심 폐허 구조물. 빌딩풍과 전파 장애를 뚫는 전술적 돌파."},
    s2:{name:"에덴 폐기구역", type:"자연 오프로드", km:180, desc:"비포장 황톳길. 오퍼레이터의 실시간 시계 세정 제어가 관건."},
    s3:{name:"블루-타이드 수몰 구역", type:"수면 코스", km:160, desc:"해수면 활주. 물보라 적응과 수분 저항 기술 시험."},
    s4:{name:"크랙 마운틴 밸리", type:"고산 테크니컬", km:200, desc:"급격한 고도차와 좁은 트랙. 지형 스캔의 한계 시험."},
    s5:{name:"메가 댐 '리바이어던'", type:"버티컬 월", km:140, desc:"파이프 수로와 댐 사면을 원심력으로 역주행. 야간 소나 의존."},
    s6:{name:"파메스 사막", type:"붉은 평야", km:250, desc:"소금 지대 최고속 측정. 에너지 배분 관리형 레이싱."},
    s7:{name:"디먼 해협", type:"극지 빙하", km:170, desc:"얼음 분쇄물 사이 주행. 저온 방전과 헬멧 결빙 대처."},
    s8:{name:"스카이폴 브릿지", type:"챔피언십 파이널", km:180, desc:"고공 교량 단절부를 도약하는 공중 활공. 강풍과 자세 제어.", final:true}
  },

  // 라운드 진행 상황
  // status: done(완료) / next(다음 라운드) / wait(추첨 대기) / final(파이널)
  rounds: [
    {stage:"s3", status:"done", winner:"팀 A"},
    {stage:"s1", status:"done", winner:"팀 B"},
    {stage:"s6", status:"done", winner:"팀 A"},
    {stage:"s2", status:"done", winner:"팀 C"},
    {stage:"s5", status:"next"},
    {status:"wait"},
    {status:"wait"},
    {stage:"s8", status:"final"}
  ],

  // 챔피언십 순위
  standings: [
    {team:"팀 A", rider:"라이더 이름", operator:"오퍼레이터 이름", pts:68},
    {team:"팀 C", rider:"라이더 이름", operator:"오퍼레이터 이름", pts:51},
    {team:"팀 B", rider:"라이더 이름", operator:"오퍼레이터 이름", pts:47},
    {team:"팀 D", rider:"라이더 이름", operator:"오퍼레이터 이름", pts:30},
    {team:"팀 E", rider:"라이더 이름", operator:"오퍼레이터 이름", pts:22}
  ]
};

// 뉴스 (위에 있을수록 최신 / 첫 번째가 홈 대표 기사)
// url에 캐릭터 뉴스 기사 페이지 주소를 넣으세요
window.NEWS = [
  {cat:"독점 인터뷰", title:"대표 기사 제목이 들어갈 자리입니다", date:"2XXX.00.00", url:"#", summary:"기사 요약 한두 문장이 들어갑니다."},
  {cat:"레이스 리포트", title:"라운드 04 결과와 넥스트 드로우 현장", date:"2XXX.00.00", url:"#", summary:"기사 요약 한두 문장이 들어갑니다."},
  {cat:"테크니컬 데이", title:"팩토리별 신형 쿨링 규정 해석", date:"2XXX.00.00", url:"#", summary:"기사 요약 한두 문장이 들어갑니다."},
  {cat:"H-FIA 공지", title:"규정 제12조 위반 적발 사례 공개", date:"2XXX.00.00", url:"#", summary:"기사 요약 한두 문장이 들어갑니다."}
];
