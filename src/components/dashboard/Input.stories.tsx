import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta = {
  title: "Dashboard/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "password", "withIcon"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email Address",
    placeholder: "example@gmail.com",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
};

export const WithError: Story = {
  args: {
    label: "Email Address",
    placeholder: "example@gmail.com",
    error: "올바른 이메일 형식을 입력해주세요.",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email Address",
    placeholder: "example@gmail.com",
    helperText: "가입 시 입력한 이메일 주소를 입력해주세요.",
  },
};
