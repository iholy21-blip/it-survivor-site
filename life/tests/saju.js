/* 2027 신년운세: 사주 계산(단순화), 점수, 풀이 문구, 입력 화면 */
(function () {
  // ---------- 기본 글자표 ----------
  var STEM_HJ = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  var STEM_KR = ['갑','을','병','정','무','기','경','신','임','계'];
  var BR_HJ = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  var BR_KR = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
  var BR_ANIMAL = ['쥐','소','범','토끼','용','뱀','말','양','원숭이','닭','개','돼지'];
  // 오행: 0 나무, 1 불, 2 흙, 3 쇠, 4 물
  var BR_EL = [4,2,0,0,2,1,1,2,3,3,2,4];

  var HOURS = [
    '자시 (밤 11시 ~ 새벽 1시)', '축시 (새벽 1시 ~ 3시)', '인시 (새벽 3시 ~ 5시)',
    '묘시 (아침 5시 ~ 7시)', '진시 (아침 7시 ~ 9시)', '사시 (오전 9시 ~ 11시)',
    '오시 (오전 11시 ~ 오후 1시)', '미시 (오후 1시 ~ 3시)', '신시 (오후 3시 ~ 5시)',
    '유시 (오후 5시 ~ 7시)', '술시 (저녁 7시 ~ 9시)', '해시 (밤 9시 ~ 11시)'
  ];

  // 일간(태어난 날의 첫 글자) 성격 한 줄
  var DAY_DESC = [
    '곧게 뻗은 큰 나무처럼 꿋꿋하고 앞장서는 사람',
    '덩굴과 꽃처럼 부드럽지만 어디서든 살아남는 사람',
    '한낮의 해처럼 밝고 숨김없는 사람',
    '촛불처럼 따뜻하고 세심한 사람',
    '큰 산처럼 묵직하고 믿음직한 사람',
    '논밭의 흙처럼 품이 넓고 챙겨 주는 사람',
    '단단한 바위와 쇠처럼 결단력 있는 사람',
    '잘 다듬은 보석처럼 섬세하고 깔끔한 사람',
    '큰 강과 바다처럼 생각이 깊고 넓은 사람',
    '이슬과 빗물처럼 조용히 스며드는 지혜로운 사람'
  ];

  // 2027년 정미(丁未) = 불(丁) 위에 흙(未). 일간 오행별, 타고난 힘이 강할 때(strong)와 약할 때(weak)의
  // 기본 점수 [재물, 직업, 사업, 연애]와 풀이
  var BASE = [
    { // 나무: 불은 내가 피워 내는 기운, 흙은 내가 다스리는 재물
      strong: { sum: '재주가 돈으로 이어지는 해입니다', score: [86, 78, 85, 75], text: [
        '가진 재주와 부지런함이 곧바로 돈으로 이어지기 좋은 해입니다. 미뤄 둔 부업이나 판매를 시작하면 손에 남는 게 생깁니다. 들어온 돈은 일부를 따로 떼어 두세요.',
        '일한 만큼 결과가 눈에 보이는 해입니다. 맡은 일을 숫자와 결과물로 보여 주면 평가가 따라옵니다. 말이 앞서지 않게 마무리까지 챙기세요.',
        '내가 만든 것을 파는 일에 힘이 실리는 해입니다. 손님의 반응을 보고 고쳐 나가면 입소문이 납니다. 재고와 외상은 가볍게 유지하세요.',
        '함께 밥 먹고 장 보는 것처럼 일상을 나누는 만남이 잘 풀립니다. 말보다 챙겨 주는 행동이 더 잘 통합니다.'
      ]},
      weak: { sum: '벌이는 일보다 힘을 아끼는 쪽이 남는 해입니다', score: [68, 72, 66, 70], text: [
        '돈 벌 일은 보이는데 몸이 먼저 지치기 쉬운 해입니다. 여러 개를 벌이기보다 확실한 하나를 고르면 손에 남습니다.',
        '할 일이 쏟아지는 해입니다. 다 잘하려 하지 말고 순서를 정해 하나씩 끝내세요. 혼자 못 할 일은 일찍 말하는 편이 낫습니다.',
        '기회는 보이지만 혼자 다 챙기기엔 벅찬 해입니다. 일을 줄이고 잘되는 것 하나만 남겨 보세요.',
        '바빠서 마음을 표현할 여유가 줄어듭니다. 짧은 안부 한마디가 관계를 지켜 줍니다.'
      ]}
    },
    { // 불: 불은 같은 기운, 흙은 내가 낳는 기운
      strong: { sum: '쌓인 힘을 밖으로 풀어내기 좋은 해입니다', score: [76, 80, 78, 79], text: [
        '갖고 있던 재주를 밖으로 내놓으면 돈이 되는 해입니다. 다만 친한 사람과의 돈거래는 한 번 더 생각하세요.',
        '말과 글, 가르치는 일에서 빛나는 해입니다. 아는 것을 남에게 설명하다 보면 평판이 쌓입니다.',
        '사람이 모이는 일에 바람이 붑니다. 강의, 모임, 콘텐츠처럼 내 이야기를 나누는 일이 잘 맞습니다. 동업은 역할을 글로 남겨 두세요.',
        '표정과 말이 부드러워져 사람이 먼저 다가옵니다. 편하게 웃는 모습이 가장 큰 매력이 되는 해입니다.'
      ]},
      weak: { sum: '곁의 사람에게 기대면 길이 보이는 해입니다', score: [68, 74, 68, 76], text: [
        '나가는 힘이 들어오는 힘보다 크기 쉬운 해입니다. 믿을 만한 사람과 정보를 나누면 새는 돈이 줄어듭니다.',
        '혼자보다 동료와 함께할 때 성과가 납니다. 도움을 청하는 일을 미루지 마세요.',
        '새로 벌이기보다 마음 맞는 사람과 나누어 맡으면 오래 갑니다. 큰 결정은 혼자 내리지 마세요.',
        '친구처럼 편한 사람이 곁에 있을 때 마음이 놓입니다. 오래 알던 사람과 가까워지기 좋은 해입니다.'
      ]}
    },
    { // 흙: 불은 나를 데워 주는 도움, 흙은 같은 기운
      strong: { sum: '고집을 내려놓아야 길이 열리는 해입니다', score: [60, 68, 60, 66], text: [
        '지키려는 마음이 커져 돈이 묶이기 쉬운 해입니다. 오래 묵힌 물건이나 계약을 정리하면 숨통이 트입니다. 보증은 피하세요.',
        '내 방식만 고집하면 부딪히기 쉬운 해입니다. 남의 의견을 먼저 듣는 쪽이 결과가 좋습니다.',
        '경쟁이 늘고 결정이 더뎌지기 쉬운 해입니다. 크게 넓히기보다 지금 있는 손님을 지키는 데 힘을 쓰세요.',
        '말수가 줄어 마음이 잘 전해지지 않는 해입니다. 생각만 하지 말고 한 번 더 표현하세요.'
      ]},
      weak: { sum: '도움과 든든한 편이 함께 들어오는 해입니다', score: [76, 84, 76, 74], text: [
        '도움과 문서운이 함께 들어오는 해입니다. 갑자기 큰돈이 생기기보다 계약, 자격, 집 문서처럼 단단한 재산에 유리합니다.',
        '배움과 자격에 좋은 해입니다. 같은 일을 하는 사람들과 어울리면 새 자리 소식이 들어옵니다.',
        '도와주는 사람이 늘어 사업의 바탕을 다지기 좋은 해입니다. 계약과 인허가처럼 미뤄 둔 일을 마무리하세요.',
        '마음이 안정되고 믿음이 쌓이는 해입니다. 천천히 알아 가는 만남이 오래 갑니다.'
      ]}
    },
    { // 쇠: 불은 나를 달구는 책임, 흙은 나를 낳아 주는 도움
      strong: { sum: '자리가 커지고 받쳐 주는 사람도 생기는 해입니다', score: [74, 88, 76, 74], text: [
        '돈이 크게 불기보다 자리가 먼저 커지는 해입니다. 자리가 잡히면 수입은 뒤따라오니 서두르지 마세요.',
        '직업운이 크게 움직이는 해입니다. 승진, 이직, 새 직함 제안이 오면 피하지 말고 받아 보세요. 윗사람의 추천이 힘이 됩니다.',
        '믿음과 이름이 쌓이는 해입니다. 자격, 인증, 공식 계약처럼 이름을 세우는 일에 힘을 쓰세요.',
        '진지한 인연이 들어오기 쉬운 해입니다. 주변 어른의 소개가 좋은 만남으로 이어질 수 있습니다.'
      ]},
      weak: { sum: '책임은 늘지만 받쳐 주는 사람이 있는 해입니다', score: [66, 76, 66, 72], text: [
        '나갈 곳이 늘어나는 해입니다. 고정 지출을 먼저 줄이면 버티기가 수월합니다. 어려울 때 주변에 말하면 도움이 들어옵니다.',
        '일의 무게가 느껴지지만 윗사람이나 선배가 받쳐 주는 해입니다. 혼자 떠안지 말고 먼저 물어보세요.',
        '넓히기보다 배우고 준비하기에 좋은 해입니다. 규칙과 서류를 챙겨 두면 다음 해에 힘이 됩니다.',
        '기대고 싶은 마음이 커지는 해입니다. 나를 편하게 해 주는 사람을 곁에 두세요.'
      ]}
    },
    { // 물: 불은 내가 다스리는 재물, 흙은 나를 누르는 기운
      strong: { sum: '돈과 자리가 함께 움직이는 해입니다', score: [84, 82, 82, 72], text: [
        '수입이 늘 기회가 오는 해입니다. 책임이 커지는 만큼 돈도 따라옵니다. 기회가 보이면 잡되 한 번에 다 걸지는 마세요.',
        '성과가 곧 자리로 이어지는 해입니다. 맡은 일을 끝까지 해내면 눈에 띕니다. 체력이 곧 실력이니 잠을 아끼지 마세요.',
        '돈 되는 일을 알아보는 눈이 밝은 해입니다. 규칙과 세금을 꼼꼼히 챙기면서 키우면 오래갑니다.',
        '현실적인 매력이 살아나는 해입니다. 함께 계획을 세우는 만남이 관계를 키웁니다.'
      ]},
      weak: { sum: '무리한 일을 덜어 내고 지키는 해입니다', score: [58, 62, 56, 66], text: [
        '돈을 벌려고 애쓸수록 부담이 커지기 쉬운 해입니다. 큰 투자나 빚은 피하고, 들어오고 나가는 돈부터 정리하세요.',
        '요구와 압박이 늘어 버겁게 느껴질 수 있습니다. 못 할 일은 일찍 말하고, 쉬는 시간을 먼저 챙기세요.',
        '기회처럼 보이는 일이 부담으로 돌아오기 쉬운 해입니다. 확장은 미루고 지금 하는 일을 지키세요.',
        '지쳐서 마음 쓸 여유가 적은 해입니다. 오래 알던 사람에게 기대는 것이 위안이 됩니다.'
      ]}
    }
  ];

  var CATS = [
    { key: 'money', name: '재물운', ico: '財' },
    { key: 'work', name: '직업운', ico: '官' },
    { key: 'biz', name: '사업운', ico: '業' },
    { key: 'love', name: '연애운', ico: '緣' }
  ];

  // ---------- 사주 계산 (단순화) ----------
  function mod(n, m) { return ((n % m) + m) % m; }

  // 그레고리력 율리우스 일수
  function jdn(y, m, d) {
    var a = Math.floor((14 - m) / 12);
    var yy = y + 4800 - a;
    var mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4)
      - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }

  // 달이 바뀌는 절기 날짜(대략). 1월 소한 ~ 12월 대설
  var TERM_DAY = [6, 4, 6, 5, 6, 6, 7, 8, 8, 8, 7, 7];

  function calcSaju(y, m, d, hour) {
    // 연주: 입춘(2월 4일 무렵) 전이면 전년도
    var sy = (m < 2 || (m === 2 && d < 4)) ? y - 1 : y;
    var yStem = mod(sy - 4, 10), yBr = mod(sy - 4, 12);

    // 월주: 절기 기준 지지, 연간에 따라 천간
    var mBr = d >= TERM_DAY[m - 1] ? m % 12 : (m - 1) % 12;
    var mStem = mod((yStem % 5) * 2 + 2 + mod(mBr - 2, 12), 10);

    // 일주: 2000-01-01 = 무오일 기준
    var di = mod(jdn(y, m, d) + 49, 60);
    var dStem = di % 10, dBr = di % 12;

    var p = [
      { s: yStem, b: yBr }, { s: mStem, b: mBr }, { s: dStem, b: dBr }
    ];
    if (hour >= 0) p.push({ s: mod((dStem % 5) * 2 + hour, 10), b: hour });
    else p.push(null);
    return p;
  }

  function nameHash(str) {
    var h = 7;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }

  // 타고난 힘: 나와 같은 기운 + 나를 낳아 주는 기운이 사주의 절반 이상이면 강한 편.
  // 태어난 달의 지지는 계절을 정하므로 두 배로 친다.
  function isStrong(p) {
    var me = Math.floor(p[2].s / 2), mother = (me + 4) % 5;
    var help = 0, total = 0;
    p.forEach(function (x, i) {
      if (!x) return;
      var items = i === 2 ? [[BR_EL[x.b], 1]] : [[Math.floor(x.s / 2), 1], [BR_EL[x.b], i === 1 ? 2 : 1]];
      items.forEach(function (it) {
        total += it[1];
        if (it[0] === me || it[0] === mother) help += it[1];
      });
    });
    return help * 2 >= total;
  }

  function reading(name, p) {
    var dayEl = Math.floor(p[2].s / 2);
    var strong = isStrong(p);
    var base = BASE[dayEl][strong ? 'strong' : 'weak'];
    var score = base.score.slice();
    var notes = [[], [], [], []];

    var branches = [], heat = 0;
    p.forEach(function (x) {
      if (!x) return;
      branches.push(x.b);
      var se = Math.floor(x.s / 2);
      if (se === 1 || se === 2) heat++;
      if (BR_EL[x.b] === 1 || BR_EL[x.b] === 2) heat++;
    });
    var has = function (b) { return branches.indexOf(b) >= 0; };
    var dBr = p[2].b, dStem = p[2].s;

    if (dBr === 1) {
      score[1] -= 6; score[3] -= 4;
      notes[1].push('태어난 날의 소(丑)와 올해의 양(未)이 정면으로 만납니다. 이사나 이직 같은 변동이 생기기 쉬우니 서두르지 말고 준비한 뒤 움직이세요.');
    }
    if (has(6)) {
      score[3] += 6;
      notes[3].push('사주에 말(午)이 있어 올해의 양(未)과 짝을 이룹니다. 인연운이 한층 좋아집니다.');
    }
    if (has(11) || has(3)) {
      score[0] += 4; score[1] += 3; score[2] += 3;
      notes[0].push('사주의 돼지(亥)·토끼(卯) 기운이 올해의 양과 손을 잡습니다. 혼자보다 여럿이 함께하는 일에서 기회가 생깁니다.');
    }
    if (dStem === 0 || dStem === 4 || dStem === 6) {
      score[1] += 3; score[3] += 5;
      notes[3].push('올해의 양(未)은 당신에게 귀인의 자리입니다. 어려울 때 먼저 손을 내밀어 주는 사람이 나타납니다.');
    }
    if (heat >= 6) {
      score[0] -= 5;
      notes[0].push('타고난 사주에 올해와 같은 뜨겁고 마른 기운이 이미 많아 과열을 조심해야 합니다. 큰돈이 드는 결정은 하루 자고 내리세요.');
    } else if (heat <= 1) {
      score[0] += 3;
      notes[0].push('타고난 사주에 적던 기운이 올해 채워져, 막혔던 일이 풀리는 느낌을 받을 수 있습니다.');
    }

    // 이름으로 작은 차이 (-3 ~ +3)
    var h = nameHash(name);
    for (var i = 0; i < 4; i++) {
      score[i] += ((h >>> (i * 4)) % 7) - 3;
      score[i] = Math.max(48, Math.min(96, score[i]));
    }

    return { dayEl: dayEl, strong: strong, base: base, score: score, notes: notes };
  }

  function tier(n) {
    if (n >= 80) return { label: '좋음', cls: 'good' };
    if (n >= 65) return { label: '보통', cls: 'mid' };
    return { label: '조심', cls: 'low' };
  }


  // ---------- 화면 ----------
  var $ = App.$;
  var yearSel = $('year'), monthSel = $('month'), daySel = $('day'), hourSel = $('hour');

  function opt(sel, value, text) {
    var o = document.createElement('option');
    o.value = value; o.textContent = text; sel.appendChild(o);
  }

  opt(yearSel, '', '년');
  for (var y = 2026; y >= 1930; y--) opt(yearSel, y, y + '년');
  opt(monthSel, '', '월');
  for (var m = 1; m <= 12; m++) opt(monthSel, m, m + '월');
  opt(hourSel, '-1', '모름');
  HOURS.forEach(function (t, i) { opt(hourSel, i, t); });

  function fillDays() {
    var keep = daySel.value;
    var yy = +yearSel.value || 2000, mm = +monthSel.value || 1;
    var last = new Date(yy, mm, 0).getDate();
    daySel.innerHTML = '';
    opt(daySel, '', '일');
    for (var d = 1; d <= last; d++) opt(daySel, d, d + '일');
    if (keep && +keep <= last) daySel.value = keep;
  }
  fillDays();
  yearSel.addEventListener('change', fillDays);
  monthSel.addEventListener('change', fillDays);

  $('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('name').value.trim();
    var err = '';
    if (!name) err = '이름을 넣어 주세요.';
    else if (!yearSel.value || !monthSel.value || !daySel.value) err = '생년월일을 모두 골라 주세요.';
    $('error').textContent = err;
    if (err) { $('error').scrollIntoView({ block: 'center' }); return; }
    show(name, +yearSel.value, +monthSel.value, +daySel.value, +hourSel.value);
  });

  function show(name, y, m, d, hour) {
    var p = calcSaju(y, m, d, hour);
    var r = reading(name, p);

    $('rName').textContent = name + ' 님';
    $('rBirth').textContent = y + '년 ' + m + '월 ' + d + '일 · ' +
      (hour >= 0 ? HOURS[hour].split(' ')[0] : '시간 모름');

    var labels = ['태어난 해', '태어난 달', '태어난 날', '태어난 시'];
    $('rPillars').innerHTML = p.map(function (x, i) {
      if (!x) return '<div class="pillar none"><div class="lbl">' + labels[i] +
        '</div><div class="hj">?<br>?</div><div class="kr">모름</div></div>';
      return '<div class="pillar' + (i === 2 ? ' me' : '') + '"><div class="lbl">' + labels[i] +
        '</div><div class="hj">' + STEM_HJ[x.s] + '<br>' + BR_HJ[x.b] +
        '</div><div class="kr">' + STEM_KR[x.s] + BR_KR[x.b] + '</div></div>';
    }).join('');

    var ds = p[2].s;
    $('rDay').innerHTML = '나를 나타내는 글자는 <b>' + STEM_HJ[ds] + '(' + STEM_KR[ds] + ')</b>입니다. ' +
      DAY_DESC[ds] + '이에요. 사주 전체로 보면 타고난 힘이 <b>' + (r.strong ? '강한 편' : '약한 편') + '</b>입니다.';

    var best = 0;
    for (var i = 1; i < CATS.length; i++) if (r.score[i] > r.score[best]) best = i;
    var title = r.score[best] >= 75
      ? '올해는 ' + CATS[best].name + '이 가장 밝습니다'
      : '올해는 지키는 것이 가장 큰 운입니다';
    $('rSumTitle').textContent = title;
    $('rSumSub').textContent = '2027년은 ' + r.base.sum;
    $('mini').innerHTML = CATS.map(function (c, i) {
      return App.miniRow(c.name, r.score[i], r.score[i]);
    }).join('');

    $('rLucks').innerHTML = CATS.map(function (c, i) {
      var t = tier(r.score[i]);
      var notes = r.notes[i].map(function (n) { return '<p class="lnote">' + n + '</p>'; }).join('');
      return '<div class="card luck rise" style="animation-delay: ' + (0.16 + i * 0.08) + 's">' +
        '<h2><span class="ico">' + c.ico + '</span>' + c.name +
        '<span class="grade ' + t.cls + '">' + t.label + '</span></h2>' +
        '<div class="score"><span class="num c-' + t.cls + '" data-to="' + r.score[i] + '">0</span><span class="unit">/ 100점</span></div>' +
        '<div class="lbar"><i class="' + t.cls + '" data-w="' + r.score[i] + '"></i></div>' +
        '<p>' + r.base.text[i] + '</p>' + notes + '</div>';
    }).join('');

    App.setShare('[2027 신년운세] ' + name + ' 님\n' +
      CATS.map(function (c, i) { return c.name + ' ' + r.score[i] + '점'; }).join(' · ') +
      '\n' + title);

    App.showView('resultView');
    animate();
  }

  function animate() {
    requestAnimationFrame(function () {
      document.querySelectorAll('.lbar i').forEach(function (el) { el.style.width = el.dataset.w + '%'; });
    });
    var nums = document.querySelectorAll('.score .num');
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var k = Math.min(1, (ts - start) / 900);
      nums.forEach(function (el) { el.textContent = Math.round(el.dataset.to * k); });
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
})();
