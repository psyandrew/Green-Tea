import { useNavigate } from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate();
  
  function HeaderLinks({ str, func }) {
    return (
    <h3 onClick={func}>
      {str}
    </h3>
  );
}

  function toPage(openLink) {
    navigate(openLink);
  }

  function toSection(section) {
    const sectionId = document.getElementById(section);
    if (sectionId ) {
      sectionId.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  return(
        <nav className="header-home">
          <span className ="hLinks font-montserrat-bold ">
            <span className="brandName">
              <i className="fas fa-leaf fa-4x" style={{color: "#61aa55"}}></i>
              <h1>TAGATAY TEA</h1>
            </span>
            <span className ='navLinks'>         
              <HeaderLinks str ={'SELECTIONS'}  func= {() => toSection('selection')} />
              <HeaderLinks str ={'ABOUT US'}  func= { () =>toSection('aboutus')} />
              <HeaderLinks str ={'SHOP'}  func= {() =>toPage('/catalogue')} />
              <HeaderLinks str ={'CONTACTS'}  func= { () =>toSection('contact')} />

            </span>
          </span>
         </nav>
  )
}
