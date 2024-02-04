import styles from './Footer.module.scss';

const Footer = () => {
  
  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
  }

    return (
      <div className={styles.root}>
        <p>
          Copyright &copy; NoticeBoardApp {getDate()}.  Create by:   
          <a href='https://karol-bernatowicz-portfolio.replit.app/'  target="_blank" title="Karol Bernatowicz home page"  rel="noreferrer">  Karol Bernatowicz</a>
        </p>
      </div>
    );
};

export default Footer;