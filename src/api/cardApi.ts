import type { CardData, ApiResponse } from './types';
import { fakeCards } from './fakeData';

// 모든 카드 가져오기
export const getAllCards = async (): Promise<ApiResponse<CardData[]>> => {
  // 실제 API 호출을 시뮬레이션하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: fakeCards,
    success: true,
    message: '카드 목록을 성공적으로 가져왔습니다.',
  };
};

// 특정 카드 가져오기
export const getCardById = async (id: string): Promise<ApiResponse<CardData | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const card = fakeCards.find((card) => card.id === id);

  if (!card) {
    return {
      data: null,
      success: false,
      message: '카드를 찾을 수 없습니다.',
    };
  }

  return {
    data: card,
    success: true,
    message: '카드를 성공적으로 가져왔습니다.',
  };
};

// 카드 생성
export const createCard = async (cardData: Omit<CardData, 'id' | 'createdAt'>): Promise<ApiResponse<CardData>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newCard: CardData = {
    ...cardData,
    id: String(fakeCards.length + 1),
    createdAt: new Date().toISOString(),
  };

  fakeCards.push(newCard);

  return {
    data: newCard,
    success: true,
    message: '카드가 성공적으로 생성되었습니다.',
  };
};

// 카드 업데이트
export const updateCard = async (id: string, cardData: Partial<CardData>): Promise<ApiResponse<CardData | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const cardIndex = fakeCards.findIndex((card) => card.id === id);

  if (cardIndex === -1) {
    return {
      data: null,
      success: false,
      message: '카드를 찾을 수 없습니다.',
    };
  }

  fakeCards[cardIndex] = {
    ...fakeCards[cardIndex],
    ...cardData,
    updatedAt: new Date().toISOString(),
  };

  return {
    data: fakeCards[cardIndex],
    success: true,
    message: '카드가 성공적으로 업데이트되었습니다.',
  };
};

// 카드 삭제
export const deleteCard = async (id: string): Promise<ApiResponse<boolean>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const cardIndex = fakeCards.findIndex((card) => card.id === id);

  if (cardIndex === -1) {
    return {
      data: false,
      success: false,
      message: '카드를 찾을 수 없습니다.',
    };
  }

  fakeCards.splice(cardIndex, 1);

  return {
    data: true,
    success: true,
    message: '카드가 성공적으로 삭제되었습니다.',
  };
};
