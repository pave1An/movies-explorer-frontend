import './Promo.css';
import { Link } from 'react-router-dom';
import earth from '../../images/promo-earth.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <img className="promo__image" src={earth} alt="изображение планеты Земля" />
        <h1 className="promo__header">
          {
          'Учебный проект студента факультета \u000AВеб-разработки.'
          }
        </h1>
        <p className="promo__info">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
      <Link className="promo__link" to="/">Узнать больше</Link>
    </section>
  );
}

export default Promo;
