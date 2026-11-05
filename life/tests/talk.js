/* 내 말투 유형: 유형, 질문, 결과 문구 */
(function () {
  var T = {
    STR: { name: '직설형', alias: '돌려 말하지 않는 시원한 사람',
      like: '하고 싶은 말을 분명하게 합니다. 아닌 건 아니라고 말하고, 상대가 윗사람이어도 크게 다르지 않습니다.',
      good: '말에 거짓이 없어 믿음을 줍니다. 모두가 망설일 때 문제를 먼저 꺼내 일을 앞으로 나아가게 합니다.',
      care: '내용이 옳아도 말끝이 날카로우면 상대는 체면이 상했다고 느낄 수 있습니다. 시원하다는 말과 차갑다는 말을 함께 듣기 쉽습니다.',
      rephrase: [['그건 아니죠.', '그렇게 볼 수도 있겠네요. 다만 저는 이렇게 생각해요.'],
                 ['그래서 결론이 뭐예요?', '제가 이해한 게 맞는지 정리해 볼게요.']],
      match: { good: 'LIS', goodWhy: '끝까지 들어 주고 핵심을 받아 줍니다. 직설형의 말이 가장 편하게 닿는 상대입니다.',
               clash: 'CARE', clashWhy: '직설형의 말을 상처로 받기 쉽습니다. 첫마디만 부드럽게 해도 훨씬 잘 통합니다.' },
      todo: '반대 의견을 말하기 전에 "좋은 생각이에요, 그런데"처럼 한마디만 먼저 붙여 보세요. 내용은 그대로여도 듣는 쪽 마음이 열립니다.' },
    CARE: { name: '배려형', alias: '말 한마디도 고르고 고르는 사람',
      like: '상대가 어떻게 들을지 먼저 생각합니다. 같은 말도 부드럽게 돌려서 하고, 분위기가 상하는 걸 싫어합니다.',
      good: '함께 있으면 편안합니다. 어려운 이야기도 상처를 덜 주게 전하는 재주가 있습니다.',
      care: '너무 돌려 말하면 정말 하고 싶은 말이 전달되지 않습니다. 참고 넘긴 말이 쌓여 혼자 지치기 쉽습니다.',
      rephrase: [['괜찮아요, 아무거나 좋아요.', '저는 이쪽이 더 좋아요. 다른 분들은 어떠세요?'],
                 ['혹시 시간 되시면… 아니에요, 바쁘시죠?', '이번 주 안에 이것 좀 같이 봐 주실 수 있을까요?']],
      match: { good: 'EXP', goodWhy: '마음을 숨기지 않아서 눈치 보지 않고 편하게 대화할 수 있습니다.',
               clash: 'STR', clashWhy: '직설형의 말에 쉽게 상처받습니다. 말투보다 내용을 들어 보면 의외로 배울 점이 많습니다.' },
      todo: '이번 주에 한 번은 "저는 이렇게 생각해요"로 시작하는 말을 해 보세요. 부드럽게 말해도 분명할 수 있습니다.' },
    LOG: { name: '논리형', alias: '근거로 말하는 정리의 달인',
      like: '순서와 이유를 따져 말합니다. 감정보다 사실을 먼저 보고, 복잡한 이야기를 깔끔하게 정리합니다.',
      good: '말에 설득력이 있습니다. 회의나 집안일을 정할 때 결론을 내는 사람입니다.',
      care: '상대가 위로를 바랄 때 해결책부터 말하면 "내 마음은 몰라준다"는 말을 듣기 쉽습니다.',
      rephrase: [['그건 이렇게 하면 해결돼요.', '많이 답답했겠어요. 같이 방법을 찾아볼까요?'],
                 ['근거가 뭐예요?', '어떻게 그렇게 생각하게 됐는지 궁금해요.']],
      match: { good: 'STR', goodWhy: '핵심부터 말하는 직설형과는 말이 빨리 통합니다. 회의가 짧아지는 조합입니다.',
               clash: 'EXP', clashWhy: '마음을 먼저 나누고 싶은 표현형에게 논리형의 정리는 차갑게 들리기 쉽습니다.' },
      todo: '누가 고민을 꺼내면 해결책보다 "그랬구나"를 먼저 말해 보세요. 해결책은 그다음에 해도 늦지 않습니다.' },
    LIS: { name: '경청형', alias: '끝까지 들어 주는 사람',
      like: '말하기보다 듣기를 좋아합니다. 상대 말을 끊지 않고, 필요한 때에 짧게 말합니다.',
      good: '사람들이 마음을 잘 엽니다. 들은 이야기를 잘 기억해서 믿음을 얻습니다.',
      care: '말이 적어서 생각이 없거나 관심이 없다는 오해를 받기 쉽습니다. 내 의견이 묻히기도 합니다.',
      rephrase: [['(말없이 고개만 끄덕끄덕)', '아, 그래서 그때 그렇게 하셨구나. 저라면 이렇게 했을 것 같아요.'],
                 ['저는 아무래도 괜찮아요.', '저는 이 부분이 조금 걱정돼요.']],
      match: { good: 'EXP', goodWhy: '이야기를 풍성하게 꺼내는 표현형과 잘 맞습니다. 한 사람은 말하고 한 사람은 들어 주는 편한 조합입니다.',
               clash: 'FUN', clashWhy: '유머형의 빠른 농담 속에서 하고 싶은 말을 꺼낼 틈을 놓치기 쉽습니다.' },
      todo: '대화 끝에 "저는 이렇게 생각해요" 한 문장만 보태 보세요. 들어 준 만큼 내 이야기도 들을 자격이 있습니다.' },
    FUN: { name: '유머형', alias: '분위기를 살리는 웃음 담당',
      like: '어색한 자리를 웃음으로 풉니다. 같은 이야기도 재밌게 전하는 재주가 있습니다.',
      good: '사람들이 함께 있고 싶어 합니다. 긴장된 자리도 부드럽게 만듭니다.',
      care: '진지한 이야기에 농담을 섞으면 가볍게 듣는다는 오해를 받을 수 있습니다.',
      rephrase: [['(진지한 이야기에) 에이, 뭘 그렇게 심각해~', '그랬구나. 많이 신경 쓰였겠다.'],
                 ['농담이야, 농담!', '내 말이 지나쳤다면 미안해.']],
      match: { good: 'CARE', goodWhy: '웃음을 잘 받아 주고 분위기를 함께 살립니다. 같이 있으면 편한 조합입니다.',
               clash: 'LOG', clashWhy: '논리형은 농담보다 결론을 기다립니다. 웃음 뒤에 핵심 한 줄을 붙이면 잘 통합니다.' },
      todo: '누군가 진지하게 말을 꺼내면 첫 반응만큼은 농담 없이 들어 보세요. 웃음은 그다음에 더 빛납니다.' },
    EXP: { name: '표현형', alias: '마음이 얼굴과 말에 다 드러나는 사람',
      like: '기쁘면 크게 기뻐하고 속상하면 바로 티가 납니다. 반응이 풍부해서 말하는 사람이 신이 납니다.',
      good: '진심이 잘 전해집니다. 축하도 위로도 온 마음으로 해서 오래 기억에 남습니다.',
      care: '감정이 앞설 때 한 말이 나중에 마음에 걸리기 쉽습니다. 기분에 따라 말투가 달라 보일 수 있습니다.',
      rephrase: [['(서운할 때) 됐어, 말을 말자.', '나 지금 좀 서운했어. 조금 있다가 얘기하자.'],
                 ['왜 이제야 말해!', '말해 줘서 고마워. 미리 알았으면 더 좋았을 것 같아.']],
      match: { good: 'LIS', goodWhy: '표현형의 이야기를 끝까지 들어 주고 마음을 받아 줍니다.',
               clash: 'LOG', clashWhy: '마음을 나누고 싶을 때 논리형이 해결책부터 꺼내면 서운해지기 쉽습니다.' },
      todo: '화가 나거나 서운할 때는 메시지를 바로 보내지 말고 저장해 두었다가 10분 뒤에 다시 읽어 보세요.' }
  };
  var ORDER = ['STR', 'CARE', 'LOG', 'LIS', 'FUN', 'EXP'];

  // 보기마다 [문장, 가장 가까운 유형(+2), 조금 가까운 유형(+1)]
  var Q = [
    { q: '모임에서 의견이 다를 때 나는?', o: [
      ['다르다고 바로 말한다', 'STR', 'EXP'],
      ['상대 기분이 상하지 않게 돌려 말한다', 'CARE', 'LIS'],
      ['근거를 들어 차근차근 설명한다', 'LOG', 'STR'],
      ['일단 끝까지 듣고 나중에 말한다', 'LIS', 'CARE'] ]},
    { q: '친구가 고민을 털어놓으면?', o: [
      ['해결 방법부터 말해 준다', 'LOG', 'LIS'],
      ['"많이 힘들었겠다"부터 말한다', 'CARE', 'LIS'],
      ['말없이 끝까지 들어 준다', 'LIS', 'CARE'],
      ['같이 화내 주고 같이 속상해한다', 'EXP', 'CARE'] ]},
    { q: '단톡방에서 나는?', o: [
      ['이모티콘과 감탄사가 많다', 'EXP', 'FUN'],
      ['웃긴 사진이나 농담을 자주 올린다', 'FUN', 'EXP'],
      ['필요한 말만 짧게 한다', 'STR', 'LIS'],
      ['주로 읽기만 하고 가끔 답한다', 'LIS', 'CARE'] ]},
    { q: '식당에서 음식이 잘못 나오면?', o: [
      ['바로 직원에게 말한다', 'STR', 'EXP'],
      ['미안해하며 조심스럽게 말한다', 'CARE', 'LIS'],
      ['그냥 먹는다', 'LIS', 'CARE'],
      ['웃으면서 농담처럼 말한다', 'FUN', 'CARE'] ]},
    { q: '내가 자주 듣는 말은?', o: [
      ['"말이 시원하다"', 'STR', 'FUN'],
      ['"반응이 정말 좋다"', 'EXP', 'FUN'],
      ['"이야기하면 정리가 된다"', 'LOG', 'LIS'],
      ['"같이 있으면 재밌다"', 'FUN', 'EXP'] ]},
    { q: '무언가를 설명할 때 나는?', o: [
      ['결론부터 말한다', 'STR', 'EXP'],
      ['순서대로 하나하나 짚는다', 'LOG', 'LIS'],
      ['예를 들어 생생하게 말한다', 'EXP', 'FUN'],
      ['상대가 이해했는지 중간중간 묻는다', 'LIS', 'CARE'] ]},
    { q: '대화가 끝난 뒤 자주 드는 생각은?', o: [
      ['"너무 세게 말했나?"', 'STR', 'EXP'],
      ['"그 사람 기분은 괜찮을까?"', 'CARE', 'LIS'],
      ['"내 말을 제대로 알아들었을까?"', 'LOG', 'LIS'],
      ['"내 생각도 말할 걸 그랬나?"', 'LIS', 'LOG'] ]},
    { q: '좋은 소식을 들으면?', o: [
      ['바로 전화해서 크게 축하한다', 'EXP', 'FUN'],
      ['작은 선물이나 메시지를 챙긴다', 'CARE', 'FUN'],
      ['축하와 함께 앞으로 할 일을 말해 준다', 'LOG', 'STR'],
      ['재밌는 축하 문구를 만든다', 'FUN', 'EXP'] ]},
    { q: '나를 잘 아는 사람이 말하는 내 단점은?', o: [
      ['말이 너무 직설적이다', 'STR', 'EXP'],
      ['할 말을 못 하고 참는다', 'CARE', 'LIS'],
      ['너무 따진다', 'LOG', 'STR'],
      ['진지할 때도 농담을 한다', 'FUN', 'EXP'] ]},
    { q: '대화에서 가장 중요한 것은?', o: [
      ['솔직함', 'STR', 'EXP'],
      ['상대의 마음', 'CARE', 'EXP'],
      ['정확함', 'LOG', 'LIS'],
      ['즐거움', 'FUN', 'EXP'] ]}
  ];

  var $ = App.$;

  App.initQuiz({
    questions: Q,
    label: function (q, i) { return '질문 ' + (i + 1); },
    onDone: function (answers) {
      var score = {}, last = {}, total = 0;
      ORDER.forEach(function (k) { score[k] = 0; last[k] = -1; });
      Q.forEach(function (q, i) {
        var o = q.o[answers[i]];
        score[o[1]] += 2; score[o[2]] += 1; total += 3;
        last[o[1]] = i;
      });
      // 점수가 같으면 더 최근 답에서 가장 가까운 유형으로 나온 쪽
      var rank = ORDER.slice().sort(function (a, b) {
        return (score[b] - score[a]) || (last[b] - last[a]);
      });
      var pct = {};
      ORDER.forEach(function (k) { pct[k] = Math.round(score[k] / total * 100); });
      var t = T[rank[0]];

      $('rName').textContent = t.name;
      $('rAlias').textContent = t.alias;
      $('rLike').textContent = t.like;
      $('rGood').textContent = t.good;
      $('rCare').textContent = t.care;
      $('rTodo').textContent = t.todo;
      $('mini').innerHTML = rank.slice(0, 3).map(function (k) {
        return App.miniRow(T[k].name, pct[k], pct[k] + '%');
      }).join('');
      $('rBalance').hidden = score[rank[0]] - score[rank[1]] > 2;

      $('rRephrase').innerHTML = t.rephrase.map(function (r) {
        return '<div><span class="from">' + r[0] + '</span><span class="to">' + r[1] + '</span></div>';
      }).join('');
      $('rMatchGood').textContent = T[t.match.good].name;
      $('rMatchGoodWhy').textContent = t.match.goodWhy;
      $('rMatchClash').textContent = T[t.match.clash].name;
      $('rMatchClashWhy').textContent = t.match.clashWhy;

      // 2위가 여럿이면 함께 보여 줌
      var seconds = rank.slice(1).filter(function (k) { return score[k] === score[rank[1]]; });
      $('rSecond').textContent = seconds.map(function (k) { return T[k].name; }).join(', ');
      $('rSecondLead').textContent = seconds.length > 1 ? '공동 2위는 ' : '두 번째로 가까운 유형은 ';

      $('allBars').innerHTML = rank.map(function (k) {
        return '<div' + (k === rank[0] ? ' class="me"' : '') + '><b>' + T[k].name +
          '</b><div class="track"><i style="width:' + pct[k] + '%"></i></div><span>' + pct[k] + '%</span></div>';
      }).join('');

      App.setShare('[내 말투 유형]\n' + t.name + ' - ' + t.alias + '\n' +
        '잘 맞는 말투: ' + T[t.match.good].name + ' / 부딪히기 쉬운 말투: ' + T[t.match.clash].name +
        '\n\n이번 주에 해 볼 말: ' + t.todo);
    }
  });
})();
