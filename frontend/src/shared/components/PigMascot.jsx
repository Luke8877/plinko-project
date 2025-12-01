/**
 * SVG pig mascot used as the falling "ball" in the PlinkOink game.
 *
 * Props:
 * @param {number} size - Width of the pig in pixels (height scales to preserve original aspect ratio)
 * @param {string} className - Optional additional Tailwind/CSS classes
 * @param {object} style - Inline style overrides (used for physics positioning)
 *
 * Notes:
 * - Pointer events disabled so physics interactions are unaffected
 */
export default function PigMascot({ size = 60, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={(size * 113) / 154}
      viewBox="0 0 154 113"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Left Ear */}
      <path
        d="M12.5118 15.4331C12.1829 12.5585 15.0492 10.2609 18.1832 10.887L22.796 11.8087C26.5806 12.5649 27.8634 16.8643 24.9914 19.167L20.8623 22.4769C17.9897 24.7792 13.3936 23.1357 12.9963 19.6642L12.5118 15.4331Z"
        fill="#F07E7E"
        stroke="black"
      />
      {/* Right Ear */}
      <path
        d="M133.778 11.1007C137.685 10.5852 141.016 13.6742 140.326 17.1747L139.497 21.3836C138.675 25.5566 132.948 27.1253 129.663 24.0776L125.793 20.4887C122.508 17.4411 124.421 12.3353 129.079 11.7207L133.778 11.1007Z"
        fill="#F07E7E"
        stroke="black"
      />
      {/* Body */}
      <path
        d="M145.865 56.4421C145.865 87.1259 112.703 112 75.6336 112C38.5638 112 1.96451 87.1259 1.96451 56.4421C1.96451 25.7583 38.5638 0.884216 75.6336 0.884216C112.703 0.884216 145.865 25.7583 145.865 56.4421Z"
        fill="#FFA9D3"
        stroke="black"
      />
      {/* Mouth / Snout Base */}
      <path
        d="M33.7119 40.2801C33.0697 42.9863 27.3884 44.1878 21.0222 42.9637C14.6559 41.7397 10.0157 38.5535 10.6578 35.8474C11.2999 33.1412 16.9813 31.9397 23.3475 33.1637C29.7137 34.3878 34.354 37.5739 33.7119 40.2801Z"
        fill="#F66164"
      />
      <path
        d="M137.502 34.6706C138.138 37.378 133.491 40.5554 127.122 41.7675C120.752 42.9796 115.074 41.7675 114.438 39.0601C113.802 36.3527 118.45 33.1753 124.819 31.9632C131.188 30.751 136.866 31.9632 137.502 34.6706Z"
        fill="#F66164"
      />
      {/* Eyes */}
      <ellipse
        cx="44.8563"
        cy="17.979"
        rx="5.23869"
        ry="3.24211"
        fill="black"
      />
      <ellipse
        cx="103.464"
        cy="17.979"
        rx="5.23869"
        ry="3.24211"
        fill="black"
      />
      {/* Snout */}
      <path
        d="M74.1598 27.7947C79.7785 27.7947 84.8904 28.8938 88.6158 30.6932C92.3062 32.4757 94.7965 35.0349 94.7965 38.0213C94.7963 41.0076 92.3061 43.5659 88.6158 45.3484C84.8904 47.1479 79.7786 48.2469 74.1598 48.2469C68.5411 48.2468 63.43 47.1478 59.7047 45.3484C56.0144 43.5659 53.5242 41.0076 53.524 38.0213C53.524 35.0349 56.0143 32.4757 59.7047 30.6932C63.43 28.8938 68.5412 27.7948 74.1598 27.7947Z"
        fill="#F27B7D"
        stroke="black"
      />
      {/* Nostrils */}
      <ellipse
        cx="68.5941"
        cy="38.021"
        rx="3.11047"
        ry="2.06316"
        fill="black"
      />
      <ellipse
        cx="80.3812"
        cy="38.021"
        rx="3.11047"
        ry="2.06316"
        fill="black"
      />
    </svg>
  );
}
