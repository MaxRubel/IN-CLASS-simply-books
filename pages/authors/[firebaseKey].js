/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState(
    { books: [{ image: 'https://th-thumbnailer.cdn-si-edu.com/umUS4APtI6rVF-E166nd-dupmRA=/800x800/filters:focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg' }] },
  );
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then((data) => {
      setAuthorDetails(data);
    });
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          {authorDetails.books.length > 0 && (
          <img
            width={300}
            src={authorDetails.books[0].image}
            alt={authorDetails.firebaseKey}
            style={{ width: '300px' }}
          />
          )}
          <div className="mt-5">
            <i id="edit" className="fas fa-edit btn btn-info" />
            <i id="delete" className="btn btn-danger fas fa-trash-alt" />
          </div>
        </div>
        <div className="text-white ms-5 details">
          <h5>{authorDetails.first_name} {authorDetails.last_name}</h5>
          Author Email: <a href="hey">{authorDetails.email}</a>
          <p>{authorDetails.description || ''}</p>
        </div>
      </div>
      <div>
        <button type="button" id="authorBack" className="btn btn-light">Back</button>
      </div>
    </>
  );
  // {authorDetails.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}
}
