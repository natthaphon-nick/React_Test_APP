import React, { Fragment, useEffect, useState } from 'react';
import { GetItems, GetItems2, GetCart, PostCart, DeleteCart, Postitem, Loading } from '../Global/FuncAPI';
import { Link, useLocation } from 'react-router-dom'

const Cart = () => {
    const [loaded, setloading] = useState(false);
    const [data, setData] = useState(null);
    const [stock, setstock] = useState(null);
    const [cart, setCart] = useState(null);
    const [input, setInput] = useState({
        Cart_ID: 0,
        product_ID: "",
        product_Name: "",
        Price: 0,
        Unit: 0
    });
    useEffect(() => {
        ItemsList();
    }, []);

    const ItemsList = () => {
        GetCart().then(res => {
            setData(res.data);
        });
        GetItems().then(data => {
            setstock(data.data);
        })
    }

    const Edit = (p) => {
        setInput({
            Cart_ID: p.cart_ID,
            product_ID: p.product_ID,
            product_Name: p.product_Name,
            Price: parseInt(p.price),
            Unit: p.unit
        })
    }
    console.log(input)

    let restest;
    let result;
    let sum;
    var datastock = ({});

    const Save = () => {
        GetItems2(input.product_ID).then(data2 => {
            if (data2.status === 200) {
                

                data.map((t) => {if(t.product_ID === input.product_ID){  result = t.unit; }}) 

                restest = data2.data[0].unit + result;


                if (restest >= input.Unit) {
                    sum = restest - input.Unit
                    datastock = ({
                        product_ID: Number(input.product_ID),
                        product_Name: input.product_Name,
                        Price: String(input.Price),
                        Unit: sum
                    });

                    PostCart(input).then(res => {
                        Postitem(datastock).then(res1 => {
                            if (res1.status === 200) {
                                window.alert("Success!");
                                ItemsList();
                            }
                        });
                    });
                }else{
                    window.alert("สินค้าคงเหลือไม่พอ!");
                    ItemsList();
                }
            }

        });


    }

    const removeCart = (p) => {
        GetItems2(p.product_ID).then(data => {
            let restest = data.data[0].unit;

            var param = ({
                product_ID: parseInt(p.product_ID),
                product_Name: p.product_Name,
                Price: String(p.price),
                Unit: p.unit + restest
            });

            if (p.cart_ID !== null) {
                Postitem(param).then(res => {
                    if (res.status === 200) {
                        ItemsList();
                    }
                });
                DeleteCart(p.cart_ID).then(res => {
                    if (res.status === 200) {
                        window.alert("Success!");
                        ItemsList();
                    }
                });
            }
        });
    }

    const DelAll = (data) => {
        if (data != null) {
            setloading(true);
            setTimeout(() => {

                data.forEach((p, index) => {
                    GetItems2(p.product_ID).then(data => {
                        let restest = data[0].unit;

                        var param = ({
                            product_ID: parseInt(p.product_ID),
                            product_Name: p.product_Name,
                            Price: String(p.price),
                            Unit: p.unit + restest
                        });
                        Postitem(param).then(res => {
                            DeleteCart(p.cart_ID).then(res => {

                            });
                        });
                    })
                });
                setloading(false)
            }, 12000);
        }

    }

    return (
        <>
            <section>
                <div className="form-group">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            {loaded ? <Loading /> :
                                <table responsive className="table table-striped-columns">
                                    <thead>
                                        <th>รหัสสินค้า</th>
                                        <th>ชื่อสินค้า</th>
                                        <th>ราคาสินค้า/บาท</th>
                                        <th>จำนวนสินค้า</th>
                                        <th></th>
                                        <th></th>
                                    </thead>
                                    {data && data.map((p, index) => {
                                        return (
                                            <tbody>
                                                <td>{p.product_ID}</td>
                                                <td>{p.product_Name}</td>
                                                <td>{p.price}</td>
                                                <td>{p.unit}</td>
                                                <td><button className='btn btn-success text-dark' onClick={() => { Edit(p) }} data-bs-toggle="modal" data-bs-target="#exampleModal" >Edit</button></td>
                                                <td><button className='btn btn-danger text-dark' onClick={() => { removeCart(p) }}>Delete</button></td>
                                            </tbody>
                                        );
                                    })}
                                </table>
                            }
                        </div>
                    </div>
                </div>

                <button className='btn btn-danger' onClick={() => { DelAll(data) }}>Delete All</button>
                <Link className="btn btn-outline-Success me-2" to="/Checkbill">Checkbil</Link >
            </section>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Cart</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-sm-3">
                                        <span>รหัสสินค้า : </span>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <label className='text-center text-dark'>{input.product_ID}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-sm-3">
                                        <span>ชื่อสินค้า : </span>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <label className='text-center text-dark'>{input.product_Name}</label>

                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-sm-3">
                                        <span>ราคาสินค้า : </span>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <label className='text-center text-dark'>{input.Price}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-sm-3">
                                        <span>จำนวนสินค้า : </span>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={input.Unit}
                                            onChange={(e) => { setInput({ ...input, Unit: Number(e.target.value) }) }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <input
                                className="form-control"
                                type="text"
                                value={input.Cart_ID}
                                hidden
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className='btn btn-success' onClick={() => { Save() }} data-bs-dismiss="modal" >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cart;