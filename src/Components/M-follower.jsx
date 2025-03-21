import { useEffect, useState } from "react";

export function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (event) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    window.addEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      className="mpointer"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    ></div>
  );
}
