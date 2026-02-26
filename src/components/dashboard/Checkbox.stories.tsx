import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";

const meta = {
  title: "Dashboard/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Remember me",
  },
};

export const Checked: Story = {
  args: {
    label: "Remember me",
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};
