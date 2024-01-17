/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAuthors } from '../../api/authorData';
import { useAuth } from '../../utils/context/authContext';
import AuthorCard from '../../components/AuthorCard';

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

  const getAllAuthors = () => {
    getAuthors(user.uid).then((data) => {
      const sortedData = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
      setAuthors(sortedData);
    });
  };

  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3%', marginBottom: '2%',
      }}
      >
        <Link href="/authors/new" passHref>
          <Button type="button">Add Author</Button>
        </Link>
      </div>
      <div className="authors-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
        ))}
      </div>
    </>
  );
}
