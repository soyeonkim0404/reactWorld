"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

type DataType = string[];

const DATA: DataType = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Remix", "SolidJS"];

export default function Test01() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const highlightedRef = useRef<HTMLLIElement>(null);

  const filteredData = DATA.filter((item) => item.toLowerCase().includes(debouncedValue.toLowerCase().trim()));
  const showDropdown = debouncedValue.trim().length > 0 && filteredData.length > 0 && isDropdownOpen;

  const selectItem = useCallback((item: string) => {
    setInputValue(item);
    setDebouncedValue(item);
    setHighlightedIndex(-1);
    setIsDropdownOpen(false);
  }, []);

  useEffect(() => {
    setHighlightedIndex(showDropdown ? 0 : -1);
  }, [showDropdown, debouncedValue]);

  useEffect(() => {
    highlightedRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [highlightedIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

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
        setHighlightedIndex(-1);
        setIsDropdownOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="m-auto max-w-[600px] mt-[50px] p-[20px] border border-[#30AE56] rounded-[10px]">
      <div className="relative">
        <div className="flex items-center gap-[10px]">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="border border-[#dddddd] w-[calc(100%-100px)] h-[40px] p-3 rounded-[5px]"
            placeholder="search for a item"
            aria-label="search for a item"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-controls="dropdown-listbox"
            aria-activedescendant={showDropdown && highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
          />
          <button className="bg-[#000000] text-white px-[10px] py-[5px] rounded-[5px] w-[100px] h-[40px] text-center">
            Add
          </button>
        </div>

        {showDropdown && (
          <ul
            id="dropdown-listbox"
            className="absolute top-full left-0 right-[20px] mt-1 w-[calc(100%-110px)] bg-white border border-[#dddddd] rounded-[5px] shadow-md max-h-[200px] overflow-y-auto z-10"
            role="listbox"
            aria-label="검색 결과"
          >
            {filteredData.map((item, index) => (
              <li
                key={item}
                ref={index === highlightedIndex ? highlightedRef : null}
                id={`option-${index}`}
                role="option"
                aria-selected={index === highlightedIndex}
                className={`px-3 py-2 cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px] ${
                  index === highlightedIndex ? "bg-[#e8f5e9]" : "hover:bg-[#f0f0f0]"
                }`}
                onClick={() => selectItem(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
