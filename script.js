const STORAGE_KEY = 'arcadian-dream-state';

const summaryConfig = [
  { key: 'p1', label: '①' },
  { key: 'p2', label: '②' },
  { key: 'p3', label: '③' },
  { key: 'p4', label: '④' },
  { key: 'p5', label: '⑤' },
  { key: 'p7', label: '⑦' }
];

function createInitialAnswers() {
  return {
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    p5: null,
    p7: null
  };
}

const state = {
  stepIndex: 0,
  answers: createInitialAnswers()
};

const defaultCompositeDisplay = {
  title: '分岐未設定',
  text: '参照キーに対応する表示が未設定です。入力内容を確認してください。',
  image: '',
  icon: '⚠️'
};

const composite24Map = {
  '1_left': { title: '②④複合: 1 + 左', text: '1 と 左 の組み合わせです。左優先で処理。', image: '', icon: '↖️' },
  '1_right': { title: '②④複合: 1 + 右', text: '1 と 右 の組み合わせです。右優先で処理。', image: '', icon: '↗️' },
  '2_left': { title: '②④複合: 2 + 左', text: '2 と 左 の組み合わせです。左へ寄って解決。', image: '', icon: '⬅️' },
  '2_right': { title: '②④複合: 2 + 右', text: '2 と 右 の組み合わせです。右へ寄って解決。', image: '', icon: '➡️' },
  '3_left': { title: '②④複合: 3 + 左', text: '3 と 左 の組み合わせです。散開後に左処理。', image: '', icon: '🌀' },
  '3_right': { title: '②④複合: 3 + 右', text: '3 と 右 の組み合わせです。散開後に右処理。', image: '', icon: '🌀' },
  '4_left': { title: '②④複合: 4 + 左', text: '4 と 左 の組み合わせです。中央基準で左回避。', image: '', icon: '🛡️' },
  '4_right': { title: '②④複合: 4 + 右', text: '4 と 右 の組み合わせです。中央基準で右回避。', image: '', icon: '🛡️' },
  'A_left': { title: '②④複合: A + 左', text: 'A と 左 の組み合わせです。端スタート想定。', image: '', icon: '🌙' },
  'A_right': { title: '②④複合: A + 右', text: 'A と 右 の組み合わせです。端スタート想定。', image: '', icon: '🌙' },
  'B_left': { title: '②④複合: B + 左', text: 'B と 左 の組み合わせです。ノックバック後に左。', image: '', icon: '💨' },
  'B_right': { title: '②④複合: B + 右', text: 'B と 右 の組み合わせです。ノックバック後に右。', image: '', icon: '💨' },
  'C_left': { title: '②④複合: C + 左', text: 'C と 左 の組み合わせです。内周から左抜け。', image: '', icon: '🔷' },
  'C_right': { title: '②④複合: C + 右', text: 'C と 右 の組み合わせです。内周から右抜け。', image: '', icon: '🔷' },
  'D_left': { title: '②④複合: D + 左', text: 'D と 左 の組み合わせです。最後に左へ寄る。', image: '', icon: '✨' },
  'D_right': { title: '②④複合: D + 右', text: 'D と 右 の組み合わせです。最後に右へ寄る。', image: '', icon: '✨' }
};

const composite37Map = {
  A_up: { title: '③⑦複合: A + 上', text: 'A パターンで上方向処理です。', image: '', icon: '⬆️' },
  A_down: { title: '③⑦複合: A + 下', text: 'A パターンで下方向処理です。', image: '', icon: '⬇️' },
  B_up: { title: '③⑦複合: B + 上', text: 'B パターンで上方向処理です。', image: '', icon: '🅱️' },
  B_down: { title: '③⑦複合: B + 下', text: 'B パターンで下方向処理です。', image: '', icon: '🅱️' }
};

const p2SwapMap = {
  '1': { text: 'Bと入れ替わる', icon: '🔄' },
  B: { text: '1と入れ替わる', icon: '🔄' },
  '4': { text: 'Cと入れ替わる', icon: '🔄' },
  C: { text: '4と入れ替わる', icon: '🔄' }
};

const p2SwapTargets = ['1', 'B', '4', 'C'];

const steps = [
  {
    id: 'step-p1',
    type: 'choice',
    label: '①予告',
    description: '①の予告パターンを選択してください。',
    answerKey: 'p1',
    image: 'images/p1.png',
    placeholderTitle: '①予告イメージ',
    placeholderText: '画像未配置でも、ここで選択内容を確認しながら進行できます。',
    choices: ['十字', 'X字']
  },
  {
    id: 'step-p2',
    type: 'choice',
    label: '②予告',
    description: '②の予告パターンを選択してください。',
    answerKey: 'p2',
    image: 'images/p2.png',
    placeholderTitle: '②予告イメージ',
    placeholderText: '8パターンから該当するものを選択します。',
    choices: ['1', 'A', '2', 'B', 'C', '4', 'D', '3']
  },
  {
    id: 'step-a2-swap',
    type: 'action',
    label: '②入れ替え確認',
    description: '②予告の結果、入れ替えが発生します。内容を確認してから進んでください。',
    image: 'images/a2-swap.png',
    placeholderTitle: '②入れ替え確認',
    placeholderText: '②予告の位置関係に応じた入れ替え内容を表示します。',
    references: ['p2'],
    actionLabel: '終わった'
  },
  {
    id: 'step-p3',
    type: 'choice',
    label: '③予告',
    description: '③の予告パターンを選択してください。',
    answerKey: 'p3',
    image: 'images/p3.png',
    placeholderTitle: '③予告イメージ',
    placeholderText: '後続の③発動・③⑦複合発動で参照されます。',
    choices: ['A', 'B']
  },
  {
    id: 'step-p4',
    type: 'choice',
    label: '④予告',
    description: '④の予告方向を選択してください。',
    answerKey: 'p4',
    image: 'images/p4.png',
    placeholderTitle: '④予告イメージ',
    placeholderText: '②④複合発動に備えて方向を記録します。',
    choices: ['left', 'right']
  },
  {
    id: 'step-a3',
    type: 'action',
    label: '③発動',
    description: '③予告で記録した内容を確認して、発動が終わったら進んでください。',
    image: 'images/a3.png',
    placeholderTitle: '③発動',
    placeholderText: '参照値を見ながら、安全処理を確認します。',
    references: ['p3'],
    actionLabel: '終わった'
  },
  {
    id: 'step-p5',
    type: 'choice',
    label: '⑤予告',
    description: '⑤の予告パターンを選択してください。',
    answerKey: 'p5',
    image: 'images/p5.png',
    placeholderTitle: '⑤予告イメージ',
    placeholderText: '後続の⑤発動に備えて記録します。',
    choices: ['内側', '外側']
  },
  {
    id: 'step-c24',
    type: 'composite',
    label: '②④複合発動',
    description: '②と④の記録内容から、今回の複合発動表示を確認してください。',
    compositeKey: '24',
    actionLabel: '終わった',
    references: ['p2', 'p4']
  },
  {
    id: 'step-a5',
    type: 'action',
    label: '⑤発動',
    description: '⑤予告の記録を確認して、発動が終わったら進んでください。',
    image: 'images/a5.png',
    placeholderTitle: '⑤発動',
    placeholderText: '⑤の結果に応じた処理確認用です。',
    references: ['p5'],
    actionLabel: '終わった'
  },
  {
    id: 'step-a6',
    type: 'action',
    label: '⑥予告なし発動',
    description: 'このフェーズは予告入力なしです。発動が終わったら進んでください。',
    image: 'images/a6.png',
    placeholderTitle: '⑥発動',
    placeholderText: '固定処理フェーズです。入力は不要です。',
    actionLabel: '終わった'
  },
  {
    id: 'step-p7',
    type: 'choice',
    label: '⑦予告',
    description: '⑦の予告方向を選択してください。',
    answerKey: 'p7',
    image: 'images/p7.png',
    placeholderTitle: '⑦予告イメージ',
    placeholderText: '③⑦複合発動用に方向を記録します。',
    choices: ['up', 'down']
  },
  {
    id: 'step-a1-first',
    type: 'action',
    label: '①発動（1回目）',
    description: '①予告の記録を確認して、1回目の発動が終わったら進んでください。',
    image: 'images/a1.png',
    placeholderTitle: '①発動（1回目）',
    placeholderText: '①予告の内容を参照します。',
    references: ['p1'],
    actionLabel: '終わった'
  },
  {
    id: 'step-c37-first',
    type: 'composite',
    label: '③⑦複合発動（1回目）',
    description: '③と⑦の記録内容から、今回の複合発動表示を確認してください。',
    compositeKey: '37',
    actionLabel: '終わった',
    references: ['p3', 'p7']
  },
  {
    id: 'step-a1-second',
    type: 'action',
    label: '①発動（2回目）',
    description: '①予告の記録を確認して、2回目の発動が終わったら進んでください。',
    image: 'images/a1.png',
    placeholderTitle: '①発動（2回目）',
    placeholderText: '同じ①予告を再参照するフェーズです。',
    references: ['p1'],
    actionLabel: '終わった'
  },
  {
    id: 'step-c37-second',
    type: 'composite',
    label: '③⑦複合発動（2回目）',
    description: '最後の複合発動です。③と⑦の記録内容を再確認してください。',
    compositeKey: '37',
    actionLabel: '終わった',
    references: ['p3', 'p7']
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

function shouldSkipStep(step) {
  return step?.id === 'step-a2-swap' && !shouldShowP2SwapStep();
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

  app.innerHTML = `
    <section class="card">
      <div class="progress" aria-label="進行状況">
        <div class="progress-bar" style="width: ${progress}%;"></div>
      </div>
      <h2 class="step-title">${escapeHtml(options.title || step?.label || '完了')}</h2>
      ${options.description ? `<p class="description">${escapeHtml(options.description)}</p>` : ''}
      ${content}
      <section class="summary-section">${renderSummary()}</section>
      ${renderNavigation(step)}
    </section>
  `;

  bindEvents(step);
}

function renderVisual(step, fallbackTitle, fallbackText, icon = '🖼️') {
  const imageMarkup = step?.image
    ? `<img src="${escapeHtml(step.image)}" alt="${escapeHtml(step.label)}" onerror="this.replaceWith(this.parentElement.querySelector('.placeholder-template').content.cloneNode(true))">`
    : '';

  return `
    <div class="visual-box">
      ${imageMarkup}
      <template class="placeholder-template">
        <div class="placeholder">
          <div class="placeholder-icon">${escapeHtml(icon)}</div>
          <strong>${escapeHtml(fallbackTitle)}</strong>
          <p>${escapeHtml(fallbackText)}</p>
        </div>
      </template>
      ${!step?.image ? `
        <div class="placeholder">
          <div class="placeholder-icon">${escapeHtml(icon)}</div>
          <strong>${escapeHtml(fallbackTitle)}</strong>
          <p>${escapeHtml(fallbackText)}</p>
        </div>` : ''}
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
        ${renderChoiceButton('B')}
        <div class="choice-grid-p2-empty" aria-hidden="true"></div>
        ${renderChoiceButton('C')}
        ${renderChoiceButton('4')}
        ${renderChoiceButton('D')}
        ${renderChoiceButton('3')}
      </div>
    `
    : `<div class="choice-grid">${step.choices.map(renderChoiceButton).join('')}</div>`;

  const content = `
    ${renderVisual(step, step.placeholderTitle, step.placeholderText, '🧩')}
    ${choices}
  `;

  renderFrame(content, step, {
    title: step.label
  });
}

function renderActionStep(step) {
  const swapDisplay = step.id === 'step-a2-swap' ? getP2SwapDisplay() : null;
  const references = renderReferences(step.references || []);
  const content = `
    ${renderVisual(step, step.placeholderTitle, step.placeholderText, '⚔️')}
    ${swapDisplay ? `
      <div class="reference-row">
        <div class="reference-card">
          <span class="label">入れ替え内容 ${escapeHtml(swapDisplay.icon || '🔄')}</span>
          <strong>${escapeHtml(swapDisplay.text)}</strong>
        </div>
      </div>
    ` : ''}
    ${references}
  `;

  renderFrame(content, step, {
    title: step.label,
    description: step.description
  });
}

function renderCompositeStep(step) {
  const display = step.compositeKey === '24' ? getComposite24Display() : getComposite37Display();
  const visualStep = {
    ...step,
    image: display.image
  };
  const content = `
    ${renderVisual(visualStep, display.title, display.text, display.icon || '🔀')}
    ${renderReferences(step.references || [])}
  `;

  renderFrame(content, step, {
    title: step.label,
    description: step.description
  });
}

function renderComplete() {
  const content = `
    <div class="complete-box">
      <span class="complete-badge">完了</span>
      <p class="description">全フェーズが完了しました。必要なら前へ戻って内容を再確認するか、リセットして最初からやり直せます。</p>
    </div>
  `;

  renderFrame(content, null, {
    title: '進行完了',
    description: '記録結果の最終確認画面です。'
  });
}

function renderReferences(referenceKeys) {
  if (!referenceKeys.length) {
    return '';
  }

  const cards = referenceKeys
    .map((key) => {
      const item = summaryConfig.find((entry) => entry.key === key);
      const value = state.answers[key] || '未入力';
      return `
        <div class="reference-card">
          <span class="label">参照値 ${escapeHtml(item?.label || key)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `;
    })
    .join('');

  return `<div class="reference-row">${cards}</div>`;
}

function renderSummary() {
  const items = summaryConfig
    .map((item) => {
      const value = state.answers[item.key] || '未';
      const emptyClass = value === '未' ? 'empty' : '';
      return `<span class="summary-chip ${emptyClass}">${escapeHtml(item.label)}:${escapeHtml(value)}</span>`;
    })
    .join('');

  return `<div class="summary-inline">${items}</div>`;
}

function renderNavigation(step) {
  const onComplete = !step;
  const isChoice = step?.type === 'choice';
  const nextLabel = onComplete ? '完了' : (step.actionLabel || '終わった');
  const nextDisabled = onComplete || !canGoNext(step);

  return `
    <div class="nav-row ${isChoice ? 'choice-nav' : ''}">
      <button type="button" class="secondary-button" data-action="prev" ${state.stepIndex === 0 ? 'disabled' : ''}>前へ</button>
      <button type="button" class="danger-button" data-action="reset">リセット</button>
      ${isChoice ? '' : `<button type="button" class="primary-button" data-action="next" ${nextDisabled ? 'disabled' : ''}>${escapeHtml(nextLabel)}</button>`}
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
    resetButton.addEventListener('click', () => resetState(true));
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

function getComposite24Display() {
  const key = `${state.answers.p2}_${state.answers.p4}`;
  return composite24Map[key] || defaultCompositeDisplay;
}

function getComposite37Display() {
  const key = `${state.answers.p3}_${state.answers.p7}`;
  return composite37Map[key] || defaultCompositeDisplay;
}

loadState();
render();
