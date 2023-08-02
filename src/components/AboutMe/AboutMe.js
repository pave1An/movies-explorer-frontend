import './AboutMe.css';
import avatar from '../../images/about-me-avatar.png';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <article className="about-me__content">
        <img className="about-me__avatar" src={avatar} alt="фотография автора проекта" />
        <h3 className="about-me__name">Виталий</h3>
        <h4 className="about-me__job">Фронтенд-разработчик, 30 лет</h4>
        <p className="about-me__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ.
          У меня есть жена и дочь. Я люблю слушать музыку,
          а ещё увлекаюсь бегом. Недавно начал кодить.
          С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб&#8209;разработке, начал заниматься
          фриланс&#8209;заказами и ушёл с постоянной работы.
        </p>
        <a className="about-me__link" href="https://github.com/pave1An/" target="_blank" rel="noreferrer">Github</a>
      </article>
    </section>
  );
}

export default AboutMe;
