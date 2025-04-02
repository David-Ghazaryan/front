import TopJob from "./top-job"
const Jobs = () => {
  return (
    <div className="container">
        <div className='flex justify-between my-1'>
            <aside>
                <div className="w-[380px] min-h-[260px] bg-[var(--itemColor)] mt-[84px] border border-[var(--primary)] rounded-[5px] shadow-sm">
                    filter
                </div>
            </aside>
            <main>
                <div className="w-[700px]">
                    <p className="font-bold font-inter text-[32px] text-[var(--primary)] ">Թափուր աշխատատեղեր</p>
                    <p className="font-extralight font-inter text-[14px] text-gray-500 2 pb-[15px]">Աշխատանքային հայտարարություններ</p>
                    <div className="w-full min-h-[80px] bg-[var(--itemColor)] border border-[var(--primary)] rounded-[5px] shadow-sm">

                    </div>
                    <div className='flex flex-col '>
                        <div className="w-full min-h-[120px] bg-[var(--itemColor)] border border-[var(--primary)] rounded-[5px] mt-5 shadow-sm"></div>
                        <div className="w-full min-h-[120px] bg-[var(--itemColor)] border border-[var(--primary)] rounded-[5px] mt-5 shadow-sm"></div>
                        <div className="w-full min-h-[120px] bg-[var(--itemColor)] border border-[var(--primary)] rounded-[5px] mt-5 shadow-sm"></div>
                        <div className="w-full min-h-[120px] bg-[var(--itemColor)] border border-[var(--primary)] rounded-[5px] mt-5 shadow-sm"></div>
                    </div>
                </div>
            </main>
            <aside>
                <p className="font-bold font-inter text-center text-[20px] text-[var(--primary)] pt-5 ">Թոփ աշխատանքներ</p>
                <div className="flex flex-col mt-[35px] gap-5">
                    <TopJob logo='' companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող' description='Մեզ անհրաժեշտ է փորձառու FrontEnd ծրագրավորող․․․' scheduleType='Լրիվ դրույք' deadline='20.04.2025'/>
                </div>
            </aside>
        </div>
    </div>
  )
}

export default Jobs