"use client";
import Link from "next/link";
import Counter from "./Counter";

const counterData = [
  { id: 1, text: "Years Of Experience", value: "13", valueType: "plus" },
  { id: 2, text: "Project Complete", value: "8", valueType: "k-plus" },
  { id: 3, text: "Client Satisfactions", value: "99", valueType: "percent" },
];

const Hero = () => {
  return (
    <section id="home" className="main-hero-area pt-150 pb-80 rel z-1">
      <div className="container container-1620">
        <div className="row align-items-center">
          <div className="col-lg-4 col-sm-7">
            <div className="hero-content rmb-55 wow fadeInUp delay-0-2s">
              <span className="h2">Hello, i’m </span>
              <h1>
                <b>Roy C. Jones</b> web designer
              </h1>
              <p>We denounce with righteous indignation dislike demoralized by the charms of pleasure</p>
              <div className="hero-btns">
                <Link legacyBehavior href="/contact">
                  <a className="theme-btn">
                    Hire Me <i className="far fa-angle-right" />
                  </a>
                </Link>
                <Link legacyBehavior href="/contact">
                  <a className="read-more">
                    Download Resume <i className="far fa-angle-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-5 order-lg-3">
            <div className="hero-counter-wrap ms-lg-auto rmb-55 wow fadeInUp delay-0-4s">
              {counterData.map((count) => (
                <div className="counter-item counter-text-wrap" key={count.id}>
                  <Counter end={count.value} extraClass={count.valueType} />
                  <span className="counter-title">{count.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="author-image-part wow fadeIn delay-0-3s">
              <div className="bg-circle" />
              <img src="assets/images/hero/me.png" alt="Author" />
              <div className="progress-shape">
                <img src="assets/images/hero/progress-shape.png" alt="Progress" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-lines">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
};
export default Hero;

export const Hero2 = () => {
  return (
    <div id="home" className="hero-area-two pt-150 rel z-2">
      <div className="container rel z-3">
        <div className="hero-two-content">
          <span className="sub-title wow fadeInLeft delay-0-1s">
            <i className="flaticon-asterisk-1" /> UI/UX Designer
          </span>
          <span className="title wow fadeInLeft delay-0-2s">
            Hello <small>i,m</small>
          </span>
          <span className="name wow fadeInRight delay-0-4s">henry gayle</span>
          <span className="designations wow fadeInLeft delay-0-6s">
            <span>Ux</span> Designer
          </span>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <div className="author-image-part wow fadeIn delay-0-3s">
              <div className="bg-circle" />
              <img src="assets/images/hero/hero-two.png" alt="Author" />
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-down">
        <img src="assets/images/hero/scroll-down.png" alt="" />
      </a>
      <div className="bg-lines">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export const Hero3 = () => {
  return (
    <div className="main-hero-area pb-80 rel z-1 hero-3-main">
      <video className="vid-content" data-testid="backdrop-background" autoPlay muted loop playsInline>
        <source
          src="https://cmsassets.rgpub.io/sanity/files/dsfx7636/news/409ab2fc369ba5e1fe50bac10c6676d7d1365a9f.mp4"
          type="video/mp4"
        />
      </video>
      <div className="container" style={{ position: "relative", height: "100vh" }}>
        <div className="d-flex h-100 text-center flex-column align-items-center justify-content-center">
          <div>
            <h1>Dusun Creative Centers</h1>
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore earum magni fuga facilis, ducimus
              assumenda rem architecto provident veniam, accusantium nisi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
