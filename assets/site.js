/* 사이트 공통 문구와 동작.
   - 앱은 APPS에 한 블록씩. 새 앱은 블록 하나만 추가하면 홈·Work에 모두 나와요.
   - home: true 인 앱만 홈에 나와요(묶음마다 3개).
   - detail 이 있는 앱(노견 케어)은 카드를 누르면 소개 창이 열리고, 없는 앱(생활 테스트)은 바로 실행돼요.
     detail: { when: '이런 때 쓰세요', how: [이렇게 쓰세요], result: '결과는 이렇게(없으면 생략)', note: [알아두세요] } */
var CATS = {
  dog: { name: '노견 케어', desc: '기록·검사·식단·마음 돌봄 도구입니다. 진단이 아닌 참고용입니다.' },
  life: { name: '생활 테스트', desc: '노후 준비, 돈 쓰는 습관, 말투, 디지털 생활, 그리고 2027년 운세까지.' }
};

var APPS = [
  {
    id: 'journal', cat: 'dog', home: true, name: '간병 일지', url: 'dog/journal.html',
    img: 'img/dog-journal.jpg', alt: '태블릿 간병 기록 화면 옆 담요 위의 말티즈',
    line: '매일 케어를 기록하고, 병원 갈 때 최근 7일을 복사합니다', tag: '기록은 이 기기에만 저장',
    detail: {
      when: '호흡수·음수량·식사·투약을 기억이 아니라 기록으로 남기고 싶을 때. 수치가 갑자기 달라졌을 때 “그날 무엇이 달랐는지” 찾고 싶을 때.',
      how: [
        '아이 이름·나이·몸무게·품종을 처음 한 번 입력합니다.',
        '날짜를 고르고 그날 기록을 저장합니다. (호흡수, 음수량, 피하수액, 식사, 대소변, 투약, 특이사항)',
        '[주간 그래프]에서 최근 7일 변화를 보고, 병원 갈 때 [최근 7일 복사]나 그래프 화면을 수의사 선생님께 보여 드립니다.'
      ],
      note: [
        '기록은 이 기기의 브라우저에만 저장됩니다. 기기를 바꾸거나 브라우저 기록을 지우면 사라지니, 가끔 [CSV]로 내려받아 백업하세요.',
        '같은 날짜에 다시 저장하면 앞의 기록이 덮어써집니다.',
        '앱 기록만 보고 보조제나 수액 양을 직접 바꾸면 안 됩니다. 진단·처방이 아닙니다.'
      ]
    }
  },
  {
    id: 'blood-test', cat: 'dog', home: true, name: '혈액 검사지 보는 법', url: 'dog/blood-test.html',
    img: 'img/dog-blood-test.jpg', alt: '혈액 검사지 보는 법 대표 사진',
    line: '검사지 사진이나 수치를 넣으면 쉬운 말로 풀어 줍니다', tag: '진단이 아닌 참고용',
    detail: {
      when: '병원에서 받은 검사지를 집에서 다시 보면 숫자가 무슨 뜻인지 가물가물할 때.',
      how: [
        '검사지 사진을 올리거나(최대 5장) 숫자를 직접 입력합니다. 사진이 여러 장 섞이면 틀리기 쉬워서 직접 입력이 가장 정확합니다.',
        '읽어 낸 숫자를 검사지와 맞춰 보고 틀린 곳을 고칩니다. 구김이나 빛 반사로 틀릴 수 있습니다.',
        '[지금 해독하기]를 누르면 장기별 결과가 나옵니다.'
      ],
      result: '신장(SDMA·CREA·BUN·인), 심장(proBNP), 간(ALP), 영양(ALB) 수치를 정상 · 주의 · 위험으로 나눠 보여 줍니다. 모든 판단은 담당 수의사 선생님과 함께 하세요.',
      note: [
        '병원마다 정상 범위가 달라서, 큰 방향을 잡는 용도로만 쓰세요. 칼륨은 상태에 따라 쉽게 변해 일부러 뺐습니다.',
        '진단·처방이 아닙니다. 결과지를 들고 담당 수의사 선생님과 상담하세요.'
      ]
    }
  },
  {
    id: 'food-light', cat: 'dog', home: true, name: '식단 신호등', url: 'dog/food-light.html',
    img: 'img/dog-food-light.jpg', alt: '식단 신호등 대표 사진',
    line: '관리 중인 질환에 맞춰 음식별 적합도를 신호등으로 보여 줍니다', tag: '급여는 수의사와 상의',
    detail: {
      when: '이 음식을 줘도 되는지 판단하기 어려울 때. 질환이 둘 이상이면 더 그렇습니다.',
      how: [
        '아이 정보와 먹이는 형태(찐·삶은 것 / 말린 것)를 고릅니다. 말리면 영양소가 진해져서 한 단계 높게 계산합니다.',
        '관리 중인 질환(신부전·췌장염·심장병·당뇨·쿠싱·갑상선 저하증)을 고릅니다. 중복 선택됩니다.',
        '신부전이면 최근 혈액검사 수치를 넣을 수 있습니다. 비워 두면 일반 기준으로 봅니다.'
      ],
      result: '하루 참고 에너지량(kcal)과 재료별 적합 · 주의 · 비권장, 그 이유를 보여 줍니다. 질환을 여러 개 고르면 기준이 함께 적용돼서 적합한 재료가 줄어드는 게 정상입니다.',
      note: [
        '자연식 재료 27종 기준입니다. 사료와 캔은 제조사마다 성분이 달라 다루지 않습니다.',
        '일반 식품 영양 성분을 바탕으로 한 참고 정보입니다. 실제 급여는 담당 수의사와 상의하세요.'
      ]
    }
  },
  {
    /* 펫로스 상세는 클로드 초안(은성님 확인 필요) */
    id: 'petloss', cat: 'dog', name: '펫로스', url: 'dog/petloss.html',
    img: 'img/dog-petloss.jpg', alt: '담요와 촛불 옆 액자 속 강아지 사진',
    line: '지난 2주의 마음을 날수로 골라 지금 마음의 위치를 돌아봅니다', tag: '진단이 아닙니다',
    detail: {
      when: '아이를 보낸 뒤 내 마음이 지금 어디쯤인지 한 번 돌아보고 싶을 때.',
      how: [
        '지난 2주 동안 그런 마음이 든 날이 얼마나 되는지 “없었어요 / 며칠 / 일주일 넘게 / 거의 매일” 가운데 고릅니다. 고르면 바로 다음 질문으로 넘어갑니다.',
        '정답이 없으니 편하게 골라 주세요.',
        '결과를 복사해 가까운 사람에게 보여 줄 수도 있습니다.'
      ],
      note: [
        '반려동물 애도 척도(PBQ)를 바탕으로 만든 자가 점검입니다. 진단이 아닙니다.',
        '마음이 많이 힘들면 가까운 사람이나 전문 상담에 도움을 청하세요.'
      ]
    }
  },
  {
    id: 'noho', cat: 'life', home: true, name: '노후 준비 점수', url: 'life/noho.html',
    img: 'img/noho.jpg', alt: '노후 준비 점수 테스트 대표 사진',
    line: '돈·건강·관계·일상·보람 다섯 영역의 준비 정도를 보여 줍니다', tag: '12문항 · 3분'
  },
  {
    id: 'digital', cat: 'life', name: '디지털 생활 점수', url: 'life/digital.html',
    img: 'img/digital.jpg', alt: '디지털 생활 점수 테스트 대표 사진',
    line: '휴대폰·결제·은행 앱부터 사기 대처까지 점검합니다', tag: '12문항 · 3분'
  },
  {
    id: 'money', cat: 'life', home: true, name: '돈 쓰는 스타일', url: 'life/money.html',
    img: 'img/money.jpg', alt: '돼지저금통, 여행 가방, 선물 상자, 가계부가 놓인 사진',
    line: '여섯 가지 유형 가운데 나의 소비 습관을 알려 줍니다', tag: '10문항'
  },
  {
    id: 'talk', cat: 'life', name: '말투 유형', url: 'life/talk.html',
    img: 'img/talk.jpg', alt: '말투 유형 테스트 대표 사진',
    line: '내 말투의 강점과 바꿔 말하기 예시를 보여 줍니다', tag: '10문항'
  },
  {
    id: 'fridge', cat: 'life', name: '냉장고 음식 만들기', url: 'life/fridge.html',
    img: 'img/fridge.jpg', alt: '나무 식탁 위에 놓인 계란, 양파, 대파, 두부',
    line: '있는 재료를 고르면 지금 만들 수 있는 요리를 찾아 줍니다', tag: '요리 20가지 · 재료만 고르면 끝'
  },
  {
    id: 'saju', cat: 'life', home: true, name: '신년운세', url: 'life/saju.html',
    img: 'img/saju.jpg', alt: '한옥 창살 그림자가 드리운 탁자 위 새 달력과 붉은 도자기 양',
    line: '재물·직업·사업·연애 네 가지 점수로 2027년 운세를 봅니다', tag: '이름·생년월일 · 재미로'
  }
];

function card(a) {
  return '<a class="card" href="' + (a.detail ? '#app-' + a.id : a.url) + '"' + (a.detail ? ' data-pop="' + a.id + '"' : '') + ' data-cat="' + a.cat + '">' +
    '<div class="thumb"><img src="' + a.img + '" alt="' + a.alt + '" loading="lazy"></div>' +
    '<div class="txt"><h3 class="name">' + a.name + '</h3><p class="desc">' + a.line + '</p>' +
    '<p class="tag">' + a.tag + '</p><span class="go">' + (a.detail ? '자세히 보기' : '해 보기') + ' &gt;</span></div></a>';
}

function list(arr, cls) {
  return '<' + cls + '>' + arr.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</' + cls + '>';
}

(function () {
  var page = document.body.dataset.page;
  var home = page === 'home';
  var nav = [['About', 'about.html', 'about', ''], ['Work', 'work.html', 'work', ''], ['Contact', '#contact', '', ''], ['Making', 'making.html', 'making', 'alt']];

  document.body.insertAdjacentHTML('afterbegin',
    '<header class="site-head"><div class="wrap"><a class="logo" href="' + (home ? '#' : 'index.html') + '">25년차 IT생존러</a><nav>' +
    nav.map(function (n) { return '<a href="' + n[1] + '"' + (n[3] ? ' class="' + n[3] + '"' : '') + (n[2] === page ? ' aria-current="page"' : '') + '>' + n[0] + '</a>'; }).join('') +
    '</nav></div></header>');

  document.body.insertAdjacentHTML('beforeend',
    '<section class="sec contact wrap" id="contact">' +
      '<div class="sec-head"><span>Contact</span></div>' +
      '<h2>써 보고 불편한 점을<br>알려 주세요</h2><p class="info">내용 오류 제보, 있었으면 하는 앱 제안 모두 메일로 받습니다.</p>' +
      '<a class="btn" href="mailto:itsurvivaldata@gmail.com">메일 보내기 &gt;</a>' +
    '</section>' +
    '<footer class="site-foot wrap"><p>© 2026 25년차 IT생존러</p><p>이 사이트는 AI의 도움을 받아 만들었고, 이미지는 AI로 생성했습니다.</p><p>건강 관련 앱은 진단이 아닌 참고용입니다.</p>' +
      '<p><a class="foot-link" href="mailto:itsurvivaldata@gmail.com">itsurvivaldata@gmail.com</a></p></footer>' +
    '<a class="to-top" href="#" aria-label="맨 위로"><svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg></a>' +
    '<dialog class="pop" aria-label="앱 소개"></dialog>');

  var top = document.querySelector('.to-top');
  addEventListener('scroll', function () { top.classList.toggle('show', scrollY > 400); }, { passive: true });

  document.querySelectorAll('[data-cards]').forEach(function (el) {
    el.innerHTML = APPS.filter(function (a) { return a.cat === el.dataset.cards && (!home || a.home); }).map(card).join('');
  });

  if (page === 'work') {
    var btns = document.querySelectorAll('.filter button');
    var pick = function (cat) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.cat === cat); });
      document.querySelectorAll('.group').forEach(function (g) { g.hidden = cat !== 'all' && g.dataset.cat !== cat; });
    };
    btns.forEach(function (b) { b.onclick = function () { pick(b.dataset.cat); }; });
    var q = new URLSearchParams(location.search).get('cat');
    pick(CATS[q] ? q : 'all');
  }

  /* 노견 케어 소개 창(레이어 팝업). 주소 #app-아이디 로 열리고, 뒤로 가기·Esc·바깥·X로 닫혀요. */
  var pop = document.querySelector('.pop');
  var show = function (id) {
    var a = APPS.filter(function (x) { return x.id === id && x.detail; })[0];
    if (!a) return false;
    var d = a.detail;
    pop.innerHTML =
      '<button class="pop-close" type="button" aria-label="닫기"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<div class="pop-img"><img src="' + a.img + '" alt="' + a.alt + '"></div>' +
      '<div class="pop-body">' +
        (a.cat === 'dog' ? '<p class="notice">건강 정보를 다루는 앱입니다. 진단이 아니라 참고용입니다.</p>' : '') +
        '<p class="eyebrow">' + CATS[a.cat].name + '</p><h2>' + a.name + '</h2><p class="lead">' + a.line + '</p>' +
        '<a class="btn" href="' + a.url + '">앱 열어 보기 &gt;</a>' +
        '<h3>이런 때 쓰세요</h3><p>' + d.when + '</p>' +
        '<h3>이렇게 쓰세요</h3>' + list(d.how, 'ol') +
        (d.result ? '<h3>결과는 이렇게</h3><p>' + d.result + '</p>' : '') +
        '<h3>알아두세요</h3>' + list(d.note, 'ul') +
      '</div>';
    pop.querySelector('.pop-close').onclick = close;
    if (!pop.open) pop.showModal();
    pop.scrollTop = 0;
    return true;
  };
  var hide = function () { if (pop.open) pop.close(); };
  var close = function () {
    if (history.state && history.state.pop) history.back();
    else { hide(); history.replaceState(null, '', location.pathname + location.search); }
  };
  var fromHash = function () { var m = location.hash.match(/^#app-(.+)$/); return m ? m[1] : ''; };

  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-pop]');
    if (!c) return;
    e.preventDefault();
    if (show(c.dataset.pop)) history.pushState({ pop: c.dataset.pop }, '', '#app-' + c.dataset.pop);
  });
  pop.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
  pop.addEventListener('click', function (e) { if (e.target === pop) close(); });
  addEventListener('popstate', function () { if (!show(fromHash())) hide(); });
  if (fromHash()) show(fromHash());
})();
