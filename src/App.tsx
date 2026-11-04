import {MainLayout} from "@/layouts/MainLayout/MainLayout";
import {Routes} from "react-router-dom";
import {useSvgSprite} from '@hooks/';

export default function App() {
  //інжект спрайту
  useSvgSprite();

  //Вивід головного layout
  return (
    <MainLayout>
      <Routes>

      </Routes>
    </MainLayout>
  );
}
