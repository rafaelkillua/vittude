import { createRoot } from "react-dom/client"
import { makeLoginPage } from "./main/factories/pages/LoginPageFactory"

import '@/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

const el = document.getElementById('root')

if (el) {
  const root = createRoot(el)
  root.render(makeLoginPage())
}
