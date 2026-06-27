import { useEffect } from 'react';

const NAV_LINK_SELECTOR = '[data-service-card] a[href]';
const GRID_SELECTOR = '[data-service-card-grid]';
const GROUP_SELECTOR = '[data-service-card-group]';

type FocusedCard = {
  link: HTMLAnchorElement;
  cards: HTMLAnchorElement[];
  index: number;
};

function getCenterX(card: HTMLAnchorElement): number {
  const rect = card.getBoundingClientRect();
  return rect.left + rect.width / 2;
}

function getActiveNavLink(): HTMLAnchorElement | null {
  const active = document.activeElement;
  if (!active) return null;

  const link = active.closest('a[href]');
  if (!link?.closest('[data-service-card]')) return null;

  return link as HTMLAnchorElement;
}

function getAllCards(): HTMLAnchorElement[] {
  return Array.from(document.querySelectorAll(NAV_LINK_SELECTOR)) as HTMLAnchorElement[];
}

function getHorizontalCards(link: HTMLAnchorElement): HTMLAnchorElement[] {
  const grid = link.closest(GRID_SELECTOR);
  if (grid) {
    return Array.from(grid.querySelectorAll(NAV_LINK_SELECTOR)) as HTMLAnchorElement[];
  }

  const group = link.closest(GROUP_SELECTOR);
  if (group) {
    return Array.from(group.querySelectorAll(NAV_LINK_SELECTOR)) as HTMLAnchorElement[];
  }

  return getAllCards();
}

function getFocusedCard(): FocusedCard | null {
  const link = getActiveNavLink();
  if (!link) return null;

  const cards = getHorizontalCards(link);
  const index = cards.indexOf(link);
  if (index === -1) return null;

  return { link, cards, index };
}

function findVerticalCard(
  current: HTMLAnchorElement,
  direction: 'up' | 'down',
  referenceCenterX: number
): HTMLAnchorElement | undefined {
  const cards = getAllCards();
  const rect = current.getBoundingClientRect();
  const rowGap = 4;

  const candidates = cards.filter((card) => {
    if (card === current) return false;
    const cardRect = card.getBoundingClientRect();
    return direction === 'up' ? cardRect.bottom <= rect.top + rowGap : cardRect.top >= rect.bottom - rowGap;
  });

  if (candidates.length === 0) return undefined;

  return candidates.reduce((best, card) => {
    const bestRect = best.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const bestRowEdge = direction === 'up' ? bestRect.bottom : bestRect.top;
    const cardRowEdge = direction === 'up' ? cardRect.bottom : cardRect.top;

    if (Math.abs(cardRowEdge - bestRowEdge) > 2) {
      if (direction === 'up') {
        return cardRowEdge > bestRowEdge ? card : best;
      }
      return cardRowEdge < bestRowEdge ? card : best;
    }

    const bestX = Math.abs(bestRect.left + bestRect.width / 2 - referenceCenterX);
    const cardX = Math.abs(cardRect.left + cardRect.width / 2 - referenceCenterX);
    return cardX < bestX ? card : best;
  });
}

function isCardVisible(card: HTMLAnchorElement): boolean {
  const rect = card.getBoundingClientRect();
  const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
  const margin = 16;

  return (
    rect.top >= headerBottom + margin &&
    rect.bottom <= window.innerHeight - margin &&
    rect.left >= margin &&
    rect.right <= window.innerWidth - margin
  );
}

function focusCard(card: HTMLAnchorElement): void {
  card.focus({ preventScroll: true });
  window.getSelection()?.removeAllRanges();

  if (!isCardVisible(card)) {
    card.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }
}

export function useServiceCardNavigation() {
  useEffect(() => {
    let preferredCenterX: number | null = null;

    const getReferenceCenterX = (link: HTMLAnchorElement): number => {
      preferredCenterX ??= getCenterX(link);
      return preferredCenterX;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const link = (e.target as HTMLElement).closest(NAV_LINK_SELECTOR);
      if (link) {
        preferredCenterX = getCenterX(link as HTMLAnchorElement);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const focused = getFocusedCard();
      if (!focused) return;

      const { link, cards, index } = focused;

      switch (e.key) {
        case 'ArrowRight': {
          e.preventDefault();
          const nextIndex = index + 1;
          if (nextIndex < cards.length) {
            const next = cards[nextIndex];
            focusCard(next);
            preferredCenterX = getCenterX(next);
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          const nextIndex = index - 1;
          if (nextIndex >= 0) {
            const next = cards[nextIndex];
            focusCard(next);
            preferredCenterX = getCenterX(next);
          }
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          const next = findVerticalCard(link, 'down', getReferenceCenterX(link));
          if (next) focusCard(next);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prev = findVerticalCard(link, 'up', getReferenceCenterX(link));
          if (prev) focusCard(prev);
          break;
        }
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
