import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dataHub from "./DataHub";
import {
    buildAppRouteUrl,
    readAppRouteParameters,
    readLegacyPathParameters,
} from "./AppRouteParameters";

function AppRoutesControllerRoot(){
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        const legacyParams = readLegacyPathParameters(location.pathname);

        if (location.pathname !== "/" && location.search === "" && legacyParams != null) {
            navigate(buildAppRouteUrl(legacyParams), { replace: true });
            return;
        }

        const routeParams = readAppRouteParameters(new URLSearchParams(location.search));

        dataHub.setData("NAVI", routeParams.navi);
        dataHub.setData("WRITINGS_MODE", routeParams.writingsMode);
        dataHub.setData("ARTICLE_CATE_SELECTED", routeParams.cateId);
        dataHub.setData("ARTICLE_ID", routeParams.articleId);

        if (routeParams.articleId === -1) {
            dataHub.setData("IS_ARTICLE_CONTENT_WINDOW_OPENED", false);
        }
    }, [location.pathname, location.search, navigate])

    return (<></>);
}

export default AppRoutesControllerRoot;
