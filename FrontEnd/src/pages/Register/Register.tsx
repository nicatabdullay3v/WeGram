import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import "./Register.scss"
import { infinity } from 'ldrs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'ldrs/ring'
import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate()
    infinity.register()
    // useState=-==-=-=-=-=-=
    const [loading, setloading] = useState(true)
    // useeffect=-=--=--=--=--
    useEffect(() => {

        if (localStorage.getItem("user-info")) {
            navigate("/home")
        }
        setTimeout(() => {
            setloading(false)
        }, 660);
    }, [])
    // Formik--=-=-=-=-=-=-=-=-=-==
    const validationSchema = Yup.object({
        username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(5, 'Password must be at least 5 characters').matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-z]).{5,}$/, 'Password must contain at least one uppercase letter, one symbol, and one lowercase letter').required('Password is required'),
        gender: Yup.string().required('Gender is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            surname: "",
            password: "",
            isPublic: true,
            email: '',
            confirmPassword: '',
            gender: "male",

        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {


 
     axios.post("http://localhost:3001/api/auth/signup", values).then((res) => {
        console.log(res);
        toast.success('You have successfully registered', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(() => {
            navigate('/')
        }, 1000);
        localStorage.setItem("user-info", JSON.stringify(res.data))
    }).catch((err) => {
        console.log(err);

        resetForm()

            if (values.password !=values.confirmPassword) {
                toast.error('not same password', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else{
                toast.error('There is already such a email', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
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
                <ToastContainer />
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
                                        placeholder='username'
                                        className='reg_input'
                                        name="username"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.username} />
                                    {formik.touched.username && formik.errors.username ? (
                                        <div className="error-message">{formik.errors.username}</div>
                                    ) : null}
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
                                           {formik.touched.password && formik.errors.password ? (
                                        <div className="error-message">{formik.errors.password}</div>
                                    ) : null}
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