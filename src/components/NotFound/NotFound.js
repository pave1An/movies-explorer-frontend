import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1, { replace: true });
  return (
    <section className="not-found">
      <h2 className="not-found__header">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <button type="button" className="not-found__back-button" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}

export default NotFound;
