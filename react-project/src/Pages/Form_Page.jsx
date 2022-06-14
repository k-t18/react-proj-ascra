import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Form_Page.css';

const FormPage = () => {
    const nav = useNavigate();

    useEffect(() => {
        const getToken = localStorage.getItem('uniqueID');
        if (!getToken) {
            nav('/login');
        }
    })


    const [loginerr, setloginerr] = useState(false);
    const [success, setsuccess] = useState(false);

    const [values, setvalues] = useState({
        companyName: "",
        fullname: "",
        email: "",
        address: "",
        contact: "",
        gender: "",
        bank: "",
        cust_type: "",
        territory: ""
    });


    const show = async (e) => {
        e.preventDefault();
        // console.log(values.fullname);
        const config = {
            header:
            {
                "Content-Type": "application/json"
            }
        }


        try {
            await axios.post(`http://localhost:3001/data/${values.fullname}`, { email: values.email, address: values.address, contact: values.contact, bank: values.bank, cust_type: values.cust_type, gender: values.gender, territory: values.territory }, config)
                .then(res => {
                    console.log(res);
                    if (res.data.status === 404) {
                        setloginerr(!loginerr);
                    }
                    if (res.data.data.hasOwnProperty('owner')) {
                        setsuccess(!success);
                    }
                })
                .catch(err => console.log(err))

        } catch (error) {
            console.log(error)
        }
    }

    const listing_page = (e) => {
        e.preventDefault();
        nav('/');
    }

    const changeHandler = (e) => {
        e.preventDefault();
        setvalues({
            ...values,
            [e.target.name]: e.target.value
        })

    };

    const backHome = (e) => {
        e.preventDefault();
        nav('/');
    }

    return (
        <>

            <div id="main">

                <div id="form_page_section1">
                    <h2>Form Page :</h2>
                    <button id="home" onClick={backHome}>Home Page</button>
                </div>


                <div id="form_page_section2">

                    <form onSubmit={show}>

                        <div class="row">

                            <div class="col-md-6">

                                <div class="inp_fields_div">
                                    <label htmlFor="companyName" className="label-fields">Company Name</label>

                                    <select name="companyName"
                                        value={values.companyName}
                                        onChange={changeHandler} className="select-fields">
                                        <option value="8848 Digital LLP">8848 Digital LLP</option>
                                        <option value="Wayne Enterprises">Wayne Enterprises</option>
                                        <option value="Showbiz Pizza Place">Showbiz Pizza Place</option>
                                        <option value="Pro Garden Management">Pro Garden Management</option>
                                        <option value="The Lawn Guru">The Lawn Guru</option>
                                    </select>
                                </div>

                                <div class="inp_fields_div">
                                    <label htmlFor="fullName" className="lxl-fields">Name :</label>
                                    <input type="text"
                                        className="inp-fields"
                                        name="fullname"
                                        value={values.fullname}
                                        onChange={changeHandler}
                                    />
                                </div>



                                <div class="inp_fields_div">
                                    <label htmlFor="email" className="lxl-fields">Email ID</label>
                                    <input type="email"
                                        className="inp-fields"
                                        name="email"
                                        value={values.email}
                                        onChange={changeHandler}
                                        required
                                    />
                                </div>



                                <div class="inp_fields_div">
                                    <label htmlFor="gender" className="lxl-fields">Gender</label>
                                    <select name="gender" value={values.gender} className="select-fields" onChange={changeHandler}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div className="inp_fields_div" class="d-flex ms-5">
                                    <label htmlFor="address" className="label-fields">Address</label>
                                    <div id="address-field">

                                        <textarea rows={4} cols={55} name="address" value={values.address} onChange={changeHandler}></textarea>
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-6">

                                <div class="inp_fields_div">
                                    <label htmlFor="contact" className="label-fields"> Contact Number</label>
                                    <input type="text"
                                        className="inp-fields"
                                        name="contact"
                                        value={values.contact}
                                        onChange={changeHandler} />
                                </div>

                                <div class="inp_fields_div">
                                    <label htmlFor="bank" className="lbl-fields">Bank</label>
                                    <select name="bank"
                                        value={values.bank}
                                        onChange={changeHandler} className="select-fields">
                                        <option value="Goldman Sachs">Goldman Sachs</option>
                                        <option value="Citigroup Inc">Citigroup Inc</option>
                                        <option value="Wells Fargo">Wells Fargo</option>
                                        <option value="Bank of America">Bank of America</option>
                                        <option value="HDFC">HDFC</option>
                                    </select>
                                </div>

                                <div class="inp_fields_div">
                                    <label htmlFor="cust_type" className="label-fields">Customer Type</label>
                                    <select class="ms-5" name="cust_type"
                                        value={values.cust_type}
                                        onChange={changeHandler} className="select-fields">
                                        <option value="Company">Company</option>
                                        <option value="Individual">Individual</option>
                                    </select>
                                </div>

                                <div class="inp_fields_div">
                                    <label htmlFor="territory" className="ltl-fields">Territory</label>
                                    <select name="territory"
                                        value={values.territory}
                                        onChange={changeHandler} className="trt-fields">
                                        <option value="East">East</option>
                                        <option value="West">West</option>
                                        <option value="North">North</option>
                                        <option value="South">South</option>
                                    </select>
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    {loginerr ? <h6 style={{ color: "red" }}>Please Check your Name again</h6> : " "}
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    {success ? <h6 style={{ color: "blue" }}>   Values Updated Successfully</h6> : " "}
                                </div>

                                <div id="btn-sect">

                                    <div id="btn-visit-div">
                                        {success ? <button id="btn-visit" onClick={listing_page}>Visit Client List</button> : " "}
                                    </div>
                                    <div id="btn-div">
                                        <button onClick={show} id="btn">Save</button>
                                    </div>
                                </div>



                            </div>

                        </div>






                    </form>



                </div>
            </div>


        </>

    )

}
export default FormPage;