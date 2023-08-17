import { createRoot } from "react-dom/client"
import { makeLoginPage } from "./main/factories/pages/LoginPageFactory"

const el = document.getElementById('root')

if (el) {
  const root = createRoot(el)
  root.render(makeLoginPage())
}
