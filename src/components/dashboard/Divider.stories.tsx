import type { Meta, StoryObj } from "@storybook/react";
import Divider from "./Divider";

const meta = {
  title: "Dashboard/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  args: {
    label: "Or",
  },
};

export const WithoutLabel: Story = {
  args: {},
};
