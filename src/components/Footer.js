import React from 'react'
import styles from '../css/Footer.css'

const Footer = () => {
  return (
  <div className="mt-5 footer">
  <footer className="text-center text-lg-start">
    <div className="container p-4">
      <div className="row mt-4">
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 className="text-uppercase mb-4">Richard's Immobilier</h5>
          <p>
          Que vous achetiez ou vendiez une maison, Richard's Immobilier vous offre une expérience extraordinaire. Nous nous engageons à vous aider à prendre des décisions éclairées en capitalisant sur les opportunités et les tendances actuelles du marché.
          </p>
          <div className="mt-4">
            <a type="button" href='https://fr-fr.facebook.com/' className="btn btn-floating btn-light btn-lg me-3"><i className="bi bi-facebook"></i></a>
            <a type="button" href='https://twitter.com/' className="btn btn-floating btn-light btn-lg me-3"><i className="bi bi-twitter"></i></a>
            <a type="button" href='https://www.google.com/' className="btn btn-floating btn-light btn-lg me-3"><i className="bi bi-google"></i></a>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 className="text-uppercase mb-4 text-center">Horaires</h5>
          <table className="table text-center">
            <tbody className="fw-normal">
              <tr>
                <td>Lun - Ven:</td>
                <td>8h - 18h</td>
              </tr>
              <tr>
                <td>Samedi:</td>
                <td>9h - 15h</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="text-center p-3">
      © 2022 Copyright: 
      <a className="" href="https://mdbootstrap.com/"> Richard's Immobilier</a>
    </div>
  </footer>
</div>
  )
}

export default Footer