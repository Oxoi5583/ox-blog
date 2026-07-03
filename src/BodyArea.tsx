import BodyAreaWritings from "./BodyAreaWritings"
import { useState } from "react";
import dataHub from "./DataHub";


function BodyArea() {
    const [navi, setNavi] = useState('COVER');
    dataHub.addListener(setNavi, 'NAVI');

  const WRITINGS_displayType : string = (navi == 'WRITINGS') ? 'inline' : 'none';
  const TIMELINE_displayType : string = (navi == 'TIMELINE') ? 'inline' : 'none';
  const DEVELOP_displayType : string = (navi == 'DEVELOP') ? 'inline' : 'none';
  const ABOUT_ME_displayType : string = (navi == 'ABOUT_ME') ? 'inline' : 'none';

  return (
    <>
      <div style={{ display: WRITINGS_displayType }}><BodyAreaWritings/></div>
      <div style={{ display: TIMELINE_displayType }}><div/></div>
      <div style={{ display: DEVELOP_displayType }}><div/></div>
      <div style={{ display: ABOUT_ME_displayType }}><div/></div>
    </>
  )
}

export default BodyArea
