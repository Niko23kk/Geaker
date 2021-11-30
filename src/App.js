import "./publish";
import { Route, Routes } from "react-router-dom";
import { Publish } from "./publish";
import { Comics } from "./comics/comics";
import { ComicsCard } from "./comics/comicsCard";
import { ComicsPage, ComicsPageGetParams } from "./comics/comicsPage";
import { Login } from "./form/login";
import { Registration } from "./form/registration";
import { Food, FoodGetParams } from "./food/food";
import { FoodPageGetParams } from "./food/foodPage";
import { FoodCard } from "./food/foodCard";
import { NotAuthorize } from "./error/notAuthorize";
import NotFound from "./error/notFound";
import { InternalServerError } from "./error/internalServerError";
import { Account } from "./form/account";
import { NotAccess } from "./error/notAccess";
import { Game } from "./game/game";
import { GameCard } from "./game/gameCard";
import { GamePageGetParams } from "./game/gamePage";
import { News } from "./news/news";
import { NewsCard } from "./news/newsCard";
import { NewsPageGetParams } from "./news/newsPage";
import { Place } from "./place/place";
import { PlaceCard } from "./place/placeCard";
import { PlacePageGetParams } from "./place/placePage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={localStorage.token === null ? <Login /> : <Comics />}
      />
      <Route path="/comics" element={<Comics />} />
      <Route path="/comicsCard" element={<ComicsCard />} />
      <Route path="/comicsPage/:id" element={<ComicsPageGetParams />} />
      <Route path="/food/:type" element={<FoodGetParams />} />
      <Route path="/foodCard" element={<FoodCard />} />
      <Route path="/foodPage/:id" element={<FoodPageGetParams />} />
      <Route path="/game" element={<Game />} />
      <Route path="/gameCard" element={<GameCard />} />
      <Route path="/gamePage/:id" element={<GamePageGetParams />} />
      <Route path="/news" element={<News />} />
      <Route path="/newsCard" element={<NewsCard />} />
      <Route path="/newsPage/:id" element={<NewsPageGetParams />} />
      <Route path="/place" element={<Place />} />
      <Route path="/placeCard" element={<PlaceCard />} />
      <Route path="/placePage/:id" element={<PlacePageGetParams />} />
      <Route path="/publish" element={<Publish />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/notAuthorize" element={<NotAuthorize />} />
      <Route path="/notAccess" element={<NotAccess />} />
      <Route path="/notFound" element={<NotFound />} />
      <Route path="/internalServerError" element={<InternalServerError />} />
    </Routes>
    // <div>
    //       <Comics></Comics>
    //     {/* <Publish></Publish> */}
    // </div>
  );
}

export default App;
