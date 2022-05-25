import React from 'react';
import {SvgXml} from 'react-native-svg'

export default () => {

const xml = `
<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.00002 11.2001L1.80002 7.0001L0.400024 8.4001L6.00002 14.0001L18 2.0001L16.6 0.600098L6.00002 11.2001Z" fill="#00FFCC"/>
</svg>
`;

return <SvgXml xml={xml}  />;
}