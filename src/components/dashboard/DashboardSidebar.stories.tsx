import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const meta = {
  title: "Dashboard/DashboardSidebar",
  component: DashboardSidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/dashboard"]}>
        <div className="flex min-h-screen">
          <Story />
          <main className="flex-1 bg-[var(--dash-background-default)] p-6">
            <p className="text-[var(--dash-text-muted)]">메인 콘텐츠 영역</p>
          </main>
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof DashboardSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
