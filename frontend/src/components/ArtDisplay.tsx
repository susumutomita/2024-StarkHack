import React, { useEffect, useRef } from 'react';

interface ArtDisplayProps {
  txData: {
    hash: string;
    senderAddress: string;
    contractAddress: string;
    timestamp: number;
  };
}

const ArtDisplay: React.FC<ArtDisplayProps> = ({ txData }) => {
  const { hash, senderAddress, timestamp } = txData;
  const color = `#${hash.slice(-6)}`;
  const speed = timestamp % 100;
  const shape = senderAddress ? (parseInt(senderAddress.slice(-3), 16) % 2 === 0 ? 'circle' : 'square') : 'unknown';

  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const artElement = artRef.current;
    if (artElement) {
      artElement.style.transform = 'scale(1.5)';
      setTimeout(() => {
        artElement.style.transform = 'scale(1)';
      }, 1000);
    }
  }, []);

  return (
    <div
      ref={artRef}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: color,
        borderRadius: shape === 'circle' ? '50%' : '0',
        transition: `transform ${speed}s`,
        margin: '10px'
      }}
    >
    </div>
  );
};

export default ArtDisplay;
