import { useCallback, useState } from 'react';
import {
  AMOUNT_CARDS_FOR_LARGE,
  AMOUNT_CARDS_FOR_MEDIUM,
  AMOUNT_CARDS_FOR_OVER_LARGE,
  AMOUNT_CARDS_FOR_SMALL,
  EXTRA_CARDS_FOR_LARGE,
  EXTRA_CARDS_FOR_MEDIUM,
  EXTRA_CARDS_FOR_OVER_LARGE,
  EXTRA_CARDS_FOR_SMALL,
  SCREEN_SIZE_LARGE,
  SCREEN_SIZE_MEDIUM,
  SCREEN_SIZE_SMALL,
} from '../utils/constants';

function useCardListRender() {
  const [cardsForRender, setCardsForRender] = useState([]);
  const [cardsLimits, setCardsLimits] = useState({ amount: 0, extra: 0 });

  function setLimits(windowWidth) {
    if (windowWidth <= SCREEN_SIZE_SMALL) {
      return setCardsLimits({ amount: AMOUNT_CARDS_FOR_SMALL, extra: EXTRA_CARDS_FOR_SMALL });
    }
    if (windowWidth <= SCREEN_SIZE_MEDIUM) {
      return setCardsLimits({ amount: AMOUNT_CARDS_FOR_MEDIUM, extra: EXTRA_CARDS_FOR_MEDIUM });
    }
    if (windowWidth <= SCREEN_SIZE_LARGE) {
      return setCardsLimits({ amount: AMOUNT_CARDS_FOR_LARGE, extra: EXTRA_CARDS_FOR_LARGE });
    }
    return setCardsLimits({
      amount: AMOUNT_CARDS_FOR_OVER_LARGE, extra: EXTRA_CARDS_FOR_OVER_LARGE,
    });
  }

  const handleRenderedCards = useCallback((cards, windowWidth) => {
    setLimits(windowWidth);
    setCardsForRender(cards.slice(0, cardsLimits.amount));
  }, [cardsLimits.amount]);

  function handleAddCards(cards) {
    setCardsForRender(cards.slice(0, cardsForRender.length + cardsLimits.extra));
  }
  return { handleRenderedCards, handleAddCards, cardsForRender };
}

export default useCardListRender;
