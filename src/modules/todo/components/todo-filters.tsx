"use client";

import { useSearchParams, useRouter } from "next/navigation";

const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export function TodoFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const current = searchParams.get("filter") ?? "all";

  function setFilter(filter: string) {
    const params = new URLSearchParams(searchParams);

    params.set("filter", filter);

    router.replace(`/todos?${params.toString()}`);
  }

  return (
    <div className="flex gap-3 mb-4">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={current === f.value ? "font-bold underline" : ""}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
