// ⚠️ ACHTUNG: Diese Datei wird NICHT von index.html eingebunden!
// Die aktive App-Logik befindet sich inline in index.html <script>.
// Diese Datei ist eine ältere/alternative Version und wird nicht geladen.
//
// ===== CONFIG =====
// DEIN YouTube API Key — hier eintragen:
const YT_API_KEY = 'AIzaSyCkbxNViUW1O7fXgk0s3vsXfeLIOTUZ9ik';

// ===== ÜBERSETZUNGEN =====
const i18n = {
  de: {
    badge: '✨ Kostenlos testen',
    'hero-title': 'Dein Handy als<br><span>YouTube-Fernbedienung</span>',
    'hero-sub': 'Like, kommentiere und abonniere direkt vom Sofa — ganz ohne TV-Fernbedienung.',
    'visual-title': 'Einfach verbinden',
    'visual-sub': 'QR-Code scannen oder Link öffnen — fertig!',
    step1: 'Kanal suchen', step2: 'Video wählen', step3: 'Interagieren',
    stat1: 'nutzen Handy beim TV schauen',
    stat2: 'bis zur ersten Interaktion',
    stat3: 'kostenlos & im Browser',
    cta: '🚀 Jetzt kostenlos starten',
    'cta-sub': 'Keine App nötig · Kein Account nötig · Sofort loslegen',
    'qr-title': 'Auf dem Handy öffnen',
    'qr-sub': 'QR-Code scannen oder voicecomment-tv.vip eingeben',
    ad: 'Werbung',
    'bc-search': 'Kanal suchen',
    'bc-videos': 'Videos',
    'bc-action': 'Interaktion',
    'search-label': 'Welchen Kanal schaust du? 📺',
    'search-hint': 'Gib den Kanalnamen ein oder nutze das Mikrofon',
    history: 'Zuletzt geschaut',
    popular: 'Beliebte Kanäle',
    'action-title': 'Was möchtest du tun?',
    'action-sub': 'Wähle eine Aktion — YouTube öffnet sich automatisch',
    'btn-like': 'Daumen hoch',
    'btn-like-hint': 'Video liken',
    'btn-sub': 'Abonnieren',
    'btn-sub-hint': 'Kanal folgen',
    'btn-comment': 'Kommentieren',
    'btn-comment-hint': 'Meinung schreiben',
    'btn-shop': 'Produkt',
    'btn-shop-hint': 'Shop öffnen',
    'comment-send': 'Kommentar auf YouTube öffnen ↗',
    'change-video': 'Anderen Kanal / Video wählen',
    'toast-like': '👍 YouTube öffnet sich — dort auf 👍 tippen!',
    'toast-sub': '🔔 YouTube öffnet sich — dort auf Abonnieren tippen!',
    'toast-comment-empty': '❗ Bitte erst einen Kommentar schreiben!',
    'toast-comment': '💬 YouTube öffnet sich — dort kommentieren!',
    'toast-shop': '🛒 Shop öffnet sich...',
    'toast-voice-start': '🎤 Sprich jetzt den Kanalnamen...',
    'toast-voice-ok': '✓ Erkannt: ',
    'toast-voice-err': '❗ Spracheingabe fehlgeschlagen',
    'toast-voice-no': '❗ Spracheingabe nicht unterstützt',
    'subscribed-label': '✓ Abonniert',
    'subscribe-label': 'Abonnieren',
    'liked-label': '✓ Geliked!',
    'like-label': 'Daumen hoch',
    'loading': 'Lädt...',
    'no-results': 'Kein Kanal gefunden. Bitte anders suchen.',
  },
  en: {
    badge: '✨ Try for free',
    'hero-title': 'Your phone as<br><span>YouTube remote control</span>',
    'hero-sub': 'Like, comment and subscribe directly from the sofa — no TV remote needed.',
    'visual-title': 'Connect easily',
    'visual-sub': 'Scan the QR code or open the link — done!',
    step1: 'Find channel', step2: 'Choose video', step3: 'Interact',
    stat1: 'use phone while watching TV',
    stat2: 'to first interaction',
    stat3: 'free & in browser',
    cta: '🚀 Start for free now',
    'cta-sub': 'No app needed · No account needed · Start instantly',
    'qr-title': 'Open on your phone',
    'qr-sub': 'Scan QR code or type voicecomment-tv.vip',
    ad: 'Advertisement',
    'bc-search': 'Find channel',
    'bc-videos': 'Videos',
    'bc-action': 'Interact',
    'search-label': 'Which channel are you watching? 📺',
    'search-hint': 'Enter the channel name or use the microphone',
    history: 'Recently watched',
    popular: 'Popular channels',
    'action-title': 'What would you like to do?',
    'action-sub': 'Choose an action — YouTube opens automatically',
    'btn-like': 'Thumbs up',
    'btn-like-hint': 'Like the video',
    'btn-sub': 'Subscribe',
    'btn-sub-hint': 'Follow channel',
    'btn-comment': 'Comment',
    'btn-comment-hint': 'Write your opinion',
    'btn-shop': 'Product',
    'btn-shop-hint': 'Open shop',
    'comment-send': 'Open comment on YouTube ↗',
    'change-video': 'Choose another channel / video',
    'toast-like': '👍 YouTube opens — tap 👍 there!',
    'toast-sub': '🔔 YouTube opens — tap Subscribe there!',
    'toast-comment-empty': '❗ Please write a comment first!',
    'toast-comment': '💬 YouTube opens — comment there!',
    'toast-shop': '🛒 Shop is opening...',
    'toast-voice-start': '🎤 Say the channel name now...',
    'toast-voice-ok': '✓ Recognized: ',
    'toast-voice-err': '❗ Voice input failed',
    'toast-voice-no': '❗ Voice input not supported',
    'subscribed-label': '✓ Subscribed',
    'subscribe-label': 'Subscribe',
    'liked-label': '✓ Liked!',
    'like-label': 'Thumbs up',
    'loading': 'Loading...',
    'no-results': 'No channel found. Please try a different search.',
  }
};

// ===== STATE =====
let lang = navigator.language.startsWith('de') ? 'de' : 'en';
let currentChannel = null;
let currentVideo = null;
let liked = false;
let subscribed = false;
let history = [];
let recognition = null;
let searchDebounce = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
  applyLang();
  renderPopular();
  renderHistory();
  generateQR();
  document.getElementById('lang-toggle').textContent = '🌐 ' + lang.toUpperCase();
});

// ===== NAVIGATION =====
function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ===== TOAST =====
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ===== SPRACHE =====
function toggleLang() {
  lang = lang === 'de' ? 'en' : 'de';
  document.getElementById('lang-toggle').textContent = '🌐 ' + lang.toUpperCase();
  applyLang();
  recognition && recognition.stop();
}

function t(key) {
  return i18n[lang][key] || i18n['de'][key] || key;
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key === 'hero-title') {
      el.innerHTML = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang);
  });
  document.documentElement.lang = lang;
  if (recognition) recognition.lang = lang === 'de' ? 'de-DE' : 'en-US';
}

// ===== HISTORY =====
function loadHistory() {
  try {
    history = JSON.parse(localStorage.getItem('vctv_history') || '[]');
  } catch(e) { history = []; }
}

function saveHistory(ch) {
  history = [ch, ...history.filter(h => h.channelId !== ch.channelId)].slice(0, 5);
  try { localStorage.setItem('vctv_history', JSON.stringify(history)); } catch(e) {}
  renderHistory();
}

function renderHistory() {
  const el = document.getElementById('history-chips');
  const sec = document.getElementById('history-section');
  if (!history || history.length === 0) {
    if (sec) sec.style.display = 'none';
    return;
  }
  if (sec) sec.style.display = 'block';
  if (el) el.innerHTML = history.map(ch => `
    <div class="history-chip" onclick='selectChannel(${JSON.stringify(ch)})'>
      ${ch.emoji || '📺'} ${ch.name}
    </div>
  `).join('');
}

// ===== QR CODE =====
function generateQR() {
  const box = document.getElementById('qr-box');
  if (!box || typeof QRCode === 'undefined') return;
  try {
    new QRCode(box, {
      text: 'https://voicecomment-tv.vip',
      width: 80, height: 80,
      colorDark: '#FF6B00',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch(e) {
    box.innerHTML = '<div style="width:80px;height:80px;background:#FFF3E8;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#FF6B00;text-align:center;padding:6px">voicecomment-tv.vip</div>';
  }
}

// ===== BELIEBTE KANÄLE (Demo-Fallback) =====
const POPULAR_CHANNELS = [
  { name: 'MontanaBlack', handle: '@montanablack88', subs: '3,2 Mio', color: '#FF6B00', emoji: '🎮', channelId: 'UCmv8-XJRK_7e_GZ3XsCAcfA' },
  { name: 'MrBeast', handle: '@MrBeast', subs: '340 Mio', color: '#FF0000', emoji: '🔥', channelId: 'UCX6OQ3DkcsbYNE6H8uQQuVA' },
  { name: 'Dner', handle: '@Dner', subs: '1,8 Mio', color: '#8B5CF6', emoji: '😂', channelId: 'UCl9I9FP7C0PAJJNXNDg2RRw' },
  { name: 'Rezo', handle: '@rezo', subs: '2,3 Mio', color: '#06B6D4', emoji: '📢', channelId: 'UCM9KEEuzacwVlkt9JfJad7g' },
  { name: 'PewDiePie', handle: '@PewDiePie', subs: '111 Mio', color: '#EF4444', emoji: '🎯', channelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw' },
  { name: 'Gronkh', handle: '@Gronkh', subs: '1,4 Mio', color: '#22C55E', emoji: '🕹️', channelId: 'UCjNxsHDPAXun0LcKGJKuGgQ' },
];

function renderPopular() {
  const el = document.getElementById('popular-results');
  if (!el) return;
  el.innerHTML = POPULAR_CHANNELS.map(ch => channelHTML(ch)).join('');
}

function channelHTML(ch) {
  const safe = JSON.stringify(ch).replace(/'/g, "\\'");
  return `
    <div class="result-item" onclick='selectChannel(${JSON.stringify(ch)})'>
      <div class="channel-avatar" style="background:${ch.color}">${ch.emoji || '📺'}</div>
      <div class="result-info">
        <div class="result-name">${ch.name}</div>
        <div class="result-sub">${ch.handle} · ${ch.subs} Abonnenten</div>
      </div>
      <span class="result-arrow">›</span>
    </div>
  `;
}

// ===== YOUTUBE API SUCHE =====
function onSearch(val) {
  const res = document.getElementById('search-results');
  const hist = document.getElementById('history-section');

  if (val.length < 2) {
    res.style.display = 'none';
    if (hist && history.length > 0) hist.style.display = 'block';
    return;
  }

  if (hist) hist.style.display = 'none';
  res.style.display = 'block';
  res.innerHTML = `<div class="result-item"><div class="result-info"><div class="result-name" style="color:var(--text2)">${t('loading')}</div></div></div>`;

  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => searchYouTube(val), 400);
}

async function searchYouTube(query) {
  const res = document.getElementById('search-results');

  // Erst lokal filtern (schnell)
  const local = POPULAR_CHANNELS.filter(ch =>
    ch.name.toLowerCase().includes(query.toLowerCase()) ||
    ch.handle.toLowerCase().includes(query.toLowerCase())
  );

  if (local.length > 0) {
    res.innerHTML = local.map(ch => channelHTML(ch)).join('');
  }

  // Dann YouTube API
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=5&key=${YT_API_KEY}`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (data.error) {
      if (local.length === 0) res.innerHTML = `<div class="result-item"><div class="result-info"><div class="result-name" style="color:var(--text2)">${t('no-results')}</div></div></div>`;
      return;
    }

    if (!data.items || data.items.length === 0) {
      if (local.length === 0) res.innerHTML = `<div class="result-item"><div class="result-info"><div class="result-name" style="color:var(--text2)">${t('no-results')}</div></div></div>`;
      return;
    }

    const channels = data.items.map(item => ({
      name: item.snippet.title,
      handle: item.snippet.customUrl || '@' + item.snippet.title.replace(/\s/g, ''),
      subs: '',
      color: '#FF6B00',
      emoji: '📺',
      channelId: item.snippet.channelId || item.id.channelId,
      thumb: item.snippet.thumbnails?.default?.url || null,
    }));

    res.innerHTML = channels.map(ch => {
      const safe = JSON.stringify(ch);
      const thumb = ch.thumb
        ? `<img src="${ch.thumb}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0" />`
        : `<div class="channel-avatar" style="background:${ch.color}">${ch.emoji}</div>`;
      return `
        <div class="result-item" onclick='selectChannel(${safe})'>
          ${thumb}
          <div class="result-info">
            <div class="result-name">${ch.name}</div>
            <div class="result-sub">${ch.handle}</div>
          </div>
          <span class="result-arrow">›</span>
        </div>
      `;
    }).join('');

  } catch(e) {
    if (local.length === 0) {
      res.innerHTML = `<div class="result-item"><div class="result-info"><div class="result-name" style="color:var(--text2)">${t('no-results')}</div></div></div>`;
    }
  }
}

// ===== KANAL AUSWÄHLEN =====
async function selectChannel(ch) {
  currentChannel = ch;
  liked = false;
  subscribed = false;

  saveHistory(ch);

  document.getElementById('video-topbar-name').textContent = ch.name;
  const avatar = document.getElementById('ch-avatar');
  if (ch.thumb) {
    avatar.innerHTML = `<img src="${ch.thumb}" style="width:58px;height:58px;border-radius:50%;object-fit:cover" />`;
    avatar.style.background = 'none';
  } else {
    avatar.textContent = ch.emoji || '📺';
    avatar.style.background = ch.color || '#FF6B00';
  }
  document.getElementById('ch-name').textContent = ch.name;
  document.getElementById('ch-subs').textContent = (ch.subs ? ch.subs + ' Abonnenten · ' : '') + (ch.handle || '');

  const subBtn = document.getElementById('sub-hero-btn');
  subBtn.textContent = t('subscribe-label');
  subBtn.className = 'sub-btn';

  document.getElementById('search-input').value = '';
  document.getElementById('search-results').style.display = 'none';
  renderHistory();

  goTo('screen-videos');
  await loadVideos(ch);
}

// ===== VIDEOS LADEN =====
async function loadVideos(ch) {
  const list = document.getElementById('videos-list');
  list.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text2)">${t('loading')}</div>`;

  document.getElementById('live-badge').style.display = 'none';

  try {
    // Upload Playlist holen
    const chResp = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails,statistics&id=${ch.channelId}&key=${YT_API_KEY}`);
    const chData = await chResp.json();

    if (chData.error || !chData.items || chData.items.length === 0) {
      renderDemoVideos(ch);
      return;
    }

    const channelInfo = chData.items[0];
    const uploadPlaylistId = channelInfo.contentDetails?.relatedPlaylists?.uploads;
    const subCount = channelInfo.statistics?.subscriberCount;
    if (subCount) {
      const formatted = parseInt(subCount).toLocaleString('de-DE');
      document.getElementById('ch-subs').textContent = formatted + ' Abonnenten';
    }

    if (!uploadPlaylistId) { renderDemoVideos(ch); return; }

    // Videos laden
    const vidResp = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadPlaylistId}&maxResults=8&key=${YT_API_KEY}`);
    const vidData = await vidResp.json();

    if (vidData.error || !vidData.items || vidData.items.length === 0) {
      renderDemoVideos(ch); return;
    }

    // Live prüfen
    const liveResp = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${ch.channelId}&eventType=live&type=video&key=${YT_API_KEY}`);
    const liveData = await liveResp.json();
    const isLive = !liveData.error && liveData.items && liveData.items.length > 0;

    document.getElementById('live-badge').style.display = isLive ? 'inline-flex' : 'none';

    let html = '';

    if (isLive && liveData.items[0]) {
      const lv = liveData.items[0].snippet;
      const liveId = liveData.items[0].id.videoId;
      html += `
        <div class="video-card live-card" onclick="selectVideo('${liveId}', ${JSON.stringify({ title: lv.title, channelTitle: lv.channelTitle, thumb: lv.thumbnails?.medium?.url, live: true, videoId: liveId })})">
          <div class="video-thumb">
            ${lv.thumbnails?.medium?.url ? `<img src="${lv.thumbnails.medium.url}" />` : '📡'}
          </div>
          <div class="video-info">
            <div class="video-title">🔴 LIVE — ${lv.title}</div>
            <div class="video-meta">${ch.name} · LIVE</div>
          </div>
        </div>
      `;
    }

    vidData.items.forEach(item => {
      const s = item.snippet;
      const videoId = s.resourceId?.videoId;
      if (!videoId) return;
      const pubDate = new Date(s.publishedAt);
      const ago = timeAgo(pubDate, lang);
      const thumb = s.thumbnails?.medium?.url || s.thumbnails?.default?.url;
      html += `
        <div class="video-card" onclick="selectVideo('${videoId}', ${JSON.stringify({ title: s.title, channelTitle: s.channelTitle, thumb, live: false, videoId })})">
          <div class="video-thumb">
            ${thumb ? `<img src="${thumb}" />` : '▶'}
          </div>
          <div class="video-info">
            <div class="video-title">${s.title}</div>
            <div class="video-meta">${ch.name} · ${ago}</div>
          </div>
        </div>
      `;
    });

    list.innerHTML = html || '<div style="text-align:center;padding:30px;color:var(--text2)">Keine Videos gefunden.</div>';

  } catch(e) {
    renderDemoVideos(ch);
  }
}

function renderDemoVideos(ch) {
  const list = document.getElementById('videos-list');
  const demos = [
    { title: `Das neue Video von ${ch.name}! 🔥`, ago: lang === 'de' ? 'vor 2 Tagen' : '2 days ago', emoji: '🎬' },
    { title: `Unglaublich was hier passiert ist... 😱`, ago: lang === 'de' ? 'vor 5 Tagen' : '5 days ago', emoji: '🎮' },
    { title: `Q&A mit meiner Community`, ago: lang === 'de' ? 'vor 1 Woche' : '1 week ago', emoji: '🎤' },
    { title: `Der beste Stream ever! 💪`, ago: lang === 'de' ? 'vor 2 Wochen' : '2 weeks ago', emoji: '📡' },
  ];
  list.innerHTML = demos.map((v, i) => `
    <div class="video-card" onclick="selectVideo('demo_${i}', ${JSON.stringify({ title: v.title, channelTitle: ch.name, thumb: null, live: false, videoId: 'demo_' + i, emoji: v.emoji, ago: v.ago })})">
      <div class="video-thumb">${v.emoji}</div>
      <div class="video-info">
        <div class="video-title">${v.title}</div>
        <div class="video-meta">${ch.name} · ${v.ago}</div>
      </div>
    </div>
  `).join('');
}

// ===== VIDEO AUSWÄHLEN =====
function selectVideo(videoId, video) {
  currentVideo = { ...video, videoId };
  liked = false;

  const thumb = document.getElementById('action-thumb');
  if (video.thumb) {
    thumb.innerHTML = `<img src="${video.thumb}" />`;
  } else {
    thumb.textContent = video.emoji || '▶';
    thumb.innerHTML = video.emoji || '▶';
  }

  document.getElementById('action-title').textContent = video.title;
  document.getElementById('action-ch').textContent = currentChannel?.name || video.channelTitle || '';

  const likeBtn = document.getElementById('like-btn');
  likeBtn.className = 'action-btn btn-like';
  likeBtn.querySelector('.label').textContent = t('btn-like');

  const subBtn = document.getElementById('sub-btn');
  subBtn.className = 'action-btn btn-sub';

  document.getElementById('comment-panel').classList.remove('open');
  document.getElementById('comment-text').value = '';

  goTo('screen-action');
}

// ===== AKTIONEN =====
function doLike() {
  liked = !liked;
  const btn = document.getElementById('like-btn');
  if (liked) {
    btn.classList.add('active');
    btn.querySelector('.label').textContent = t('liked-label');
    showToast(t('toast-like'));
    const url = currentVideo?.videoId && !currentVideo.videoId.startsWith('demo_')
      ? `https://www.youtube.com/watch?v=${currentVideo.videoId}`
      : 'https://youtube.com';
    setTimeout(() => window.open(url, '_blank'), 1200);
  } else {
    btn.classList.remove('active');
    btn.querySelector('.label').textContent = t('btn-like');
  }
}

function doSubscribe() {
  subscribed = !subscribed;
  const btn = document.getElementById('sub-btn');
  if (subscribed) {
    btn.classList.add('active');
    btn.querySelector('.label').textContent = t('subscribed-label');
    showToast(t('toast-sub'));
    const url = currentChannel?.channelId
      ? `https://www.youtube.com/channel/${currentChannel.channelId}?sub_confirmation=1`
      : 'https://youtube.com';
    setTimeout(() => window.open(url, '_blank'), 1200);
  } else {
    btn.classList.remove('active');
    btn.querySelector('.label').textContent = t('btn-sub');
  }
}

function toggleSub() {
  subscribed = !subscribed;
  const btn = document.getElementById('sub-hero-btn');
  if (subscribed) {
    btn.textContent = t('subscribed-label');
    btn.classList.add('subscribed');
    showToast(t('toast-sub'));
    const url = currentChannel?.channelId
      ? `https://www.youtube.com/channel/${currentChannel.channelId}?sub_confirmation=1`
      : 'https://youtube.com';
    setTimeout(() => window.open(url, '_blank'), 1200);
  } else {
    btn.textContent = t('subscribe-label');
    btn.classList.remove('subscribed');
  }
}

function toggleComment() {
  document.getElementById('comment-panel').classList.toggle('open');
}

function sendComment() {
  const text = document.getElementById('comment-text').value.trim();
  if (!text) { showToast(t('toast-comment-empty')); return; }
  showToast(t('toast-comment'));
  const url = currentVideo?.videoId && !currentVideo.videoId.startsWith('demo_')
    ? `https://www.youtube.com/watch?v=${currentVideo.videoId}&lc=1`
    : 'https://youtube.com';
  setTimeout(() => window.open(url, '_blank'), 1200);
}

function doShop() {
  showToast(t('toast-shop'));
  const url = currentChannel?.channelId
    ? `https://www.youtube.com/channel/${currentChannel.channelId}/store`
    : 'https://youtube.com';
  setTimeout(() => window.open(url, '_blank'), 1200);
}

// ===== SPRACHEINGABE =====
function startVoice() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) { showToast(t('toast-voice-no')); return; }

  const btn = document.getElementById('mic-btn');

  if (recognition) {
    recognition.stop();
    return;
  }

  recognition = new SpeechRec();
  recognition.lang = lang === 'de' ? 'de-DE' : 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  btn.classList.add('listening');
  btn.textContent = '⏹';
  showToast(t('toast-voice-start'));

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    const input = document.getElementById('search-input');
    input.value = transcript;
    onSearch(transcript);
    showToast(t('toast-voice-ok') + transcript);
  };

  recognition.onerror = () => {
    showToast(t('toast-voice-err'));
  };

  recognition.onend = () => {
    btn.classList.remove('listening');
    btn.textContent = '🎤';
    recognition = null;
  };

  recognition.start();
}

// ===== HILFSFUNKTIONEN =====
function timeAgo(date, language) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = [
    { de: 'Jahr', dePlural: 'Jahren', en: 'year', s: 31536000 },
    { de: 'Monat', dePlural: 'Monaten', en: 'month', s: 2592000 },
    { de: 'Woche', dePlural: 'Wochen', en: 'week', s: 604800 },
    { de: 'Tag', dePlural: 'Tagen', en: 'day', s: 86400 },
    { de: 'Stunde', dePlural: 'Stunden', en: 'hour', s: 3600 },
    { de: 'Minute', dePlural: 'Minuten', en: 'minute', s: 60 },
  ];
  for (const i of intervals) {
    const count = Math.floor(seconds / i.s);
    if (count >= 1) {
      if (language === 'de') {
        return `vor ${count} ${count > 1 ? i.dePlural : i.de}`;
      } else {
        return `${count} ${i.en}${count > 1 ? 's' : ''} ago`;
      }
    }
  }
  return language === 'de' ? 'gerade eben' : 'just now';
}
