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

const Categories = ({ onCategorySelect, selectedCategory }) => {  
  
  const cardData = [
    { img: vegetable, title: 'Fruits & Vegetables', text: 'Fresh & chemical free', name: 'fruits and vegetables' },
    { img: flour, title: 'Pantry Staples', text: 'Good quality essentials', name: 'pantry staples' },
    { img: meat, title: 'Chicken, Meat & Fish', text: 'Variety of meat', name: 'meat' },
    { img: milk, title: 'Eggs, Milk & Dairy', text: 'Farm fresh', name: 'dairy' },
    { img: snacks, title: 'Snacks & Breads', text: 'Artisanal baked goods', name: 'breads' },
    { img: oil, title: 'Masala & Oils', text: 'Aromatic & infused items', name: 'masala and oil' },
    { img: sauces, title: 'Sauces & Spread', text: 'Flavourful condiments', name: 'sauces' },
    { img: tea, title: 'Tea, Coffee & Drinks', text: 'Brewery and energising', name: 'beverages' }
  ];

  const handleCategoryClick = (card) => {
    if (selectedCategory && selectedCategory.name === card.name) {
      onCategorySelect(null); 
    } else {
      onCategorySelect(card); 
    }
  };

  return (
    <div className="categories-container">
      <div className="categories-cards">
        {cardData.map((card, index) => (
          <div 
            className={`category-card ${selectedCategory && selectedCategory.name === card.name ? 'selected' : ''}`} 
            key={index} 
            onClick={() => handleCategoryClick(card)} 
          >
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
