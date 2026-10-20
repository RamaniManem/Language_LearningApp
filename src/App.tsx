import { useEffect, useState } from 'react';
import './App.css';

type Word = {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  meaning: string;
};

type Category = {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  words: Word[];
};

const categories: Category[] = [
  {
    id: 'greetings',
    name: 'Greetings',
    subtitle: 'Everyday conversations',
    icon: '👋',
    color: 'blue',
    words: [
      {
        id: 'g1',
        word: 'Hello',
        translation: 'నమస్కారం',
        pronunciation: 'heh-LOH',
        example: 'Hello! How are you today?',
        meaning: 'A friendly greeting when meeting someone.',
      },
      {
        id: 'g2',
        word: 'Thank you',
        translation: 'ధన్యవాదాలు',
        pronunciation: 'THANK yoo',
        example: 'Thank you for your help.',
        meaning: 'A polite expression used to show gratitude.',
      },
      {
        id: 'g3',
        word: 'Good morning',
        translation: 'శుభోదయం',
        pronunciation: 'good MOR-ning',
        example: 'Good morning, everyone!',
        meaning: 'A greeting used in the morning.',
      },
      {
        id: 'g4',
        word: 'Goodbye',
        translation: 'వీడ్కోలు',
        pronunciation: 'good-BYE',
        example: 'Goodbye! See you tomorrow.',
        meaning: 'A friendly way to say farewell.',
      },
      {
        id: 'g5',
        word: 'Please',
        translation: 'దయచేసి',
        pronunciation: 'pleez',
        example: 'Please open the window.',
        meaning: 'A polite word used when making a request.',
      },
    ],
  },
  {
    id: 'travel',
    name: 'Travel',
    subtitle: 'Explore the world',
    icon: '✈️',
    color: 'sand',
    words: [
      {
        id: 't1',
        word: 'Airport',
        translation: 'విమానాశ్రయం',
        pronunciation: 'AIR-port',
        example: 'We arrived at the airport early.',
        meaning: 'A place where aircraft take off and land.',
      },
      {
        id: 't2',
        word: 'Ticket',
        translation: 'టికెట్',
        pronunciation: 'TIK-it',
        example: 'I booked a train ticket.',
        meaning: 'A document that allows you to travel or enter.',
      },
      {
        id: 't3',
        word: 'Hotel',
        translation: 'హోటల్',
        pronunciation: 'hoh-TEL',
        example: 'Our hotel is near the beach.',
        meaning: 'A place where travellers pay to stay.',
      },
      {
        id: 't4',
        word: 'Station',
        translation: 'స్టేషన్',
        pronunciation: 'STAY-shun',
        example: 'The bus station is nearby.',
        meaning: 'A place where buses or trains stop.',
      },
      {
        id: 't5',
        word: 'Journey',
        translation: 'ప్రయాణం',
        pronunciation: 'JUR-nee',
        example: 'Have a safe journey!',
        meaning: 'The act of travelling from one place to another.',
      },
    ],
  },
  {
    id: 'technology',
    name: 'Technology',
    subtitle: 'Digital vocabulary',
    icon: '💻',
    color: 'sky',
    words: [
      {
        id: 'c1',
        word: 'Computer',
        translation: 'కంప్యూటర్',
        pronunciation: 'kum-PYOO-ter',
        example: 'I use a computer for my studies.',
        meaning: 'An electronic device that processes information.',
      },
      {
        id: 'c2',
        word: 'Keyboard',
        translation: 'కీబోర్డ్',
        pronunciation: 'KEE-board',
        example: 'Type your name on the keyboard.',
        meaning: 'A device used to enter text and commands.',
      },
      {
        id: 'c3',
        word: 'Internet',
        translation: 'అంతర్జాలం',
        pronunciation: 'IN-ter-net',
        example: 'The internet helps us find information.',
        meaning: 'A global network connecting computers and devices.',
      },
      {
        id: 'c4',
        word: 'Password',
        translation: 'రహస్య సంకేతం',
        pronunciation: 'PASS-word',
        example: 'Keep your password private.',
        meaning: 'A secret word used to access an account.',
      },
      {
        id: 'c5',
        word: 'Software',
        translation: 'సాఫ్ట్‌వేర్',
        pronunciation: 'SOFT-wair',
        example: 'This software helps me learn languages.',
        meaning: 'Programs and instructions used by a computer.',
      },
    ],
  },
  {
    id: 'food',
    name: 'Food & Dining',
    subtitle: 'Order with confidence',
    icon: '🍜',
    color: 'gold',
    words: [
      {
        id: 'f1',
        word: 'Water',
        translation: 'నీరు',
        pronunciation: 'WAW-ter',
        example: 'Could I have some water, please?',
        meaning: 'The clear liquid that people drink.',
      },
      {
        id: 'f2',
        word: 'Breakfast',
        translation: 'అల్పాహారం',
        pronunciation: 'BREK-fust',
        example: 'I eat breakfast at eight.',
        meaning: 'The first meal of the day.',
      },
      {
        id: 'f3',
        word: 'Delicious',
        translation: 'రుచికరమైన',
        pronunciation: 'dih-LISH-us',
        example: 'This meal is delicious!',
        meaning: 'Having a very pleasant taste.',
      },
      {
        id: 'f4',
        word: 'Vegetables',
        translation: 'కూరగాయలు',
        pronunciation: 'VEJ-tuh-bulz',
        example: 'I eat vegetables every day.',
        meaning: 'Plants or parts of plants eaten as food.',
      },
      {
        id: 'f5',
        word: 'Restaurant',
        translation: 'భోజనశాల',
        pronunciation: 'RES-tuh-ront',
        example: 'Let us meet at the restaurant.',
        meaning: 'A place where meals are prepared and served.',
      },
    ],
  },
];

const ALL_WORDS = categories.flatMap((category) => category.words);

function App() {
  const [page, setPage] = useState('dashboard');
  const [selectedCategoryId, setSelectedCategoryId] = useState('greetings');
  const [wordIndex, setWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [learnedWords, setLearnedWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lingualeap-learned');
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [quizQuestions, setQuizQuestions] = useState<Word[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ??
    categories[0];

  const currentWord = selectedCategory.words[wordIndex];

  useEffect(() => {
    localStorage.setItem('lingualeap-learned', JSON.stringify(learnedWords));
  }, [learnedWords]);

  function openCategory(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setWordIndex(0);
    setShowTranslation(false);
    setPage('vocabulary');
  }

  function changeWord(direction: number) {
    setWordIndex(
      (current) =>
        (current + direction + selectedCategory.words.length) %
        selectedCategory.words.length,
    );
    setShowTranslation(false);
  }

  function toggleLearned(wordId: string) {
    setLearnedWords((current) =>
      current.includes(wordId)
        ? current.filter((id) => id !== wordId)
        : [...current, wordId],
    );
  }

  function speakWord(text: string) {
    if (!('speechSynthesis' in window)) {
      alert('Sorry, text-to-speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;

    window.speechSynthesis.speak(utterance);
  }

  function startQuiz(categoryId: string) {
    const category =
      categories.find((item) => item.id === categoryId) ?? categories[0];

    setSelectedCategoryId(category.id);

    const shuffled = [...category.words].sort(() => Math.random() - 0.5);

    setQuizQuestions(shuffled);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswer('');
    setQuizFinished(false);
    setQuizStarted(true);
    setPage('quiz');
  }

  function answerQuiz(answer: string) {
    if (quizAnswer || quizFinished) return;

    setQuizAnswer(answer);

    const question = quizQuestions[quizIndex];

    if (answer === question.translation) {
      setQuizScore((score) => score + 1);
      setLearnedWords((current) =>
        current.includes(question.id) ? current : [...current, question.id],
      );
    }
  }

  function nextQuestion() {
    if (quizIndex + 1 >= quizQuestions.length) {
      setQuizFinished(true);
    } else {
      setQuizIndex((current) => current + 1);
      setQuizAnswer('');
    }
  }

  const progress = Math.round(
    (learnedWords.length / ALL_WORDS.length) * 100,
  );

  const quizQuestion = quizQuestions[quizIndex];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a href="#home" className="brand" onClick={() => setPage('dashboard')}>
          <span className="brand-mark">L</span>
          <span>
            Lingua<span className="brand-light">Leap</span>
          </span>
        </a>

        <div className="sidebar-section">
          <p className="sidebar-label">LEARNING SPACE</p>

          <button
            className={`nav-link ${page === 'dashboard' ? 'active' : ''}`}
            onClick={() => setPage('dashboard')}
          >
            <span className="nav-icon">⌂</span> Dashboard
          </button>

          <button
            className={`nav-link ${page === 'vocabulary' ? 'active' : ''}`}
            onClick={() => setPage('vocabulary')}
          >
            <span className="nav-icon">▤</span> Vocabulary
          </button>

          <button
            className={`nav-link ${page === 'quiz' ? 'active' : ''}`}
            onClick={() => startQuiz(selectedCategoryId)}
          >
            <span className="nav-icon">✦</span> Quick Practice
          </button>

          <button
            className={`nav-link ${page === 'progress' ? 'active' : ''}`}
            onClick={() => setPage('progress')}
          >
            <span className="nav-icon">◴</span> My Progress
          </button>
        </div>

        <div className="sidebar-card">
          <div className="sidebar-card-icon">🌊</div>
          <h3>Little steps, big dreams.</h3>
          <p>Learn a few words today. Open a world tomorrow.</p>
          <div className="sidebar-decoration">✦　✧　✦</div>
        </div>

        <div className="sidebar-footer">
          <span className="online-dot" />
          Your learning journey
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div className="welcome-text">
            <p className="eyebrow">YOUR PERSONAL LEARNING SPACE</p>
            <h1>
              {page === 'dashboard'
                ? 'Hello, Language Explorer!'
                : page === 'vocabulary'
                  ? selectedCategory.name
                  : page === 'quiz'
                    ? 'Vocabulary Quiz'
                    : 'Your Learning Progress'}{' '}
              <span>✦</span>
            </h1>
            <p className="subtitle">
              {page === 'dashboard'
                ? 'Every new word brings you closer to a new world.'
                : 'Keep learning, keep growing, one word at a time.'}
            </p>
          </div>

          <div className="topbar-right">
            <div className="date-badge">
              <span>📅</span>
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="avatar">L</div>
          </div>
        </header>

        {page === 'dashboard' && (
          <>
            <section className="hero-banner">
              <div className="hero-content">
                <div className="hero-pill">
                  <span className="sparkle">✦</span>
                  YOUR NEXT CHAPTER STARTS HERE
                </div>

                <h2>
                  Discover words.
                  <br />
                  <span>Connect worlds.</span>
                </h2>

                <p>
                  Build your vocabulary, practice pronunciation, and learn at
                  your own pace.
                </p>

                <button
                  className="primary-button"
                  onClick={() => setPage('vocabulary')}
                >
                  Start learning <span>→</span>
                </button>
              </div>

              <div className="hero-visual" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="hero-globe">🌐</div>
                <span className="floating-word word-one">Hello!</span>
                <span className="floating-word word-two">Hola!</span>
                <span className="floating-word word-three">Bonjour!</span>
                <span className="floating-star star-one">✦</span>
                <span className="floating-star star-two">✧</span>
              </div>

              <div className="hero-bottom-line" />
            </section>

            <section className="stats-grid">
              <article className="stat-card">
                <div className="stat-icon blue-icon">▤</div>
                <p className="stat-title">Vocabulary Categories</p>
                <div className="stat-number">
                  04 <span>collections</span>
                </div>
                <p className="stat-caption">A world of words to explore</p>
              </article>

              <article className="stat-card">
                <div className="stat-icon beige-icon">✦</div>
                <p className="stat-title">Words Learned</p>
                <div className="stat-number">
                  {learnedWords.length} <span>of {ALL_WORDS.length} words</span>
                </div>
                <p className="stat-caption">Every word is a little victory</p>
              </article>

              <article className="stat-card">
                <div className="stat-icon mint-icon">◴</div>
                <p className="stat-title">Learning Progress</p>
                <div className="stat-number">
                  {progress}<span>% completed</span>
                </div>
                <div className="mini-progress">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <p className="stat-caption">Keep going, you're doing great</p>
              </article>
            </section>

            <section className="section-heading" id="categories">
              <div>
                <p className="eyebrow">CHOOSE YOUR ADVENTURE</p>
                <h2>Explore vocabulary</h2>
                <p>Pick a category and discover something new.</p>
              </div>
              <span className="section-decoration">✧</span>
            </section>

            <section className="category-grid">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={`category-card ${category.color}`}
                  onClick={() => openCategory(category.id)}
                >
                  <div className="category-card-top">
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-arrow">↗</span>
                  </div>

                  <h3>{category.name}</h3>
                  <p>{category.subtitle}</p>

                  <div className="category-card-bottom">
                    <span>{category.words.length} sample words</span>
                    <span className="category-progress-track">
                      <span
                        style={{
                          width: `${
                            (category.words.filter((word) =>
                              learnedWords.includes(word.id),
                            ).length /
                              category.words.length) *
                            100
                          }%`,
                        }}
                      />
                    </span>
                  </div>
                </button>
              ))}
            </section>

            <section className="practice-banner">
              <div className="practice-icon">💡</div>
              <div className="practice-copy">
                <p className="eyebrow">A SMALL STEP TODAY</p>
                <h3>Make learning a daily habit.</h3>
                <p>
                  Start with one category. Learn at your own pace and celebrate
                  every little win.
                </p>
              </div>
              <button
                className="secondary-button"
                onClick={() => startQuiz(selectedCategoryId)}
              >
                Take a quick quiz <span>→</span>
              </button>
            </section>
          </>
        )}

        {page === 'vocabulary' && (
          <section className="learning-panel">
            <div className="learning-panel-header">
              <div>
                <p className="eyebrow">YOUR VOCABULARY DECK</p>
                <h2>{selectedCategory.icon} {selectedCategory.name}</h2>
                <p className="subtitle">{selectedCategory.subtitle}</p>
              </div>

              <button
                className="secondary-button"
                onClick={() => setPage('dashboard')}
              >
                ← Dashboard
              </button>
            </div>

            <div className="deck-progress">
              <span>Word {wordIndex + 1} of {selectedCategory.words.length}</span>
              <span>
                {selectedCategory.words.filter((word) =>
                  learnedWords.includes(word.id),
                ).length} learned
              </span>
            </div>

            <div className="deck-progress-track">
              <span
                style={{
                  width: `${
                    ((wordIndex + 1) / selectedCategory.words.length) * 100
                  }%`,
                }}
              />
            </div>

            <button
              type="button"
              className={`flashcard ${showTranslation ? 'flipped' : ''}`}
              onClick={() => setShowTranslation((current) => !current)}
              aria-label="Flip vocabulary card"
            >
              <span className="flashcard-label">
                {showTranslation ? 'MEANING & TRANSLATION' : 'NEW WORD'}
              </span>

              <span className="flashcard-word">
                {currentWord.word}
              </span>

              <span className="flashcard-pronunciation">
                / {currentWord.pronunciation} /
              </span>

              {showTranslation ? (
                <>
                  <span className="flashcard-translation">
                    {currentWord.translation}
                  </span>
                  <span className="flashcard-meaning">
                    {currentWord.meaning}
                  </span>
                </>
              ) : (
                <span className="flashcard-hint">
                  Tap the card to reveal the meaning
                </span>
              )}

              <span className="flashcard-example">
                Example: “{currentWord.example}”
              </span>
            </button>

            <div className="flashcard-actions">
              <button
                className="secondary-button"
                onClick={() => changeWord(-1)}
              >
                ← Previous
              </button>

              <button
                className="secondary-button"
                onClick={() => speakWord(currentWord.word)}
              >
                🔊 Pronounce
              </button>

              <button
                className={`learned-button ${
                  learnedWords.includes(currentWord.id) ? 'is-learned' : ''
                }`}
                onClick={() => toggleLearned(currentWord.id)}
              >
                {learnedWords.includes(currentWord.id)
                  ? '✓ Learned'
                  : '✓ Mark learned'}
              </button>

              <button
                className="primary-button"
                onClick={() => changeWord(1)}
              >
                Next word →
              </button>
            </div>

            <div className="learning-note">
              <span>💡</span>
              <p>
                Tip: Say the word aloud, check its meaning, and use it in your
                own sentence.
              </p>
            </div>
          </section>
        )}

        {page === 'quiz' && (
          <section className="learning-panel">
            {!quizStarted || quizQuestions.length === 0 ? (
              <div className="quiz-finished">
                <h2>Ready to practise?</h2>
                <p>Choose a vocabulary category to start your quiz.</p>
                <div className="quiz-category-buttons">
                  {categories.map((category) => (
                    <button
                      className="secondary-button"
                      key={category.id}
                      onClick={() => startQuiz(category.id)}
                    >
                      {category.icon} {category.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : quizFinished ? (
              <div className="quiz-finished">
                <div className="quiz-result-icon">🏆</div>
                <p className="eyebrow">QUIZ COMPLETED</p>
                <h2>Great effort, Language Explorer!</h2>
                <p className="quiz-score">
                  You scored {quizScore} out of {quizQuestions.length}.
                </p>
                <p>
                  {Math.round((quizScore / quizQuestions.length) * 100)}%
                  correct answers
                </p>

                <div className="flashcard-actions">
                  <button
                    className="secondary-button"
                    onClick={() => setPage('dashboard')}
                  >
                    ← Dashboard
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => startQuiz(selectedCategoryId)}
                  >
                    Try again →
                  </button>
                </div>
              </div>
            ) : quizQuestion ? (
              <>
                <div className="learning-panel-header">
                  <div>
                    <p className="eyebrow">TEST YOUR KNOWLEDGE</p>
                    <h2>{selectedCategory.name} Quiz</h2>
                  </div>
                  <span className="quiz-count">
                    {quizIndex + 1} / {quizQuestions.length}
                  </span>
                </div>

                <div className="deck-progress-track">
                  <span
                    style={{
                      width: `${
                        ((quizIndex + 1) / quizQuestions.length) * 100
                      }%`,
                    }}
                  />
                </div>

                <div className="quiz-question">
                  <p className="eyebrow">WHAT DOES THIS WORD MEAN?</p>
                  <h2>{quizQuestion.word}</h2>
                  <p>/ {quizQuestion.pronunciation} /</p>
                  <button
                    className="secondary-button"
                    onClick={() => speakWord(quizQuestion.word)}
                  >
                    🔊 Hear pronunciation
                  </button>
                </div>

                <div className="quiz-options">
                  {[
                    quizQuestion.translation,
                    ...selectedCategory.words
                      .filter((word) => word.id !== quizQuestion.id)
                      .map((word) => word.translation),
                  ]
                    .sort((a, b) => a.localeCompare(b))
                    .map((answer, index) => {
                      let answerClass = 'quiz-option';

                      if (quizAnswer && answer === quizQuestion.translation) {
                        answerClass += ' correct';
                      } else if (quizAnswer === answer) {
                        answerClass += ' incorrect';
                      }

                      return (
                        <button
                          className={answerClass}
                          key={`${answer}-${index}`}
                          onClick={() => answerQuiz(answer)}
                          disabled={Boolean(quizAnswer)}
                        >
                          <span>{String.fromCharCode(65 + index)}</span>
                          {answer}
                          {quizAnswer && answer === quizQuestion.translation
                            ? ' ✓'
                            : ''}
                        </button>
                      );
                    })}
                </div>

                {quizAnswer && (
                  <div className="quiz-feedback">
                    <p>
                      {quizAnswer === quizQuestion.translation
                        ? '🎉 Correct! Well done!'
                        : `Not quite. The correct meaning is ${quizQuestion.translation}.`}
                    </p>
                    <button
                      className="primary-button"
                      onClick={nextQuestion}
                    >
                      {quizIndex + 1 === quizQuestions.length
                        ? 'See results →'
                        : 'Next question →'}
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </section>
        )}

        {page === 'progress' && (
          <section className="learning-panel">
            <p className="eyebrow">YOUR LEARNING JOURNEY</p>
            <h2>Every word counts.</h2>
            <p className="subtitle">
              Your completed vocabulary is saved automatically in this browser.
            </p>

            <div className="progress-summary">
              <div className="progress-summary-number">{progress}%</div>
              <div>
                <h3>{learnedWords.length} of {ALL_WORDS.length} words learned</h3>
                <p>Keep practising to grow your vocabulary.</p>
              </div>
            </div>

            <div className="large-progress-track">
              <span style={{ width: `${progress}%` }} />
            </div>

            <div className="progress-category-list">
              {categories.map((category) => {
                const learnedCount = category.words.filter((word) =>
                  learnedWords.includes(word.id),
                ).length;

                return (
                  <div className="progress-category" key={category.id}>
                    <div className="progress-category-heading">
                      <span>{category.icon} {category.name}</span>
                      <span>{learnedCount}/{category.words.length}</span>
                    </div>
                    <div className="large-progress-track">
                      <span
                        style={{
                          width: `${
                            (learnedCount / category.words.length) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <button
                      className="text-button"
                      onClick={() => openCategory(category.id)}
                    >
                      Continue learning →
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              className="secondary-button"
              onClick={() => setPage('dashboard')}
            >
              ← Back to dashboard
            </button>
          </section>
        )}

        <footer className="page-footer">
          <span>🌊 LinguaLeap · Learn beyond words.</span>
          <span>Made with curiosity and care.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;