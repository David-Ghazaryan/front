/* eslint-disable react/prop-types */
 
const Success = ({image,name,count}) => {
  return (
    <div className="flex flex-col items-center">
        <img src={image} alt={name} />
        <p className="text-[var(--primary)] font-bold text-2xl">{count}</p>
        <p className="text-[var(--primary)] font-bold text-2xl">{name}</p>
    </div>
  )
}

export {Success}