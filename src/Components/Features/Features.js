import Carousel from 'react-bootstrap/Carousel';
import card1 from './images/card1.jpg';
import card2 from './images/card2.jpg';
import card3 from './images/card3.jpg';
import './Features.css';

function Features() {
    return (
        <>
            <div className='features-container'>
                
                {/* <h2>FEATURES THAT DEFINE US</h2> */}
                <div className='line-effect'>
                    <div className='line line-1'></div>
                    <div className='line line-2'></div>
                    <div className='line line-3'></div>
                    <div className='line line-4'></div>
                    <div className='line line-5'></div>
                    <div className='line line-6'></div>
                    <div className='line line-7'></div>
                    <div className='line line-8'></div>
                    <div className='line line-9'></div>
                </div>
                <Carousel className='img-container carousel carousel-dark slide'>
                    <Carousel.Item className='items'>
                        <img className='bg-image' src={card1} alt="First slide" />
                        <Carousel.Caption className='desc'>
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

                        <Carousel.Caption className='desc'>
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