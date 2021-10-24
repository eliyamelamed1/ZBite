import React, { useRef } from 'react';

import classes from '../styles/pages/home.module.scss';

const HomePage = () => {
    const buttonsRef = useRef() as any;
    const onClick = (e) => {
        if (e.target.name === 'subscribed') {
            buttonsRef.current.children[0].className = classes.active;
            buttonsRef.current.children[1].className = '';
        }
        if (e.target.name === 'for you') {
            buttonsRef.current.children[0].className = '';
            buttonsRef.current.children[1].className = classes.active;
        }
    };

    return (
        <div className={classes.container}>
            <ul className={classes.recipe_checkbox}>
                <li>
                    <input type='checkbox' id='gluten-free' />
                    <label htmlFor='gluten-free'>gluten free</label>
                </li>
                <li>
                    <input type='checkbox' id='vegan' />
                    <label htmlFor='vegan'>vegan</label>
                </li>
                <li>
                    <input type='checkbox' id='vegetarian' />
                    <label htmlFor='vegetarian'>vegetarian</label>
                </li>
                <li>
                    <input type='checkbox' id='dietetic' />
                    <label htmlFor='dietetic'>dietetic</label>
                </li>
            </ul>
            <ul className={classes.recipe_filter} ref={buttonsRef} onClick={onClick}>
                <button className={classes.active} name='subscribed'>
                    Subscribed
                </button>
                <button name='for you'>For You</button>
            </ul>
        </div>
    );
};

export default HomePage;
