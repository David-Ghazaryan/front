import PricingText from './pricing-text';
// eslint-disable-next-line react/prop-types
const PricingItem=({caption,price,countPrice})=>{
    return(
        <div className="cursor-pointer border border-transparent bg-[var(--itemColor)] rounded-[30px] shadow-xl w-[350px] h-[230px] hover:border-[var(--primary)] hover:border-[2px] transition duration-200">
            <div className='pl-[30px]'>
                <p className='text-[20px] text-[var(--primary)] font-semibold py-[15px]'>{caption}</p>
                <p className='text-[30px] font-bold text-black pb-[10px]'>{price}</p>
                <div>
                    <PricingText count={countPrice} text={"Աշխատանքի հայտարարություն"}/>
                    {/* <PricingText count={countPrice} text={"featured job"}/>
                    <PricingText text={"Job displayed for 30 days"}/>
                    <PricingText text={"Access to Dashboard"}/>
                    <PricingText text={"Premium Support"}/> */}
                </div>
                <div className='flex items-center justify-center mt-[20px] bg-[var(--light)] w-[290px] h-[40px] font-inter font-medium text-[var(--primary)] text-sm rounded-lg hover:bg-[var(--primary)] hover:text-[#DFE8F7] transition duration-300'>
                    <p>ԳՆԵԼ</p>
                </div>
            </div>
        </div>
    )
}

export default PricingItem;