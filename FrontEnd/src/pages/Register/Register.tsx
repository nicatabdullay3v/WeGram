import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import "./Register.scss"
import { infinity } from 'ldrs'
import 'ldrs/ring'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate()
    infinity.register()
    const [loading, setloading] = useState(true)
    useEffect(() => {
        localStorage.removeItem("user")
        setTimeout(() => {
            setloading(false)
        }, 660);
    }, [])
    // Formik--=-=-=-=-=-=-=-=-=-==
    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO7m4pK3zl2CogYw_9WbVJo4yxkb5wC8dDYf3VtgDv6w&s",
            followers: [],
            followings: [],
            surname: "",
            blockList: [],
            stories: [],
            notifications: [],
            password: "",
            bio: [],
            isPublic: true,
            posts: [],
            email: '',
            requests: []

        },
        onSubmit: (values, { resetForm }) => {
            axios.post("http://localhost:3001/users", values).then((res) => {
                console.log(res);

                if (res.status == 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Ugurla qediyyatdan kecdiz",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                    }, 1000);
                    navigate('/')
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Bele Email Var",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    resetForm()
                }

            })
        },
    });
    return (
        <>
            {loading ? <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} className="loading">
                <l-infinity
                    size="100"
                    stroke="6"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.3"
                    color="#ad99da"
                ></l-infinity>
            </div> : <section id='register'>
                <div className="stars">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                </div>
                <div className="container">
                    <div className="register">
                        <div className="register_left">
                            <div className="register_left_text">
                                <h1>WeGram</h1>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet nulla voluptatum eligendi, illo pariatur unde nostrum rem debitis vero neque adipisci in reiciendis explicabo expedita sed eaque eius odio saepe?
                                </p>
                            </div>
                        </div>
                        <div className="register_right">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="register_box">
                                    <h1>WeGram Register</h1>
                                    <input id="outlined-basic"
                                        placeholder='name'
                                        className='reg_input'
                                        name="name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name} />
                                    <input id="outlined-basic"
                                        placeholder='username'
                                        className='reg_input'
                                        name="username"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.username} />
                                    <input id="outlined-basic"
                                        placeholder='email'
                                        className='reg_input'
                                        name="email"
                                        type="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email} />
                                    <input id="outlined-basic"
                                        placeholder='password'
                                        className='reg_input'
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password} />
                                    <Button type='submit' className='button' variant="contained">Sign Up</Button>
                                    <p>Have an account? <span onClick={() => {
                                        navigate('/')
                                    }}>Sign In</span></p>
                                    <p>Get The App</p>

                                    <div className="apps">
                                        <div className="google">
                                            <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="" />
                                        </div>
                                        <div className="apple">
                                            <img src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png" alt="" />

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>}

        </>
    )
}

export default Register