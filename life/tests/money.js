/* 나의 돈 쓰는 스타일: 유형, 질문, 결과 문구 */
(function () {
  var T = {
    SAVE: { name: '알뜰 지킴이', alias: '한 푼도 허투루 쓰지 않는 든든한 금고',
      like: '가격을 꼼꼼히 비교하고, 꼭 필요한 것만 삽니다. 돈이 들어오면 먼저 떼어 두는 습관이 몸에 배어 있습니다.',
      good: '어려운 때가 와도 쉽게 흔들리지 않습니다. 비상금이 있다는 안정감이 큰 힘이 됩니다.',
      care: '아끼다 보니 건강검진이나 치과 치료처럼 꼭 써야 할 곳까지 미루기 쉽습니다. 모으기만 하고 누리지 못하면 돈이 목적이 되어 버립니다.',
      todo: '이번 달에는 나를 위해 쓸 돈을 작게라도 정해 두고, 미안해하지 말고 써 보세요.' },
    EXP: { name: '경험 수집가', alias: '물건보다 추억에 쓰는 사람',
      like: '여행, 공연, 맛집, 배우는 일에 돈을 씁니다. 물건은 낡지만 경험은 남는다고 믿습니다.',
      good: '삶이 풍성하고 이야깃거리가 많습니다. 새로운 일을 두려워하지 않습니다.',
      care: '좋은 경험은 한꺼번에 몰리기 쉽고, 카드값은 몇 달 뒤에 돌아옵니다. 할부가 쌓이지 않는지 살펴보세요.',
      todo: '다음 여행이나 배움을 위한 통장을 따로 만들어, 매달 조금씩 미리 모아 보세요. 모아 둔 돈으로 떠나는 여행은 마음도 가볍습니다.' },
    FAM: { name: '가족 우선형', alias: '내 것보다 가족 것을 먼저 챙기는 사람',
      like: '부모님, 자녀, 반려동물처럼 가족에게 쓰는 돈은 아깝지 않습니다. 장을 봐도 가족이 좋아하는 것부터 담습니다.',
      good: '가족에게 든든한 버팀목입니다. 내가 베푼 마음을 가족이 오래 기억합니다.',
      care: '가족을 챙기느라 내 노후 자금은 늘 뒤로 밀립니다. 내가 건강하고 넉넉해야 나중에 가족에게 짐이 되지 않습니다.',
      todo: '가족에게 쓰는 돈과 따로, 내 노후를 위해 모을 금액을 먼저 정해 두세요. 금액보다 순서를 바꾸는 것이 중요합니다.' },
    PLAN: { name: '계획 관리형', alias: '숫자로 살림을 다스리는 사람',
      like: '가계부를 쓰거나 항목별로 예산을 나눕니다. 카드 명세서도 한 줄씩 확인합니다.',
      good: '돈이 어디로 가는지 알기 때문에 큰 실수를 하지 않습니다. 노후 계획을 세우기도 쉽습니다.',
      care: '계획에 없는 지출이 생기면 스트레스를 크게 받습니다. 숫자가 딱 맞는 것보다 마음이 편한 것이 더 중요할 때도 있습니다.',
      todo: '예산에 예비비 칸을 하나 만들어 두세요. 계획 밖의 일도 계획 안에 들어오면 덜 흔들립니다.' },
    MOOD: { name: '기분 전환형', alias: '작은 쇼핑으로 마음을 달래는 사람',
      like: '지치거나 속상할 때 맛있는 것을 먹거나 물건을 사며 기분을 풉니다. 특가, 마감 임박이라는 말에 마음이 움직입니다.',
      good: '내 마음을 돌볼 줄 알고, 작은 것에서 기쁨을 찾습니다.',
      care: '홈쇼핑이나 온라인 특가로 산 물건이 쌓이기 쉽습니다. 기분이 풀리는 건 잠깐이고 카드값은 남습니다.',
      todo: '사고 싶은 것이 생기면 장바구니에 넣고 하루만 기다려 보세요. 다음 날에도 갖고 싶으면 그때 사도 늦지 않습니다.' },
    PPL: { name: '관계 투자형', alias: '사람에게 쓰는 돈은 아끼지 않는 사람',
      like: '밥값은 먼저 내고, 경조사에는 빠지지 않습니다. 사람을 챙기는 데 쓰는 돈을 아까워하지 않습니다.',
      good: '주변에 사람이 많고, 어려울 때 도와줄 사람도 많습니다.',
      care: '체면 때문에 무리하기 쉽습니다. 은퇴 뒤 수입은 줄어도 모임비와 경조사비는 그대로인 경우가 많습니다.',
      todo: '한 달 모임·경조사 예산을 정해 두세요. 마음은 금액보다 안부 한 줄로도 충분히 전해집니다.' }
  };
  var ORDER = ['SAVE', 'EXP', 'FAM', 'PLAN', 'MOOD', 'PPL'];

  // 보기마다 [문장, 가장 가까운 유형(+2), 조금 가까운 유형(+1)]
  var Q = [
    { q: '월급이나 연금이 들어오면 제일 먼저?', o: [
      ['저축할 돈부터 떼어 둔다', 'SAVE', 'PLAN'],
      ['이번 달 쓸 돈을 항목별로 나눈다', 'PLAN', 'FAM'],
      ['가족에게 필요한 것부터 챙긴다', 'FAM', 'PPL'],
      ['특별히 정해 둔 건 없다', 'MOOD', 'EXP'] ]},
    { q: '생각지 않은 10만 원이 생기면?', o: [
      ['그냥 통장에 넣어 둔다', 'SAVE', 'PLAN'],
      ['가 보고 싶던 곳이나 배우고 싶던 것에 쓴다', 'EXP', 'MOOD'],
      ['가족이나 아끼는 이(반려동물 포함)에게 선물한다', 'FAM', 'PPL'],
      ['친구에게 밥을 산다', 'PPL', 'EXP'] ]},
    { q: '마트에 가면 나는?', o: [
      ['할인, 1+1부터 살핀다', 'SAVE', 'MOOD'],
      ['적어 온 목록대로만 산다', 'PLAN', 'SAVE'],
      ['가족이 좋아하는 것부터 담는다', 'FAM', 'PLAN'],
      ['둘러보다 눈에 띄는 걸 담는다', 'MOOD', 'EXP'] ]},
    { q: '스트레스를 받으면?', o: [
      ['맛있는 걸 먹거나 쇼핑을 한다', 'MOOD', 'EXP'],
      ['훌쩍 어디든 떠난다', 'EXP', 'MOOD'],
      ['사람을 만나 수다를 떤다', 'PPL', 'MOOD'],
      ['산책처럼 돈 안 드는 걸로 푼다', 'SAVE', 'PPL'] ]},
    { q: '카드 명세서를 보면?', o: [
      ['한 줄 한 줄 다 확인한다', 'PLAN', 'SAVE'],
      ['"이걸 언제 샀지?" 할 때가 있다', 'MOOD', 'EXP'],
      ['대부분 가족 관련 지출이다', 'FAM', 'PLAN'],
      ['모임비, 경조사비가 꽤 된다', 'PPL', 'FAM'] ]},
    { q: '돈을 쓰고 가장 뿌듯했던 순간은?', o: [
      ['목표한 만큼 모았을 때', 'SAVE', 'PLAN'],
      ['여행이나 공연으로 좋은 추억을 만들었을 때', 'EXP', 'PPL'],
      ['가족이 기뻐하는 얼굴을 봤을 때', 'FAM', 'PPL'],
      ['갖고 싶던 물건을 손에 넣었을 때', 'MOOD', 'EXP'] ]},
    { q: '친구들과 밥을 먹으면?', o: [
      ['정확히 나눠 낸다', 'PLAN', 'SAVE'],
      ['내가 먼저 계산할 때가 많다', 'PPL', 'FAM'],
      ['분위기 좋은 곳이면 좀 비싸도 괜찮다', 'EXP', 'MOOD'],
      ['가격이 적당한 곳을 찾아 간다', 'SAVE', 'PPL'] ]},
    { q: '홈쇼핑이나 온라인 특가를 보면?', o: [
      ['마감 임박이면 일단 산다', 'MOOD', 'FAM'],
      ['정말 필요한지 따져 보고 산다', 'PLAN', 'MOOD'],
      ['가족에게 필요할 것 같으면 산다', 'FAM', 'MOOD'],
      ['그 돈이면 사람들과 밥 한 끼 먹는다', 'PPL', 'EXP'] ]},
    { q: '노후 자금을 생각하면?', o: [
      ['아직 부족하니 더 모아야 한다', 'SAVE', 'FAM'],
      ['계획은 세워 두었다', 'PLAN', 'SAVE'],
      ['가족을 챙기느라 아직 못 챙겼다', 'FAM', 'PPL'],
      ['지금을 즐기는 것도 중요하다', 'EXP', 'MOOD'] ]},
    { q: '남들이 보는 나는?', o: [
      ['알뜰하다', 'SAVE', 'PLAN'],
      ['꼼꼼하다', 'PLAN', 'FAM'],
      ['정이 많다', 'PPL', 'FAM'],
      ['인생을 즐길 줄 안다', 'EXP', 'PPL'] ]}
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

      // 2위가 여럿이면 함께 보여 줌
      var seconds = rank.slice(1).filter(function (k) { return score[k] === score[rank[1]]; });
      $('rSecond').textContent = seconds.map(function (k) { return T[k].name; }).join(', ');
      $('rSecondLead').textContent = seconds.length > 1 ? '공동 2위는 ' : '두 번째로 가까운 유형은 ';

      $('allBars').innerHTML = rank.map(function (k) {
        return '<div' + (k === rank[0] ? ' class="me"' : '') + '><b>' + T[k].name +
          '</b><div class="track"><i style="width:' + pct[k] + '%"></i></div><span>' + pct[k] + '%</span></div>';
      }).join('');

      App.setShare('[나의 돈 쓰는 스타일]\n' + t.name + ' - ' + t.alias + '\n' +
        rank.slice(0, 3).map(function (k) { return T[k].name + ' ' + pct[k] + '%'; }).join(' / ') +
        '\n\n이번 달에 해 볼 일: ' + t.todo);
    }
  });
})();
