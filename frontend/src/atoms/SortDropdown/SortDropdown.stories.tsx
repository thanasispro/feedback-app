import { useState } from "react";
import { SortDropdown } from "./SortDropdown";

export default {
  title: "Design System/SortDropdown",
  component: SortDropdown,
};

export const Default = () => {
  const [selected, setSelected] = useState("Most Upvotes");

  return (
    <div className="p-6 bg-neutral-gray-100 h-screen">
      <SortDropdown
        value={selected}
        options={[
          "Most Upvotes",
          "Least Upvotes",
          "Most Comments",
          "Least Comments",
        ]}
        onSelect={setSelected}
      />
    </div>
  );
};
