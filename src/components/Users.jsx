import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DOMAIN } from "../utils/constants";
import Logo from '../assets/img/consejo.svg'

const cookies = new Cookies();
const url = DOMAIN;

function Users(props) {
  const [isLogged, setIsLogged] = useState(cookies.get ? true : false);

  const [user, setUser] = useState({ data: {} });

  const [posts, setPosts] = useState([]);

  const toCheck = props.match.params.userId

  const isUser = (cookies.get('userId') === toCheck) 

  function getUser() {
    Axios.get(`${url}/users/${props.match.params.userId}`)
      .then((res) => {
        setUser({ ...res.data.data });
      })
      .catch((err) => {
        console.log(props.match.params.userId);
        setUser({ data: {} });
        props.history.push("/login");
      });
  }

  function getPublishes() {
    Axios.get(`${url}/users/posts/${props.match.params.userId}`)
      .then((res) => {
        setPosts(res.data.data[0].posts);
        ///console.log(res.data.data[0].posts);
      })
      .catch((err) => {
        setPosts([]);
      });
  }

  function delPublishes(postId) {
    console.log("entre");
    Axios.delete(`${url}/api/posts/${postId}`).then((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Eliminado Correctamente",
        showConfirmButton: false,
        timer: 1000,
      });
      getPublishes();
    });
  }

  useEffect(() => {
    getUser();
    getPublishes();
  }, []);

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to={`/`}>
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top mx-2"
            alt=""
          />
          Soluciones YA!
        </Link>
      </nav>
      <div className="overflow-auto">
        <div className="m-5 d-flex flex-wrap">
          <div className="col-md-8 p-3 m-2 bg-white rounded">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-user"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="card-body spacing-su-inner text-center">
                  <div className="W-100 d-flex justify-content-center">
                    <img
                      className="rounded-circle"
                      width="250"
                      src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                      alt=""
                    />
                  </div>
                  <h3 className="my-4">{user.userName}</h3>
                  <h4 className="text-muted">{user.email}</h4>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="nav-publish"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                {posts.map((post) => {
                  console.log(post);
                  return (
                    <div key={post._id} className="card mb-3">
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img
                            width="200"
                            height="150"
                            src={`${url}/${post.images[0]}`}
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <div className="d-flex">
                              <div className="col-md-9">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.desc}</p>
                              </div>
                              <div className="col-md-1">
                                <Link
                                  className="btn btn-success mb-3"
                                  to={`/post/${post._id}`}
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </Link>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => delPublishes(post._id)}
                                >
                                  <span aria-hidden="true">
                                    <FontAwesomeIcon icon={faTrash} />
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-md-3 p-3 m-2 bg-white rounded">
            <div className="card-body spacing-su-inner">
              <h5 className="card-title text-center mt-3">Detalles</h5>
              <div className="list-group" id="list-tab" role="tablist">
                <a
                  className="list-group-item list-group-item-action border active my-1"
                  id="nav-user-btn"
                  data-toggle="tab"
                  href="#nav-user"
                  role="tab"
                  aria-controls="nav-user"
                  aria-selected="true"
                >
                  Mi perfil
                </a>
                <a
                  className="list-group-item list-group-item-action border my-2"
                  id="nav-publish-btn"
                  data-toggle="list"
                  href="#nav-publish"
                  role="tab"
                  aria-controls="nav-publish"
                >
                  Mis Publicaciones
                </a>

                { isUser && <Link
                  className="list-group-item list-group-item-action border my-2"
                  id="nav-create-btn"
                  to={`/publishes`}
                >
                  Crear Publicacion
                </Link>}
                <Link
                  className="list-group-item list-group-item-action border my-2"
                  id="nav-create-btn"
                  to={`/`}
                >
                  Regresar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
