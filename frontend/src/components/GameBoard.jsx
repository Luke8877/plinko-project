export default function GameBoard() {
  const rows = 12;
  const pegs = Array.from({ length: rows }, (_, rowIndex) => {
    const pegCount = rowIndex + 4;
    return Array.from({ length: pegCount });
  });

  // Multiplier values aligned with symmetric board
  const multipliers = [8, 2, 1.1, 0.5, 1.1, 2, 8];

  return (
    <div className="w-full h-full flex flex-col justify-between items-center py-14">
      {/* Peg Grid */}
      <div className="flex flex-col justify-start items-center pt-3">
        {pegs.map((row, i) => (
          <div key={i} className="flex justify-center gap-3 mb-3">
            {row.map((_, j) => (
              <div
                key={j}
                className="w-4 h-4 bg-gray-300 rounded-full shadow-[0_0_6px_rgb(255,20,147,0.4)] opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Multiplier Slots */}
      <div className="flex justify-center gap-3 mt-5">
        {multipliers.map((mult, index) => (
          <div
            key={index}
            className="px-4 py-1  text-sm font-bold cursor-pointer transition 
                      bg-pink-600 hover:bg-pink-400
                      text-black shadow-lg"
          >
            x{mult}
          </div>
        ))}
      </div>
    </div>
  );
}
