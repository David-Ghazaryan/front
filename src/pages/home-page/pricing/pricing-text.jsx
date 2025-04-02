import CheckIcon from '@mui/icons-material/Check';
// eslint-disable-next-line react/prop-types
const PricingText=({count,text})=>{
    return(
        <div className='flex items-center '>
            <CheckIcon className='mr-[5px]' fontSize='small'/>
            <p>{count} {text}</p>
        </div>
    )
}
export default PricingText;