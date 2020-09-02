
const route = require('express').Router();
const jsSHA = require('jssha');

route.post('/payment/payumoney', (req, res) => {
    if (!req.body.txnid || !req.body.amount || !req.body.productinfo || !req.body.firstname || !req.body.email) {
        res.send("Mandatory fields missing");
    } else {
        let pd = req.body;
        let key = 'sU7hGkFk';
        let salt = 'hBmPw8oMhk';
        let hashString = key + '|' + pd.txnid + '|' + pd.amount + '|' + pd.productinfo + '|' + pd.firstname + '|' + pd.email + '|' + '||||||||||' + salt;
        let sha = new jsSHA('SHA-512', "TEXT");
        sha.update(hashString);
        let hash = sha.getHash("HEX");
        res.send({ 'hash': hash });
    }
});

route.get('/success', (req, res) => {
    res.send("Payment completed");
});

route.get('/fail', (req, res) => {
    res.send("Payment failed");
})

route.post('/payment/payumoney/response', (req, res) => {
    let pd = req.body;
    let key = 'sU7hGkFk';
    let salt = 'hBmPw8oMhk';
    let hashString = salt + '|' + pd.status + '||||||||||' + '|' + pd.email + '|' + pd.firstname + '|' + pd.productinfo + '|' + pd.amount + '|' + pd.txnid + '|' + key
    let sha = new jsSHA('SHA-512', "TEXT");
    sha.update(hashString)
    let hash = sha.getHash("HEX");
    // Verify the new hash with the hash value in response
    if (hash == pd.hash) {
        res.send({ 'status': pd.status });
    } else {
        res.send({ 'status': "Error occured" });
    }
})

module.exports = route;