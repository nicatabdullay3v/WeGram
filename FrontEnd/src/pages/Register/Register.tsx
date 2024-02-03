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

        if (localStorage.getItem("user-info")) {
            navigate("/home")
        }
        setTimeout(() => {
            setloading(false)
        }, 660);
    }, [])
    // Formik--=-=-=-=-=-=-=-=-=-==
    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            surname: "",
            password: "",
            isPublic: true,
            email: '',
            confirmPassword: '',
            gender: "",

        },
        onSubmit: (values, { resetForm }) => {

            axios.post("http://localhost:3001/api/auth/signup", values).then((res) => {
                console.log(res);

                if (res.status == 201) {
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
                    localStorage.setItem("user-info",JSON.stringify(res.data))
                    
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
                                    <select
                                        className='reg_input'
                                        name="gender"
                                        onChange={formik.handleChange}
                                        value={formik.values.gender}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>

                                    <input id="outlined-basic"
                                        placeholder='password'
                                        className='reg_input'
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password} />
                                    <input id="outlined-basic"
                                        placeholder='password'
                                        className='reg_input'
                                        name="confirmPassword"
                                        type="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword} />
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