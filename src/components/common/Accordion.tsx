import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  defaultFirstOpen?: boolean;
  className?: string;
}

const Accordion = ({ items, allowMultiple = false, defaultFirstOpen = false, className = '' }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<number>>(() => {
    const initialOpenItems = new Set<number>();
    
    // 각 아이템의 defaultOpen 설정 확인
    items.forEach((item, index) => {
      if (item.defaultOpen !== undefined) {
        if (item.defaultOpen) {
          initialOpenItems.add(index);
        }
      } else if (defaultFirstOpen && index === 0) {
        // defaultFirstOpen이 true이고 첫 번째 아이템의 defaultOpen이 명시되지 않은 경우
        initialOpenItems.add(index);
      }
    });
    
    return initialOpenItems;
  });

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className={`bg-transparent ${className}`}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            <button
              type="button"
              className="w-full p-[10px_10px_10px_10px] text-left transition-colors hover:bg-gray-50"
              onClick={() => toggleItem(index)}
              aria-expanded={openItems.has(index)}
            >
              <div className="flex items-center gap-4">
                {/* 왼쪽 아이콘 */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600"></div>

                {/* 타이틀 */}
                <div className="min-w-0 flex-1">
                  <div className="text-[16px] font-semibold text-gray-900">{item.title}</div>
                </div>

                {/* 우측 chevron */}
                <ChevronDownIcon
                  className="w-[24px] h-[24px] shrink-0 text-gray-400 transition-transform duration-200"
                  style={{
                    transform: openItems.has(index) ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </div>
            </button>

            {/* 펼침 영역 */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openItems.has(index) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                {/* 내용은 아이콘 영역만큼 들여쓰기 */}
                <div className="px-5 pb-5 text-[14px] leading-6 text-gray-500">
                  {item.children}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
