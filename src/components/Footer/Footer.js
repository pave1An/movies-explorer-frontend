import './Footer.css';

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__bottom">
        <p className="footer__year">{`© ${year}`}</p>
        <ul className="footer__links-list">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/pave1An" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
