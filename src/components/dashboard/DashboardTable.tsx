import type { ReactNode } from "react";

export interface DashboardTableColumn<T> {
  key: string;
  header: string;
  render?: (value: unknown, row: T) => ReactNode;
  align?: "left" | "center" | "right";
}

export interface DashboardTableProps<T> {
  /** 컬럼 정의 */
  columns: DashboardTableColumn<T>[];
  /** 테이블 데이터 */
  data: T[];
  /** 행별 고유 키 추출 */
  getRowKey: (row: T) => string;
  /** 정렬 가능 컬럼의 key (향후 확장) */
  sortable?: string[];
  /** 헤더 클릭 핸들러 (향후 정렬 확장) */
  onHeaderClick?: (key: string) => void;
  /** 빈 상태 메시지 */
  emptyMessage?: string;
  className?: string;
}

function DashboardTable<T extends Record<string, unknown>>({
  columns,
  data,
  getRowKey,
  emptyMessage = "데이터가 없습니다.",
  className = "",
}: DashboardTableProps<T>) {
  return (
    <div
      className={`overflow-x-auto rounded-[10px] border border-[var(--dash-primary-dark)]/20 ${className}`}
      role="region"
      aria-label="데이터 테이블"
    >
      <table className="w-full table-fixed" role="table">
        <thead>
          <tr className="border-b border-[var(--dash-primary-dark)]/20 bg-[var(--dash-background-paper)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-[var(--dash-fontSize-sm)] font-normal text-[var(--dash-text-secondary)] ${
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                      ? "text-center"
                      : "text-left"
                }`}
                scope="col"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-[var(--dash-fontSize-sm)] text-[var(--dash-text-muted)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={getRowKey(row)}
                className={`
                  border-b border-[var(--dash-primary-dark)]/10 last:border-b-0
                  ${index % 2 === 1 ? "bg-[var(--dash-background-light)]" : "bg-[var(--dash-background-paper)]"}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`
                      px-4 py-3 text-[var(--dash-fontSize-sm)] font-normal text-[var(--dash-text-secondary)]
                      ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}
                    `}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
