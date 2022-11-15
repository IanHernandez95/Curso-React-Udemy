import { useState } from "react";
import PropTypes from 'prop-Types'

export const AddCategory = ({ onNewCategory }) => {

    const [inputValue, setinputValue] = useState('')

    const onInputChange = ({ target }) =>{
        setinputValue(target.value);
    }
    
    const onSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim().length <= 1) return;

        onNewCategory(inputValue.trim())
        setinputValue('')

        
    }


    return (
        <form onSubmit={ onSubmit } aria-label='form'>
            <input
                type='text'
                placeholder='Buscar Gifs'
                value={ inputValue }
                onChange={ onInputChange }
            />
        </form>
    )
};

AddCategory.propTypes = {
    onNewCategory: PropTypes.func.isRequired,
}