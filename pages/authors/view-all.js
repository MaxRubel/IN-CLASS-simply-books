/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { getAuthors } from '../../api/authorData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewAuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const { user } = useAuth();

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getAuthors(user.uid).then((data) => {
      const sortedData = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
      setAuthors(sortedData);
    });
  }, []);

  return (
    <div className="authors-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {authors.map((author) => (
        <div
          key={author.firebaseKey}
          className="card"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '18rem',
            margin: '1%',
          }}
        >
          <div className="card-body">
            <h5 className="card-title" style={{ textAlign: 'center' }}>{author.first_name} {author.last_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted" style={{ textAlign: 'center' }}>{author.email}</h6>
            <button type="button" id={`view--${author.firebaseKey}`} className="btn btn-success">View</button>
            <button type="button" id={`edit--${author.firebaseKey}`} className="btn btn-info">Edit</button>
            <button type="button" id={`delete--${author.firebaseKey}`} className="btn btn-danger">Delete</button>
          </div>
          <img src="https://www.freeiconspng.com/uploads/favourite-icon-27.png" alt="" width="50" style={{ cursor: 'pointer', width: '50' }} />
        </div>
      ))}
    </div>
  );
}
