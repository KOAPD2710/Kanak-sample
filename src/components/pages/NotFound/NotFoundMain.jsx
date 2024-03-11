import './NotFoundMain.scss';
import { Image } from 'astro:assets';
import cn from 'clsx';
import React, { useEffect, useState } from 'react';

import Item from "./Item"
import Title from './Title';
import Button from './Button';

function NotFoundBody(props) {
    console.log('Run Script');

    useEffect(() => {
        console.log('Run Script');
        setTimeout(() => {
            window.location.pathname = '/404'
        })
    })

    return (
        <section title='NotFound' className='notfound'>
            <div className="container">
                <div className="grid">
                    <Item
                        clone="15"
                        image1={props.image1}
                        image2={props.image2}
                        image3={props.image3}
                        image4={props.image4}
                        image5={props.image5}
                    >
                    </Item>
                    <Title
                        className="opps"
                    ></Title>
                    <Button className="back"></Button>
                    <Item
                        clone="1"
                        mainItem={props.number4}
                        className="number-1"
                    ></Item>
                    <Item
                        clone="1"
                        mainItem={props.mainbowl}
                        className="mainbowl"
                    ></Item>
                    <Item
                        clone="1"
                        mainItem={props.number4}
                        className="number-2"
                    ></Item>
                </div>
            </div>
        </section>
    )
}

export default NotFoundBody;