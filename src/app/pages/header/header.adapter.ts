import { useState, useEffect, useCallback } from "react";
import { APP_CONFIGS } from "src/common/configs/app-configs";
import useIdInPath from "src/common/hooks/useIdInPath";
import useWindowSize from "src/common/hooks/useWindowSize";
import localStorageHelpers, { StorageKey } from "src/common/storage/local-storage-helpers";
import { ENUM_CONSTANT_NUMBER } from "src/libraries/enums/constant";
import { ENUM_PAGE } from "src/libraries/enums/pages";



function HeaderAdapter() {
  const { width } = useWindowSize();
  const curPage = useIdInPath();

  //state
  const [page, setPage] = useState<string>(ENUM_PAGE.DASHBOARD);
  const [hasMiniMenu, setHasMiniMenu] = useState<boolean>(true);


  useEffect(() => {
    if (curPage !== page) {
      setPage(curPage);
    }
  }, []);

  useEffect(() => {
    if (width >= ENUM_CONSTANT_NUMBER.WIDTH_IPAD) {
      !hasMiniMenu && setHasMiniMenu(true);
    }
  }, [width, hasMiniMenu]);

  useEffect(() => {
    hasMiniMenu && setHasMiniMenu(false);
  }, [curPage]);

  const toggleMenu = useCallback(() => {
    setHasMiniMenu((prev) => !prev);
  }, []);

  const logoutApp = async () => {
    let accessToken = await localStorageHelpers.get(StorageKey.ACCESS_TOKEN);
    await localStorageHelpers.save(StorageKey.ACCESS_TOKEN, "");
    await localStorageHelpers.save(StorageKey.REFRESH_TOKEN, "");
    const url_logout =
      APP_CONFIGS.SSO_URL +
      APP_CONFIGS.GET_TOKEN_URL_SUFFIX +
      "logout" +
      "?client_id=web" +
      "?id_token_hint=" + accessToken +
      "&post_logout_redirect_uri=" + window.location.href;
    console.log("REDIRECT LOGOUT : ", url_logout);
    window.location.href = url_logout;
  };

  return {
    page,
    setPage,
    toggleMenu,
    hasMiniMenu,
    // getUserInfo,
    logoutApp,
    // logoutByToken,
  };
}

export default HeaderAdapter;
