/* 테스트 공통 동작 하나: 화면 전환, 질문 넘기기, 결과 복사.
   테스트별 파일(tests/*.js)은 App.initQuiz()에 질문과 결과 함수만 넘긴다. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var shareText = '', toastTimer = null;

  function showView(id) {
    ['introView', 'quizView', 'resultView'].forEach(function (v) {
      if ($(v)) $(v).hidden = v !== id;
    });
    window.scrollTo(0, 0);
    if (id === 'resultView' && window.Maker) Maker.mount(document.querySelector('#resultView .result'));
  }

  function toast(msg) {
    var el = $('toast');
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 2600);
  }

  function fallbackCopy() {
    var ta = document.createElement('textarea');
    ta.value = shareText; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    toast(ok ? '복사했어요. 카톡에 붙여 넣어 보내 보세요.' : '복사가 안 되면 화면을 캡처해서 보내 주세요.');
  }

  // 막대 한 줄. 0점이어도 막대가 텅 비어 보이지 않게 아주 짧게 남긴다
  function miniRow(name, value, text, low) {
    return '<div><b>' + name + '</b><div class="t"><i' + (low ? ' class="low"' : '') +
      ' style="width:' + Math.max(value, 3) + '%"></i></div><span>' + text + '</span></div>';
  }

  // opt: { questions, label(q, i), onDone(answers) }
  function initQuiz(opt) {
    var Q = opt.questions, answers = [], cur = 0, locked = false;

    function render(dir) {
      var q = Q[cur];
      $('count').textContent = (cur + 1) + ' / ' + Q.length;
      $('prog').style.width = (cur / Q.length * 100) + '%';
      $('backBtn').disabled = cur === 0;
      $('qNum').textContent = opt.label(q, cur);
      $('qText').textContent = q.q;
      var box = $('opts');
      box.innerHTML = '';
      q.o.forEach(function (o, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'opt' + (answers[cur] === i ? ' on' : '');
        var dot = document.createElement('span'); dot.className = 'dot';
        var txt = document.createElement('span'); txt.textContent = o[0];
        b.appendChild(dot); b.appendChild(txt);
        b.addEventListener('click', function () { pick(i, b); });
        box.appendChild(b);
      });
      var card = $('qcard');
      card.classList.remove('fwd', 'back');
      void card.offsetWidth;
      if (dir) card.classList.add(dir);
      locked = false;
    }

    function pick(i, el) {
      if (locked) return;
      locked = true;
      answers[cur] = i;
      Array.prototype.forEach.call($('opts').children, function (c) { c.classList.remove('on'); });
      el.classList.add('on');
      setTimeout(function () {
        if (cur < Q.length - 1) { cur++; render('fwd'); }
        else { $('prog').style.width = '100%'; opt.onDone(answers); showView('resultView'); }
      }, 300);
    }

    $('startBtn').addEventListener('click', function () {
      answers = []; cur = 0; render('fwd'); showView('quizView');
    });
    $('backBtn').addEventListener('click', function () {
      if (cur > 0) { cur--; render('back'); }
    });
  }

  $('copyBtn').addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).then(function () {
        toast('복사했어요. 카톡에 붙여 넣어 보내 보세요.');
      }, fallbackCopy);
    } else fallbackCopy();
  });
  $('againBtn').addEventListener('click', function () { showView('introView'); });

  window.App = {
    $: $,
    showView: showView,
    miniRow: miniRow,
    initQuiz: initQuiz,
    setShare: function (t) { shareText = t; }
  };
})();
