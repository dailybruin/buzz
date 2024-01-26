import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./Table.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const CreateTable = (
  data,
  columns,
  deleteFunction,
  editFunction,
  sting
) => (
  <Table>
    <Thead>
      <Tr>
        {columns.map((x) => (
          <Th key={x}>{x}</Th>
        ))}
        {deleteFunction || editFunction ? <Th key="actions">actions</Th> : null}
      </Tr>
    </Thead>
    <Tbody>
      {[]
        .concat(data)
        .sort((a, b) => (a.placement[0] > b.placement[0] ? 1 : -1))
        .map((item, index) => {
          return (
            <Tr key={index}>
              {columns.map((property) => {
                const value = item[property];
                try {
                  if (
                    property === "link" &&
                    value &&
                    new URL(value).hostname === "dailybruin.com"
                  ) {
                    return (
                      <Td key={`${property}-${value}`}>
                        <a href={value} target="_blank">
                          {value}
                        </a>
                      </Td>
                    );
                  }
                } catch {}
                return (
                  <Td key={`${property}-${value}`}>
                    {value ? value : "\u00A0"}
                  </Td>
                );
              })}
              {deleteFunction || editFunction || sting ? (
                <Td className="deleteTableData" key={`delete-${index}`}>
                  {deleteFunction ? (
                    <span
                      className="delete"
                      onClick={() =>
                        deleteFunction(item["_id"]).then(() => {
                          if (window) {
                            window.location.reload();
                          }
                        })
                      }
                    >
                      Delete
                    </span>
                  ) : null}
                  {editFunction ? (
                    <span className="edit" onClick={() => editFunction(item)}>
                      Edit
                    </span>
                  ) : null}
                  {sting ? (
                    <span className="sting" onClick={() => sting(item["_id"])}>
                      Sting
                    </span>
                  ) : null}
                </Td>
              ) : null}
            </Tr>
          );
        })}
    </Tbody>
  </Table>
);
