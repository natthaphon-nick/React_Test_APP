import axios from 'axios';
const apiUrl = 'http://localhost:5000/api/Shop/';

export async function GetItems(productid) {
    let data = [];
    let url = apiUrl + "listitem";
    if (productid == null || productid == "") {
        url += '';
    }
    else {
        url += "?productID=" + productid;
    }
    await axios.request({
        method: 'GET',
        url: url
    }).then(res => {
        data = res;
    })
        .catch(error => {
            data = error.response;
        })
    return data;
}

export async function GetItems2(productid) {
    let data = [];
    let url = apiUrl + "listitem";
    if (productid == null || productid == "") {
        url += '';
    }
    else {
        url += "?productID=" + productid;
    }
    await axios.request({
        method: 'GET',
        url: url
    }).then(res => {
        data = res;
    })
        .catch(error => {
            data = error.response;
        })
    return data;
}

export async function Report() {
    let data = [];
    let url = apiUrl + "report";
    await axios.request({
        method: 'GET',
        url: url
    }).then(res => {
        data = res;
    })
        .catch(error => {
            data = error.response;
        })
    return data;
}

export async function Postitem(dataInput) {
    let data;
    await axios.request({
        method: 'POST',
        url: apiUrl + "editItem",
        data: dataInput
    }).then(res => {
        data = res;
    })
        .catch(error => {
            data = error.response;
        })
    return data;
}

export async function GetCart() {
    let data = [];
    let url = apiUrl + "cart";
    await axios.request({
        method: 'GET',
        url: url
    }).then(res => {
        data = res;
    })
        .catch(error => {
            data = error.response;
        })
    return data;
}

export async function PostCart(dataInput) {
    let data;
    await axios.request({
        method: 'POST',
        url: apiUrl + "editcart",
        data: dataInput
    }).then(res => {
        data = res;
    })
        .catch(error => {
            data = error.response;
        })
    return data;
}




export async function DeleteCart(cartid) {
    let data = [];
    await axios.request({
        method: 'delete',
        url: apiUrl + cartid,
    })
        .then(res => {
            data = res.status;
        })
        .catch(error => {
            data = error.response;
        });
    return data;
}


export const Loading = () => (
    <div className="form-group">
        <div className="row">
            <div className="col-lg-12">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

);
