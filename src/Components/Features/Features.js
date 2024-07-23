import Carousel from 'react-bootstrap/Carousel';
import card1 from './images/card1.jpg';
import card2 from './images/card2.jpg';
import card3 from './images/card3.jpg';
import './Features.css';
// import background from './images/background.png'
function Features() {
    return (
        <>
            <div className='features-container'>
                {/* <h2>UNCOVER OUR <br/>HIGHLIGHTS</h2> */}
                <Carousel className='card carousel carousel-dark slide'>
                    <Carousel.Item className='items'>
                        <img className='bg-image' src={card1} alt="First slide" />
                        <Carousel.Caption  className='desc'>
                            <h3>Discover Recipes</h3>
                            <p>Find tailored recipes based on the ingredients you have on hand, making meal planning easier and reducing food waste effortlessly.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='bg-image' src={card3} alt="Second slide" />

                        <Carousel.Caption className='desc'>
                            <h3>Ingredients Delivered Right to You </h3>
                            <p>Have missing ingredients delivered to your doorstep in minutes, ensuring you can complete any recipe without interruption.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='bg-image' src={card2} alt="Third slide" />

                        <Carousel.Caption  className='desc'>
                            <h3>Craft and Share Your Dishes</h3>
                            <p>Share your culinary masterpieces by uploading your own recipes, making them available for the entire community to enjoy.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    );
}

export default Features;