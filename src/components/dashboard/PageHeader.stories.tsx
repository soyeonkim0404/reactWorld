import type { Meta, StoryObj } from "@storybook/react";
import PageHeader from "./PageHeader";
import Button from "./Button";

const meta = {
  title: "Dashboard/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "페이지 타이틀",
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Dashboard",
    actions: (
      <>
        <span className="rounded-md border border-[#030229]/30 bg-white px-4 py-2 text-sm font-semibold text-[#030229]">
          10-06-2021
        </span>
        <span className="rounded-md border border-[#030229]/30 bg-white px-4 py-2 text-sm font-semibold text-[#030229]">
          10-10-2021
        </span>
      </>
    ),
  },
};

export const WithButton: Story = {
  args: {
    title: "고객 관리",
    actions: (
      <>
        <select className="rounded-md border border-[#030229]/30 bg-white px-4 py-2 text-sm font-semibold text-[#030229]">
          <option>전체</option>
        </select>
        <Button size="sm">추가</Button>
      </>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Product Analytics",
  },
};
