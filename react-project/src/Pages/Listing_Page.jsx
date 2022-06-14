import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Listing_Page.css';
import Group from '../resources/Group2.png';
import Img from '../resources/img.jpg';


const ListingPage = () => {

    let [users, setusers] = useState([]);
    let [client, setclient] = useState([]);
    var client_name = "Bruce Wayne";
    const nav = useNavigate();

    const getToken = localStorage.getItem('uniqueID');

    if (!getToken) {
        nav('/login');
    }


    useEffect(() => {
        const getList = async () => {
            try {
                await axios.get('http://localhost:3001/test')
                    .then(res => {
                        setusers(users = [...res.data.data])
                        console.log(users);


                    })
                    .catch(err => console.log(err))

            } catch (error) {
                console.log(error);
            }
        }

        const getCli = async () => {
            try {
                await axios.post(`http://localhost:3001/data/${client_name}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.status === 404) {
                            console.log("err")
                        }
                        if (res.data.data.hasOwnProperty('owner')) {
                            console.log('success');
                            setclient(client = [res.data.data])
                            console.log(client);
                            console.log(client[0].owner)
                        }
                    })
                    .catch(err => console.log(err))

            } catch (error) {
                console.log(error)
            }
        }
        getList();
        getCli();
    }, [])

    const getClient = async (e) => {
        e.preventDefault();
        console.log(e.target.parentElement.children[0].innerText);
        client_name = e.target.parentElement.children[0].innerText;
        const config = {
            header:
            {
                "Content-Type": "application/json"
            }
        }
        // console.log(values.email, values.companyName, values.gender, values.cust_type, values.territory);
        // { email: values.email, address: values.address, contact: values.contact, bank: values.bank, cust_type: values.cust_type, gender: values.gender, territory: values.territory }, config

        try {
            await axios.post(`http://localhost:3001/data/${client_name}`)
                .then(res => {
                    console.log(res);
                    if (res.data.status === 404) {
                        console.log("err")
                    }
                    if (res.data.data.hasOwnProperty('owner')) {
                        console.log('success');
                        setclient(client = [res.data.data])
                        console.log(client);
                        console.log(client[0].owner)
                    }
                })
                .catch(err => console.log(err))

        } catch (error) {
            console.log(error)
        }

    }

    const redirect_form = (e) => {
        e.preventDefault();
        nav('/form');
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        nav('/login');
    }

    return (
        <>
            <div>

                <div id="nav">
                    <div id="nav-section-1">
                        <div id="logo-div" >
                            <img src={Group} width={60} height={60} alt="Ascra Tech Logo" />
                        </div>
                        <div id="name-div">
                            <h3>Ascra Tech</h3>
                        </div>

                    </div>

                    <div id="nav-section-2">

                        <div id="logout-btn_div">
                            <button id="logout-btn" onClick={logout}>Logout</button>
                        </div>


                    </div>

                </div>

                <div id="client_main">

                    <div style={{ margin: '2em', display: "flex", justifyContent: 'space-between' }}>
                        <h1>Client List : </h1>
                        <button id="update" onClick={redirect_form}>Update Client</button>
                    </div>

                    <div id="clients">

                        <div id="clients-list">
                            {users.map((item) => {
                                return (
                                    <div key={item.name} id="list-users">

                                        <div>
                                            <img src={Img} width={25} height={25} alt="user" />
                                        </div>

                                        <div id="user-info">
                                            <p>{item.name}</p>
                                            <button id="user-btn" onClick={getClient}>Know More</button>

                                        </div>



                                    </div>
                                )
                            })}
                        </div>

                        <div id="individual-client">
                            {client.map((item) => {
                                return (
                                    <div key={item.name}>
                                        <div id="avtaar_div">

                                            <img src={Img} width={100} height={100} alt="user" />

                                        </div>

                                        <div id="general_info">
                                            <h4>General Info :</h4>
                                            <p>{item.name}</p>
                                            <p>{item.mobile_no}</p>
                                            <p>{item.gender}</p>
                                        </div>
                                        <div id="banking-info">
                                            <div style={{ marginLeft: "2.5em" }}>
                                                <h4>Banking Info :</h4>
                                            </div>
                                            <div id="details">

                                                <p> Email : {item.email}</p>
                                                <p>Address : {item.address}</p>
                                                <p>Territory : {item.territory}</p>
                                                <p>Customer Type : {item.customer_type}</p>
                                                <p>Bank : {item.bank}</p>






                                            </div>
                                        </div>
                                        <div></div>
                                    </div>
                                )
                            })}

                        </div>


                    </div>

                </div>


            </div>
        </>
    )
}

export default ListingPage;