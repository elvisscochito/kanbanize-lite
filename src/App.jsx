import AppRouter from './routes/app'
import Translator from './components/Translator'

function App() {

  return (
    <div className="App">
      <Translator>
        <AppRouter />
      </Translator>
    </div>
  )
}

export default App
