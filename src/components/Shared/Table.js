import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./Table.css"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaRegCopy } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";


export const CreateTable = (data, columns, deleteFunction, editFunction, sting) => (
  <Table>
    <Thead>
      <Tr>
        {columns.map(x =>  <Th key={x}>{x}</Th>)}
        {(deleteFunction || editFunction)
          ? (
            <Th key="actions">actions</Th>
          )
          : null}
      </Tr>
    </Thead>
    <Tbody>
      {data.map((item, index) => {
        return (
          <Tr className="tableRows" key={index}>
            {columns.map(property => {
              const value = item[property];
              try {
                if (property === "link" && value && new URL(value).hostname === "dailybruin.com") {
                  return (
                    <Td key={`${property}-${value}`}>
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {value}
                    </a>
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
                else if (property === "slug" && value) {
                  return (
                  <Td key={`${property}-${value}`}>
                    {value} 
                    <button onClick={() => navigator.clipboard.writeText(value)} style={{ marginLeft: '2px',backgroundColor: "white", color: "black" }}>
                    <FaRegCopy/>
                    </button>
                  </Td>)
                }
              }
              catch { }
              return (
                <Td key={`${property}-${value}`}>
                  {/*NOTE: for now, check if value is not null to handle "art in" always blank*/
                    (value && (property === "artStatus" || property === "status")) ? (
                      <div className="statusCallout">{value ? value : '\u00A0'}</div>
                    ) : (
                      value ? value : '\u00A0'
                    )}
                </Td>
              )
            })}
            {(deleteFunction || editFunction || sting)
              ? (<Td className="deleteTableData" key={`delete-${index}`}>
                {editFunction
                  ? (<span className="edit" onClick={() => editFunction(item)}><MdEdit size="1.5em"/></span>)
                  : null}
                {deleteFunction 
                ? (<span className="delete" onClick={() => deleteFunction(item["_id"]).then(() => {
                  if (window) {
                    window.location.reload();
                  }
                })}><FaTrash size="1.25em"/></span>)
                : null}
                {sting
                  ? (<span className="sting" onClick={() => sting(item["_id"])}>Sting</span>)
                  : null}
              </Td>)
              : null}
          </Tr>
        )
      })}
    </Tbody>
  </Table>
)