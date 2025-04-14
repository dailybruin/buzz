import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./Table.css"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaRegCopy } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};


export const CreateTable = (data, columns, deleteFunction, editFunction) => (
  <div className="tableWrapper">
  <Table className="responsiveTable">
    <Thead>
      <Tr>
        {columns.map(x =>  <Th key={x}>{x}</Th>)}
        {(deleteFunction || editFunction)
          ? (
            <Th key="actions"></Th>
          )
          : null}
      </Tr>
    </Thead>
    <Tbody>
      {data
      .slice()
      .sort((a, b) => {
        if (!columns.length) return 0; // Prevent sorting if no columns
    
        const firstCol = columns[0]; 
        const valA = a[firstCol] ? String(a[firstCol]).toLowerCase() : "";
        const valB = b[firstCol] ? String(b[firstCol]).toLowerCase() : "";
    
        return valA.localeCompare(valB);
      })
      .map((item, index) => {
        return (
          <Tr className="tableRows" key={index}>
            {columns.map(property => {
              const value = item[property];
              try {
                if (property === "link" && value) {
                  return (
                    <Td key={`${property}-${value}`} data-label={property}>
                    {isValidUrl(value) ? (
                      <a href={value} target="_blank" rel="noopener noreferrer">
                        {value}
                      </a>
                    ) : (
                      <span style={{ color: "red" }}>{value}</span>
                    )}
                    {/* Add Copy Button for the link */}
                    <button 
                      onClick={() => navigator.clipboard.writeText(value)} 
                      style={{ marginLeft: '2px', backgroundColor: 'white', color: 'black' }}
                    >
                      <FaRegCopy />
                    </button>
                  </Td>
                  )
                }
                else if (property === "slug" || property === "referText" && value) {
                  return (
                  <Td key={`${property}-${value}`} data-label={property}>
                    {value} 
                    <button onClick={() => navigator.clipboard.writeText(value)} style={{ marginLeft: '2px',backgroundColor: "white", color: "black" }}>
                    <FaRegCopy/>
                    </button>
                  </Td>)
                }
              }
              catch { }
              return (
                <Td key={`${property}-${value}`} data-label={property}>
                  {/*NOTE: for now, check if value is not null to handle "art in" always blank*/
                    (value && (property === "artStatus" || property === "status")) ? (
                      <div className="statusCallout">{value ? value : '\u00A0'}</div>
                    ) : (
                      value ? value : '\u00A0'
                    )}
                </Td>
              )
            })}
            {(editFunction && deleteFunction)
              ? (<Td className="deleteTableData" key={`delete-${index}`} data-label="Actions">
                {editFunction
                  ? (<span className="edit" onClick={() =>editFunction(item)}><MdEdit size="1.5em"/></span>)
                  : null}
                {deleteFunction 
                ? (<span className="delete" onClick={() => deleteFunction(item["_id"]).then(() => {
                  if (window) {
                    window.location.reload();
                  }
                })}><FaTrash size="1.25em"/></span>)
                : null}
              </Td>)
              : null}
          </Tr>
        )
      })}
    </Tbody>
  </Table>
</div>
)
