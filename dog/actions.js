/* 노견케어 앱 공통: 결과 아래 "결과 복사하기"(채운 버튼) + "다시 하기"(선 버튼).
   DogActions.render(상자, { getText, againLabel, onAgain }) 으로 붙인다. */
window.DogActions = (function () {
  var timer = null;

  function toast(box, msg) {
    var t = box.querySelector('.ra-toast');
    if (!t) { t = document.createElement('p'); t.className = 'ra-toast'; box.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(function () { t.hidden = true; }, 2600);
  }

  function copy(text, box) {
    var ok = '복사했어요. 카톡이나 메모에 붙여 넣어 보세요.';
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var done = false;
      try { done = document.execCommand('copy'); } catch (e) { done = false; }
      document.body.removeChild(ta);
      toast(box, done ? ok : '복사가 안 되면 화면을 캡처해 주세요.');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(box, ok); }, fallback);
    } else fallback();
  }

  function render(box, opts) {
    var old = box.querySelector('.ra');
    if (old) old.remove();
    var wrap = document.createElement('div');
    wrap.className = 'ra';
    var c = document.createElement('button');
    c.type = 'button'; c.className = 'ra-copy'; c.textContent = '결과 복사하기';
    c.addEventListener('click', function () { copy(opts.getText(), wrap); });
    wrap.appendChild(c);
    if (opts.onAgain) {
      var a = document.createElement('button');
      a.type = 'button'; a.className = 'ra-again'; a.textContent = opts.againLabel || '다시 시작하기';
      a.addEventListener('click', opts.onAgain);
      wrap.appendChild(a);
    }
    box.appendChild(wrap);
  }

  // 요소 안의 글자만 깔끔하게 꺼낸다 (여러 칸이면 줄바꿈)
  function text(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }

  return { render: render, copy: copy, text: text };
})();
