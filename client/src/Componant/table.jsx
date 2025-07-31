import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import { DocumentationSee } from "../documentation";
import { nodes } from "../data";

const Component = ({ filterStatus, searchText }) => {
  //  Apply filtering based on status
  let filteredNodes =
    filterStatus === "Blank Report"
      ? nodes.filter((item) => !item.isComplete)
      : filterStatus === "Fill Report"
      ? nodes.filter((item) => item.isComplete)
      : nodes;

  //  Apply search filter (by task name, case-insensitive)
  if (searchText.trim() !== "") {
    filteredNodes = filteredNodes.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const data = { nodes: filteredNodes };

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  30% repeat(2, minmax(0, 1fr)) 25% 100px;
      `,
    },
  ]);

  const COLUMNS = [
    { label: "Task", renderCell: (item) => item.name },
    {
      label: "Deadline",
      renderCell: (item) =>
        item.deadline.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    { label: "Type", renderCell: (item) => item.type },
    {
      label: "Report Status",
      renderCell: (item) => (item.isComplete ? "Fill Report" : "Blank Report"),
    },
    { label: "Tasks", renderCell: (item) => item.nodes?.length },
  ];

  return (
    <>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true }}
      />

      <br />
      <DocumentationSee anchor={""} />
    </>
  );
};

export default Component;
