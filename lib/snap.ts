/** Layout scroll position of a card, ignoring CSS scale/rotate on the card itself. */
export function cardScrollPos(card: HTMLElement, wrapper: HTMLElement, vertical: boolean) {
  const zoom = parseFloat(getComputedStyle(card.parentElement ?? wrapper).zoom) || 1;
  const raw = (vertical ? card.offsetTop : card.offsetLeft) * zoom;
  if (card.offsetParent !== wrapper) return raw;
  const cs = getComputedStyle(wrapper);
  const pad = vertical ? parseFloat(cs.paddingBlockStart) : parseFloat(cs.paddingInlineStart);
  return raw - pad;
}

export function closestIndex(offsets: number[], scroll: number) {
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < offsets.length; i++) {
    const d = Math.abs(offsets[i] - scroll);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}
