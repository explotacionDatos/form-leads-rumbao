import React from "react";

const Footer = () => {
  return (
    <footer className="footer-ctnr">
      <div className="footer">
        <div className="footer__logo">
          {" "}
          <img src="/src/assets/nova-logo.png" alt="" />
        </div>
        <div className="footer__logo">
          {" "}
          <img src="/src/assets/logo_custometric_cuadrado-2.png" alt="" />
        </div>
      </div>
      <p className="footer-ctnr__copyright">
        © CUSTOMETRIC. Todos los derechos reservados. No se permite la
        distribución sin autorización de CUSTOMETRIC
      </p>
    </footer>
  );
};

export default Footer;
