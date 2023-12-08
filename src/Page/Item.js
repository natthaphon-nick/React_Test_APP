import React, { Fragment, useEffect, useState } from 'react';
import { GetItems, PostCart, Postitem } from '../Global/FuncAPI';

const Item = () => {
    useEffect(() => {
        ItemsList();
    }, []);

    const ItemsList = () => {
        GetItems().then(res => {
            setData(res.data);
        });
    }


    const [data, setData] = useState(null);
    const [cart, setCart] = useState(null);



    const AddCart = (p) => {
        if (p.unit == 0) {
            window.alert("สินค้าหมด");
        } else {

            setCart({
                Cart_ID: 0,
                product_ID: String(p.product_ID),
                product_Name: p.product_Name,
                Price: parseInt(p.price),
                Unit: 1
            })

            var datastock = ({
                product_ID: p.product_ID,
                product_Name: p.product_Name,
                Price: p.price,
                Unit: p.unit - 1
            });

            if (cart !== null) {
                PostCart(cart).then(res => {
                    if (res.status === 200) {
                        Postitem(datastock).then(re => {
                            window.alert("Success!");
                            ItemsList();
                        });
                    }
                });
            }
        }

    }

    return (
        <Fragment>
            <header class="header text-white bg-primary">
                <div class="container ">
                </div>
            </header>

            <section>
                <div className="form-group">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <table responsive className="table table-striped-columns">
                                <thead>
                                    <th>รหัสสินค้า</th>
                                    <th>ชื่อสินค้า</th>
                                    <th>ราคาสินค้า/บาท</th>
                                    <th>จำนวนสินค้า</th>
                                    <th></th>
                                </thead>
                                {data && data.map((p, index) => {
                                    return (
                                        <tbody>
                                            <td>{p.product_ID}</td>
                                            <td>{p.product_Name}</td>
                                            <td>{p.price}</td>
                                            <td>{p.unit}</td>
                                            <td><button className='btn btn-primary' onClick={() => { AddCart(p) }}>เพิ่มสินค้าลงตะกร้า</button></td>
                                        </tbody>
                                    );
                                })}
                            </table>

                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
export default Item;