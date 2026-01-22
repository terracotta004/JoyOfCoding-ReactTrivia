import { useMemo, useState } from 'react'
import './App.css'

type TriviaItem = {
  question: string
  answer: string
  category?: string
}

type Result = 'correct' | 'incorrect' | null

const triviaDeck: TriviaItem[] = [
  { question: 'What planet is known as the Red Planet?', answer: 'Mars', category: 'Space' },
  { question: 'Who wrote the play "Romeo and Juliet"?', answer: 'William Shakespeare', category: 'Literature' },
  { question: 'What is the largest ocean on Earth?', answer: 'The Pacific Ocean', category: 'Geography' },
  { question: 'Which element has the chemical symbol "O"?', answer: 'Oxygen', category: 'Science' },
  { question: 'In computing, what does "CPU" stand for?', answer: 'Central Processing Unit', category: 'Technology' },
  { question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci', category: 'Art' },
  { question: 'Which country hosted the 2016 Summer Olympics?', answer: 'Brazil (Rio de Janeiro)', category: 'Sports' },
  { question: 'What is the capital city of Canada?', answer: 'Ottawa', category: 'Geography' },
  { question: 'How many continents are there on Earth?', answer: 'Seven', category: 'Geography' },
  { question: 'What gas do plants absorb from the atmosphere?', answer: 'Carbon dioxide', category: 'Science' },
  { question: 'Who is known as the "Father of Computers"?', answer: 'Charles Babbage', category: 'Technology' },
  { question: 'Which language has the most native speakers worldwide?', answer: 'Mandarin Chinese', category: 'Language' },
  { question: 'What year did the first iPhone release?', answer: '2007', category: 'Technology' },
  { question: 'Which metal is liquid at room temperature?', answer: 'Mercury', category: 'Science' },
  { question: 'What is the hardest natural substance?', answer: 'Diamond', category: 'Science' },
  { question: 'Who was the first woman to win a Nobel Prize?', answer: 'Marie Curie', category: 'History' },
  { question: 'How many strings does a standard violin have?', answer: 'Four', category: 'Music' },
  { question: 'What is the smallest prime number?', answer: '2', category: 'Math' },
  { question: 'Which planet has the most moons?', answer: 'Saturn', category: 'Space' },
  { question: 'What is the tallest mountain in the world above sea level?', answer: 'Mount Everest', category: 'Geography' },
  { question: 'In Star Wars, what is the name of Han Solo’s ship?', answer: 'The Millennium Falcon', category: 'Film' },
  { question: 'What instrument measures atmospheric pressure?', answer: 'Barometer', category: 'Science' },
  { question: 'Which country invented paper?', answer: 'China', category: 'History' },
]

function Scoreboard({ score, answered }: { score: number; answered: number }) {
  return (
    <div className="scoreboard">
      <span>Score: {score}</span>
      <span>Answered: {answered}</span>
    </div>
  )
}

function TriviaCard({
  item,
  showAnswer,
  onReveal,
  result,
  onMark,
}: {
  item: TriviaItem
  showAnswer: boolean
  result: Result
  onReveal: () => void
  onMark: (value: Result) => void
}) {
  return (
    <div className="card">
      {item.category && <p className="eyebrow">{item.category}</p>}
      <h2>{item.question}</h2>
      {showAnswer ? <p className="answer">{item.answer}</p> : <p className="placeholder">Tap reveal to check your guess.</p>}
      <div className="actions">
        {!showAnswer && (
          <button className="primary" onClick={onReveal}>
            Reveal answer
          </button>
        )}
        {showAnswer && (
          <div className="marking">
            <button
              className={result === 'correct' ? 'positive solid' : 'positive'}
              onClick={() => onMark(result === 'correct' ? null : 'correct')}
            >
              I was correct
            </button>
            <button
              className={result === 'incorrect' ? 'neutral solid' : 'neutral'}
              onClick={() => onMark(result === 'incorrect' ? null : 'incorrect')}
            >
              I was wrong
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [results, setResults] = useState<Result[]>(() => Array(triviaDeck.length).fill(null))

  const score = useMemo(() => results.filter((r) => r === 'correct').length, [results])
  const answered = useMemo(() => results.filter((r) => r !== null).length, [results])

  const currentItem = triviaDeck[currentIndex]

  const updateResult = (value: Result) => {
    setResults((prev) => {
      const next = [...prev]
      next[currentIndex] = value
      return next
    })
  }

  const handleReveal = () => setShowAnswer(true)

  const goToCard = (direction: 'next' | 'prev') => {
    setCurrentIndex((idx) => {
      const nextIndex = direction === 'next' ? (idx + 1) % triviaDeck.length : (idx - 1 + triviaDeck.length) % triviaDeck.length
      return nextIndex
    })
    setShowAnswer(false)
  }

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Joy of Coding</p>
          <h1>React Trivia Deck</h1>
          <p className="lede">Guess the answer, reveal the card, and keep your personal score.</p>
        </div>
        <Scoreboard score={score} answered={answered} />
      </header>

      <main>
        <TriviaCard
          item={currentItem}
          showAnswer={showAnswer}
          result={results[currentIndex]}
          onReveal={handleReveal}
          onMark={updateResult}
        />
        <div className="nav">
          <button className="ghost" onClick={() => goToCard('prev')}>
            ← Previous
          </button>
          <div className="progress">
            {currentIndex + 1} / {triviaDeck.length}
          </div>
          <button className="primary" onClick={() => goToCard('next')}>
            Next →
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
