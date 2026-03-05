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



export const CreateTable = (data, columns, deleteFunction, editFunction, patchFunction) => (
  <div className="tableWrapper">
    <Table className="responsiveTable">
      <Thead>
        <Tr>
          {columns.map(({key,label}, idx) => (
           <Th key={`col-${key}`}>
             {label.includes(" ")
               ? label.split(" ").map((word, i) => (
                   <React.Fragment key={i}>
                     {word}
                     <br />
                   </React.Fragment>
                 ))
               : label}
           </Th>
         ))}


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
    
        const firstCol = columns.length > 0 ? columns[0].key : null;
        const valA = firstCol && a[firstCol] ? String(a[firstCol]).toLowerCase() : "";
        const valB = firstCol && b[firstCol] ? String(b[firstCol]).toLowerCase() : "";

        
    
        return valA.localeCompare(valB);
      })
      .map((item, index) => {
        return (
          <Tr className="tableRows" key={index}>
            {columns.map(({key, label}) => {
              const value = item[key];
              try {
                if (key === "link" && value) {
                  return (
                    <Td key={`${key}-${value}`} data-label={label} className="linkCol">
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
                else if (key === "slug" || key === "referText" && value) {
                  return (
                  <Td key={`${key}-${value}`} data-label={label} className={key === "referText" ? "referTextCol" : key === "slug" ? "slugCol" : undefined}>
                    {value} 
                    <button onClick={() => navigator.clipboard.writeText(value)} style={{ marginLeft: '2px',backgroundColor: "white", color: "black" }}>
                    <FaRegCopy/>
                    </button>
                  </Td>)
                }
                //change yes to checkbox
                else if (key === "placed" || key === "opinionated") {
                  const checked = value === true || value === "true";
                  const isOpinionated = key === "opinionated";
                  const canToggle = !!patchFunction && item._id;

                  return (
                    <Td
                      key={`${key}-${index}`}
                      data-label={label}
                      className={isOpinionated ? "opinionatedCol" : undefined}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly={!canToggle}
                        className={`tableCheckbox ${canToggle ? "tableCheckbox--clickable" : ""}`}
                        aria-label={label}
                        onChange={canToggle ? () => {
                          const newValue = !checked;
                          patchFunction(item, key, newValue)
                            .then((res) => {
                              if (res && res.status < 400 && window) {
                                window.location.reload();
                              }
                            })
                            .catch(() => { /* patch failed, page stays as-is */ });
                        } : undefined}
                      />
                    </Td>
                  );
                }
              }
              catch { }
              return (
                <Td
                  key={`${key}-${value}`}
                  data-label={key}
                  className={key === "pullQuote" ? "pullQuoteCol" : "textCol"}
                >
                  {/*NOTE: for now, check if value is not null to handle "art in" always blank*/
                    (value && key === "status") ? (
                      <div className="statusCallout">{value ? value : '\u00A0'}</div>
                    ) : key === "pullQuote" ? (
                      <div className="pullQuoteText">
                        {value ? value : '\u00A0'}
                      </div>
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
