import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Voting-system.css";
import "./VisualSelection.css";

const allEmojis = [
  "🌟", "🍀", "🔥", "🎈", "🌸", "⚡", "🍎", "🍌", "🍇", "🍉", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫",
  "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢"
];

const PAGE_SIZE = 40; // 8 rows of 5

const VisualSelection = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(allEmojis.slice(0, 50));
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);

  // Dynamically add 10 new items each minute
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const nextIndex = prev.length;
        const newItems = [];
        for (let i = 0; i < 10; i++) {
          if (allEmojis[nextIndex + i]) {
            newItems.push(allEmojis[nextIndex + i]);
          }
        }
        return [...prev, ...newItems];
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const pagedItems = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSelect = (idx) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleNext = () => {
    if (selected.length > 0) {
      navigate("/voting");
    } else {
      alert("Please select one item to continue");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="welcome-main">
        <h1>Identifaction of previously cast ballots</h1>
        <div className="welcome-desc">
          Please select all items below that you have seen when casting your previous ballots.
        </div>
        <div className="card" style={{ maxWidth: 700, width: "100%" }}>
          <div className="visual-selection-grid">
            {pagedItems.map((item, idx) => {
              const globalIdx = page * PAGE_SIZE + idx;
              return (
                <div
                  key={globalIdx}
                  className={`visual-selection-item${selected.includes(globalIdx) ? " selected" : ""}`}
                  onClick={() => handleSelect(globalIdx)}
                >
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
            <button
              className="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className="button"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <button
            onClick={handleNext}
            className="button"
          >
            Confirm Selection
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VisualSelection;
