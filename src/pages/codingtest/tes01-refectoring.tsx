"use client";

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

type DataType = string[];

const DATA: DataType = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Remix", "SolidJS"];

/** 간단한 debounce hook */
function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/** 검색어 하이라이트: 일치 부분 <mark> 처리 */
const HighlightedText = React.memo(function HighlightedText({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;

  const lowerText = text.toLowerCase();
  const lowerQ = q.toLowerCase();

  const idx = lowerText.indexOf(lowerQ);
  if (idx < 0) return <>{text}</>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);

  return (
    <>
      {before}
      <mark className="bg-[#fff3bf] px-[2px] rounded-[2px]">{match}</mark>
      {after}
    </>
  );
});

export default function Test01RE() {
  const uid = useId();

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeOptionRef = useRef<HTMLLIElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebouncedValue(inputValue, 300);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const query = debouncedValue.trim();

  const filteredData = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return DATA.filter((item) => item.toLowerCase().includes(q));
  }, [query]);

  const listboxId = `dropdown-listbox-${uid}`;
  const optionId = (index: number) => `option-${uid}-${index}`;

  const showDropdown = isOpen && query.length > 0 && filteredData.length > 0;

  const openDropdown = useCallback(() => {
    if (query.length > 0 && filteredData.length > 0) setIsOpen(true);
  }, [query.length, filteredData.length]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const selectItem = useCallback(
    (item: string) => {
      setInputValue(item);
      closeDropdown();
      // 선택 후 포커스는 input 유지 (라이브코딩에서 질문 많이 나옴)
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [closeDropdown]
  );

  /** 드롭다운이 열릴 때만 기본 하이라이트 설정, 결과 변화 시 인덱스 보정 */
  useEffect(() => {
    if (!showDropdown) {
      setHighlightedIndex(-1);
      return;
    }
    setHighlightedIndex((prev) => {
      if (prev < 0) return 0;
      if (prev >= filteredData.length) return filteredData.length - 1;
      return prev;
    });
  }, [showDropdown, filteredData.length]);

  /** active option 스크롤 가시화 */
  useEffect(() => {
    if (!showDropdown) return;
    activeOptionRef.current?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, showDropdown]);

  /** 밖 클릭하면 닫기 */
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (!root.contains(e.target as Node)) closeDropdown();
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [closeDropdown]);

  /** query 변화에 따라 열림/닫힘 자동 처리 (debounce 이후 결과가 있으면 열기) */
  useEffect(() => {
    if (query.length === 0 || filteredData.length === 0) {
      closeDropdown();
      return;
    }
    setIsOpen(true);
  }, [query, filteredData.length, closeDropdown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === "ArrowDown" && query.length > 0 && filteredData.length > 0) {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      if (e.key === "Escape") closeDropdown();
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < filteredData.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev <= 0 ? filteredData.length - 1 : prev - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredData[highlightedIndex]) {
          selectItem(filteredData[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
      default:
        break;
    }
  };

  const handleInputFocus = () => {
    openDropdown();
  };

  const handleInputBlur = useCallback(() => {
    blurTimeoutRef.current = window.setTimeout(() => {
      blurTimeoutRef.current = null;
      const root = rootRef.current;
      const active = document.activeElement;
      if (root && active && root.contains(active)) return;
      closeDropdown();
    }, 0);
  }, [closeDropdown]);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) window.clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  return (
    <div className="m-auto max-w-[600px] mt-[50px] p-[20px] border border-[#30AE56] rounded-[10px]">
      <div ref={rootRef} className="relative">
        <div className="flex items-center gap-[10px]">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="border border-[#dddddd] w-[calc(100%-100px)] h-[40px] p-3 rounded-[5px]"
            placeholder="search for an item"
            aria-label="search for an item"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-activedescendant={showDropdown && highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined}
          />
        </div>

        {showDropdown && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="검색 결과"
            className="absolute top-full left-0 right-[20px] mt-1 w-[calc(100%-110px)] bg-white border border-[#dddddd] rounded-[5px] shadow-md max-h-[200px] overflow-y-auto z-10"
          >
            {filteredData.map((item, index) => {
              const isActive = index === highlightedIndex;

              return (
                <li
                  key={item}
                  id={optionId(index)}
                  role="option"
                  aria-selected={isActive}
                  ref={isActive ? activeOptionRef : null}
                  tabIndex={-1}
                  className={`px-3 py-2 cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px] ${
                    isActive ? "bg-[#e8f5e9]" : "hover:bg-[#f0f0f0]"
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  // blur 전에 선택이 안정적으로 되도록 mousedown에서 막아줌
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectItem(item)}
                >
                  <HighlightedText text={item} query={query} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
