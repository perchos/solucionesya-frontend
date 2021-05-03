import React from "react";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'
import Axios from "axios";
import { LOGOUT_USER } from "../utils/constants";
import Swal from "sweetalert2";

const cookies = new Cookies()
const IsLogin = ({setUser}) => {

    const logOut = () => {
        Axios.post(LOGOUT_USER, {withCredentials: true})
            .then((res) => {
                cookies.remove("userId", {path: "/" });
                setUser(null);
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: "The session can't be closed",
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }

    const userId = cookies.get('userId');
    const toLink = `/user/${userId}`;

    return (
        <>
            <Image src="https://dummyimage.com/40x40/000/fff" roundedCircle />
            <Link to={toLink} >
                <Button variant="outline-success mx-3">Mi perfil</Button>
            </Link>
            <Button variant="outline-danger" onClick={logOut}>Cerrar Sesión</Button>
        </>
    );
};

export default IsLogin;
