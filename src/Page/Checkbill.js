import React, { Fragment, useEffect, useState } from 'react';
import { Report } from '../Global/FuncAPI';

const Checkbil = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        Report().then(res => {
            setData(res.data[0]);
            console.log(res.data[0])
        });
    }, []);
    return (
        <Fragment>
            <header class="header text-dark">
                <div class="container ">
                    <h1 className='display-4 font-weight-bold'>ยอดรวมทั้งหมด : {data && data.total} บาท</h1>
                </div>
            </header>
        </Fragment>
    );
}
export default Checkbil;