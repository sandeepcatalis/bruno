import React from 'react';

const Bruno = ({ width }) => {
  return (
    <svg width={width} viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none">
      {/* Duck body */}
      <ellipse cx="36" cy="44" rx="18" ry="14" fill="#0e9e8f" />
      {/* Duck head */}
      <circle cx="50" cy="28" r="10" fill="#0e9e8f" />
      {/* Eye */}
      <circle cx="53" cy="26" r="2.5" fill="#ffffff" />
      <circle cx="53.8" cy="25.8" r="1.2" fill="#1a1a1a" />
      {/* Beak */}
      <path d="M58 30 Q65 29 64 32 Q63 35 58 33 Z" fill="#f59e0b" />
      {/* Wing */}
      <path d="M24 42 Q30 34 38 38 Q32 44 26 48 Z" fill="#0b7d72" stroke="#0b7d72" strokeWidth="0.5" />
      {/* Tail feathers */}
      <path d="M18 40 Q14 36 16 33 Q18 36 20 38 Z" fill="#0b7d72" />
      <path d="M19 42 Q14 40 15 37 Q17 39 20 41 Z" fill="#0e9e8f" />
      {/* Water ripple */}
      <path d="M20 54 Q28 52 36 54 Q44 56 52 54" stroke="#5eead4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M24 57 Q32 55 40 57 Q48 59 54 57" stroke="#5eead4" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
};

export default Bruno;
