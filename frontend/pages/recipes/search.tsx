// TODO - test loader
//  TODO - test recipesToDisplay param of DisplayRecipes is getting passed
//  TODO - test component without renders recipes

import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import DisplayRecipes from '../../components/recipes/DisplayRecipes';
import Loader from 'react-loader-spinner';
import { recipeSearchAction } from '../../redux/actions/recipe';

const recipeSearch = () => {
    const dispatch = useDispatch();
    const [flavorType, setFlavorType] = useState({
        flavor_type: 'Sour',
    });
    const { recipeSearchedListData } = useSelector((state) => state.recipeReducer);
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
        <div data-testid='recipeSearch'>
            <form onSubmit={(e) => onSubmit(e)}>
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
                {recipeSearchedListData ? <DisplayRecipes recipesToDisplay={recipeSearchedListData} /> : null}
            </form>
        </div>
    );
};

export default connect()(recipeSearch);
