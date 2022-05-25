import React from 'react';
import {SvgXml} from 'react-native-svg'

export default () => {

const xml = `
<svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.74999 14.625C1.74999 15.5875 2.46249 16.375 3.33333 16.375H9.66666C10.5375 16.375 11.25 15.5875 11.25 14.625V4.125H1.74999V14.625ZM12.0417 1.5H9.27083L8.47916 0.625H4.52083L3.72916 1.5H0.958328V3.25H12.0417V1.5Z" fill="#00FFCC"/>
</svg>
`;

return <SvgXml xml={xml}  />;
}