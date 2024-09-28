import React from 'react';
import './Categories.css';  
import vegetable from './Categories Icon/vegetable.png';
import flour from './Categories Icon/flour.png';
import meat from './Categories Icon/meat.png';
import milk from './Categories Icon/milk.png';
import snacks from './Categories Icon/bread.png';
import oil from './Categories Icon/oil.png';
import sauces from './Categories Icon/sauces.png';
import tea from './Categories Icon/tea.png';

const Categories = () => {

  const cardData = [
    { img: vegetable, title: 'Fruits & Vegetables', text: 'Fresh & chemical free' },
    { img: flour, title: 'Pantry Staples', text: 'Good quality essentials' },
    { img: meat, title: 'Chicken, Meat & Fish', text: 'Variety of meat' },
    { img: milk, title: 'Eggs, Milk & Dairy', text: 'Farm fresh' },
    { img: snacks, title: 'Snacks & Breads', text: 'Artisanal baked goods' },
    { img: oil, title: 'Masala & Oils', text: 'Aromatic & infused items' },
    { img: sauces, title: 'Sauces & Spread', text: 'Flavourful condiments' },
    { img: tea, title:'Tea, Coffee & Drinks', text: 'Brewery and energising'}
  ];


  return (
    <div className="categories-container">
      <div className="categories-cards">
        {cardData.map((card, index) => (
          <div className="category-card" key={index}>
            <img src={card.img} className="category-image" alt={card.title} />
            <div className="category-details">
              <h5 className="category-title">{card.title}</h5>
              <p className="category-text">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
