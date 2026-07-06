import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BodyAreaLeft from './BodyAreaWritingsLeft/BodyAreaWritingsLeft';
import BodyAreaRight from './BodyAreaWritingsRight/BodyAreaWritingsRight';
import { BodyAreaGoTo, Direction } from './BodyAreaGoTo';
import dataHub from '../../99-shared/DataHub';
import { buildAppRouteUrl, DEFAULT_ARTICLE_CATE_ID } from "../../99-shared/AppRouteParameters";


function BodyAreaWritings() {
  const [isLeftFinishedTrans, setIsLeftFinishedTrans] = useState(true);
  const [isRightFinishedTrans, setIsRightFinishedTrans] = useState(true);

  const [writingsMode, setWritingsMode] = useState('POSTS');
  dataHub.addListener(setWritingsMode, 'WRITINGS_MODE');
  const [aritcleCateSelected, setAritcleCateSelected] = useState(DEFAULT_ARTICLE_CATE_ID);
  dataHub.addListener(setAritcleCateSelected, 'ARTICLE_CATE_SELECTED');
  
  const navigate = useNavigate();

  const isAtLeftArea = (writingsMode != 'ARTICLES');

  const area2 = 100;
  const area3px = 40;

  const templateColumns = (isAtLeftArea) ? `calc(${area2}% - ${area3px}px) ${area3px}px`
                                        : `${area3px}px calc(${area2}% - ${area3px}px)`;


  return (
    <>
        <div style={{
          display: 'grid',
          gridTemplateColumns: templateColumns,
          transition: 'grid-template-columns 0.5s ease',
          height: '100%',
        }}>
          {/* Left Area */}
          <div 
            onTransitionStart={()=>{
              setIsLeftFinishedTrans(false)
            }}
            
            onTransitionEnd={()=>{
              setIsLeftFinishedTrans(true)
            }}
          >

            <div style={{
                display: (isAtLeftArea && isLeftFinishedTrans) ? 'inline' : 'none',
                height: '100%',
                width: 'calc(100% - 20px)',
              }}
            >
              <BodyAreaLeft/>
            </div>
            <div style={{
                display: (isAtLeftArea && isLeftFinishedTrans) ? 'none' : 'inline',
                height: '100%',
                width: 'calc(100% - 20px)',
              }}

              onMouseUp={()=>{
                navigate(buildAppRouteUrl({ navi: 'WRITINGS', writingsMode: 'POSTS' }));
              }}
            >
              <BodyAreaGoTo p_direction={Direction.LEFT}/>
            </div>
        </div>

          {/* Right Area */}
          <div  
            style={{
              height: '100%',
              width: '100%',
            }}
            onTransitionStart={(e)=>{
              if(e.target != e.currentTarget) return;
              setIsRightFinishedTrans(false)
            }}
            
            onTransitionEnd={(e)=>{
              if(e.target != e.currentTarget) return;
              setIsRightFinishedTrans(true)
            }}
          >
            <div style={{
                display: (!isAtLeftArea && isRightFinishedTrans) ? 'block' : 'none',
                height: '100%',
                width: 'calc(100% - 20px)',
              }}
            >
              <BodyAreaRight/>
            </div>
            <div style={{
                display: (!isAtLeftArea && isRightFinishedTrans) ? 'none' : 'inline',
                height: '100%',
                width: 'calc(100% - 20px)',
              }}

              onMouseUp={()=>{
                navigate(buildAppRouteUrl({
                  navi: 'WRITINGS',
                  writingsMode: 'ARTICLES',
                  cateId: aritcleCateSelected,
                }));
              }}
            >
              <BodyAreaGoTo p_direction={Direction.RIGHT}/>
            </div>
          </div>
        </div>
    </>
  );
};

export default BodyAreaWritings;
