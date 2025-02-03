import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "./Table.css"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaRegCopy } from "react-icons/fa";

export const CreateTable = (data, columns, deleteFunction, editFunction, sting) => (
  <Table>
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
      {data.map((item, index) => {
        return (
          <Tr key={index}>
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
                <Td key={`${property}-${value}`}>{value ? value : '\u00A0'}</Td>
              )
            })}
            {(deleteFunction || editFunction || sting)
              ? (<Td className="deleteTableData" key={`delete-${index}`}>
                {editFunction
                  ? (<span className="edit" onClick={() => editFunction(item)}>
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#9c9c9c"></path></g></svg>
                  </span>)
                  : null}
                {deleteFunction 
                ? (<span className="delete" onClick={() => deleteFunction(item["_id"]).then(() => {
                  if (window) {
                    window.location.reload();
                  }
                })}>
                  <svg fill="#9c9c9c" width="64px" height="64px" viewBox="0 0 24 24" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>                  
                  </span>)
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