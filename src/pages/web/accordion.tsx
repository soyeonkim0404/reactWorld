import Accordion from "@/components/common/Accordion";
import type { AccordionItemProps } from "@/components/common/Accordion";

const AccordionPage = () => {
  const accordionItems: AccordionItemProps[] = [
    {
      title: "첫 번째 항목",
      children: (
        <div>
          <p className="mb-2">첫 번째 항목의 내용입니다.</p>
          <p className="text-sm text-gray-600">
            여기에 더 자세한 정보를 추가할 수 있습니다. 아코디언을 사용하면 공간을 효율적으로 활용할 수 있습니다.
          </p>
        </div>
      ),
    },
    {
      title: "두 번째 항목",
      children: (
        <div>
          <p className="mb-2">두 번째 항목의 내용입니다.</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>리스트 항목 1</li>
            <li>리스트 항목 2</li>
            <li>리스트 항목 3</li>
          </ul>
        </div>
      ),
    },
    {
      title: "세 번째 항목",
      children: (
        <div>
          <p className="mb-2">세 번째 항목의 내용입니다.</p>
          <p className="text-sm text-gray-600">
            여러 줄의 텍스트를 포함할 수 있으며, 필요에 따라 다양한 컴포넌트를 추가할 수 있습니다.
          </p>
        </div>
      ),
    },
    {
      title: "네 번째 항목",
      children: (
        <div>
          <p className="mb-2">네 번째 항목의 내용입니다.</p>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-700">특별한 스타일링이 적용된 컨텐츠도 포함할 수 있습니다.</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-[920px] m-auto mt-[100px]">
      <div className="mx-auto flex gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Default Accordion</h2>
          <Accordion items={accordionItems} allowMultiple={false} defaultFirstOpen={true} className="mt-[40px]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Multiple Accordion</h2>
          <Accordion items={accordionItems} allowMultiple={true} defaultFirstOpen={false} className="mt-[40px]" />
        </div>
      </div>
    </div>
  );
};

export default AccordionPage;
