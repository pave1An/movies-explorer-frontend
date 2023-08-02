import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__list">
        <li>
          <h3 className="about-project__header">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="about-project__header">На выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__time-line">
        <p className="about-project__time-line-body">1 неделя</p>
        <p className="about-project__time-line-body">4 недели</p>
        <p className="about-project__time-line-caption">Back-end</p>
        <p className="about-project__time-line-caption">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
