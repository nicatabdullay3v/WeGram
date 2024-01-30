import router from './router/root'
import {RouterProvider} from "react-router-dom";
import "./global.scss"
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
