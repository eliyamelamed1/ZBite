// TODO - test loader
// test form calls onSubmit
// test onSubmit dispatch action
// test loading

import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import Loader from 'react-loader-spinner';
import { recipeSearchAction } from '../../redux/actions/recipe';

const recipeSearch = () => {
    const dispatch = useDispatch();
    const [flavorType, setFlavorType] = useState({
        flavor_type: 'Sour',
    });

    const { flavor_type } = flavorType;

    const [loading, setLoading] = useState(false);

    const onChange = (e) => setFlavorType({ ...flavorType, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            dispatch(recipeSearchAction({ flavor_type }));
        } catch (e) {
            // TODO - display err msg
        }
        setLoading(false);
    };

    return (
        <div data-testid='RecipeSearch'>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <div>
                        <div>
                            <label htmlFor='flavor_type'>Choose Flavor</label>
                            <select name='flavor_type' onChange={(e) => onChange(e)} value={flavor_type}>
                                <option value='Sour'>Sour</option>
                                <option>Sweet</option>
                                <option>Salty</option>
                            </select>
                        </div>

                        <div>
                            {loading ? (
                                <div>
                                    <Loader type='Oval' color='#424242' height={50} width={50} />
                                </div>
                            ) : (
                                <button type='submit'>Search</button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default connect()(recipeSearch);
