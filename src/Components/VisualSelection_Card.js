import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./VisualSelection_Card.css";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";
import { saveCorrectSelections, getVisualRepresentation, saveBallotSelections } from '../API/Voter.js'; // import getVisualRepresentation
import Select from "react-select";

const staticCard = {
  numberOfEmojis: 6,
  emojiRef: "😊",
  colorRef: "#0000ff",
  config: {
    columns: 2,
    rows: 3,
    positions: [
      [0, 0], [1, 0],
      [0, 1], [1, 1],
      [0, 2], [1, 2]
    ]
  }
};

const randomEmojis = [
  "🌟", "🍀", "🔥", "🎈", "🌸", "⚡", "🍎", "🍌", "🍇", "🍉",
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉",
  "😌","😍","🥰","😘","😗","😙","😚","😋","😛","😜","🤪","😝","🤑",
  "🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬",
  "🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵",
  "🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","☹️",
  "😮","😯","😲","😳","🥺","😦","😧","😨","😰","😥","😢","😭","😱",
  "😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿",
  "💀","☠️","🤡","👹","👺","👻","👽","👾","🤖","👋","🤚","🖐️","✋",
  "🖖","👌","🤌","🤏","✌️","🤞","🫰","🤟","🤘","🤙","🫵","🫱","🫲",
  "🫳","🫴","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾",
  "🦵","🦶","👂","🦻","👃","🧠","🦷","🦴","👀","👁️","👅","👄","🫦",
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐻‍❄️","🐨","🐯","🦁","🐮",
  "🐷","🐽","🐸","🐵","🙈","🙉","🙊","🐒","🐔","🐧","🐦","🐤","🐣",
  "🐥","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🪱","🐛","🦋",
  "🐌","🐞","🐜","🪰","🪲","🪳","🦟","🦗","🕷️","🕸️","🦂","🐢","🐍",
  "🦎","🦖","🦕","🐙","🦑","🦐","🦞","🦀","🐡","🐠","🐟","🐬","🐳",
  "🐋","🦈","🐊","🐅","🐆","🦓","🦍","🦧","🐘","🦣","🦛","🦏","🐪",
  "🐫","🦒","🦘","🦬","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🦙","🐐",
  "🦌","🐕","🐩","🦮","🐕‍🦺","🐈","🐈‍⬛","🪶","🐓","🦃","🦤","🦚",
  "🦜","🦢","🦩","🕊️","🐇","🦝","🦨","🦡","🦫","🦦","🦥","🐁","🐀",
  "🐿️","🦔","🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈",
  "🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️",
  "🫑","🌽","🥕","🫒","🧄","🧅","🥔","🍠","🥐","🥯","🍞","🥖","🥨",
  "🥞","🧇","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮",
  "🌯","🫔","🥙","🧆","🥚","🍳","🥘","🍲","🫕","🥣","🥗","🍿","🧈",
  "🧂","🥫","🍱","🍘","🍙","🍚","🍛","🍜","🍝","🍠","🍢","🍣","🍤",
  "🍥","🥮","🍡","🥟","🥠","🥡","🦪","🍦","🍧","🍨","🍩","🍪","🎂",
  "🍰","🧁","🥧","🍫","🍬","🍭","🍮","🍯","🍼","🥛","☕","🫖","🍵",
  "🍶","🍾","🍷","🍸","🍹","🍺","🍻","🥂","🥃","🫗","🥤","🧋","🧃",
  "🧉","🧊","⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🪀","🏓",
  "🏸","🥅","🏒","🏑","🥍","🏏","🪃","🥌","🛷","⛸️","🥊","🥋","🥇",
  "🥈","🥉","🏆","🎽","🎿","🛼","🛹","🛶","⛵","🚤","🛥️","🛳️","⛴️",
  "🚢","✈️","🛩️","🛫","🛬","🪂","💺","🚁","🚟","🚠","🚡","🛰️","🚀",
  "🛸","⌚","📱","📲","💻","⌨️","🖥️","🖨️","🖱️","🖲️","🕹️","🗜️",
  "💽","💾","💿","📀","📼","📷","📸","📹","🎥","📽️","🎞️","📞","☎️",
  "📟","📠","📺","📻","🎙️","🎚️","🎛️","⏱️","⏲️","⏰","🕰️","⌛",
  "⏳","📡","🔋","🔌","💡","🔦","🕯️","🪔","🧯","🛢️","💸","💵","💴",
  "💶","💷","🪙","💰","💳","🧾","💎","⚖️","🔧","🔨","⚒️","🛠️","⛏️",
  "🔩","⚙️","🗜️","⚗️","🧪","🧫","🧬","🔬","🔭","📡","💉","💊","🩸",
  "🩹","🩺","🚪","🛏️","🛋️","🪑","🚽","🚿","🛁","🪒","🧴","🧷","🧹",
  "🧺","🧻","🪣","🧼","🪥","🧽","🧯","🛒","🚬","⚰️","🪦","⚱️","🏺",
  "🇺🇸","🇬🇧","🇨🇦","🇦🇺","🇫🇷","🇩🇪","🇮🇹","🇪🇸","🇯🇵","🇨🇳","🇰🇷","🇧🇷",
  "🇮🇳","🇷🇺","🇿🇦"
];

function getEmojiGridConfig(n) {
  switch (n) {
    case 1:
      return { columns: 1, rows: 1, positions: [[0, 0]] };
    case 2:
      return { columns: 1, rows: 2, positions: [[0, 0], [0, 1]] };
    case 3:
      return { columns: 1, rows: 3, positions: [[0, 0], [0, 1], [0, 2]] };
    case 4:
      return { columns: 2, rows: 2, positions: [[0, 0], [1, 0], [0, 1], [1, 1]] };
    case 5:
      // 3x3 grid, cross pattern for centering
      return {
        columns: 3,
        rows: 3,
        positions: [
          [0, 0], [2, 0],
          [1, 1],
          [0, 2], [2, 2]
        ]
      };
    case 6:
      return {
        columns: 2,
        rows: 3,
        positions: [
          [0, 0], [1, 0],
          [0, 1], [1, 1],
          [0, 2], [1, 2]
        ]
      };
    case 7:
      return {
        columns: 2,
        rows: 5,
        positions: [
          [0, 0], [1, 0],
          [0.5, 1],
          [0, 2], [1, 2],
          [0, 3], [1, 3]
        ]
      };
    case 8:
      return {
        columns: 2,
        rows: 6,
        positions: [
          [0, 0], [1, 0],
          [0.5, 1],
          [0, 2], [1, 2],
          [0.5, 3],
          [0, 4], [1, 4]
        ]
      };
    case 9:
      return {
        columns: 3,
        rows: 3,
        positions: [
          [0, 0], [1, 0], [2, 0],
          [0, 1], [1, 1], [2, 1],
          [0, 2], [1, 2], [2, 2]
        ]
      };
    default:
      const columns = Math.ceil(Math.sqrt(n));
      const rows = Math.ceil(n / columns);
      const positions = [];
      let count = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          if (count < n) {
            positions.push([x, y]);
            count++;
          }
        }
      }
      return { columns, rows, positions };
  }
}

function generateRandomCard() {
  const numberOfEmojis = Math.floor(Math.random() * 9) + 1;
  const emojiRef = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
  const colorObj = GENERATION_COLOR_LIST[Math.floor(Math.random() * GENERATION_COLOR_LIST.length)];
  const colorRef = colorObj.hex;
  const config = getEmojiGridConfig(numberOfEmojis);
  return { numberOfEmojis, emojiRef, colorRef, config };
}

function areCardsEqual(card1, card2) {
  return card1.numberOfEmojis === card2.numberOfEmojis &&
         card1.emojiRef === card2.emojiRef &&
         card1.colorRef.toLowerCase() === card2.colorRef.toLowerCase();
}

const PAGE_SIZE = 42;
function getInitialCards() {
  // Generate 499 unique random cards
  const randomCards = [];
  const maxAttempts = 10000; // Prevent infinite loops
  let attempts = 0;
  let cardId = 0;

  while (randomCards.length < 499 && attempts < maxAttempts) {
    const newCard = generateRandomCard();
    // Check if this card is unique (not matching staticCard or any existing card)
    const isDuplicate = areCardsEqual(newCard, staticCard) ||
                        randomCards.some(card => areCardsEqual(card, newCard));
    
    if (!isDuplicate) {
      randomCards.push({ ...newCard, id: cardId++ });
    }
    attempts++;
  }

  // Insert staticCard at a random position among the 500 cards
  const insertIndex = Math.floor(Math.random() * 500);
  randomCards.splice(insertIndex, 0, { ...staticCard, id: cardId++ });

  return randomCards; // Now always 500 cards total, staticCard included
}

const COLOR_LIST = [
  { name: "Red", hex: "#ff0000" },
  { name: "Blue", hex: "#0000ff" },
  { name: "Orange", hex: "#ffa500" },
  { name: "Yellow", hex: "#fefe43ff" },
  { name: "Purple", hex: "#800080" },
  { name: "Brown", hex: "#a52a2a" },
  { name: "Gray", hex: "#808080" },
  { name: "Pink", hex: "#ffc0cb" },
  { name: "Olive", hex: "#808000" },
  { name: "Maroon", hex: "#800000" },
  { name: "Violet", hex: "#ee82ee" },
  { name: "Charcoal", hex: "#36454f" },
  { name: "Magenta", hex: "#ff00ff" },
  { name: "Bronze", hex: "#cd7f32" },
  { name: "Cream", hex: "#fffdd0" },
  { name: "Tan", hex: "#d2b48c" },
  { name: "Teal", hex: "#008080" },
  { name: "Mustard", hex: "#ffdb58" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Coral", hex: "#ff7f50" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Lavender", hex: "#e6e6fa" },
  { name: "Mauve", hex: "#e0b0ff" },
  { name: "Cyan", hex: "#e0f7fa" },
  { name: "Peach", hex: "#ffe5b4" },
  { name: "Rust", hex: "#b7410e" },
  { name: "Indigo", hex: "#4b0082" },
  { name: "Ruby", hex: "#e0115f" },
  { name: "Green", hex: "#28d328ff" },
  { name: "Lime Green", hex: "#32cd32" },
  { name: "Salmon", hex: "#fa8072" },
  { name: "Azure", hex: "#007fff" },
  { name: "Beige", hex: "#f5f5dc" },
  { name: "Copper Rose", hex: "#996666" },
  { name: "Turquoise", hex: "#40e0d0" },
  { name: "Aqua", hex: "#00ffff" },
  { name: "Mint", hex: "#3eb489" },
  { name: "Sky Blue", hex: "#87ceeb" },
  { name: "Crimson", hex: "#dc143c" },
  { name: "Saffron", hex: "#f4c430" },
  { name: "Lemon Yellow", hex: "#fff44f" },
  { name: "Grapevine", hex: "#43254f" },
  { name: "Fuschia", hex: "#ff00ff" },
  { name: "Amber", hex: "#ffbf00" },
  { name: "Sea Green", hex: "#2e8b57" },
  { name: "Dark Green", hex: "#006400" },
  { name: "Pearl", hex: "#eae0c8" },
  { name: "Ivory", hex: "#fffff0" },
  { name: "Tangerine", hex: "#f28500" },
  { name: "Garnet", hex: "#733635" },
  { name: "Cherry Red", hex: "#de3163" },
  { name: "Emerald", hex: "#50c878" },
  { name: "Brunette", hex: "#664238" },
  { name: "Sapphire", hex: "#0f52ba" },
  { name: "Lilac", hex: "#c8a2c8" },
  { name: "Rosewood", hex: "#65000b" },
  { name: "Arctic Blue", hex: "#0000ff" },
  { name: "Ash", hex: "#808080" },
  { name: "Mocha", hex: "#C0A392" },
  { name: "Coffee Brown", hex: "#6f4e37" },
  { name: "Umber", hex: "#635147" }
];

// Colors available for generating new random cards (excludes legacy colors like "Green")
const GENERATION_COLOR_LIST = COLOR_LIST.filter(c => c.name !== "Green");

const blackTextColors = [
  "Yellow",
  "Orange",
  "Red",
  "Pink",
  "Cream",
  "Tan",
  "Mustard",
  "Lavender",
  "Mauve",
  "Cyan",
  "Peach",
  "Salmon",
  "Green",
  "Lime Green",
  "Cherry Red",
  "Magenta",
  "Fuschia",
  "Beige",
  "Turquoise",
  "Aqua",
  "Mint",
  "Sky Blue",
  "Saffron",
  "Lemon Yellow",
  "Amber",
  "Pearl",
  "Ivory",
  "Tangerine",
  "Emerald",
  "Bronze",
  "Lilac",
  "Mocha",
  "Coral",
  "Violet",
  "Gray",
  "Ash"
];

const VisualSelection = () => {
  const navigate = useNavigate();
  const { userSelectedYes } = useContext(VoteContext);

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = ["Voted Before", "Identification of Previous Ballots", "Voting", "Confirmation"];
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 2 : 0;

  const [cards] = useState(() => getInitialCards());
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // new modal state
  const [visualRepresentation, setVisualRepresentation] = useState(null);
  const [numberFilter, setNumberFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [emojiFilter, setEmojiFilter] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch the visual representation when the component mounts
    const fetchVisual = async () => {
      const visual = await getVisualRepresentation();
      setVisualRepresentation(visual);
    };
    fetchVisual();
  }, []);

  // Close modal if all cards are removed
  useEffect(() => {
    if (showConfirm && selected.length === 0) {
      setShowConfirm(false);
    }
  }, [selected, showConfirm]);

  const filteredCards = cards.filter(card => {
    // Card number filter
    const matchesNumber = numberFilter === "" || card.numberOfEmojis === Number(numberFilter);

    // Card color filter (case-insensitive, partial match)
    const colorObj = COLOR_LIST.find(c => c.hex.toLowerCase() === card.colorRef.toLowerCase());
    const colorName = colorObj ? colorObj.name.toLowerCase() : "";
    const matchesColor = colorFilter === "" || colorName.includes(colorFilter.toLowerCase());

    // Emoji filter
    const matchesEmoji = emojiFilter === "" || card.emojiRef === emojiFilter;

    return matchesNumber && matchesColor && matchesEmoji;
  });

  const totalPages = Math.ceil(filteredCards.length / PAGE_SIZE);
  const pagedCards = filteredCards.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSelect = (cardId) => {
    setSelected(prev =>
      prev.includes(cardId) ? prev.filter(i => i !== cardId) : [...prev, cardId]
    );
  };

  // Instead of navigating immediately, show the confirmation modal
  const handleNext = async (e) => {
    if (selected.length > 0) {
      e.preventDefault();
      setShowConfirm(true);
    } else {
      setShowError(true);
    }
  };


  // When user confirms, navigate to voting
  const confirmSelection = async () => {
    // Gather selected card features (number, emoji, colorRef as hex) - use original cards array
    const selectedCardFeatures = selected.map(cardId => {
      const card = cards.find(c => c.id === cardId);
      if (!card) return null;
      return {
        numberOfEmojis: card.numberOfEmojis,
        emojiRef: card.emojiRef,
        colorRef: card.colorRef // Store as hex
      };
    }).filter(Boolean);

    // Compare with visualRepresentation - for cards, check for EXACT match only
    let isCorrect = false;
    if (visualRepresentation && typeof visualRepresentation === 'object') {
      // Check if exactly one card selected and it matches the visual representation
      isCorrect = selectedCardFeatures.length === 1 &&
        selectedCardFeatures[0].numberOfEmojis === visualRepresentation.numberOfEmojis &&
        selectedCardFeatures[0].emojiRef === visualRepresentation.emojiRef &&
        selectedCardFeatures[0].colorRef === visualRepresentation.colorRef;
    }

    console.log("Selected card features:", selectedCardFeatures);
    console.log("Visual representation:", visualRepresentation);
    console.log("Is correct:", isCorrect);

    try {
      // Save ballot selections and correct selection status when user confirms
      await saveBallotSelections(selectedCardFeatures); // Now stores colorRef as hex
      // Use the calculated isCorrect value directly instead of the state
      await saveCorrectSelections(Boolean(isCorrect));
      console.log("Saved to DB! isCorrect:", isCorrect);
      navigate("/voting", { state: { userSelectedYes: true } });
    } catch (error) {
      console.error("Error saving card selections:", error);
    }
  };

  const closeError = () => setShowError(false);


  // Prepare options from your cards
  const numberOptions = [...new Set(cards.map(card => card.numberOfEmojis))]
    .sort((a, b) => a - b)
    .map(num => ({ value: num, label: num }));

  const colorOptions = [...new Set(cards.map(card => {
    const colorObj = COLOR_LIST.find(c => c.hex.toLowerCase() === card.colorRef.toLowerCase());
    return colorObj ? colorObj.name : card.colorRef;
  }))]
    .sort((a, b) => a.localeCompare(b)) // <-- sort alphabetically
    .map(name => {
      const colorObj = COLOR_LIST.find(c => c.name === name);
      return {
        value: name,
        label: (
          <span>
            <span style={{
              display: "inline-block",
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: colorObj ? colorObj.hex : "#ccc",
              marginRight: 8,
              border: "1px solid #bbb",
              verticalAlign: "middle"
            }} />
            {name}
          </span>
        )
      };
    });

  // Get unique emojis from the generated cards
  const uniqueEmojisInCards = new Set(cards.map(card => card.emojiRef));
  
  // Organized emoji categories - only include emojis that exist in generated cards
  const smileyEmojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔",
    "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥",
    "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
    "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐",
    "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦",
    "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞",
    "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿",
    "💀", "☠️", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖"
  ].filter(e => uniqueEmojisInCards.has(e));
  
  const animalEmojis = [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨",
    "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊",
    "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉",
    "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🪱", "🐛", "🦋", "🐌",
    "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️", "🕸️", "🦂",
    "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀",
    "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆",
    "🦓", "🦍", "🦧", "🐘", "🦣", "🦛", "🦏", "🐪", "🐫", "🦒",
    "🦘", "🦬", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙",
    "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐈‍⬛", "🪶", "🐓",
    "🦃", "🦤", "🦚", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦝", "🦨",
    "🦡", "🦫", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔"
  ].filter(e => uniqueEmojisInCards.has(e));
  
  const foodEmojis = [
    "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐",
    "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑",
    "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅",
    "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🥞", "🧇", "🧀",
    "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮",
    "🌯", "🫔", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🫕", "🥣",
    "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛",
    "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟",
    "🥠", "🥡", "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰",
    "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕",
    "🫖", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂",
    "🥃", "🫗", "🥤", "🧋", "🧃", "🧉", "🧊"
  ].filter(e => uniqueEmojisInCards.has(e));
  
  const activityEmojis = [
    "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱",
    "🪀", "🏓", "🏸", "🥅", "🏒", "🏑", "🥍", "🏏", "🪃", "🥌",
    "🛷", "⛸️", "🥊", "🥋", "🥇", "🥈", "🥉", "🏆", "🎽", "🎿",
    "🛼", "🛹", "🛶", "⛵", "🚤", "🛥️", "🛳️", "⛴️", "🚢", "✈️",
    "🛩️", "🛫", "🛬", "🪂", "💺", "🚁", "🚟", "🚠", "🚡", "🛰️",
    "🚀", "🛸"
  ].filter(e => uniqueEmojisInCards.has(e));
  
  const objectEmojis = [
    "⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️",
    "🗜️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥",
    "📽️", "🎞️", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "🎚️",
    "🎛️", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌",
    "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸", "💵", "💴", "💶",
    "💷", "🪙", "💰", "💳", "🧾", "💎", "⚖️", "🔧", "🔨", "⚒️",
    "🛠️", "⛏️", "🔩", "⚙️", "⚗️", "🧪", "🧫", "🧬", "🔬", "🔭",
    "💉", "💊", "🩸", "🩹", "🩺", "🚪", "🛏️", "🛋️", "🪑", "🚽",
    "🚿", "🛁", "🪒", "🧴", "🧷", "🧹", "🧺", "🧻", "🪣", "🧼",
    "🪥", "🧽", "🛒", "🚬", "⚰️", "🪦", "⚱️", "🏺"
  ].filter(e => uniqueEmojisInCards.has(e));
  
  const symbolEmojis = [
    "🌟", "🍀", "🔥", "🎈", "🌸", "⚡", "✨", "💫", "⭐", "🌈",
    "☀️", "🌙", "💥", "🎉", "🎊", "🎁", "🏆"
  ].filter(e => uniqueEmojisInCards.has(e));
  
  const handEmojis = [
    "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞",
    "🫰", "🤟", "🤘", "🤙", "🫵", "🫱", "🫲", "🫳", "🫴", "👏",
    "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾",
    "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🦷", "🦴", "👀", "👁️",
    "👅", "👄", "🫦"
  ].filter(e => uniqueEmojisInCards.has(e));
  
  const flagEmojis = [
    "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇫🇷", "🇩🇪", "🇮🇹", "🇪🇸", "🇯🇵", "🇨🇳",
    "🇰🇷", "🇧🇷", "🇮🇳", "🇷🇺", "🇿🇦"
  ].filter(e => uniqueEmojisInCards.has(e));
  
  const emojiOptions = [
    smileyEmojis.length > 0 && { label: "😊 Smileys & Emotion", options: smileyEmojis.map(e => ({ value: e, label: e })) },
    animalEmojis.length > 0 && { label: "🐶 Animals & Nature", options: animalEmojis.map(e => ({ value: e, label: e })) },
    foodEmojis.length > 0 && { label: "🍎 Food & Drink", options: foodEmojis.map(e => ({ value: e, label: e })) },
    activityEmojis.length > 0 && { label: "⚽ Activities", options: activityEmojis.map(e => ({ value: e, label: e })) },
    objectEmojis.length > 0 && { label: "⌚ Objects", options: objectEmojis.map(e => ({ value: e, label: e })) },
    handEmojis.length > 0 && { label: "👋 Body Parts", options: handEmojis.map(e => ({ value: e, label: e })) },
    symbolEmojis.length > 0 && { label: "🌟 Symbols", options: symbolEmojis.map(e => ({ value: e, label: e })) },
    flagEmojis.length > 0 && { label: "🇺🇸 Flags", options: flagEmojis.map(e => ({ value: e, label: e })) }
  ].filter(Boolean);

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />
        <div className="intro-container intro-selection">          <h1  className="intro-heading">
Identification of <span className="break-responsive">Previously Cast Ballots</span></h1>
          <div className="text-main text-main-confirmation text-main-selection">
            Please select all cards below that you have seen when casting your previous ballots.
          </div>
          <div className="security-box-selection">
              <p className="text-small">
              <strong>Security Feature:</strong><br/>
              This process allows you to update your vote securely and privately. It helps ensure your voting decisions are made by you.
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
        <div className="card-wide">
          <h1 className="card-heading-select" style={{ width: "100%", textAlign: "left", margin: "0 0 10px 40px" }}>
            Select your cards
          </h1>
          <div className="instruction-list" style={{ maxWidth: "800px", margin: "0 auto 20px auto", textAlign: "left", paddingLeft: "35px" }}>
            <ul>
              <li>You must select <strong>all</strong> the cards below that you have seen when casting your previous ballots. This includes cards from both valid and invalid ballots.</li>
              <li>The system will not reveal if your selection is correct for security reasons.</li>
              <li>Only the correct selection will ensure that your vote gets updated and counted into the results.</li>
              <li>If you are unsure or cannot remember your cards, please contact election officials at your polling station.</li>
            </ul>
          </div>
          <div className="card-filter-card">
  <div className="card-filter-headline">Find your cards</div>
  <div className="card-filter-instructions">
    Filter by card number, color, and emoji.
  </div>
  <div className="card-filter-controls">
    <div className="card-filter-row" style={{ gap: 12 }}>
      <Select
        className="card-filter-input"
        options={numberOptions}
        value={numberOptions.find(opt => opt.value === Number(numberFilter)) || null}
        onChange={opt => setNumberFilter(opt ? String(opt.value) : "")}
        placeholder="Number"
        isClearable
        menuPortalTarget={document.body}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }),
          control: base => ({ ...base, fontSize: window.innerWidth <= 600 ? '15.52px' : '1rem' }),
          placeholder: base => ({ ...base, fontSize: window.innerWidth <= 600 ? '15.52px' : '1rem' }),
          singleValue: base => ({ ...base, fontSize: window.innerWidth <= 600 ? '15.52px' : '1rem' })
        }}      />
      <Select
        className="card-filter-input"
        options={colorOptions}
        value={colorOptions.find(opt => opt.value === colorFilter) || null}
        onChange={opt => setColorFilter(opt ? opt.value : "")}
        placeholder="Color"
        isClearable
        menuPortalTarget={document.body}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }),
          control: base => ({ ...base, fontSize: window.innerWidth <= 600 ? '15.52px' : '1rem' }),
          placeholder: base => ({ ...base, fontSize: window.innerWidth <= 600 ? '15.52px' : '1rem' }),
          singleValue: base => ({ ...base, fontSize: window.innerWidth <= 600 ? '15.52px' : '1rem' })
        }}      />
      <Select
        className="card-filter-input"
        options={emojiOptions}
        value={emojiOptions.flatMap(g => g.options).find(opt => opt.value === emojiFilter) || null}
        onChange={opt => setEmojiFilter(opt ? opt.value : "")}
        placeholder="Emoji"
        isClearable
        menuPortalTarget={document.body}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }),
          control: base => ({ ...base, fontSize: window.innerWidth <= 600 ? '15.52px' : '1rem' }),
          placeholder: base => ({ ...base, fontSize: window.innerWidth <= 600 ? '15.52px' : '1rem' }),
          singleValue: base => ({ ...base, fontSize: window.innerWidth <= 600 ? '15.52px' : '1rem' })
        }}
      />
      
      {(numberFilter || colorFilter || emojiFilter ) && (
        <button
          className="card-filter-clear"
          onClick={() => {
            setNumberFilter("");
            setColorFilter("");
            setEmojiFilter("");
            
          }}
          type="button"
        >
          Clear
        </button>
      )}
    </div>
  </div>
</div>

        <div className="selected-scroll-wrapper">
            <div className="selected-count-inside">
              {selected.length} selected
            </div>
            
            <div className="page-counter-badge">
              Showing {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, filteredCards.length)} of {filteredCards.length} pictures
            </div>
          </div>

          {/* Wrap the grid with a container */}
          <div className="visual-selection-grid-container">
            <div className="visual-selection-grid" style={{ marginTop: "20px" }}>
              {pagedCards.length === 0 ? (
    <p style={{
      color: "#444",
      fontSize: "1.1rem",
      marginBottom: "24px",
      maxWidth: "300px",
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
      display: "block",
      gridColumn: "1 / -1"
    }}>
      No cards found. Try adjusting your filters.
    </p>
  ) : (
    pagedCards.map((card, idx) => {
      // Find the color object for this card
      const colorObj = COLOR_LIST.find(c => c.hex.toLowerCase() === card.colorRef.toLowerCase()) || { name: "Color", hex: card.colorRef };
      const emojiNames = {
        "😊": "smiling face",
        "🐑": "sheep",
        "⭐": "star",
        // ...add all emojis you use
      };
      const emojiName = emojiNames[card.emojiRef] || "emoji";
      const cardLabel = `${colorObj.name} card with ${card.numberOfEmojis} ${card.emojiRef} ${emojiName}${card.numberOfEmojis > 1 ? "s" : ""}`;
      const numberTextColor = blackTextColors.includes(colorObj.name) ? "#000" : "#fff";
      return (
        <div className="visual-selection-card-container" key={card.id}>
          <div
            className={`confirmation-card visual-selection-item${selected.includes(card.id) ? " selected" : ""}`}
            data-emoji-count={card.numberOfEmojis}
            style={{
              backgroundColor: card.colorRef,
              position: "relative",
              cursor: "pointer"
            }}
            onClick={() => handleSelect(card.id)}
          >
            <span
              className="card-corner card-corner-top-left"
              style={{ color: numberTextColor }}
            >
              {card.numberOfEmojis}
            </span>
            <span
              className="card-corner card-corner-bottom-right"
              style={{ color: numberTextColor }}
            >
              {card.numberOfEmojis}
            </span>
            <div className="emoji-area">
              <div
                className="confirmation-emoji-grid"
                style={{
                  gridTemplateColumns: `repeat(${card.config.columns}, 1fr)`,
                  gridTemplateRows: `repeat(${card.config.rows}, 1fr)`
                }}
              >
                {card.config.positions.map(([x, y], i) => {
                  let fontSize;
                  switch (card.numberOfEmojis) {
                    case 1: fontSize = "64px"; break;
                    case 2: fontSize = "44px"; break;
                    case 3: fontSize = "38px"; break;
                    case 4: fontSize = "34px"; break;
                    case 5: fontSize = "28px"; break;
                    case 6: fontSize = "26px"; break;
                    case 7: fontSize = "24px"; break;
                    case 8: fontSize = "24px"; break;
                    case 9: fontSize = "18px"; break;
                    default: fontSize = "30px";
                  }
                  return (
                    <span
                      key={i}
                      className="confirmation-emoji"
                      style={{
                        fontSize,
                        gridColumn: x % 1 === 0 ? x + 1 : "1 / span 2",
                        gridRow: y + 1,
                        justifySelf: "center"
                      }}
                    >
                      {card.emojiRef}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="card-label">
            {cardLabel}
          </div>
        </div>
      );
    })
  )}
            </div>
          </div>
          {/* Navigation buttons below */}
          <div className="pagination-buttons">
            <button className="button" onClick={() => setPage(page - 1)} disabled={page === 0} aria-label="Previous page">
              ←
            </button>
              <span className="page-counter">
              Page {page + 1} of {totalPages}
            </span>
            <button className="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} aria-label="Next page">
              →
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button onClick={handleNext} className="button confirm-selection-button">
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
            <div className="modal" style={{
  display: "flex",
  flexDirection: "column",
  maxHeight: "90vh",
  maxWidth: "90vw",
  width: "900px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
  padding: "24px 32px",
  overflow: "hidden"
}}>
  <p style={{fontSize: "18px", fontWeight: "bold"}}>
                Please review your selected card{selected.length > 1 ? "s" : ""} below
              </p>
               <p style={{fontSize: "16px", marginTop: "0px", marginBottom: "16px"}}>
                Please verify that your selection is correct. <br></br> Once confirmed, you will not receive feedback on whether this selection is correct.
              </p>
  <div className="selected-cards-preview" style={{
    flex: "1 1 auto",
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap",
    gap: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 8,
    maxHeight: "50vh"
  }}>
    {selected.map(cardId => {
                  const card = cards.find(c => c.id === cardId);
                  if (!card) return null; // Safety check
                  const colorObj = COLOR_LIST.find(c => c.hex.toLowerCase() === card.colorRef.toLowerCase()) || { name: "Color", hex: card.colorRef };
                  const emojiNames = {
                    "😊": "smiling face",
                    "🐑": "sheep",
                    "⭐": "star",
                    // ...add all emojis you use
                  };
                  const emojiName = emojiNames[card.emojiRef] || "emoji";
                  const cardLabel = `${colorObj.name} card with ${card.numberOfEmojis} ${card.emojiRef} ${emojiName}${card.numberOfEmojis > 1 ? "s" : ""}`;
                  const numberTextColor = blackTextColors.includes(colorObj.name) ? "#000" : "#fff";
                  return (
                    <div
                      key={cardId}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "4px"
                      }}
                    >
                      <div
                        className="confirmation-card preview-item"
                        data-emoji-count={card.numberOfEmojis}
                        style={{
                          backgroundColor: card.colorRef,
                          position: "relative"
                        }}
                      >
                        <button
                          onClick={() => {
                            setSelected(prev => prev.filter(i => i !== cardId));
                          }}
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            border: "1px solid #ccc",
                            background: "#f3f4f6",
                            color: "#666",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            lineHeight: 1,
                            zIndex: 10,
                          }}
                          title="Remove this card"
                        >
                          ×
                        </button>
                        <span className="card-corner card-corner-top-left" style={{ color: numberTextColor }}>{card.numberOfEmojis}</span>
                        <span className="card-corner card-corner-bottom-right" style={{ color: numberTextColor }}>{card.numberOfEmojis}</span>
                        <div className="emoji-area">
                          <div
                            className="confirmation-emoji-grid"
                            style={{
                              gridTemplateColumns: `repeat(${card.config.columns}, 1fr)`,
                              gridTemplateRows: `repeat(${card.config.rows}, 1fr)`
                            }}
                          >
                            {card.config.positions.map(([x, y], i) => {
                              let fontSize;
                              switch (card.numberOfEmojis) {
                                case 1: fontSize = "64px"; break;
                                case 2: fontSize = "44px"; break;
                                case 3: fontSize = "38px"; break;
                                case 4: fontSize = "34px"; break;
                                case 5: fontSize = "28px"; break;
                                case 6: fontSize = "26px"; break;
                                case 7: fontSize = "24px"; break;
                                case 8: fontSize = "24px"; break;
                                case 9: fontSize = "18px"; break;
                                default: fontSize = "30px";
                              }
                              return (
                                <span
                                  key={i}
                                  className="confirmation-emoji"
                                  style={{
                                    fontSize,
                                    gridColumn: x % 1 === 0 ? x + 1 : "1 / span 2",
                                    gridRow: y + 1,
                                    justifySelf: "center",
                                    alignSelf: "center"
                                  }}
                                >
                                  {card.emojiRef}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="card-label" style={{ marginTop: 8, fontWeight: "bold", textAlign: "center" }}>
                        {cardLabel}
                      </div>
                    </div>
                  );
                })}
  </div>
  <div className="modal-actions" style={{
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    marginTop: "5px",
    marginBottom: "20px"
  }}>
    <button 
      className="button" 
      onClick={confirmSelection}>
      Confirm selection
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

export default VisualSelection;