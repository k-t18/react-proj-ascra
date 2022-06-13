import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"
import Group2 from '../resources/Group2.png';

const Login = () => {
    let navigate = useNavigate();
    const [input, setinput] = useState(true);
    const [inputval, setinputval] = useState('password');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loginerr, setloginerr] = useState(false);

    const hideShowPassword = (e) => {
        e.preventDefault();
        if (input) {
            setinputval('text');
            setinput(!input);
        }
        else {
            setinputval('password');
            setinput(!input);
        }

    }



    const postCredentials = async (e) => {
        e.preventDefault();

        const config = {
            header:
            {
                "Content-Type": "application/json"
            }
        }

        try {
            await axios.post(`http://localhost:3001/login?usr=${email}&pwd=${password}`)
                .then(res => {
                    console.log("req sahi hai");
                    console.log(res);
                    if (res.data.message.hasOwnProperty('access_token')) {
                        localStorage.setItem('isAuth', 'true');
                        localStorage.setItem('uniqueID', res.data.message.access_token)
                        navigate('/');
                    }
                    else {
                        console.log('show err');
                        setloginerr(!loginerr)

                    }
                }
                )
                .catch(err => {
                    console.log("error is there")
                    console.log(err)
                })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="login_main_div" >
                <div class="row">
                    <div id="login_section_one" class=" d-none d-sm-block col-md-6">

                        <div className="heading">

                            <h4>Welcome To</h4>
                            {/* <h1 id="login_heading">Ascra Tech</h1> */}
                        </div>

                        <div id="logo">
                            <img src={Group2} width={95} height={95} alt="Ascra Tech Logo" />
                            <h1 id="name">ASCRA TECH</h1>
                        </div>

                        <div id="motto">
                            <p>Our mission is to make your business better through technology</p>
                        </div>


                    </div>

                    <div id="login_section_two" class=" col-md-6 " >

                        <div className="form_main_div">
                            <div id="form_heading">
                                <h2>Get Started</h2>
                            </div>

                            <div className="form_data">
                                <form action="">


                                    <div id="email_div">
                                        <div class="mb-2">
                                            <label htmlFor="email" className="label_field">Email</label>
                                        </div>
                                        <input type="email"
                                            name="email"
                                            id="email_field"
                                            autoComplete="off"
                                            value={email}
                                            onChange={e => setemail(e.target.value)}
                                        />
                                    </div>

                                    <div id="password_div">
                                        <div class="mb-2">
                                            <label htmlFor="password" className="label_field">Password</label>
                                        </div>
                                        <input type={inputval}
                                            name="password"
                                            id="password_field"
                                            autoComplete="off"
                                            value={password}
                                            onChange={e => setpassword(e.target.value)}
                                        />
                                        {input ? <button id="showPass" onClick={hideShowPassword}><i class="fas fa-unlock fa-1x"></i></button> : <button id="showPass" onClick={hideShowPassword}><i class="fas fa-lock fa-1x"></i></button>}
                                    </div>

                                    <div style={{ textAlign: "center" }}>
                                        {loginerr ? <h6 style={{ color: "red" }}>Please Check your credentials again</h6> : " "}
                                    </div>

                                    <div id="login_btn_div">
                                        <button id="login_btn" onClick={postCredentials}>Sign In</button>
                                    </div>



                                </form>
                            </div>


                        </div>
                    </div>

                </div>



            </div>

        </>
    )
}
export default Login