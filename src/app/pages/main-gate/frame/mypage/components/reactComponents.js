import { useMediaQuery } from "react-responsive";
import MyPage from "..";

// 반응형

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const mediaWidth = window.outerWidth;
// const mediaHeight = window.outerHeight

// const widthCheck = ({}) => {
//   if(mediaWidth > 992) {
//     return <Desktop><MyPage/></Desktop>;
//   } else if (mediaWidth > 768 && mediaWidth < 992) {
//     return <Tablet><MyPage/><Tablet/>;
//   } else if (mediaWidth < 768) {
//     return <Mobile/>
//   }
// }

const MypageReact = () => {
  return <>
  
  <Desktop><MyPage/></Desktop>
  <Tablet>타블렛</Tablet>
  <Mobile>모바일</Mobile>
  
  
  
  </>;


};
export default MypageReact;
