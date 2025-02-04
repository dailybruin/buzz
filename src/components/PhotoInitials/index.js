import React, { useState, useEffect } from 'react';
import { CreateTable } from '../Shared/Table';
import { getMultimedia } from '../../services/api';

const PhotoInitials = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMultimedia();
      const transformedData = res.map(x => ({
        _id: x._id,
        name: `${x.firstName} ${x.lastName}`,
        initials: x.initials || "",
        position: x.position || "",
      }));
      setData(transformedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <h1>Photo Initials</h1>
      {CreateTable(data, ["initials", "name", "position"])}
    </>
  );
};

export default PhotoInitials;
