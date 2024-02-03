import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import "./login.scss"
import { infinity } from 'ldrs'
import 'ldrs/ring'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    infinity.register()
    const navigate = useNavigate()
    const [loading, setloading] = useState(true)
    useEffect(() => {
      if (localStorage.getItem("user-info")) {
        navigate('/home')
      }
        setTimeout(() => {
            setloading(false)
        }, 660);
    }, [])

    // Formik--=-=-=-=-=-=-=-=-=-==
    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
    
        },
        onSubmit: values => {
            axios.post("http://localhost:3001/api/auth/login", values,{withCredentials:true,headers:{crossDomain:true,"Content-Type":"application/json"}}).then((res) => {
                console.log(res);
                
                if (res.status === 201) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Xos Geldiz",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    localStorage.setItem("user-info", JSON.stringify(res.data));
            
                    setTimeout(() => {
                        navigate("/home");
                    }, 1000);
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Bele acc yoxdu",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        },
    });
    return (
        <>
            {loading == true ?
                <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} className="loading">
                     <l-infinity
                        size="100"
                        stroke="6"
                        stroke-length="0.15"
                        bg-opacity="0.1"
                        speed="1.3"
                        color="#90EEAF"
                    ></l-infinity> 
                </div> : <section id='login'>
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
                        <div className="login">
                            <div className="login_left">
                                <div className="login_left_text">
                                    <h1>WeGram</h1>
                                    <p>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet nulla voluptatum eligendi, illo pariatur unde nostrum rem debitis vero neque adipisci in reiciendis explicabo expedita sed eaque eius odio saepe?
                                    </p>
                                </div>
                            </div>
                            <div className="login_right">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="login_box">
                                        <h1>Login</h1>
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
                                        <Button type='submit' className='button' variant="contained">Sign In</Button>
                                        <p>Don't have an account? <span onClick={() => {
                                            navigate("/register")
                                        }}>Sign up</span></p>
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

export default Login