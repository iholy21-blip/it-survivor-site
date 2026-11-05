/* 테스트·앱 공통: 오른쪽 위 닫기(X) 버튼. 누르면 Work로 돌아가고, 노견 케어 앱은 그 앱의 소개 창으로 돌아간다.
   life/ , dog/ 어디서든 ../ 기준으로 링크한다. 이 파일만 불러오면 버튼이 생긴다. */
(function () {
  var id = (location.pathname.match(/([^\/]+)\.html$/) || [])[1] || '';
  var back = location.pathname.indexOf('/dog/') > -1 ? '../work.html#app-' + id : '../work.html';
  var st = document.createElement('style');
  st.textContent = '.app-close{position:fixed;top:12px;right:12px;z-index:50;width:44px;height:44px;border-radius:50%;' +
    'display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.92);color:#111;' +
    'border:1px solid rgba(0,0,0,.12);box-shadow:0 2px 8px rgba(0,0,0,.15)}' +
    '.app-close:hover{color:#0B7F79}.app-close svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}';
  document.head.appendChild(st);
  document.body.insertAdjacentHTML('afterbegin',
    '<a class="app-close" href="' + back + '" aria-label="닫기" title="닫기"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></a>');

  /* 예전 "만든 사람" 박스는 없앴다. quiz.js 가 부르는 mount 는 아무것도 하지 않는다. */
  window.Maker = { mount: function () {} };
})();
