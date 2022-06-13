const express = require('express');
const axios = require('axios')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello');
})

app.get('/test', async (req, res) => {
    var config = {
        method: 'get',
        url: 'http://work.8848digitalerp.com/api/resource/Client',
        headers: {
            'Authorization': 'token 6de39bbdb1da4ec:40d5ae49cdd75bc',
            'Content-Type': 'application/json'

        },
    };
    try {
        await axios(config)
            .then(response => res.send(response.data))
            .catch(err => console.log(err))

    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    console.log(req.query.usr);
    console.log(req.query.pwd);
    var config = {
        method: 'post',
        url: `http://work.8848digitalerp.com/api/method/work.api.login.get_access_api_token?usr=${req.query.usr}&pwd=${req.query.pwd}`,
        headers: {
            'Cookie': 'sid=Guest'
        }
    };

    try {
        await axios(config)
            .then(response =>
                res.send(response.data))
            .catch(err => {
                res.send(err)
                console.log(err)
            })

    } catch (error) {
        console.log(error);
    }


})

app.post('/data/:cli', async (req, res) => {
    console.log(req.params.cli)


    var data = JSON.stringify({
        "email": req.body.email,
        "address": req.body.address,
        "mobile_no": req.body.contact,
        "bank": req.body.bank,
        "customer_type": req.body.cust_type,
        "territory": req.body.territory,
        "gender": req.body.gender
    });
    var config = {
        method: 'put',
        url: `http://work.8848digitalerp.com/api/resource/Client/${req.params.cli}`,
        headers: {
            'Authorization': 'token 6de39bbdb1da4ec:40d5ae49cdd75bc',
            'Content-Type': 'application/json',
            'Cookie': 'full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image='
        },
        data: data
    };

    try {
        await axios(config)
            .then(response => {
                console.log(response.data);
                res.send(response.data)
            })
            .catch(err => {

                console.log(err)
                res.send(err)
            })

    } catch (error) {
        console.log(error);
    }


})

app.listen(3001, () => {
    console.log(`Server Running at PORT 3001`)
})