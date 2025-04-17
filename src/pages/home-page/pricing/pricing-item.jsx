import PricingText from './pricing-text';
// eslint-disable-next-line react/prop-types
const PricingItem=({title,price,maxJobCount})=>{
    return(
        <div className="cursor-pointer bg-[var(--itemColor)] rounded-[30px] shadow-xl w-[350px] h-[230px]  hover:shadow-[inset_0_0_0_2px_var(--primary)] transition duration-200">
            <div className='pl-[30px]'>
                <p className='text-[20px] text-[var(--primary)] font-semibold py-[15px]'>{title}</p>
                <p className='text-[30px] font-bold text-black pb-[10px]'>{price}</p>
                <div>
                    <PricingText count={maxJobCount} text={"Աշխատանքի հայտարարություն"}/>
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