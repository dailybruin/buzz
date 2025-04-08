
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "../Shared/Table.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaRegCopy, FaPencilAlt, FaTrash } from "react-icons/fa";

export function CreateStaffTable({ data, columns, deleteFunction, editFunction, stingFunction }) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const startEdit = item => {
    setEditingId(item._id);
    const initial = {};
    columns.forEach(col => {
      initial[col] = item[col] || "";
    });
    setEditValues(initial);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = id => {
    editFunction(id, editValues)
      .then(() => cancelEdit())
      .catch(err => {
        console.error("Edit failed:", err);
        alert("Failed to save changes");
      });
  };

  const handleChange = (col, val) => {
    setEditValues(v => ({ ...v, [col]: val }));
  };

  return (
    <Table>
      <Thead>
        <Tr>
          {columns.map(x => <Th key={x}>{x}</Th>)}
          {(deleteFunction || editFunction || stingFunction) && <Th>Actions</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {data
          .slice()
          .sort((a, b) => {
            if (!columns.length) return 0;
            const c = columns[0];
            const va = a[c] ? String(a[c]).toLowerCase() : "";
            const vb = b[c] ? String(b[c]).toLowerCase() : "";
            return va.localeCompare(vb);
          })
          .map(item => (
            <Tr key={item._id}>
              {columns.map(property => {
                const value = item[property];

                // — EDIT MODE —
                if (editingId === item._id) {
                  // keep link/slug read‑only
                  if (property === "link" || property === "slug") {
                    return <Td key={property}>{value || "\u00A0"}</Td>;
                  }
                  return (
                    <Td key={property}>
                      <input
                        value={editValues[property]}
                        onChange={e => handleChange(property, e.target.value)}
                      />
                    </Td>
                  );
                }

                try {
                  if (
                    property === "link" &&
                    value &&
                    new URL(value).hostname === "dailybruin.com"
                  ) {
                    return (
                      <Td key={property}>
                        <a href={value} target="_blank" rel="noopener noreferrer">
                          {value}
                        </a>
                        <button
                          onClick={() => navigator.clipboard.writeText(value)}
                          style={{ marginLeft: "2px", backgroundColor: "white", color: "black" }}
                        >
                          <FaRegCopy />
                        </button>
                      </Td>
                    );
                  } else if (property === "slug" && value) {
                    return (
                      <Td key={property}>
                        {value}
                        <button
                          onClick={() => navigator.clipboard.writeText(value)}
                          style={{ marginLeft: "2px", backgroundColor: "white", color: "black" }}
                        >
                          <FaRegCopy />
                        </button>
                      </Td>
                    );
                  }
                } catch {}

                return <Td key={property}>{value || "\u00A0"}</Td>;
              })}

              {(deleteFunction || editFunction || stingFunction) && (
                <Td style={{ display: "flex", gap: "0.5rem" }}>
                  {editingId === item._id ? (
                    <>
                      <button onClick={() => saveEdit(item._id)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {editFunction && (
                    <button
                    className="table-icon-button"
                    onClick={() => editFunction(item._id)}
                    title="Edit"
                  >
                    <FaPencilAlt />
                  </button>
                  )}
                      {stingFunction && (
                        <button onClick={() => stingFunction(item._id)}>Sting</button>
                      )}
                      {deleteFunction && (
                        <button
                        className="table-icon-button"
                        onClick={() => deleteFunction(item._id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      )}
                    </>
                  )}
                </Td>
              )}
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}
