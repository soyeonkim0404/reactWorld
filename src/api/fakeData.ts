import type { CardData } from './types';

export const fakeCards: CardData[] = [
  {
    id: '1',
    title: '첫 번째 카드',
    description: '카드 설명입니다',
    content: '이것은 첫 번째 카드의 내용입니다. 여기에 카드의 상세 내용이 들어갑니다.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    tags: ['React', 'TypeScript'],
    link: '/test',
  },
  {
    id: '2',
    title: '두 번째 카드',
    description: '두 번째 카드 설명',
    content: '이것은 두 번째 카드의 내용입니다. 다양한 정보를 담을 수 있습니다.',
    createdAt: '2024-01-16T09:15:00Z',
    tags: ['JavaScript', 'Frontend'],
    link: '/test',
  },
  {
    id: '3',
    title: '세 번째 카드',
    content: '세 번째 카드의 내용입니다. 간단한 설명 없이도 사용할 수 있습니다.',
    createdAt: '2024-01-17T11:45:00Z',
    updatedAt: '2024-01-18T16:30:00Z',
    tags: ['CSS', 'Design'],
    link: '/test',
  },
  {
    id: '4',
    title: '네 번째 카드',
    description: '네 번째 카드 설명입니다',
    content: '이것은 네 번째 카드입니다. 더 많은 카드 데이터를 추가할 수 있습니다.',
    createdAt: '2024-01-18T13:20:00Z',
    tags: ['API', 'Backend'],
    link: '/test',
  },
  {
    id: '5',
    title: '다섯 번째 카드',
    content: '다섯 번째 카드의 내용입니다.',
    createdAt: '2024-01-19T15:00:00Z',
    tags: ['Database', 'SQL'],
    link: '/test',
  },
];
