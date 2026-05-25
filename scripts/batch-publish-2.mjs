// Batch 2: installation, wedding-setup, pot, structural, and one bonus pot/gift.
// Sourced from 01_花藝布置/, 03_盆花_其他/, and 3 dated standalones with nested JPEG/.

const ROOT = 'D:/SynologyDrive/02_靜謐花間_0A/02_作品照片區';

function picks(folder, files, count = 4) {
  // pick `count` indices evenly spread
  const n = files.length;
  if (n <= count) return files;
  return [0.2, 0.4, 0.6, 0.8].slice(0, count).map(r => files[Math.floor(n * r)]);
}

const works = [
  // ── INSTALLATION (arrangement) ─────────────────────────────────────
  {
    title: '永生 · 桌之花',
    subtitle: 'Preserved · Table Bloom',
    story: '永生花的桌面陳設 — 花材在事件結束之後仍能留存的構件。\n\n以乾燥與保鮮處理過的玫瑰、葉脈與枝幹，組成一組可移動的桌中量體。不是慶典後就拋棄的消耗品，而是一件可長期擺在空間裡的物件。\n\nA centerpiece in preserved botanicals — material that outlasts the event. Dried and stabilised roses, leaf veins, branches assembled as a movable mass on the table. Not the disposable aftermath of a celebration, but an object kept in the room.',
    folderName: '01_花藝布置/20190916_永生桌花',
    rootFolder: '20190916_永生桌花',
    date: '2019-09-16',
    tags: ['arrangement'],
  },
  {
    title: '同心 · 燭與環',
    subtitle: 'Concentric · Candle and Ring',
    story: '同心燭的環狀構成 — 兩支燭沿著垂直線升起，環是把它們收攏的水平動作。\n\n婚禮儀式的「同心」二字被多數場景做成柔軟、流動的視覺；我們選擇收成最低限度的幾何 — 一條直線，一個圓。\n\nThe ring of the concentric ceremonial candle. Two candles rise on a vertical axis; the ring is the horizontal gesture that gathers them. Most weddings render "concentric" as something soft and flowing; we reduce it to the minimum geometry — one line, one circle.',
    folderName: '01_花藝布置/20191109_同心燭',
    rootFolder: '20191109_同心燭',
    date: '2019-11-09',
    tags: ['arrangement', 'wedding-setup', 'wedding'],
  },
  {
    title: '玫粉 · 甜的下限',
    subtitle: 'Rose Pink · A Sweetness Threshold',
    story: '粉色佈置最容易掉進的陷阱是過甜。\n\n我們把玫粉壓在低明度，搭配淺灰與木質地，讓色相留下而糖份退場。同樣是粉，這是「粉」的下限。\n\nPink installations slip easily into the saccharine. Here the rose-pink is held at a lower value, paired with grey and wood tones, so the hue stays but the sugar leaves. Same colour, a lower bound.',
    folderName: '01_花藝布置/20200419_布置_玫粉甜蜜',
    rootFolder: '20200419_布置_玫粉甜蜜',
    date: '2020-04-19',
    tags: ['arrangement', 'wedding-setup'],
  },
  {
    title: '端午 · 藍色長桌',
    subtitle: 'Dragon Boat · Blue Long Table',
    story: '端午節的桌面佈置，主色是深藍 — 不是節日預期的紅綠對比。\n\n一條長桌的軸線，由低矮、連續的藍色花材鋪滿；每隔一段插一個垂直元素。把節慶從喧鬧拉回儀式。\n\nA dragon boat festival table setting in deep blue — not the expected red-green festive opposition. The long axis filled with low, continuous blue florals; a vertical accent at intervals. A festival pulled back from noise into ritual.',
    folderName: '01_花藝布置/20200605_端午布置_藍色長桌置',
    rootFolder: '20200605_端午布置_藍色長桌置',
    date: '2020-06-05',
    tags: ['arrangement'],
  },
  {
    title: '白氣球 · 白背板',
    subtitle: 'White Balloon · White Backdrop',
    story: '單色研究：白氣球、白背板、白色花材。\n\n沒有對比色，只有形狀和質感的差異 — 球體、平面、放射狀枝幹。一種把婚禮現場從色彩剝離的方式。\n\nA monochrome study: white balloons, white backdrop, white florals. No contrasting colour — only the difference of shapes and textures: sphere, plane, radiating stem. A way to strip a wedding scene of its colour and leave only volume.',
    folderName: '01_花藝布置/20201226_白色汽球白色背板',
    rootFolder: '20201226_白色汽球白色背板',
    date: '2020-12-26',
    tags: ['arrangement', 'wedding-setup'],
  },
  {
    title: '安布萊拉',
    subtitle: 'Umbrella · A Sheltering Mark',
    story: '為「安布萊拉」主題的場合製作的結構物件，以倒立傘形為原型 — 把保護的姿勢轉成一個垂吊的量體。\n\nA structural object made for the "Umbrella" themed event. The inverted umbrella form taken as a primitive — the posture of shelter recast as a suspended volume.',
    folderName: '01_花藝布置/20191020_布置_安布萊拉',
    rootFolder: '20191020_布置_安布萊拉',
    date: '2019-10-20',
    tags: ['arrangement', 'structural'],
  },
  {
    title: '叢林 · 室內的綠量',
    subtitle: 'Jungle · Green Volume Indoors',
    story: '叢林主題的室內佈置。\n\n不是把熱帶植物擺成裝飾，而是把整個房間填上一層連續的綠 — 觀者進入時感受的是濕度與量體，不是植物名稱。\n\nA jungle-themed installation. Not tropical plants used as decoration, but a continuous layer of green filling the room — the visitor enters and registers humidity and mass, not species.',
    folderName: '01_花藝布置/20201210_叢林風布置',
    rootFolder: '20201210_叢林風布置',
    date: '2020-12-10',
    tags: ['arrangement', 'wedding-setup'],
  },

  // ── WEDDING-SETUP (also installation) ──────────────────────────────
  {
    title: '婚禮佈置 · 二〇一八',
    subtitle: 'Wedding Setup · 2018',
    story: '早期的婚禮佈置案。\n\n當時的工作室還在尋找自己的語言 — 這組作品保留下來，作為「我們從哪裡開始」的紀錄。\n\nAn early wedding-setup commission. The studio was still finding its language; this set is kept as a record of where we began.',
    folderName: '01_花藝布置/20181230_婚禮佈置',
    rootFolder: '20181230_婚禮佈置',
    date: '2018-12-30',
    tags: ['wedding-setup', 'wedding', 'arrangement'],
  },
  {
    title: '執子之手',
    subtitle: 'Hand in Hand',
    story: '為一對巧克力廚師的婚禮做的佈置 — 主題「執子之手」，但避免把字面意思做成圖像。\n\n用木質、可可色系與低彩度的花材，把職業背景內化為色票，而不是直接搬上桌面。\n\nA wedding for a couple of chocolatiers — theme "hand in hand", but the phrase kept off the literal canvas. Wood tones, cocoa palette, low-chroma florals: the profession internalised as a colour set rather than illustrated.',
    folderName: '01_花藝布置/20190616_婚禮_執子之手_巧克力廚師',
    rootFolder: '20190616_婚禮_執子之手_巧克力廚師',
    date: '2019-06-16',
    tags: ['wedding-setup', 'wedding', 'arrangement'],
  },
  {
    title: '婚禮 · 十月',
    subtitle: 'Wedding · October',
    story: '十月的婚禮佈置 — 季節色推到深木與栗色。\n\n秋天的婚禮容易做成「楓葉感」，我們避開。用花材的暖色而非語境化的元素，留住季節而不解釋季節。\n\nAn October wedding setup. Seasonal palette pushed into deep wood and chestnut. Autumn weddings often slip into a "maple-leaf" mood; we sidestep it. Warmth carried by the florals\' own colour, not by contextual props — the season held without being named.',
    folderName: '01_花藝布置/20191027_婚布置',
    rootFolder: '20191027_婚布置',
    date: '2019-10-27',
    tags: ['wedding-setup', 'wedding', 'arrangement'],
  },
  {
    title: '洲際 · 台中',
    subtitle: 'Intercontinental · Taichung',
    story: '為台中洲際酒店的房間佈置 — 蘆葦草垂直站立為「柱」，玫瑰沿著大理石圓桌底部鋪成一圈水平。\n\n把酒店的室內語彙（黑色大理石、深藍布料、暖色木質）當作框，花材只負責填補幾個關鍵節點。\n\nAn in-room installation for the Intercontinental, Taichung. Pampas stands vertical as columns; roses laid at the base of the marble round table as a horizontal ring. The hotel\'s interior vocabulary (black marble, deep blue upholstery, warm wood) used as the frame; florals only filling the few load-bearing nodes.',
    folderName: '20250606_台中洲際酒店布置_台中洲際_葛屁君君/JPEG',
    rootFolder: '20250606_台中洲際酒店布置_台中洲際_葛屁君君',
    date: '2025-06-06',
    tags: ['wedding-setup', 'wedding', 'arrangement'],
  },

  // ── POT / STRUCTURAL / GIFT ────────────────────────────────────────
  {
    title: '蘭 · 直線',
    subtitle: 'Orchid · A Straight Line',
    story: '蘭花本身就是一條垂直的線。\n\n盆器只需要承擔重量，不必補述。我們把所有的設計動作放在「不要打斷這條線」上。\n\nThe orchid is already a vertical line. The vessel only needs to bear weight; it must not add commentary. Every design move here is in service of one rule: do not break the line.',
    folderName: '03_盆花_其他/20250122_蘭花',
    rootFolder: '20250122_蘭花',
    date: '2025-01-22',
    tags: ['pot', 'arrangement'],
  },
  {
    title: '黑八角 · 藝術品',
    subtitle: 'Black Octagon · Art Piece',
    story: '黑色金屬八角骨架，懸吊兩個圓盤量體（八角茴香、棕色乾燥果莢），以一枝粉斑 Vanda 蘭與裸露的氣根貫穿。\n\n與「八角中藥」是同一系列的姊妹作 — 同一套結構語言，換一組植物。\n\nA black metallic octagon frame, suspending two circular masses (star anise, dried brown pods), pierced by a single pink-mottled Vanda orchid with exposed aerial roots. A sister piece to "Octagon Apothecary" — same structural language, different botanicals.',
    folderName: '20260124_Se_黑色_八角_藝術品/JPEG',
    rootFolder: '20260124_Se_黑色_八角_藝術品',
    date: '2026-01-24',
    tags: ['structural', 'arrangement'],
  },
  {
    title: '送 · 棻花',
    subtitle: 'Gift · A Hand-Sent Pot',
    story: '手提的小盆花 — 為一場開幕、一個新公司、一次重要的人事變動所送。\n\n比起花束的「即時消費」，盆花是給「留下來」的祝詞。我們選擇把它做小，避免儀式感取代訊息。\n\nA hand-carried gift pot — for an opening, a new venture, a significant personal transition. Where a bouquet is for immediate consumption, a pot is a wish that stays. We kept it small, so ceremony does not overrun the message.',
    folderName: '03_盆花_其他/20210410_送棻花',
    rootFolder: '20210410_送棻花',
    date: '2021-04-10',
    tags: ['pot', 'arrangement', 'bouquet-gift'],
  },
];

const fs = await import('node:fs');
const path = await import('node:path');

async function publishOne(w) {
  const folderAbs = `${ROOT}/${w.folderName}`;
  let files;
  try {
    files = fs.readdirSync(folderAbs)
      .filter(f => /\.(jpe?g)$/i.test(f))
      .sort();
  } catch (e) {
    return { ok: false, title: w.title, error: `readdir failed: ${e.message}` };
  }
  if (files.length === 0) return { ok: false, title: w.title, error: 'no images in folder' };
  const selected = picks(w.folderName, files, 4);

  const payload = {
    title: w.title,
    subtitle: w.subtitle,
    story: w.story,
    folderName: w.rootFolder,
    date: w.date,
    tags: w.tags,
    heroIndex: 0,
    images: selected.map((f, i) => ({
      sourcePath: `${folderAbs}/${f}`,
      alt: `${w.title} — 圖 ${i + 1}`,
      tags: w.tags.slice(0, 1),
    })),
  };
  const res = await fetch('http://localhost:4321/api/admin/publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const out = await res.json();
  return { title: w.title, status: res.status, ...out };
}

for (const w of works) {
  try {
    const r = await publishOne(w);
    if (r.ok) console.log(`✓ ${r.slug}  (${r.imageCount} imgs, ${r.variantCount} variants)`);
    else console.log(`✗ ${w.title}: ${r.error || r.status}`);
  } catch (e) {
    console.log(`✗ ${w.title}: ${e.message}`);
  }
}
