type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => string | JSX.Element;
};

type DataTableProps<T> = {
  title: string;
  columns: Column<T>[];
  rows: T[];
};

export function DataTable<T extends Record<string, unknown>>({ title, columns, rows }: DataTableProps<T>) {
  return (
    <section className="glass-card rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {rows.length} rows
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-on-muted">
              {columns.map((column) => (
                <th key={String(column.key)} className="whitespace-nowrap px-3 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white/5 text-on-surface transition-colors hover:bg-white/[0.03]">
                {columns.map((column) => (
                  <td key={String(column.key)} className="whitespace-nowrap px-3 py-3">
                    {column.render ? column.render(row) : String(row[column.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
