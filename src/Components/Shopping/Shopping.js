import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Shopping.css';
import fruits from './Images/fruits.jpg';
import milk from './Images/milk.jpg';
import grocery from './Images/grocery.jpg';
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaPlayCircle } from "react-icons/fa";

function Shopping() {
  return (
      <div className='shopping-container'>
          <h2>Pure, Fresh Produce</h2>
    <CardGroup className='shopping-card'>
      <Card className='individual-cards'>
        <Card.Img variant="top" src={milk} />
        <Card.Body>
          <Card.Title>Dairy Products</Card.Title>
          <Card.Text>
          Discover fresh dairy like milk, cheese, and yogurt, delivered right to your door with quality.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <a href="#shopping" className="text-muted"><small className="text-muted">Shop Now</small><IoIosArrowRoundForward className='shop-icon'/></a>
        </Card.Footer>
      </Card>
      <Card  className='individual-cards'>
        <Card.Img variant="top" src={fruits} />
        <Card.Body>
          <Card.Title>Fruits and Vegetables</Card.Title>
          <Card.Text>
          Shop fresh, high-quality fruits and vegetables. Enjoy seasonal produce and essentials delivered straight to your door.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <a href="#shopping" className="text-muted"><small className="text-muted">Shop Now</small><IoIosArrowRoundForward className='shop-icon' /></a>
        </Card.Footer>
      </Card>
      <Card  className='individual-cards'>
        <Card.Img variant="top" src={grocery}/>
        <Card.Body>
          <Card.Title>Pantry Staples</Card.Title>
          <Card.Text>
          Enjoy having top-quality ingredients including pasta, rice, and spices in minutes.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <a href="#shopping" className="text-muted"><small className="text-muted">Shop Now</small><IoIosArrowRoundForward className='shop-icon'/></a>
        </Card.Footer>
      </Card>
    </CardGroup>
<<<<<<< Updated upstream
    <button class="explore">Explore More<FaPlayCircle className='arrowicon2'/></button>
=======
    <button class="explore"><span>Explore More</span></button>
>>>>>>> Stashed changes
    </div>
  );
}

export default Shopping;