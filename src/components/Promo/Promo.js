import './Promo.css';
import earth from '../../images/promo-earth.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <img className="promo__image" src={earth} alt="изображение планеты Земля" />
        <h1 className="promo__header">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__info">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
      <a className="promo__link" href="#about-project">Узнать больше</a>
    </section>
  );
}

export default Promo;
