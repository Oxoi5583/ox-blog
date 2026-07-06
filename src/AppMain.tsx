import HeaderArea from './HeraderArea'
import BodyArea from './BodyArea'
import 'material-symbols'
import { useState } from 'react';
import dataHub from './DataHub';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from './WindowDimensions';
import { buildAppRouteUrl } from './AppRouteParameters';

function AppMain() {
    const navigate = useNavigate();
    const [navi, setNavi] = useState('COVER');
    dataHub.addListener(setNavi, 'NAVI');

    const rowsTemplate = (navi == 'COVER') ? '100% 0' : '0 100%';

    const windowDimension = useWindowDimensions();


    return (
        <div
            style={{
                boxSizing: 'border-box',
                display: 'grid',
                gridTemplateRows: rowsTemplate,
                transition: '0.5s grid-template-rows ease-in',
                height: windowDimension.height.toString() + 'px',
                width: windowDimension.width.toString() + 'px',
            }}
        >
            <div
                style={{
                    display: 'block',
                    background: 'white',
                    position: 'relative',
                    zIndex: '100',
                }}

                onMouseUp={()=>{
                    navigate(buildAppRouteUrl({ navi: 'ABOUT_ME' }));
                }}
            >
            COVER_PAGE
            </div>
            <div
                style={{
                    display: 'block',
                    background: 'white',
                    position: 'relative',
                    zIndex: '100',
                }}
            >
                <div className="main-app">
                <HeaderArea/>
                <BodyArea/>
                </div>
            </div>
        </div>
    )
}

export default AppMain;
