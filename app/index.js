import { createRoot } from 'react-dom/client'
import Game from './game'

const rootElement = document.querySelector('#root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<Game />)
}
