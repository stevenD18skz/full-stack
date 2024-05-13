import React from "react";
import { Navigation } from "../components/Navigation";
import { TableCrud } from "../components/TableCrud";


export function CrudWorkPage() {
  return (
    <div>
      <Navigation></Navigation>
      <div className="p-6">
      <TableCrud index={2} />
      </div>
    </div>
  );
};