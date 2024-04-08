import styles from "./navbar.css";

export default function Home() {
  document.addEventListener('DOMContentLoaded', function() {
    const navBar = document.createElement('nav');
    navBar.id = 'navbar';
  
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo';
    const logoImg = document.createElement('img');
    logoImg.src = 'path-to-your-logo.png';
    logoImg.alt = 'Logo';
    logoDiv.appendChild(logoImg);
  
    const navLinks = document.createElement('ul');
    navLinks.id = 'nav-links';
  
    const links = [
        { href: '/', text: 'Home' },
        { href: '/about', text: 'About' },
        { href: '/my-pets', text: 'My Pets' },
        { href: '/trade-pets', text: 'Trade Pets' },
        { href: '/logout', text: 'Log Out' }
    ];
  
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        navLinks.appendChild(li);
    });
  
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'nav-toggle';
    toggleBtn.innerText = '☰';
    toggleBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
  
    navBar.appendChild(logoDiv);
    navBar.appendChild(navLinks);
    navBar.appendChild(toggleBtn);
  
    document.body.insertBefore(navBar, document.body.firstChild);
  });
  
  return (
    <div>
      <h1>Navbar</h1>
    </div>
  );
}
