import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./VisualSelection_Card.css";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";
import "./VisualSelection_Picture.css"

// Import your images
import img4 from "../Images/alligator.jpg";
import img5 from "../Images/alpaca.jpg";
import img6 from "../Images/Apples.png";
import img7 from "../Images/aquarium.jpg";
import img8 from "../Images/baby.jpg";
import img9 from "../Images/bacon.jpg";
import img10 from "../Images/ball.jpg";
import img11 from "../Images/balloon.jpg";
import img12 from "../Images/banana.jpg";
import img13 from "../Images/basketball.jpg";
import img14 from "../Images/beachball.jpg";
import img15 from "../Images/bead.jpg";
import img16 from "../Images/beanie.jpg";
import img17 from "../Images/bear.jpg";
import img18 from "../Images/beer.jpg";
import img19 from "../Images/bat.jpg";
import img20 from "../Images/bee.jpg";
import img21 from "../Images/beetle.jpg";
import img22 from "../Images/bell_pepper.jpg";
import img23 from "../Images/berry.jpg";
import img24 from "../Images/birthday.jpg";
import img25 from "../Images/bouquet.jpg";
import img26 from "../Images/bow.jpg";
import img27 from "../Images/bowl.jpg";
import img28 from "../Images/broccoli.jpg";
import img29 from "../Images/butterfly.jpg";
import img30 from "../Images/calf.jpg";
import img31 from "../Images/camera.jpg";
import img32 from "../Images/candle.jpg";
import img33 from "../Images/candy_cane.jpg";
import img34 from "../Images/candy.jpg";
import img35 from "../Images/carousel.jpg";
import img36 from "../Images/carriage.jpg";
import img37 from "../Images/carrot.jpg";
import img38 from "../Images/cat.jpg";
import img39 from "../Images/caviar.jpg";
import img40 from "../Images/cereal.jpg";
import img41 from "../Images/champagne.jpg";
import img42 from "../Images/cheeseburger.jpg";
import img43 from "../Images/chick.jpg";
import img44 from "../Images/chicken.jpg";
import img45 from "../Images/chips.jpg";
import img46 from "../Images/christmas_tree.jpg";
import img47 from "../Images/cobra.jpg";
import img48 from "../Images/coffee.jpg";
import img49 from "../Images/confetti.jpg";
import img50 from "../Images/crab.jpg";
import img51 from "../Images/crow.jpg";
import img52 from "../Images/crepe.jpg";
import img53 from "../Images/cucumber.jpg";
import img54 from "../Images/cushion.jpg";
import img55 from "../Images/dart.jpg";
import img56 from "../Images/deodorant.jpg";
import img57 from "../Images/dice.jpg";
import img58 from "../Images/dog.jpg";
import img59 from "../Images/dolphin.jpg";
import img60 from "../Images/dough.jpg";
import img61 from "../Images/eagle.jpg";
import img62 from "../Images/egg.jpg";
import img63 from "../Images/ear.jpg";
import img64 from "../Images/earring.jpg";
import img65 from "../Images/elephant.jpg";
import img66 from "../Images/eye.jpg";
import img67 from "../Images/face.jpg";
import img68 from "../Images/feather.jpg";
import img69 from "../Images/finger.jpg";
import img70 from "../Images/fire.jpg";
import img71 from "../Images/fireworks.jpg";
import img72 from "../Images/foot.jpg";
import img73 from "../Images/fox.jpg";
import img74 from "../Images/frog.jpg";
import img75 from "../Images/garlic.jpg";
import img76 from "../Images/gift.jpg";
import img77 from "../Images/gingerbread_man.jpg";
import img78 from "../Images/giraffe.jpg";
import img79 from "../Images/girl.jpg";
import img80 from "../Images/globe.jpg";
import img81 from "../Images/gorilla.jpg";
import img82 from "../Images/hand.jpg";
import img83 from "../Images/honey.jpg";
import img84 from "../Images/hotair_balloon.jpg";
import img85 from "../Images/hourglass.jpg";
import img86 from "../Images/ice_cream.jpg";
import img87 from "../Images/iceskate.jpg";
import img88 from "../Images/jam.jpg";
import img89 from "../Images/javelin.jpg";
import img90 from "../Images/jetski.jpg";
import img91 from "../Images/kayak.jpg";
import img92 from "../Images/key.jpg";
import img93 from "../Images/kimono.jpg";
import img94 from "../Images/ladybug.jpg";
import img95 from "../Images/lamb.jpg";

const allImages = [img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
img41, img42, img43, img44, img45, img46, img47, img48, img49, img50, img51, img52, img53, img54, img55, img56, img57, img58, img59, img60,
img61, img62, img63, img64, img65, img66, img67, img68, img69, img70, img71, img72, img73, img74, img75, img76, img77, img78, img79, img80,
img81, img82, img83, img84, img85, img86, img87, img88, img89, img90, img91, img92, img93, img94, img95];
const PAGE_SIZE = 39;

const VisualSelection2 = () => {
  const navigate = useNavigate();
  const { userSelectedYes } = useContext(VoteContext);

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = ["Voted Before", "Identification of Previous Ballots", "Voting", "Confirmation"];
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 2 : 0;

  const [items, setItems] = useState(allImages.slice(0, 50));
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // new modal state

 useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => {
        const nextIndex = prevItems.length;
        const newItems = [];
        for (let i = 0; i < 10; i++) {
          newItems.push(allImages[(nextIndex + i) % allImages.length]);
        }
        return [...prevItems, ...newItems];
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const pagedItems = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSelect = (idx) => {
    setSelected(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Instead of navigating immediately, show the confirmation modal
  const handleNext = () => {
    if (selected.length > 0) {
      setShowConfirm(true);
    } else {
      setShowError(true);
    }
  };

  const closeError = () => setShowError(false);
  
  // When user confirms, navigate to voting
  const confirmSelection = () => {
    navigate("/voting", { state: { userSelectedYes: true } });
  };

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />
        <div className="intro-container">
          <h1>Identification of previously cast ballots</h1>
          <div className="text-main" style={{ maxWidth: "800px", textAlign: "center" }}>
            Please select all cards below that you have seen when casting your previous ballots.
          </div>
          <div className="security-box">
            <p className="text-small">
              <strong>Security Feature:</strong><br/>
              This part of the voting system makes sure you can vote freely without any outside pressure.
              Only you can update your vote so that your privacy is protected.
            </p>
          </div>
          {/*
          <div className="text-main" style={{maxWidth: "800px", textAlign: "left"}}>
            You need to select <strong>all</strong> the cards below that you have seen when casting your previous ballots.
            The system will not reveal if your selection is correct for security reasons.
            Only the correct selection will ensure that your vote is counted.
            If you are unsure or cannot remember your cards, please contact election officials at your polling station.
          </div>*/}
          
        </div>
        <div className="card" style={{ maxWidth: 1000, width: "100%", position: "relative" }}>
          <div className="selected-count-inside">
            {selected.length} card{selected.length === 1 ? "" : "s"} selected
          </div>
          <h1 style={{ width: "100%", textAlign: "left", margin: "0 0 10px 55px" }}>
            Select your cards
          </h1>
          <div className="instruction-list" style={{ maxWidth: "800px", margin: "0 auto 20px auto", textAlign: "left" }}>
            <ul>
              <li>You need to select all the cards below that you have seen when casting your previous ballots.</li>
              <li>The system will not reveal if your selection is correct for security reasons.</li>
              <li>Only the correct selection will ensure that your vote gets updated and counted into the results.</li>
              <li>If you are unsure or cannot remember your cards, please contact election officials at your polling station.</li>
            </ul>
          </div>
          {/* Wrap the grid with a container */}
          <div className="visual-selection-grid-container">
            <div className="visual-selection-grid">
              {pagedItems.map((item, idx) => {
                const globalIdx = page * PAGE_SIZE + idx;
                return (
                  <div
                    key={globalIdx}
                    className={`confirmation-card visual-selection-item${selected.includes(globalIdx) ? " selected" : ""}`}
                    onClick={() => handleSelect(globalIdx)}
                  >
                    <img
                      src={item}
                      alt={`visual-${globalIdx}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* Navigation buttons below */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
            <button className="button" onClick={() => setPage(page - 1)} disabled={page === 0}>
              Previous
            </button>
            <button className="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}>
              Next
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <button onClick={handleNext} className="button">
            Confirm selection
          </button>
        </div>
        {showError && (
          <div className="error-overlay">
            <div className="error-message">
              <p>Please select at least one card</p>
              <button onClick={closeError} className="button">
                Close
              </button>
            </div>
          </div>
        )}
        {showConfirm && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2> Please review your chosen card(s) below. <br /> Do you wish to proceed?</h2>
              <div className="selected-cards-preview">
                {selected.map(idx => {
                  const card = items[idx];
                  return (
                    <div
                      key={idx}
                      className="confirmation-card preview-item"
                      style={{
                        backgroundColor: card.colorRef,
                        position: "relative",
                        margin: "4px"
                      }}
                    >
                      <span className="card-corner card-corner-top-left">{card.numberOfEmojis}</span>
                      <span className="card-corner card-corner-bottom-right">{card.numberOfEmojis}</span>
                      <div className="emoji-area">
                        <div
                          className="confirmation-emoji-grid"
                          style={{
                            gridTemplateColumns: `repeat(${card.config.columns}, 1fr)`,
                            gridTemplateRows: `repeat(${card.config.rows}, 1fr)`
                          }}
                        >
                          {card.config.positions.map(([x, y], i) => (
                            <span
                              key={i}
                              className="confirmation-emoji"
                              style={{
                                fontSize: "30px", // smaller for preview
                                gridColumn: x % 1 === 0 ? x + 1 : "1 / span 2",
                                gridRow: y + 1,
                                justifySelf: "center"
                              }}
                            >
                              {card.emojiRef}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="modal-actions" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap:"16px", marginTop: "5px", marginBottom: "20px" }}>
  <button 
    className="button" 
    onClick={confirmSelection}>
    Yes, proceed
  </button>
  <button className="button-secondary" onClick={() => setShowConfirm(false)}>
    Cancel
  </button>
</div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VisualSelection2;