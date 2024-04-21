import React from "react";

function Footer() {
  return (
    <footer className="footer footer-center p-4 border-t border-accent border-dashed hover:border-solid transition duration-500 ease-out">
      <aside>
        <p>
          <a
            rel="nofollow"
            target="_blank"
            href="https://gitlab.com/shivendratechster/go-ecommerce"
          >
            Backend
          </a>
          of this project is built with Go and
          <a rel="nofollow" target="_blank" href="#">
            Frontend
          </a>
          Next by
          <a
            target="_blank"
            className="underline"
            rel="me"
            href="https://shivendra.dev"
          >
            Shivendra TechSter
          </a>
          .
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
