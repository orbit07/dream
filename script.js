const STORAGE_KEY = 'arcadian-dream-state';

const summaryConfig = [
  { key: 'p1', label: '①' },
  { key: 'p2', label: '②' },
  { key: 'p3', label: '③' },
  { key: 'p4', label: '④' },
  { key: 'p5mode', label: '⑤前' },
  { key: 'p5', label: '⑤' },
  { key: 'p6', label: '⑥' },
  { key: 'p7', label: '⑦' }
];

function createInitialAnswers() {
  return {
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    p5mode: null,
    p5: null,
    p6: null,
    p7: null
  };
}

const state = {
  stepIndex: 0,
  answers: createInitialAnswers()
};

const p2SwapMap = {
  '1': { text: 'B', icon: '🔄' },
  B: { text: '1', icon: '🔄' },
  '4': { text: 'C', icon: '🔄' },
  C: { text: '4', icon: '🔄' }
};

const p2SwapTargets = ['1', 'B', '4', 'C'];

const p2PositionMap = {
  A: 'A',
  B: '1',
  C: '4',
  D: 'D',
  '1': 'B',
  '2': '2',
  '3': '3',
  '4': 'C'
};

const p24ReplicaSwapMap = {
  '円範囲から': {
    A: '2',
    B: 'D',
    C: 'C',
    D: '1',
    '1': '3',
    '2': 'A',
    '3': 'B',
    '4': '4'
  },
  '頭割りから': {
    A: 'A',
    B: '1',
    C: '4',
    D: 'D',
    '1': 'B',
    '2': '2',
    '3': '3',
    '4': 'C'
  }
};

const p5ActionMap = {
  '炎': '動かない',
  '風': '対岸へ',
  '土': '避ける',
  '闇': '南へ'
};

const nearFarPositionMap = {
  炎: '南数字マーカー南',
  土: '南数字マーカー南',
  風: 'タゲサ南',
  闇: '南数字マーカー北角'
};

const p3ActionImageMap = {
  '1-2安置': 'img/p3_12.png',
  '3-4安置': 'img/p3_34.png'
};

const p24ImageMap = {
  '頭割りから': 'img/p24_atama.webp',
  '円範囲から': 'img/p24_en.webp'
};

const p5ImageMap = {
  '炎': 'img/p5_hono.webp',
  '土': 'img/p5_tuchi.webp',
  '風': 'img/p5_kaze.webp',
  '闇': 'img/p5_yami.webp'
};

const p1ImageMap = {
  '1-4': 'img/p1_1.webp',
  'A-D': 'img/p1_a.webp'
};

const p367ImageMap = {
  'タゲサ外': 'img/p367_soto.png',
  'タゲサ内': 'img/p367_uchi.png'
};

const p36ImageMap = {
  'タゲサ外': 'img/p36_soto.png',
  'タゲサ内': 'img/p36_uchi.png'
};

const fieldImageMap = {
  '1': 'img/field_1.png',
  '2': 'img/field_2.png',
  '3': 'img/field_3.png',
  '4': 'img/field_4.png',
  A: 'img/field_a.png',
  B: 'img/field_b.png',
  C: 'img/field_c.png',
  D: 'img/field_d.png'
};

const p1FirstMap = {
  '十字': '1-4',
  'X字': 'A-D'
};

const p1SecondMap = {
  '十字': 'A-D',
  'X字': '1-4'
};

const steps = [
  {
    id: 'step-p1',
    type: 'choice',
    label: '【予告】模倣細胞',
    answerKey: 'p1',
    image: 'images/p1.png',
    placeholderTitle: '①',
    choices: ['十字', 'X字']
  },
  {
    id: 'step-p2',
    type: 'choice',
    label: '【予告】分身出現',
    answerKey: 'p2',
    image: 'images/p2.png',
    placeholderTitle: '②',
    choices: ['1', 'A', '2', 'B', 'C', '4', 'D', '3']
  },
  {
    id: 'step-a2-swap',
    type: 'action',
    label: '入れ替え',
    image: 'images/a2-swap.png',
    placeholderTitle: '②',
    references: ['p2'],
    actionLabel: '終わった'
  },
  {
    id: 'step-p3',
    type: 'choice',
    label: '【予告】扇範囲',
    answerKey: 'p3',
    image: 'images/p3.png',
    placeholderTitle: '③',
    choices: ['1-2安置', '3-4安置']
  },
  {
    id: 'step-p3-position',
    type: 'action',
    label: '立ち位置',
    placeholderTitle: '立ち位置',
    references: ['p2'],
    actionLabel: '終わった'
  },
  {
    id: 'step-p4',
    type: 'choice',
    label: '【予告】レプリ',
    answerKey: 'p4',
    image: 'images/p4.png',
    placeholderTitle: '④',
    choices: ['円範囲から', '頭割りから']
  },
  {
    id: 'step-p4-swap',
    type: 'action',
    label: '入れ替え',
    placeholderTitle: '入れ替え',
    references: ['p2', 'p4'],
    actionLabel: '終わった'
  },
  {
    id: 'step-a3',
    type: 'action',
    label: '扇範囲',
    image: 'images/a3.png',
    placeholderTitle: '③',
    references: ['p3'],
    actionLabel: '終わった'
  },
  {
    id: 'step-p5-mode',
    type: 'choice',
    label: '【予告】塔踏み（光デバフ）',
    answerKey: 'p5mode',
    image: 'images/p5-mode.png',
    placeholderTitle: '⑤-前半',
    choices: ['初期位置', '入れ替え']
  },
  {
    id: 'step-p5',
    type: 'choice',
    label: '【予告】塔踏み（種類）',
    answerKey: 'p5',
    image: 'images/p5.png',
    placeholderTitle: '⑤',
    choices: ['炎', '風', '土', '闇']
  },
  {
    id: 'step-c24',
    type: 'composite',
    label: '頭割り/円範囲2セット',
    compositeKey: '24',
    references: ['p2', 'p4'],
    actionLabel: '終わった'
  },
  {
    id: 'step-a5',
    type: 'action',
    label: '塔踏み',
    image: 'images/a5.png',
    placeholderTitle: '⑤',
    references: ['p5mode', 'p5'],
    actionLabel: '終わった'
  },
  {
    id: 'step-a6',
    type: 'action',
    label: 'ニアファー',
    image: 'images/a6.png',
    placeholderTitle: '発動',
    actionLabel: '終わった'
  },
  {
    id: 'step-p6',
    type: 'choice',
    label: '【予告】扇範囲',
    answerKey: 'p6',
    image: 'images/p6.png',
    placeholderTitle: '⑥',
    choices: ['北ワープ', '南ワープ']
  },
  {
    id: 'step-p7',
    type: 'choice',
    label: '【予告】島安置',
    answerKey: 'p7',
    image: 'images/p7.png',
    placeholderTitle: '⑦',
    choices: ['B安置', 'D安置']
  },
  {
    id: 'step-a1-first',
    type: 'action',
    label: '頭割り1回目',
    image: 'images/a1.png',
    placeholderTitle: '①',
    references: ['p1'],
    actionLabel: '終わった'
  },
  {
    id: 'step-c367-first',
    type: 'composite',
    label: '扇範囲',
    compositeKey: '367',
    references: ['p3', 'p6', 'p7'],
    actionLabel: '終わった'
  },
  {
    id: 'step-a1-second',
    type: 'action',
    label: '頭割り2回目',
    image: 'images/a1.png',
    placeholderTitle: '①',
    references: ['p1'],
    actionLabel: '終わった'
  },
  {
    id: 'step-c36-second',
    type: 'composite',
    label: '扇範囲',
    compositeKey: '36',
    references: ['p3', 'p6'],
    actionLabel: '終わった'
  }
];

const app = document.getElementById('app');

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    const parsed = JSON.parse(saved);
    state.stepIndex = clampStepIndex(parsed.stepIndex);
    state.answers = { ...createInitialAnswers(), ...(parsed.answers || {}) };
    state.stepIndex = getNormalizedStepIndex(state.stepIndex);
  } catch (error) {
    resetState(false);
  }
}

function clampStepIndex(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(value, steps.length));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getStep() {
  return steps[state.stepIndex];
}

function shouldShowP2SwapStep() {
  return p2SwapTargets.includes(state.answers.p2);
}

function shouldShowReplicaSwapStep() {
  return state.answers.p4 === '円範囲から';
}

function shouldSkipStep(step) {
  if (step?.id === 'step-a2-swap') {
    return !shouldShowP2SwapStep();
  }

  if (step?.id === 'step-p4-swap') {
    return !shouldShowReplicaSwapStep();
  }

  return false;
}

function getNormalizedStepIndex(index) {
  if (index >= steps.length) {
    return steps.length;
  }

  if (index <= 0) {
    return 0;
  }

  let nextIndex = index;
  while (nextIndex < steps.length && shouldSkipStep(steps[nextIndex])) {
    nextIndex += 1;
  }

  if (nextIndex < steps.length) {
    return nextIndex;
  }

  nextIndex = index - 1;
  while (nextIndex >= 0 && shouldSkipStep(steps[nextIndex])) {
    nextIndex -= 1;
  }

  return clampStepIndex(nextIndex);
}

function getNextStepIndex(currentIndex = state.stepIndex) {
  let nextIndex = currentIndex + 1;
  while (nextIndex < steps.length && shouldSkipStep(steps[nextIndex])) {
    nextIndex += 1;
  }
  return clampStepIndex(nextIndex);
}

function getPrevStepIndex(currentIndex = state.stepIndex) {
  let prevIndex = currentIndex - 1;
  while (prevIndex >= 0 && shouldSkipStep(steps[prevIndex])) {
    prevIndex -= 1;
  }
  return clampStepIndex(prevIndex);
}

function getP2SwapDisplay() {
  return p2SwapMap[state.answers.p2] || null;
}

function getSummaryValue(key) {
  const value = state.answers[key];

  if (!value) {
    return '未';
  }

  if (key === 'p2') {
    const swap = getP2SwapDisplay();
    if (swap) {
      const nextValue = swap.text.split('と入れ替わる')[0] || '未';
      return `${value}→${nextValue}`;
    }
  }

  return value;
}

function getP3PositionText() {
  return p2PositionMap[state.answers.p2] || '未設定';
}

function getReplicaSwapText() {
  const map = p24ReplicaSwapMap[state.answers.p4];
  return map?.[state.answers.p2] || '未設定';
}

function getFirstP1Action() {
  return p1FirstMap[state.answers.p1] || '未設定';
}

function getSecondP1Action() {
  return p1SecondMap[state.answers.p1] || '未設定';
}

function getP5ActionText() {
  const mode = state.answers.p5mode || '未設定';
  const action = p5ActionMap[state.answers.p5] || '未設定';
  return `${mode}、${action}`;
}

function getNearFarPositionText() {
  return nearFarPositionMap[state.answers.p5] || '未設定';
}

function getP2CircleSequence(p2) {
  if (p2 === 'C') {
    return ['1', 'C'];
  }

  if (p2 === 'B') {
    return ['C', '1'];
  }

  if (p2 === '2') {
    return ['2', 'C'];
  }

  if (p2 === '3') {
    return ['C', '2'];
  }

  return ['C', 'C'];
}

function getP2StackSequence(p2) {
  if (['A', '2', '1', '3'].includes(p2)) {
    return ['3', '3'];
  }

  if (['B', 'C', 'D', '4'].includes(p2)) {
    return ['4', '4'];
  }

  return ['未', '未'];
}

function getComposite24Sequence(p2, p4) {
  const [circleFirst, circleSecond] = getP2CircleSequence(p2);
  const [stackFirst, stackSecond] = getP2StackSequence(p2);
  const fromCircle = [
    { label: '円範囲1回目', value: circleFirst },
    { label: '頭割り1回目', value: stackFirst },
    { label: '円範囲2回目', value: circleSecond },
    { label: '頭割り2回目', value: stackSecond }
  ];
  const fromStack = [
    { label: '頭割り1回目', value: stackFirst },
    { label: '円範囲1回目', value: circleFirst },
    { label: '頭割り2回目', value: stackSecond },
    { label: '円範囲2回目', value: circleSecond }
  ];

  return p4 === '頭割りから' ? fromStack : fromCircle;
}

function renderComposite24Sequence(sequence) {
  return `
    <div class="result-list result-list-compact">
      ${sequence
        .map((item) => `<div class="result-row"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`)
        .join('')}
    </div>
  `;
}

function getTagasaPosition(p3, p6) {
  if (p3 === '1-2安置') {
    return p6 === '北ワープ' ? 'タゲサ外' : 'タゲサ内';
  }

  if (p3 === '3-4安置') {
    return p6 === '北ワープ' ? 'タゲサ内' : 'タゲサ外';
  }

  return '未設定';
}

function getComposite367Lines(p3, p6, p7) {
  return [p7 || '未設定', getTagasaPosition(p3, p6)];
}

function getComposite36Lines(p3, p6) {
  return [getTagasaPosition(p3, p6)];
}

function normalizeResultLines(lines, options = {}) {
  if (!options.compact) {
    return lines;
  }

  return lines.flatMap((line) =>
    String(line)
      .split('、')
      .map((part) => part.trim())
      .filter(Boolean)
  );
}

function renderResultLines(lines, options = {}) {
  const className = options.compact ? 'result-list result-list-compact' : 'result-list';
  const normalizedLines = normalizeResultLines(lines, options);
  return `
    <div class="${className}">
      ${normalizedLines
        .map((line) => `<div class="result-line">${escapeHtml(line)}</div>`)
        .join('')}
    </div>
  `;
}

function getActionDisplay(step) {
  if (step.id === 'step-a2-swap') {
    const swap = getP2SwapDisplay();
    return {
      icon: swap?.icon || '🔄',
      lines: swap ? [swap.text] : ['未設定']
    };
  }

  if (step.id === 'step-p3-position') {
    return {
      icon: '📍',
      lines: [getP3PositionText()]
    };
  }

  if (step.id === 'step-p4-swap') {
    return {
      icon: '🔄',
      lines: [getReplicaSwapText()]
    };
  }

  if (step.id === 'step-a3') {
    return {
      icon: '3️⃣',
      lines: [state.answers.p3 || '未設定']
    };
  }

  if (step.id === 'step-a5') {
    return {
      icon: '5️⃣',
      lines: [getP5ActionText()]
    };
  }

  if (step.id === 'step-a6') {
    return {
      icon: '⚔️',
      lines: [getNearFarPositionText()]
    };
  }

  if (step.id === 'step-a1-first') {
    return {
      icon: '1️⃣',
      lines: [getFirstP1Action()]
    };
  }

  if (step.id === 'step-a1-second') {
    return {
      icon: '1️⃣',
      lines: [getSecondP1Action()]
    };
  }

  return {
    icon: '⚔️',
    lines: []
  };
}

function getFieldImage(value) {
  return fieldImageMap[value] || '';
}

function getResolvedStepImage(step) {
  if (!step) {
    return '';
  }

  const { p1, p2, p3, p4, p5, p6 } = state.answers;

  if (step.id === 'step-a3') {
    return p3ActionImageMap[p3] || step.image;
  }

  if (step.id === 'step-a2-swap') {
    return getFieldImage(getP2SwapDisplay()?.text) || step.image;
  }

  if (step.id === 'step-p3-position') {
    return getFieldImage(getP3PositionText()) || step.image;
  }

  if (step.id === 'step-p4-swap') {
    return getFieldImage(getReplicaSwapText()) || step.image;
  }

  if (step.id === 'step-c24') {
    return p24ImageMap[p4] || step.image;
  }

  if (step.id === 'step-a5') {
    return p5ImageMap[p5] || step.image;
  }

  if (step.id === 'step-a6') {
    return 'img/nf.png';
  }

  if (step.id === 'step-a1-first') {
    const result = getFirstP1Action();
    return p1ImageMap[result] || step.image;
  }

  if (step.id === 'step-c367-first') {
    const pos = getTagasaPosition(p3, p6);
    return p367ImageMap[pos] || step.image;
  }

  if (step.id === 'step-a1-second') {
    const result = getSecondP1Action();
    return p1ImageMap[result] || step.image;
  }

  if (step.id === 'step-c36-second') {
    const pos = getTagasaPosition(p3, p6);
    return p36ImageMap[pos] || step.image;
  }

  return step.image;
}

function joinTitleParts(parts) {
  return parts.filter(Boolean).join('　');
}

function formatTitleText(value) {
  return String(value || '未設定')
    .split('、')
    .map((part) => part.trim())
    .filter(Boolean)
    .join('　');
}

function getResolvedStepTitle(step) {
  if (!step) {
    return '進行完了';
  }

  if (step.type === 'choice') {
    return step.label;
  }

  if (step.id === 'step-a2-swap') {
    return joinTitleParts([step.label, getP2SwapDisplay()?.text || '未設定']);
  }

  if (step.id === 'step-p3-position') {
    return joinTitleParts([step.label, getP3PositionText()]);
  }

  if (step.id === 'step-a3') {
    return joinTitleParts([step.label, state.answers.p3 || '未設定']);
  }

  if (step.id === 'step-p4-swap') {
    return joinTitleParts([step.label, getReplicaSwapText()]);
  }

  if (step.id === 'step-c24') {
    const prefix = state.answers.p4 === '頭割りから' ? '【発動】頭割り先' : '【発動】円範囲先';
    const flow = getComposite24Sequence(state.answers.p2, state.answers.p4)
      .map((item) => item.value || '未設定')
      .join('→');
    return joinTitleParts([prefix, flow || '未設定']);
  }

  if (step.id === 'step-a5') {
    return joinTitleParts([step.label, formatTitleText(getP5ActionText())]);
  }

  if (step.id === 'step-a6') {
    return joinTitleParts([step.label, getNearFarPositionText()]);
  }

  if (step.id === 'step-a1-first') {
    return joinTitleParts([step.label, getFirstP1Action()]);
  }

  if (step.id === 'step-c367-first') {
    return joinTitleParts([step.label, ...getComposite367Lines(state.answers.p3, state.answers.p6, state.answers.p7)]);
  }

  if (step.id === 'step-a1-second') {
    return joinTitleParts([step.label, getSecondP1Action()]);
  }

  if (step.id === 'step-c36-second') {
    return joinTitleParts([step.label, ...getComposite36Lines(state.answers.p3, state.answers.p6)]);
  }

  return step.label;
}

function render() {
  const step = getStep();

  if (!step) {
    renderComplete();
    return;
  }

  if (step.type === 'choice') {
    renderChoiceStep(step);
    return;
  }

  if (step.type === 'action') {
    renderActionStep(step);
    return;
  }

  renderCompositeStep(step);
}

function renderFrame(content, step, options = {}) {
  const total = steps.length;
  const progress = step ? ((state.stepIndex + 1) / total) * 100 : 100;
  const subNav = renderSubNavigation(step);
  const primaryNav = options.skipPrimaryNav ? '' : renderPrimaryNavigation(step);
  const footerContent = options.footerContent || '';
  const resolvedTitle = getResolvedStepTitle(step);

  app.innerHTML = `
    <section class="card compact-card">
      <div class="progress" aria-label="進行状況">
        <div class="progress-bar" style="width: ${progress}%;"></div>
      </div>
      ${subNav}
      <h2 class="step-title">${escapeHtml(resolvedTitle)}</h2>
      <div class="card-content">${content}</div>
      <div class="card-footer">
        ${footerContent ? `<div class="footer-actions">${footerContent}</div>` : ''}
        ${primaryNav}
        <section class="summary-section">${renderSummary()}</section>
      </div>
    </section>
  `;

  bindEvents(step);
}

function renderVisual(step, fallbackTitle, icon = '🖼️') {
  const titleMarkup = fallbackTitle ? `<strong>${escapeHtml(fallbackTitle)}</strong>` : '';
  const placeholderMarkup = `
    <div class="placeholder">
      <div class="placeholder-icon">${escapeHtml(icon)}</div>
      ${titleMarkup}
    </div>
  `;
  const imageMarkup = step?.image
    ? `<img src="${escapeHtml(step.image)}" alt="${escapeHtml(step.label)}" onerror="this.replaceWith(this.parentElement.querySelector('.placeholder-template').content.cloneNode(true))">`
    : '';

  return `
    <div class="visual-box">
      ${imageMarkup}
      <template class="placeholder-template">${placeholderMarkup}</template>
      ${!step?.image ? placeholderMarkup : ''}
    </div>
  `;
}

function renderVisualPair(images, fallbackTitle, icon = '🖼️') {
  const imageMarkup = images
    .filter(Boolean)
    .map(
      ({ src, alt }) =>
        `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" onerror="this.remove()">`
    )
    .join('');

  if (!imageMarkup) {
    return renderVisual(null, fallbackTitle, icon);
  }

  return `
    <div class="visual-box visual-box-pair">
      ${imageMarkup}
    </div>
  `;
}

function renderChoiceStep(step) {
  const selected = state.answers[step.answerKey];
  const isP2Layout = step.answerKey === 'p2';

  const renderChoiceButton = (choice) => {
    const isSelected = selected === choice;
    return `
      <button
        type="button"
        class="choice-button ${isSelected ? 'selected' : ''}"
        data-action="select-choice"
        data-answer-key="${escapeHtml(step.answerKey)}"
        data-value="${escapeHtml(choice)}"
        aria-pressed="${String(isSelected)}"
      >
        ${escapeHtml(choice)}
      </button>
    `;
  };

  const choices = isP2Layout
    ? `
      <div class="choice-grid-p2">
        ${renderChoiceButton('1')}
        ${renderChoiceButton('A')}
        ${renderChoiceButton('2')}
        ${renderChoiceButton('D')}
        <div class="choice-grid-p2-empty" aria-hidden="true"></div>
        ${renderChoiceButton('B')}
        ${renderChoiceButton('4')}
        ${renderChoiceButton('C')}
        ${renderChoiceButton('3')}
      </div>
    `
    : `<div class="choice-grid">${step.choices.map(renderChoiceButton).join('')}</div>`;

  renderFrame('', step, { footerContent: choices });
}

function renderActionStep(step) {
  const display = getActionDisplay(step);
  const resolvedStep = {
    ...step,
    image: getResolvedStepImage(step)
  };
  const content = `
    ${renderReferences(step.references || [])}
    ${renderVisual(resolvedStep, step.placeholderTitle, display.icon)}
  `;

  renderFrame(content, step);
}

function renderCompositeStep(step) {
  let icon = '🔀';
  const resolvedStep = {
    ...step,
    image: getResolvedStepImage(step)
  };
  const sequence = step.compositeKey === '24'
    ? getComposite24Sequence(state.answers.p2, state.answers.p4)
    : [];

  if (step.compositeKey === '24') {
    icon = '2️⃣';
  } else if (step.compositeKey === '367' || step.compositeKey === '36') {
    icon = '3️⃣';
  }

  const visual =
    step.compositeKey === '24'
      ? renderVisualPair(
          [
            {
              src: getFieldImage(sequence[0]?.value),
              alt: `${step.label} 開始位置`
            },
            {
              src: resolvedStep.image,
              alt: resolvedStep.label
            }
          ],
          step.placeholderTitle,
          icon
        )
      : renderVisual(resolvedStep, step.placeholderTitle, icon);

  const content = `
    ${renderReferences(step.references || [])}
    ${visual}
  `;

  renderFrame(content, step);
}

function renderComplete() {
  const content = `
    <div class="complete-box">
      <span class="complete-badge">完了</span>
    </div>
  `;

  renderFrame(content, null);
}

function renderReferences(referenceKeys) {
  if (!referenceKeys.length) {
    return '';
  }

  const chips = referenceKeys
    .map((key) => {
      const item = summaryConfig.find((entry) => entry.key === key);
      const value = state.answers[key] || '未';
      return `<span class="reference-chip">${escapeHtml(item?.label || key)}:${escapeHtml(value)}</span>`;
    })
    .join('');

  return `<div class="reference-inline">${chips}</div>`;
}

function renderSummary() {
  const items = summaryConfig
    .map((item) => {
      const value = getSummaryValue(item.key);
      const emptyClass = value === '未' ? 'empty' : '';
      return `<span class="summary-chip ${emptyClass}">${escapeHtml(item.label)}:${escapeHtml(value)}</span>`;
    })
    .join('');

  return `<div class="summary-inline">${items}</div>`;
}

function renderSubNavigation(step) {
  if (!step) {
    return `
      <div class="nav-row sub-nav">
        <button type="button" class="secondary-button small-button" data-action="prev" ${state.stepIndex === 0 ? 'disabled' : ''}>前へ</button>
        <button type="button" class="danger-button small-button" data-action="reset">リセット</button>
      </div>
    `;
  }

  return `
    <div class="nav-row sub-nav">
      <button type="button" class="secondary-button small-button" data-action="prev" ${state.stepIndex === 0 ? 'disabled' : ''}>前へ</button>
      <button type="button" class="danger-button small-button" data-action="reset">リセット</button>
    </div>
  `;
}

function renderPrimaryNavigation(step) {
  if (!step || step.type === 'choice') {
    return '';
  }

  const nextDisabled = !canGoNext(step);
  return `
    <div class="nav-row main-nav">
      <button type="button" class="primary-button" data-action="next" ${nextDisabled ? 'disabled' : ''}>${escapeHtml(step.actionLabel || '終わった')}</button>
    </div>
  `;
}

function bindEvents(step) {
  app.querySelectorAll('[data-action="select-choice"]').forEach((button) => {
    button.addEventListener('click', () => {
      selectChoice(button.dataset.answerKey, button.dataset.value);
    });
  });

  const prevButton = app.querySelector('[data-action="prev"]');
  const nextButton = app.querySelector('[data-action="next"]');
  const resetButton = app.querySelector('[data-action="reset"]');

  if (prevButton) {
    prevButton.addEventListener('click', goPrev);
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => goNext(step));
  }

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (confirm('最初からやり直しますか？')) {
        resetState(true);
      }
    });
  }
}

function selectChoice(answerKey, value) {
  state.answers[answerKey] = value;
  saveState();
  goNext();
}

function goNext(step = getStep()) {
  if (step && !canGoNext(step)) {
    return;
  }

  state.stepIndex = getNextStepIndex();
  saveState();
  render();
}

function goPrev() {
  state.stepIndex = getPrevStepIndex();
  saveState();
  render();
}

function resetState(shouldRender = true) {
  state.stepIndex = 0;
  state.answers = createInitialAnswers();
  localStorage.removeItem(STORAGE_KEY);

  if (shouldRender) {
    render();
  }
}

function canGoNext(step) {
  if (!step || step.type !== 'choice') {
    return true;
  }

  return Boolean(state.answers[step.answerKey]);
}

loadState();
render();
