import React, { useState } from 'react';
// Mainām importu
import { Link } from '@inertiajs/react';
import '../../style/Meistarklase.css';
import cilveki from '../../assets/cilveki.jpg';
import darbs from '../../assets/darbs.jpg';
import sakums from '../../assets/sakums.jpg';
import process from '../../assets/process.jpg';

function Meistarklase() {
    const images = [
        { src: cilveki, alt: "Cilvēki" },
        { src: darbs, alt: "Darbs" },
        { src: sakums, alt: "Sākums" },
        { src: process, alt: "Process" }
    ];
   
    const [selectedIndex, setSelectedIndex] = useState(null);
   
    const openImage = (index) => {
        setSelectedIndex(index);
    };
   
    const closeImage = () => {
        setSelectedIndex(null);
    };
   
    const nextImage = (e) => {
        e.stopPropagation();
        setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
   
    const prevImage = (e) => {
        e.stopPropagation();
        setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
   
    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (selectedIndex === null) return;
       
        if (e.key === 'ArrowRight') {
            nextImage(e);
        } else if (e.key === 'ArrowLeft') {
            prevImage(e);
        } else if (e.key === 'Escape') {
            closeImage();
        }
    };
   
    // Add event listener for keyboard navigation
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex]);


    return (
      <div className="meistarklase-container">
        <div className="top-left-button">
          {/* Mainām "to" uz "href" Inertia Link komponentam */}
          <Link href="/">
            <button className="button home-button">Sākums</button>
          </Link>
        </div>

        <h1>Galerija</h1>

        <div className="image-gallery">
          {images.map((image, index) => (
            <div className="image-item" key={index} onClick={() => openImage(index)}>
              <img src={image.src} alt={image.alt} />
              <div className="image-hover-info">
                <div className="zoom-indicator">+</div>
              </div>
            </div>
          ))}
        </div>
       
        {selectedIndex !== null && (
          <div className="fullscreen-image" onClick={closeImage}>
            <span className="close-button">&times;</span>
           
            <button className="nav-button prev-button" onClick={prevImage}>&#10094;</button>
            <div className="image-container">
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="image-caption">{images[selectedIndex].alt}</div>
            </div>
            <button className="nav-button next-button" onClick={nextImage}>&#10095;</button>
           
            <div className="navigation-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${selectedIndex === index ? 'active-dot' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                ></span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

export default Meistarklase;