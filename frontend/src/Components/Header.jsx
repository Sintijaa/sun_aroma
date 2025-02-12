import React from 'react';
import '../style/Header.css'; // Pievienojam atsevišķu CSS failu

function Header() {
  return (
    <header className="header">
      <div className="marquee">
        <p>Bezmaksas piegāde pirkumiem, sākot no 50€</p>
        <p>Bezmaksas piegāde Cēsu apkārtnē</p>
        <p>Bezmaksas piegāde pirkumiem, sākot no 50€</p>
        <p>Bezmaksas piegāde Cēsu apkārtnē</p>
        <p>Bezmaksas piegāde pirkumiem, sākot no 50€</p>
      </div>
    </header>
  );
}

export default Header;
