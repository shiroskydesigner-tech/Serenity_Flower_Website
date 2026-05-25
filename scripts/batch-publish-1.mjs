// One-off batch publisher. Reads payloads inline and POSTs them sequentially
// to /api/admin/publish (sequential to avoid sharp CPU contention).

const ROOT = 'D:/SynologyDrive/02_靜謐花間_0A/02_作品照片區';

function abs(folder, file) { return `${ROOT}/${folder}/${file}`; }

const works = [
  {
    title: '深紅 · 新娘',
    subtitle: 'Crimson · Bridal',
    story: '深紅玫瑰為主量體，深綠尤加利為骨架。沒有紗，沒有粉，沒有任何柔軟的補述 — 把新娘捧花還原為一個結構性物件。\n\nDeep red rose as primary volume, dark eucalyptus as the skeleton. No tulle, no pastel, no softening glosses — the bridal bouquet returned to a structural object.',
    folderName: '20240124_Se_Sandy_婚紗婚禮新娘捧花',
    tags: ['bouquet-wedding', 'wedding'],
    files: ['0D2A1900.JPG', '0D2A1910.JPG', '0D2A1915.JPG', '0D2A1920.JPG'],
    alts: [
      '深紅玫瑰新娘捧花全景，深綠尤加利包覆',
      '深紅捧花側面 — 黑色緞帶垂落',
      '雙手捧著深紅婚禮捧花',
      '深紅捧花細節 — 玫瑰與尤加利的張力',
    ],
  },
  {
    title: '白 · 鬱金香與低音',
    subtitle: 'White · Tulip and Soft Voice',
    story: '白色鬱金香、白色小蒼蘭、白色滿天星 — 同一色階的三種紋理，沒有任何彩色破壞節奏。\n\n為國中同學的婚禮做的捧花與胸花一組。把繁複還原為單音。\n\nWhite tulip, white freesia, white baby\'s breath — three textures in the same tonal step, no colour to break the rhythm. A bouquet and corsage set for a friend\'s wedding. Complexity returned to a single note.',
    folderName: '20260415_國中同學捧花胸花白色鬱金香',
    tags: ['bouquet-wedding', 'wedding', 'corsage'],
    files: ['0D2A2095.JPG', '0D2A2105.JPG', '0D2A2114.JPG', '0D2A2125.JPG'],
    alts: [
      '白色鬱金香新娘捧花全景',
      '白色花束細節 — 鬱金香與小蒼蘭',
      '白色小花特寫 — 同色階的紋理',
      '婚禮捧花與胸花並置',
    ],
  },
  {
    title: '胸花 · 乾燥的細語',
    subtitle: 'Corsage · A Quiet Detail',
    story: '一朵的尺度，不是整束。乾燥的奶白與深棕，緞帶垂為一個結尾。\n\n胸花是配件，不該搶過新人衣服的線條 — 我們用最少的材質完成它。\n\nThe scale of one bloom, not a bundle. Dried cream and deep brown, ribbon falling as a closing note. A corsage is an accessory; it must not outrun the line of the garment.',
    folderName: '20260202_胸花',
    tags: ['corsage', 'wedding'],
    files: ['0D2A1985.JPG', '0D2A1995.JPG', '0D2A1998.JPG', '0D2A2008.JPG'],
    alts: [
      '乾燥奶白胸花特寫，棕色緞帶垂落',
      '胸花別在深色西裝外套上',
      '胸花靜物擺拍 — 灰色背景',
      '胸花細節 — 乾燥花材紋理',
    ],
  },
  {
    title: '蝴蝶 · 街角',
    subtitle: 'Butterfly · On a Corner',
    story: '粉色與奶白的「蝴蝶捧花」 — 把花束做成一個輕的、能在街角拿著走的物件。\n\n沒有戲劇性的重量。一個女生抱著它走過鐵捲門前的瞬間，是這束花該被使用的姿勢。\n\nPink and cream, a "butterfly bouquet" — a bundle made to be carried, not staged. No theatrical weight. A girl walking past a shopfront with this in hand is the bouquet\'s proper posture.',
    folderName: '20250613_蝴蝶捧花',
    tags: ['bouquet-wedding', 'bouquet-gift'],
    files: ['0D2A9550.JPG', '0D2A9580.JPG', '0D2A9600.JPG', '0D2A9620.JPG'],
    alts: [
      '粉色蝴蝶捧花街拍全景',
      '蝴蝶捧花特寫 — 粉與奶白的混合',
      '街角持花的情境照',
      '蝴蝶捧花的包裝細節',
    ],
  },
  {
    title: '兩束 · 粉與黑',
    subtitle: 'Two Bundles · Pink and Black',
    story: '兩束花，並置而非互補。粉色作為主體量，黑色為消音 — 不是「點綴」，是把過度的甜壓回中性。\n\nTwo bouquets, juxtaposed rather than paired. Pink as primary volume, black as mute — not a "decorative accent" but a flattening of saccharine into neutral.',
    folderName: '20250519_宜家捧花粉色黑色_兩束',
    tags: ['bouquet-wedding', 'bouquet-gift'],
    files: ['0D2A8700.JPG', '0D2A8750.JPG', '0D2A8768.JPG', '0D2A8800.JPG'],
    alts: [
      '粉色玫瑰捧花全景，模特兒手持',
      '粉色與黑色雙束並置',
      '粉色玫瑰特寫 — 焦點放在花苞紋理',
      '黑色包裝紙與粉色花束的對比',
    ],
  },
  {
    title: '胭脂籃',
    subtitle: 'Carmine Basket · A Still Life',
    story: '紅康乃馨、白色洋桔梗、細枝乾燥果實 — 不是花籃，是放在紅牆前的靜物。\n\n背景的胭脂色與花材主動對話，把容器（一個透明壓克力盒）反而隱形。\n\nRed carnation, white lisianthus, slender dried branches — not a basket, but a still life set against a vermilion wall. The background\'s carmine speaks back to the florals; the container (a clear acrylic box) disappears.',
    folderName: '20250505_在公司花坊拍_花籃',
    tags: ['basket', 'arrangement'],
    files: ['0D2A8510.JPG', '0D2A8530.JPG', '0D2A8542.JPG', '0D2A8560.JPG'],
    alts: [
      '紅康乃馨花籃靜物 — 胭脂色背景',
      '花籃側面細節 — 細枝乾燥果實',
      '花籃俯角構圖',
      '花籃特寫 — 紅與白的對比量體',
    ],
  },
  {
    title: '二月 · 含羞草',
    subtitle: 'February · Mimosa',
    story: '含羞草的黃，是二月唯一能帶進室內的明度。\n\n配上橘色鬱金香一枝、白色小花若干，奶白紙包覆 — 整束的目的不是繁盛，是把冬天剛離開那幾天的光記下來。\n\nThe yellow of mimosa is the only luminance February permits indoors. Pair with one orange tulip and a few white blossoms, wrap in cream — the bouquet\'s purpose is not abundance, but a record of the few days winter just left.',
    folderName: '20260202_黃色捧花',
    tags: ['bouquet-gift'],
    files: ['0D2A2035.JPG', '0D2A2050.JPG', '0D2A2053.JPG', '0D2A2070.JPG'],
    alts: [
      '黃色含羞草捧花全景，模特兒手持',
      '含羞草與橘色鬱金香特寫',
      '黃色捧花情境照',
      '含羞草細節 — 細小黃絨球的紋理',
    ],
  },
  {
    title: '謝意 · 蝴蝶蘭柱',
    subtitle: 'Condolence · A Column of Phalaenopsis',
    story: '為告別式做的盆花。粉色蝴蝶蘭如一柱垂落，白色高瓶為基座 — 沒有任何輓聯該被加上去的繁裝。\n\n哀悼的尺度不是堆疊，是垂直。\n\nFor a memorial. Pink phalaenopsis falling as a single column, the white tall vessel as plinth — no ribbon of mourning, no added flourish. The scale of grief is vertical, not heaped.',
    folderName: '20250704_告別式盆花',
    tags: ['pot', 'funeral', 'arrangement'],
    files: ['IMG_20250629_232631.jpg', 'IMG_20250629_233345.jpg', 'IMG_20250629_233350.jpg', 'IMG_20250629_233409.jpg'],
    alts: [
      '粉色蝴蝶蘭高瓶盆花於告別式現場',
      '蝴蝶蘭柱式盆花的正面全景',
      '蝴蝶蘭花序特寫 — 垂落姿態',
      '告別式盆花的環境照',
    ],
  },
  {
    title: '畢業 · 一束陽光',
    subtitle: 'Graduation · A Bundle of Sun',
    story: '中央一朵黃色非洲菊，周圍是乾燥的奶白與淡粉 — 為畢業而做，但不灑狗血。\n\n那一朵明亮的黃，是同學間私密的祝詞，不是給整個世界看的。\n\nA single yellow gerbera at the centre, surrounded by dried cream and pale pink. Made for a graduation, but without the cliché. The bright yellow is a private message between friends, not a public broadcast.',
    folderName: '20250612_蓉欣畢業花束',
    tags: ['bouquet-gift', 'graduation'],
    files: ['IMG_20250611_083213.jpg', 'IMG_20250611_083425.jpg', 'IMG_20250611_083445.jpg', 'IMG_20250611_083512.jpg'],
    alts: [
      '畢業花束全景 — 中央黃色非洲菊',
      '畢業花束特寫 — 乾燥花材的紋理',
      '花束靜物擺拍 — 灰色斑駁背景',
      '畢業花束包裝細節',
    ],
  },
];

async function publishOne(w) {
  const payload = {
    title: w.title,
    subtitle: w.subtitle,
    story: w.story,
    folderName: w.folderName,
    tags: w.tags,
    heroIndex: 0,
    images: w.files.map((f, i) => ({
      sourcePath: abs(w.folderName, f),
      alt: w.alts[i] || w.title,
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
