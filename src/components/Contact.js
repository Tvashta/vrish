import React from "react";
import { Jumbotron } from "react-bootstrap";
function Contact() {
  return (
    <div className="cartItem">
      <Jumbotron>
        <div className="faq1">
          <h2>Frequently asked questions</h2>
          <br></br>
          <p>
            FAQ-1. WHAT ARE THE CLASSIFICATION OF RATION CARD?
            <br />
            There are five types of ration card: APL ration card (Replaced with
            Non-Priority House Hold as per NFSA) BPL ration card (Replaced with
            Priority House Hold as per NFSA) Antordoy Anna Yojna card Annapurna
            Anna Yojna card Nirashrit Antordoy Anna Yojna card Upto age of 12
            years, a half unit ration card is issued and full unit ration card
            is issued in case of age more than 12 years.
          </p>
          <p>
            FAQ-2. WHAT ARE THE DOCUMENTS REQUIRED FOR APPLYING RATION CARDS IN
            VARIOUS STATES OF INDIA?
            <br />
            The required enclosures for an APL ration card are: a proof of
            residence (the person's name must be enlisted in Passport / Voter
            list / Bank pass book / Land registry copy / Telephone bill/
            Electric bill / Aadhaar), birth certificate (for family member of
            half unit) and two copies of photograph of the Head of the family.
            In case a person applies for a BPL/Antordoy Anna Yojna ration card,
            then the required enclosures are BPL certificate and two copies of
            photograph of the Head of the family.
          </p>

          <p>
            FAQ-3. WHAT ARE THE METHODS AVAILABLE FOR APPLYING RATION CARD IN
            INDIAN STATES?
            <br />
            Application for the ration card can be submitted either directly to
            your Taluk Supply office / District Supply office (TSO/DSO office)
            OR online submission. Detailed information and step by step
            procedure for both online application and offline (direct)
            application for obtaining ration cards are found here.
          </p>
        </div>

        <div className="faq">
          <p>
            Please feel free to mail your suggestions or queries
            <br></br>
            Contact information<br></br>
            Name - Svaksha Swaminathan<br></br>
            Email ID - head_of_welfare@ration.gov.in<br></br>
          </p>
        </div>
      </Jumbotron>
    </div>
  );
}
export default Contact;
