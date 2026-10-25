import {Routes, Route} from 'react-router-dom';
import {Header} from '@/components/header/header';
import {Breadcrumbs} from '@/components/breadcrumbs/breadcrumbs';
import {Home} from '@pages/Home/home';
import {useSvgSprite} from '@/hooks/useSvgSprite';

export default function App() {
  useSvgSprite(); // інжект спрайту на сторінку

  return (
    <div className="container">
      <Header/>
      <main className="main">
        <Breadcrumbs/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </main>
    </div>
  );
}
