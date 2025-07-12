import { useMemo } from "react";
import groups from "~/data/stores.json";

type Store = {
  name: string;
  link: string;
};

type Groups = Record<string, Store[]>;

export default function StoresTab() {
  const typedGroups: Groups = groups;

  // Split all categories evenly into two columns, without repeating categories
  // Distribute categories to balance total store count per column
  const twoColumns = useMemo(() => {
    const categories = Object.entries(typedGroups).sort(
      (a, b) => b[1].length - a[1].length
    );

    const columns: [Array<[string, Store[]]>, Array<[string, Store[]]>] = [
      [],
      [],
    ];
    const columnCounts = [0, 0];

    categories.forEach(([category, items]) => {
      const colIdx = columnCounts[0] <= columnCounts[1] ? 0 : 1;
      columns[colIdx].push([category, items]);
      columnCounts[colIdx] += items.length;
    });

    return columns;
  }, [typedGroups]);

  return (
    <ul className="flex">
      {twoColumns.map((column, colIdx) => (
        <li key={colIdx} className="flex-1">
          <ul>
            {column.map(([category, items]) => (
              <li key={category}>
                <h3 className="text-primary text-xl font-semibold mb-2">
                  {category}
                </h3>
                <ul className="mb-4">
                  {items.map((store, itemIdx) => (
                    <li key={itemIdx}>
                      <a href={store.link} className="hover:underline">
                        {store.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
