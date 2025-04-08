// import React from "react";
// import { getStaff, deleteMember, stingMember, patchMember } from "../../services/api";
// import { CreateTable } from "../Shared/Table";
// import { AddMember } from "./AddMember";
// import { DeleteConfirm } from "./DeleteConfirm";
// import { EditMemberForm } from "./EditMemberForm";

// const StingText = `🐝 Buzzzzz

// You’ve been stung to update something on Buzz! Take a look at https://buzz.dailybruin.com.`;

// export class StaffList extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       loading: true,
//       confirmOpen: false,
//     confirmMember: null
//     };
//     this.transformData = this.transformData.bind(this);
//     this.tagline = this.tagline.bind(this);
//     this.sting = this.sting.bind(this);
//     this.openConfirm   = this.openConfirm.bind(this);
//  this.closeConfirm  = this.closeConfirm.bind(this);
//   this.handleDelete  = this.handleDelete.bind(this);
//   this.handlePatch = this.handlePatch.bind(this);
//   this.fetchData = this.fetchData.bind(this);
//   }

//   fetchData() {
//     getStaff().then(res => {
//       this.setState({
//         data: this.transformData(res),
//         loading: false
//       });
//     });
//   }

//   componentDidMount() {
//     this.fetchData();
//   }

//   tagline(someone) {
//     if (someone.twitter && someone.twitter!="") {
//       return `Email ${someone.lastName} at ${someone.slug}@dailybruin.com or tweet @${someone.twitter}.`
//     }
//     return `Email ${someone.lastName} at ${someone.slug}@dailybruin.com.`
//   }

//   transformData(data) {
//     return data.map(x => ({
//       _id: x._id,
//       slug:    x.slug,
//       name: `${x.firstName} ${x.lastName}`,
//       position: x.position || "",
//       twitter: x.twitter || "",
//       tagline: this.tagline(x)
//     }))
//   }

//   sting(someone) {
//     stingMember(someone._id);
//   }

//   openConfirm(id) {
//     // find the member object so we can show its name in the modal
//     const member = this.state.data.find(m => m._id === id);
//     this.setState({ confirmOpen: true, confirmMember: member });
//   }
  
//   closeConfirm() {
//     this.setState({ confirmOpen: false, confirmMember: null });
//   }
  
//   handleDelete() {
//     // only now do we call the API
//     deleteMember(this.state.confirmMember._id)
//       .then(() => {
//         this.closeConfirm();
//         this.fetchData();
//       })
//       .catch(err => {
//         console.error(err);
//         alert("Delete failed");
//         this.closeConfirm();
//       });
//   }
  

//   handlePatch(id, updatedFields) {
//     // find the slug for this row
//     const member = this.state.data.find(m => m._id === id);
//     if (!member) {
//       return Promise.reject(new Error("Member not found"));
//     }
  
//     // call your curried helper
//     return patchMember(member.slug)(updatedFields)
//       .then(({ data, status }) => {
//         // update local table
//         this.setState(state => ({
//           data: state.data.map(m =>
//             m._id === id
//               ? this.transformData([data])[0]  // re‑transform the single updated member
//               : m
//           )
//         }));
//         return { data, status };
//       });
//   }

//   render() {
//     if (this.state.loading) {
//       return null;
//     }

//     return (
//       <>
//         <h1>Staff List</h1>
//         {/* {CreateTable(this.state.data, ["name", "position", "twitter", "tagline"], deleteMember, this.handlePatch, undefined)} */}
//         <CreateTable
//           data={this.state.data}
//           columns={["name", "position", "twitter", "tagline"]}
//           // deleteFunction={id =>
//           //      deleteMember(id).then(() =>
//           //        getStaff().then(res =>
//           //          this.setState({ data: this.transformData(res) })
//           //        )
//           //     )
//           //    }
//           deleteFunction={this.openConfirm} 
//           editFunction={this.handlePatch}
//           stingFunction={undefined}
//         />
//         {this.state.confirmOpen && (
//        <DeleteConfirm
//           memberName={this.state.confirmMember.name}
//           onCancel={this.closeConfirm}
//           onConfirm={this.handleDelete}
//         />
//       )}
//         <AddMember />
//       </>
//     )
//   }
// }

// src/components/Staff/StaffList.jsx
import React from "react";
import {
  getStaff,
  deleteMember,
  stingMember,
  patchMember
} from "../../services/api";
import { CreateTable } from "../Shared/Table";
import { AddMember } from "./AddMember";
import { DeleteConfirm } from "./DeleteConfirm";
import { EditMember } from "./EditMember";

const StingText = `🐝 Buzzzzz

You’ve been stung to update something on Buzz! Take a look at https://buzz.dailybruin.com.`;

export class StaffList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,

      // delete‐confirm
      confirmOpen: false,
      confirmMember: null,

      // edit‐form
      editingMember: null,
      editForm: {
        firstName: "",
        lastName: "",
        initials: "",
        position: "",
        twitter: "",
        multimedia: false
      }
    };

    // bind methods
    this.fetchData    = this.fetchData.bind(this);
    this.openConfirm  = this.openConfirm.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.openEdit     = this.openEdit.bind(this);
    this.cancelEdit   = this.cancelEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitEdit   = this.submitEdit.bind(this);

    this.handleSting  = this.handleSting.bind(this);
    this.handlePatch  = this.handlePatch.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getStaff().then(res => {
      this.setState({
        data: this.transformData(res),
        loading: false
      });
    });
  }

  transformData(raw) {
    return raw.map(x => ({
      _id:        x._id,
      slug:       x.slug,
      firstName:  x.firstName,
      lastName:   x.lastName,
      initials:   x.initials   || "",
      position:   x.position   || "",
      twitter:    x.twitter    || "",
      multimedia: x.multimedia || false,
      name:       `${x.firstName} ${x.lastName}`,
      tagline:    this.tagline(x)
    }));
  }

  tagline(m) {
    if (m.twitter) {
      return `Email ${m.lastName} at ${m.slug}@dailybruin.com or tweet @${m.twitter}.`;
    }
    return `Email ${m.lastName} at ${m.slug}@dailybruin.com.`;
  }

  // — Delete confirm flow —
  openConfirm(id) {
    const member = this.state.data.find(m => m._id === id);
    this.setState({ confirmOpen: true, confirmMember: member });
  }
  closeConfirm() {
    this.setState({ confirmOpen: false, confirmMember: null });
  }
  handleDelete() {
    deleteMember(this.state.confirmMember._id)
      .then(() => {
        this.closeConfirm();
        this.fetchData();
      })
      .catch(err => {
        console.error(err);
        alert("Delete failed");
        this.closeConfirm();
      });
  }

  // — Sting —
  handleSting(id) {
    stingMember(StingText)(id)
      .then(() => alert("Sting sent!"))
      .catch(err => {
        console.error(err);
        alert("Failed to sting");
      });
  }

  // — Inline table patch (unused now, but kept) —
  handlePatch(id, updatedFields) {
    const member = this.state.data.find(m => m._id === id);
    if (!member) return Promise.reject("Member not found");
    return patchMember(member.slug)(updatedFields)
      .then(({ data }) => {
        this.fetchData();
      });
  }

  // — Edit form flow —
  openEdit(id) {
    const m = this.state.data.find(x => x._id === id);
    this.setState({
      editingMember: m,
      editForm: {
        firstName:  m.firstName,
        lastName:   m.lastName,
        initials:   m.initials,
        position:   m.position,
        twitter:    m.twitter,
        multimedia: m.multimedia
      }
    });
  }
  cancelEdit() {
    this.setState({ editingMember: null });
  }
  handleChange(e) {
    const { name, type, value, checked } = e.target;
    this.setState(st => ({
      editForm: {
        ...st.editForm,
        [name]: type === "checkbox" ? checked : value
      }
    }));
  }
  submitEdit(e) {
    e.preventDefault();
    const { editingMember, editForm } = this.state;
    this.handlePatch(editingMember._id, editForm)
      .then(() => this.setState({ editingMember: null }))
      .catch(err => {
        console.error(err);
        alert("Update failed");
      });
  }

  render() {
    const {
      data,
      loading,
      confirmOpen,
      confirmMember,
      editingMember,
      editForm
    } = this.state;
    if (loading) return null;

    return (
      <>
        <h1>Staff List</h1>

        {editingMember && (
          <EditMember
            member={editingMember}
            formValues={editForm}
            onChange={this.handleChange}
            onCancel={this.cancelEdit}
           onSubmit={this.submitEdit}
          />
        )}

        <CreateTable
          data={data}
          columns={["name", "position", "twitter", "tagline"]}
          deleteFunction={this.openConfirm}
          editFunction={this.openEdit}
          stingFunction={undefined}
        />

        {confirmOpen && (
          <DeleteConfirm
            memberName={confirmMember.name}
            onCancel={this.closeConfirm}
            onConfirm={this.handleDelete}
          />
        )}

        <AddMember onMemberAdded={this.fetchData} />
      </>
    );
  }
}
