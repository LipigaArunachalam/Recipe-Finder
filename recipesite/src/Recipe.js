import React from "react";
import './Recipe.css'; // Add your custom styles here

const Recipe = ({ title, calories, image, ingredients }) => {
    return (
        <div className="recipe-card">
            <h3>{title}</h3>
            <img src={image} alt={title} />
            <p>Calories: {Math.round(calories)}</p>
            <h4>Ingredients:</h4>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default Recipe;
