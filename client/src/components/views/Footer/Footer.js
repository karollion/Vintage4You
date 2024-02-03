
const Footer = () => {
  
  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
  }

    return (
      <footer className='footer mt-auto py-3'>
        <p className='text-center text-secondary'>
          Copyright &copy; NoticeBoardApp {getDate()}. Create by: 
          <a href='https://karol-bernatowicz-portfolio.replit.app/'  target="_blank" title="Karol Bernatowicz home page"  rel="noreferrer">Karol Bernatowicz</a>
        </p>
      </footer>
    );
};

export default Footer;