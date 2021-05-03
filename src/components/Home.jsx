import '../assets/styles/Home.css';
import axios from 'axios';
import Header from './Header';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Swal from 'sweetalert2';
import { Container, Row, CardGroup, Card } from 'react-bootstrap';
import { GET_POST_URL } from "../utils/constants"

const LIMIT = 16;

const DOMAIN = 'http://localhost:5000';

const Home = () => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    hasMore: false,
    page: 1,
    limit: LIMIT,
  });

  const getAll = async () => {
    const options = {
      params: {
        limit: LIMIT,
        page: pagination.page,
        category,
        location,
        search,
      },
    };
    try {
      const res = await axios.get(`${DOMAIN}/api/posts`, options);
      if (res.status === 200) {
        const json = await res.data;
        if (json.data) {
          setPosts([...posts, ...json.data.docs]);
          let hasMore;
          if (json.data.hasNextPage) hasMore = true;
          else hasMore = false;
          setPagination({
            ...pagination,
            page: pagination.page + 1,
            hasMore,
          });
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
        <Container className='my-4 text-center'>
          <InfiniteScroll
            dataLength={posts.length}
            next={getAll}
            hasMore={pagination.hasMore}
            loader={<h4>Loading...</h4>}
            className='d-flex flex-wrap justify-content-around'
          >
            {posts.map((post) => (
              <Card key={post._id} className='my-4' style={{ width: '18rem' }}>
                <Link to={`/post/${post._id}`} className='text-dark'>
                  <Card.Header>
                    <Card.Title>{post.title}</Card.Title>
                  </Card.Header>
                  <Card.Img variant='top' src={`${DOMAIN}/${post.images[0]}`} />
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
