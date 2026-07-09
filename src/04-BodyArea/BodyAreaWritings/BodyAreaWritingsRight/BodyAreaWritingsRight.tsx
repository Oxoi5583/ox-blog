import { useState, useEffect, Suspense } from 'react';

import ArticleArea from './ArticleArea/ArticleArea';

function BodyAreaRight() {
    return (
        <div
            id='BODY_AREA_RIGHT'
            style={{
                height: '100%',
                width: '100%'
            }}
        >
            <ArticleArea></ArticleArea>
        </div>
    );
}

export default BodyAreaRight;
