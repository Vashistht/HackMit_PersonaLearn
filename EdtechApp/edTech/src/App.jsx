import TitleBar from "./Header/TitleBar";
import Dashboard from './Main/Dashboard';
import RelatedCourses from "./Main/RelatedCourses";
import MainBody from "./Main/MainBody";
import Suggested from "./Main/Suggested";

function App() {

  return (
    <div>
      <TitleBar/>
      <MainBody/>
      <Suggested/>
    </div>
  )
}

export default App
