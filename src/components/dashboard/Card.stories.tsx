import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta = {
  title: "Dashboard/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "row"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "카드 컨텐츠",
    variant: "default",
    className: "p-6",
  },
};

export const Elevated: Story = {
  args: {
    children: "그림자가 있는 카드",
    variant: "elevated",
    className: "p-6",
  },
};

export const Row: Story = {
  args: {
    children: "테이블 행 스타일 카드",
    variant: "row",
    className: "p-4",
  },
};
