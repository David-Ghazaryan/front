import PricingItem from './pricing-item.jsx';
import Title from '../../../components/titles/titles.jsx';
const PricingItems=()=>{
    return(
        <div>
            <div className='container'>
                <div>
                    <Title text={"Արժեքները"}/>
                    <div className='grid grid-cols-3 gap-[70px]'>
                        <PricingItem caption={"Մեկական"} price={"25$ / 9900AMD"} countPrice={"1"}/>
                        <PricingItem caption={"Երկուական"} price={"45$ / 17900AMD"} countPrice={"2"}/>
                        <PricingItem caption={"Հնգական"} price={"99$ / 39900AMD"} countPrice={"5"}/>
                        <PricingItem caption={"Տասական"} price={"150$ / 74900AMD"} countPrice={"10"}/>
                        <PricingItem caption={"Քսան հինգական"} price={"499$ / 199000AMD"} countPrice={"25"}/>
                        <PricingItem caption={"Հիթսունական"} price={"955$ / 379000AMD"} countPrice={"50"}/>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingItems;