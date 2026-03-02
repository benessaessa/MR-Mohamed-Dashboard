import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer p-4">
      <div className="container-fluid pt-4">
        <div className="row justify-content-between">
          <div className="col-lg-6 col-md-6">
            <img src="/images/logo.png" alt="img" height="65px" />
            <p className="pt-4 smallText">
              منصة تعليمية تهدف الي تعليم الطلاب بأحدث الطرق الحديثة وابسطها
            </p>
          </div>
          <div className="col-lg-2 col-md-5">
            <p className="smallText mb-2">تواصل معنا من خلال</p>
            <p className="socials">
              <a className="text-decoration-none px-1" href="" target="_blank" rel="noreferrer">
                <i className="fab fs-4 fa-facebook-square"></i>
              </a>
              <a className="text-decoration-none px-1" href="" target="_blank" rel="noreferrer">
                <i className="fab fs-4 fa-whatsapp"></i>
              </a>
              <a className="text-decoration-none px-1" href="" target="_blank" rel="noreferrer">
                <i className="fab fs-4 fa-youtube-square"></i>
              </a>
              <a className="text-decoration-none px-1" href="" target="_blank" rel="noreferrer">
                <i className="fab fs-4 fa-instagram"></i>
              </a>
            </p>
          </div>
        </div>
        <div className="row border-top mt-4 linkFooter border-secondary justify-content-between text-start">
          <div className="col-lg-6 col-md-5">
            <p className="pt-3 d-none d-md-block">جميع الحقوق محفوظة &copy;
              <a href="https://www.facebook.com/mohamed.essa.abdelhamead/">Mohamed Essa</a>
            </p>
          </div>
          <div className="col-lg-5 col-md-6 pt-3">
            <div className="d-flex justify-content-end">
              <div>
                <a className="text-decoration-none px-2" href="/privacy-policy">الخصوصية</a>
                <a className="text-decoration-none px-2" href="/terms">الشروط والأحكام</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
