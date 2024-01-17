// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteAuthorBooks } from '../api/mergedData';
import { deleteSingleAuthor } from '../api/authorData';

const AuthorCard = ({ authorObj, onUpdate }) => {
  // const [author, setAuthor] = useState({});

  // useEffect(() => {
  //   setAuthor(authorObj);
  // }, [authorObj]); // Include authorObj in the dependency array

  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name} ${authorObj.last_name}?`)) {
      deleteSingleAuthor(authorObj.firebaseKey)
        .then(() => {
          deleteAuthorBooks(authorObj.firebaseKey)
            .then(() => {
              onUpdate();
            });
        });
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{`${authorObj.first_name} ${authorObj.last_name}`}</Card.Title>
        <Card.Subtitle>{authorObj.email}</Card.Subtitle>
        <Link href={`/authors/${authorObj.firebaseKey}`} passHref>
          <Button variant="success">VIEW</Button>
        </Link>
        <Link href={`/authors/edit/${authorObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" className="m-2" onClick={deleteThisAuthor}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
};

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
