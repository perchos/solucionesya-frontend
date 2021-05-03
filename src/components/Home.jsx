import axios from 'axios';
import Header from './Header';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { DOMAIN, GET_POSTS_URL } from '../utils/constants';
import '../assets/styles/Home.css';

const LIMIT = 16;

const initialPaginationState = {
  hasMore: false,
  page: 1,
  limit: LIMIT,
};

const Home = () => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(initialPaginationState);

  const getAll = async (reset) => {
    let page;
    if (reset) {
      page = 1;
    } else {
      page = pagination.page;
    }

    const options = {
      params: {
        limit: LIMIT,
        page,
        category,
        location,
        search,
      },
    };
    try {
      const res = await axios.get(GET_POSTS_URL, options);
      if (res.status === 200) {
        const json = await res.data;
        if (json.data) {
          if (reset) setPosts(json.data.docs);
          else setPosts([...posts, ...json.data.docs]);

          let hasMore;

          if (json.data.hasNextPage) hasMore = true;
          else hasMore = false;

          const paginationObj = {
            ...pagination,
            page: pagination.page + 1,
            hasMore,
          };

          if (reset) paginationObj.page = 2;

          setPagination(paginationObj);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al traer la información',
      });
    }
  };

  useEffect(() => {
    getAll();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header
        setCategory={setCategory}
        setLocation={setLocation}
        setSearch={setSearch}
        getAll={getAll}
      />
      {posts && (
        <Container className="my-4 text-center">
          <InfiniteScroll
            dataLength={posts.length}
            next={getAll}
            hasMore={pagination.hasMore}
            loader={<h4>Loading...</h4>}
            className="d-flex flex-wrap justify-content-around"
          >
            {posts.map((post) => (
              <Card key={post._id} className="my-4" style={{ width: '18rem' }}>
                <Link to={`/post/${post._id}`} className="text-dark">
                  <Card.Header>
                    <Card.Title>{post.title}</Card.Title>
                  </Card.Header>
                  <Card.Img variant="top" src={`${DOMAIN}/${post.images[0]}`} />
                  <Card.Body>
                    <Card.Text>{post.desc}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            ))}
          </InfiniteScroll>
        </Container>
      )}
    </>
  );
};

export default Home;
