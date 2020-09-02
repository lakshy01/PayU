import React from 'react';

class App extends React.Component {

    payumoney = () => {

        const makeid = (length) => {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        let txnid = makeid(2);

        let pd = {
            key: 'sU7hGkFk',
            txnid: txnid,
            amount: 10,
            firstname: 'Lakshy',
            email: 'rastogilakshy01@gmai.com',
            phone: 8920654112,
            productinfo: 'Shipping',
            surl: 'http://localhost:8000/api/success',
            furl: 'http://localhost:8000/api/fail',
            hash: ''
        };

        let data = {
            'txnid': pd.txnid,
            'email': pd.email,
            'amount': pd.amount,
            'productinfo': pd.productinfo,
            'firstname': pd.firstname
        };

        fetch('http://localhost:8000/api/payment/payumoney', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((a) => {
            return a.json();
        }).then((json) => {
            pd.hash = json['hash'];
            this.redirectToPayU(pd);
        })
    }

    redirectToPayU = (pd) => {
        window.bolt.launch(pd, {
            responseHandler: (response) => {
                console.log(response);
                fetch('http://localhost:8000/api/payment/payumoney/response', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(response.response)
                }).then((a) => {
                    return a.json();
                }).then((json) => {
                    console.log(json);
                });
            },
            catchException: (response) => {
                console.log(response)
            }
        });
    }


    render() {
        return (
            <div>
                {this.payumoney()}
            </div>
        );
    }

}

export default App;