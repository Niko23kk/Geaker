import "./publish";
import { Route, Routes } from "react-router-dom";
import { Publish } from "./publish";
import { Comics } from "./comics/comics";
import { ComicsPageGetParams } from "./comics/comicsPage";
import { Login } from "./form/login";
import { Registration } from "./form/registration";
import { FoodGetParams } from "./food/food";
import { FoodPageGetParams } from "./food/foodPage";
import { NotAuthorize } from "./error/notAuthorize";
import NotFound from "./error/notFound";
import { InternalServerError } from "./error/internalServerError";
import { Account } from "./form/account";
import { NotAccess } from "./error/notAccess";
import { Game } from "./game/game";
import { GamePageGetParams } from "./game/gamePage";
import { News } from "./news/news";
import { NewsPageGetParams } from "./news/newsPage";
import { Place } from "./place/place";
import { PlacePageGetParams } from "./place/placePage";
import { LogOut } from "./form/logOut";
import { Favorite } from "./favorite/favorite";
import {
  AdminAddComics,
  AdminComics,
  AdminComicsPageGetParams,
} from "./admin/adminComics";
import {
  AdminAddFood,
  AdminFood,
  AdminFoodPageGetParams,
} from "./admin/adminFood";
import {
  AdminAddGame,
  AdminGame,
  AdminGamePageGetParams,
} from "./admin/adminGame";
import {
  AdminAddNews,
  AdminHiddenNewsPageGetParams,
  AdminNews,
  AdminNewsPageGetParams,
  HiddenAdminNews,
} from "./admin/adminNews";
import {
  AdminAddPlace,
  AdminPlace,
  AdminPlacePageGetParams,
} from "./admin/adminPlace";
import { AddPhoto } from "./admin/addPhoto";
import { AddNews } from "./news/addNews";
import { AdminParser } from "./admin/adminParser";
import { Home } from "./home";
import { connect, Provider } from "react-redux";
import { store } from "./reducer/coinsReducer";
import { mapStateToProps, mapDispatchToProps } from "./reducer/coinsReducer";
import { ForumThems } from "./forum/forumThems";
import { ForumThemPageGetParams } from "./forum/forumThem";
import { Character } from "./character/character";
import { PlayerCharacter } from "./character/playerCharacter";
import { AdminForumThems } from "./admin/adminForumThems";
import { AdminForumThemPageGetParams } from "./admin/adminForumThem";
import { Painter } from "./paint/Painter.tsx";
import { Project } from "./paint/projects";
import { ImageProjectGetParams } from "./paint/imageProject";
import { AddStatic } from "./admin/addStatic";

function App() {
  if (typeof localStorage.idRole == "undefined") {
    localStorage.setItem("idRole", 2);
  }
  return (
    <Routes>
      <Route
        path="/"
        element={localStorage.token === null ? <Login /> : <Home />}
      />
      <Route path="/home" element={<Home />} />
      <Route path="/comics" element={<Comics />} />
      <Route path="/comicsPage/:id" element={<ComicsPageGetParams />} />
      <Route path="/food/:type" element={<FoodGetParams />} />
      <Route path="/foodPage/:id" element={<FoodPageGetParams />} />
      <Route path="/game" element={<Game />} />
      <Route path="/gamePage/:id" element={<GamePageGetParams />} />
      <Route path="/news" element={<News />} />
      <Route path="/addnews" element={<AddNews />} />
      <Route path="/newsPage/:id" element={<NewsPageGetParams />} />
      <Route path="/place" element={<Place />} />
      <Route path="/placePage/:id" element={<PlacePageGetParams />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/project" element={<Project />} />
      <Route path="/imageProject/:id" element={<ImageProjectGetParams />} />
      <Route path="/publish" element={<Publish />} />
      <Route path="/character" element={<Character />} />
      <Route path="/userCharacter" element={<PlayerCharacter />} />
      <Route path="/account" element={<Account />} />
      <Route path="/paint/:id" element={<Painter />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/logOut" element={<LogOut />} />
      <Route path="/forumThems" element={<ForumThems />} />
      <Route path="/forumThem/:id" element={<ForumThemPageGetParams />} />
      <Route path="/notAuthorize" element={<NotAuthorize />} />
      <Route path="/notAccess" element={<NotAccess />} />
      <Route path="/notFound" element={<NotFound />} />
      <Route path="/internalServerError" element={<InternalServerError />} />
      <Route path="/addAdminComics" element={<AdminAddComics />} />
      <Route path="/adminComics" element={<AdminComics />} />
      <Route
        path="/adminComicsUpdate/:id"
        element={<AdminComicsPageGetParams />}
      />
      <Route path="/addAdminFood" element={<AdminAddFood />} />
      <Route path="/adminFood" element={<AdminFood />} />
      <Route path="/adminFoodUpdate/:id" element={<AdminFoodPageGetParams />} />
      <Route path="/addAdminGame" element={<AdminAddGame />} />
      <Route path="/adminGame" element={<AdminGame />} />
      <Route path="/adminGameUpdate/:id" element={<AdminGamePageGetParams />} />
      <Route path="/addAdminNews" element={<AdminAddNews />} />
      <Route path="/adminNews" element={<AdminNews />} />
      <Route path="/hiddenAdminNews" element={<HiddenAdminNews />} />
      <Route path="/adminNewsUpdate/:id" element={<AdminNewsPageGetParams />} />
      <Route
        path="/adminHiddenNewsUpdate/:id"
        element={<AdminHiddenNewsPageGetParams />}
      />
      <Route path="/addAdminPlace" element={<AdminAddPlace />} />
      <Route path="/adminPlace" element={<AdminPlace />} />
      <Route
        path="/adminPlaceUpdate/:id"
        element={<AdminPlacePageGetParams />}
      />
      <Route path="/adminForumThems" element={<AdminForumThems />} />
      <Route
        path="/adminForumThem/:id"
        element={<AdminForumThemPageGetParams />}
      />
      <Route path="/addPhoto" element={<AddPhoto />} />
      <Route path="/addStatic" element={<AddStatic />} />
      <Route path="/parse" element={<AdminParser />} />
    </Routes>
  );
}

export default App;
