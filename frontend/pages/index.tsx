import React, { useRef, useState } from 'react';

const HomePage = () => {
    const buttonsRef = useRef() as any;
    const onClick = (e) => {
        if (e.target.name === 'subscribed') {
            buttonsRef.current.children[0].className = 'active';
            buttonsRef.current.children[1].className = '';
        }
        if (e.target.name === 'for you') {
            buttonsRef.current.children[0].className = '';
            buttonsRef.current.children[1].className = 'active';
        }
    };

    return (
        <div className='home-page'>
            <ul className='recipe_checkbox-filters'>
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
            <ul className='subscribed-for-you' ref={buttonsRef} onClick={onClick}>
                <button className='active' name='subscribed'>
                    Subscribed
                </button>
                <button name='for you'>For You</button>
            </ul>
        </div>
    );
};

export default HomePage;
