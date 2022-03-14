import React from "react";
import Style from './style.module.css'
import { useHistory } from 'react-router-dom'
/*
1. css class는 Style['{css module 파일에서의 클래스 이름}'] 으로 사용합니다.
2. 두개 이상의 클래스 사용은 className={`Style['classname1'] Style['classname2']`}로 정의 합니다.
3. html은 반드시 react component의 return ({컴포넌트 위치}) 안쪽에 위치해야 합니다.
4. css파일이 아닌 인라인 형식을 사용할 경우 style={}으로 표시되면 {} 오브젝트로 값을 넘겨주어야 합니다.
5. 또한 style 오브젝트의 css 프로퍼티 이름은 카멜표기를 따릅니다. ex ) font-weight => fontWeight, font-size => fontSize
6. img element에서 이미지를 불러올 때는 public 폴더에서 불러 오게 됩니다. 따라서 해당 public은 root 폴더가 되므로 /images, /assets등으로 시작합니다.
7. 반면 css에서 background-image로 적용할 경우에는 css module에 의해 적용되므로 about폴더의 내부 images 폴더에서 이미지를 로드 합니다. 자세한 
경로는 style.module.css를 확인합니다. 
*/
const Market = () => {
    const history = useHistory()
    return (
        <div className={Style['ground']}>
            <div 
            style={{width:'100%', height:'100%'}}
            
            // onClick={
            //     () => {
            //         history.push('/land-state')
            //     }
            // }
            >
            <div className={Style['bg-white']}>
                <div className={Style['h1Text']}> Market </div>
                <div >
                    <p className={Style['market-content-text']}> 이곳은 Erugo World의 모든 물자의 교환이 이루어지는 장소입니다.</p>
                    <p> 사람과 사람이 시공간의 제약을 넘어 연결되는 곳.</p>
                    <p> 마음과 마음이 만나는 곳.</p>
                    <p> 마켓입니다.</p>
                    <p> 여기에서는, Erugo World에서 필요한 모든 것이 거래될 것입니다.</p>
                    <p> 소통의 창이 열리는 그 시간까지 당신의 기다림에 감사하며 최선을 다해 준비하겠습니다.</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Market