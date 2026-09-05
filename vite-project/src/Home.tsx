type HomeProps = {
  onPlay: () => void;
};

function Home({ onPlay }: HomeProps) {
  return (
    <div className="Home">
      <h1>Guess.fm</h1>
      <button onClick={onPlay}>Play</button>
    </div>
  );
}

export default Home;
