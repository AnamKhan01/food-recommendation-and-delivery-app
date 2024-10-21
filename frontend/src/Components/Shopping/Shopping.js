import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Shopping.css';
import fruits from './Images/fruits.jpg';
import milk from './Images/milk.jpg';
import grocery from './Images/grocery.jpg';
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Shopping({ selectedCategory, onCategorySelect }) {

  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/grocery-home');
    window.scrollTo({ top: 0, behavior: 'instant' }); 
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(category); 
    navigate('/grocery-home', { state: { category } }); 
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  
  

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });  
  }, []);

  const categories = [
    { title: 'Dairy Products', name: 'dairy', img: milk, text: 'Discover fresh dairy like milk, cheese, and yogurt, delivered right to your door with quality.' },
    { title: 'Fruits and Vegetables', name: 'fruits and vegetables', img: fruits, text: 'Shop fresh, high-quality fruits and vegetables. Enjoy seasonal produce and essentials delivered straight to your door.' },
    { title: 'Pantry Staples', name: 'pantry staples', img: grocery, text: ' Enjoy having top-quality ingredients including pasta, rice, and spices in minutes.' }
  ];


  return (
    <div className='shopping-container'>
      <h2>Pure, Fresh Produce</h2>
      <CardGroup className='shopping-card'>
        {categories.map(category => (
          <Card className='individual-cards' key={category.name}>
            <Card.Img variant="top" src={category.img} />
            <Card.Body>
              <Card.Title>{category.title}</Card.Title>
              <Card.Text>
                {category.text}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <p onClick={() => handleCategoryClick(category)} className="text-muted">
                <small className="text-muted">Shop Now</small>
                <IoIosArrowRoundForward className='shop-icon' />
              </p>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
      <button className="explore" onClick={handleExploreClick}><span>Explore More</span></button>
      
    </div>
  );
}

export default Shopping;
