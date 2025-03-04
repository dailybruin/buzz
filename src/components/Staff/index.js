import React, { useState, useEffect } from "react";
import { getStaff, deleteMember, stingMember, postMember } from "../../services/api";
import { CreateTable } from "../Shared/Table";
import { AddMember } from "./AddMember";

const StingText = `🐝 Buzzzzz

You've been stung to update something on Buzz! Take a look at https://buzz.dailybruin.com.`;

export const StaffList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const tagline = (someone) => {
    if (someone.twitter && someone.twitter !== "") {
      return `Email ${someone.lastName} at ${someone.slug}@dailybruin.com or tweet @${someone.twitter}.`;
    }
    return `Email ${someone.lastName} at ${someone.slug}@dailybruin.com.`;
  };

  const transformData = (rawData) => {
    return rawData.map((x) => ({
      _id: x._id,
      name: `${x.firstName} ${x.lastName}`,
      position: x.position || "",
      twitter: x.twitter || "",
      tagline: tagline(x)
    }));
  };

  const sting = (someone) => {
    stingMember(someone._id);
  };

  useEffect(() => {
    getStaff().then((res) => {
      const transformedData = transformData(res);
      setData(transformedData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <h1>Staff List</h1>
      <AddMember />
      {CreateTable(
        data,
        ["name", "position", "twitter", "tagline"],
        deleteMember,
        undefined,
        () => stingMember(StingText)
      )}
    </>
  );
};