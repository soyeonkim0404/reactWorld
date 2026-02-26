import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import DashboardLink from "./DashboardLink";

const meta = {
  title: "Dashboard/DashboardLink",
  component: DashboardLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof DashboardLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    to: "/dashboard/auth/recover",
    children: "Reset Password?",
  },
};
