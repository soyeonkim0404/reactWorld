import { useState, useEffect } from "react";
import type { CardData } from "@/api/types";
import { getAllCards } from "@/api/cardApi";
import { useNavigate } from "react-router-dom";

interface CardProps {
  card: CardData;
  className?: string;
  onClick?: () => void;
  headerAction?: React.ReactNode;
}

const getTagColors = (tag: string) => {
  const tagLower = tag.toLowerCase();

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    css: {
      bg: "rgb(254, 243, 199)", // 노란 배경
      text: "rgb(161, 98, 7)", // 노란 텍스트
      border: "rgb(234, 179, 8)", // 노란 테두리
    },
    javascript: {
      bg: "rgb(219, 234, 254)", // 파란 배경
      text: "rgb(30, 64, 175)", // 파란 텍스트
      border: "rgb(59, 130, 246)", // 파란 테두리
    },
    react: {
      bg: "rgb(219, 234, 254)", // 파란 배경
      text: "rgb(30, 64, 175)", // 파란 텍스트
      border: "rgb(59, 130, 246)", // 파란 테두리
    },
    typescript: {
      bg: "rgb(219, 234, 254)", // 파란 배경
      text: "rgb(30, 64, 175)", // 파란 텍스트
      border: "rgb(59, 130, 246)", // 파란 테두리
    },
  };

  return (
    colorMap[tagLower] || {
      bg: "rgb(243, 232, 255)", // 기본 보라색 배경
      text: "rgb(126, 34, 206)", // 기본 보라색 텍스트
      border: "rgb(168, 85, 247)", // 기본 보라색 테두리
    }
  );
};

const Card = ({ card, className = "", onClick, headerAction }: CardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (card.link) {
      navigate(card.link);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`backdrop-blur-2xl rounded-[10px] p-[20px_20px] w-[300px] overflow-hidden transition-all duration-200 flex items-start justify-between flex-col card-hover ${
        card.link || onClick ? "cursor-pointer" : ""
      } ${className}`}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">{card.title}</h3>
        {headerAction && <div>{headerAction}</div>}
      </div>
      {card.description && <p className="text-sm text-gray-600 mt-[10px]">{card.description}</p>}
      <p className="text-gray-700 mt-[10px]">{card.content}</p>
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-[5px] mt-[10px]">
          {card.tags.map((tag) => {
            const colors = getTagColors(tag);
            return (
              <span
                key={tag}
                className="relative px-[6px] py-[2px] text-[10px] border rounded-[20px]"
                style={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderColor: colors.border,
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}
    </button>
  );
};

const Home = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await getAllCards();
        if (response.success) {
          setCards(response.data);
        } else {
          setError(response.message || "카드를 불러오는데 실패했습니다.");
        }
      } catch (err) {
        setError("카드를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-[20px] p-[30px_10px]">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Home;
