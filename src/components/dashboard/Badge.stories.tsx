import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta = {
  title: "Dashboard/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["count", "dot", "status"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Count: Story = {
  args: {
    count: 60,
    variant: "count",
  },
};

export const Dot: Story = {
  args: {
    variant: "dot",
  },
};

export const Status: Story = {
  args: {
    children: "98",
    variant: "status",
    size: "sm",
  },
};
