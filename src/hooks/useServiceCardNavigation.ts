import { useEffect } from 'react';

/**
 * Custom hook for arrow key navigation between service cards
 * Handles Right, Left, Up, and Down arrow keys to navigate cards
 */
export function useServiceCardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      if (!activeElement) return;

      // Check if the focused element is a service card link
      const cardLink = activeElement.closest('a[href]');
      if (!cardLink) return;

      const allCards = Array.from(document.querySelectorAll('[data-service-card] a[href]'));
      const currentIndex = allCards.indexOf(cardLink);
      if (currentIndex === -1) return;

      let nextIndex = -1;

      // Get the position of the current card
      const rect = cardLink.getBoundingClientRect();
      const cards = allCards as HTMLAnchorElement[];

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex < cards.length) {
          cards[nextIndex].focus();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex >= 0) {
          cards[nextIndex].focus();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        // Find card below by Y position
        const currentY = rect.top;
        const currentX = rect.left;
        const nextCard = cards.find((card, idx) => {
          if (idx <= currentIndex) return false;
          const cardRect = card.getBoundingClientRect();
          return cardRect.top > currentY && Math.abs(cardRect.left - currentX) < 50;
        });
        if (nextCard) nextCard.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        // Find card above by Y position
        const currentY = rect.top;
        const currentX = rect.left;
        const prevCard = Array.from(cards)
          .reverse()
          .find((card, idx) => {
            const originalIdx = cards.length - 1 - idx;
            if (originalIdx >= currentIndex) return false;
            const cardRect = card.getBoundingClientRect();
            return cardRect.top < currentY && Math.abs(cardRect.left - currentX) < 50;
          });
        if (prevCard) prevCard.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}
