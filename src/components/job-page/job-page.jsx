/* eslint-disable react/prop-types */
import PlaceIcon from '@mui/icons-material/Place';
import Groups2Icon from '@mui/icons-material/Groups2';
import CallIcon from '@mui/icons-material/Call';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
const JobPage = ({jobTitle,companyTitle,logo,backgroundImage,phoneNumber,minWorkes,maxWorkes,description,jobDescription,city,industry,deadline,scheduleType}) => {
    companyTitle = 'DIGITAIN'
    jobTitle ='FrontEnd Developer'
    logo='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAprz+//7+/f3////6+voAo7oAoLgAn7f//PwAp72d1d/a7/L6/v0lrsLJ6Ox8yNWPz9pcvM3S7PBww9FYusvr9PY9s8Xh8/XC5eqV0NuFy9dyxNLy+fpJtsi03+al1+C43uXF5eus3OOgb7QwAAAP8ElEQVR4nO1d6bqqOgwFaloBkUlAEAR9/4e8nZhB2dtjdd+v68/Zx7HLtEmapKlhaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhofBeAAQ/BHvj0qP4JODHwTnFQ35tj5ApEt6Z2/NAD/LdpUm72KWiixDItiv0Y9BFz514vNv6jJIF4fpNwYrt1MKKR/wc5AvacjJJ7wG3A0kqqv0YRh5FpbWInKaLTn6IInms+k55Yh3QlmockOzaN/5cYQrgyO1tWlrXL3Nu1zv248oQNkabkj9D0zAVRWbsyi253J4hPqQdE2sPOVGCvdhO3+Rt6FfIDnXts/pll4h6bOmCisltRLdk/sI8I0d8BIXQ7ke/nSEnY6alK+wn4zKrbBySnLyXpnrCacb6IJ6RGUxT8jiAnGXnfzRFarD2LCaRx7tR53K66dMSQytH53uUI2Dj5eV07xSUUs7QjzGesFxb3qEQtopBLC9/HFC2UpN8pRjACFw1QZkzRFIVfFIHTnN2WmtkCoTMXFo4mFC1UkE+zmQOwMxy9YDCGOQNKbP7ebEbx/FVSxJVnQFouMHgKlHApLlDM7O9ZjHQdYTgtiWgLxYjPR0hmFEvvWyhCZEYk/R0/RjEQ87E0JxSt3ZdQBNcyL/CrKSopevxj7MOU4ZdQxK61z8j59wRN5Ip5Wk3nqWUmX8CQ3KydmZ5eIEgpXoTNCGYU5SL9JHBt7ayaZK8xPAhRkZlZpHbxw1KEi7mjczR+iSClWAtlY89WomV9mGBq7XaWR9wXGUplY0A8F2L+USFCst+ZBfZeJWiimxAibmYU3U/6NrixdvuIQP4yQxOlQlRz3yb5IEOITTZHmd/8OsOjJGKXk63U9YOz1N5Rgg42yOsEKUW7/dgbGuz4UfRBgiTa73bMJL++DBnDsItKVdfkQLkdSvfmVJ+coz6do9RdMyD8Jwy9/pMBg23bYv/8OYJ8ju6ZvwWvWkO+j3wYEoZPSJLp0Z3J8g0vMmQ74yx/uBeE4KieIlR0ju4b9sW/n6V83+/en8aB4YDuyikSl6oZS+i/32gaTi5rimrDWiNX1NlLZeCm0JReMTnMB78WoJH/P2RNUBnkEbsuRkdq1O2w1AFnVII3+aXgjBiUZ8cPq9Tz0iq8+Pm9OWZZG2U7JNn5GsQePBAdCzwSuwrDmKG4i711b02UgInQyrqvpE5Ny+BYeKQrQugDpYQ/yP7hEdTVz6Uv9uL6ls0ngGIhYndv3gbjxEVUltk5r+D3wWoAYoeODBcvrVylSdQUJZeRcgNZQPLLz6PStS/XbIWbZKjUYpz+YQ6MTUy/SR6yExS95x/279CljV6r+9nMjjO8KreJrJ6kvteF8RuOTO+kxbncxk5AMUPAlzYNk06fofqGus4GLFd3MY3JlIr5E3ZMiJPveSM3pvih6LaqKBr+uNgLztlB2I4yic73wD+lNk/dc7thpxfn+CPRdQwrVQTjws8H21TLynqGYJ8Hgx/YtEPmRhSS+6882X6T/GZgptWHOYY2jMQIpquDX02wbSZYqrL5MM2goLhbaK+kL54ybBRpmll6wcy63xZei+4/YajKM4VpdmEYf/gnAY0VlKqMBb5Nwn1Df/GfBKWWge6q/FKSjPiVo60pPr6NojpraAxEiFA9MedvEyLKlGnSgaJBjT1dG/8g8LbCMABFMbdBidZuKVyLi/dQZPoM4kgFw7pz1paT7PjyillfJZjQSWojFeqmU6VtCcX8FdUbzD5d8PzHLRUwjKQI17NeAOd/LkamSfGB/q7v16g4kyJ8lGAnp+TfckQuZu4E/drL24VISslw4OjPa7QB+yscf7mtoB4bzw9zlaqEodnHhbDn3KLoGqSj2A3g+LgQGi6TZDWa9oAgKzrB7JsVpPWxcGm62YLTLlha3kfFvdR4xfUtcrOMbg1v99wPU5twGFVxPvyEJJswwhAj5/0MXcFQfhEJ+pFSks04hzQ4rjYKZrAYQRxt5si3Z8JMqZAhr5Zo92osaTIaC/K3OleAvY0qF+Xsy4SKU7AOoeAMhdKeEmTDOW8fAkm3yBHl/Efz0FMV/o9go66AFwdLVb/Z9s8CEmZPOCIU8+8Sv+wwnvA20PWASvHX8o4eJT/5NOyXj0L56ChXNo548ASpOOWGr1f512F5aCj7ySgAB2t6lR0vaZe1jaYBhTdCKsX1mlJ0JNN3PAr/AxTJzEKycOu16kwsad3h94vQa3/ERzEZof3aF2LvktdOcKmMtfQU4Opajl2DyKkGfhJu92zJ+/fBXrvUHwYOB2l37r+1PsHRCY3FFCNg4vnO+RhFzDmIvXECnK54a+pKvQ12LVe+80gHoi4Mjq/TLL7rpGSZJXTOweSJLq6AagWqVCYpngRkWru1ENVgsryefnCcEp/6QjcF5hBnfFNBntUjHlolv5ixZk5stZEjvgwiQwqMBT76m+qgpHuFV1crQkm+5cgoGUagkQJrCA4vilgxhQMCIkQN5YOXUHsePkuX43wYgFYRUqRGosJP56gpNwR0s/XwlVSQgfFIPeJiSFDNcS9Apb+lKFjUTuBnR02oIO+zqGv/ZePDlwp2FgaraNu4Q0d8iP4GaaNrSpZdgTYqpFDRcM97C7/uJMyWVyOU1aE4xD62htPzs0qSM5tzhKI6BB56BgOOrOgtOt6udRD2Z6DzMUNFJxPw4fmA+aCF4nuia6Y0OVVfMsHHUb5ZhUfDv3brOTUxp8D7RdWFjHPhcjxJFWWBN6eXZKiDepU/pdgWJdiTZaiEHxvy1mkqf3JIn/oHyz/OtGRA2QEh3GwbcFd/D8ZPU8NimkIxtobvj5VKbK1HGNhn4ps/4ije2mfyFFpDMd5t6bNh9BaM+4+C3Jwhvo1UqbKKoe02buRjbQ4A87fyfeDYo1FWMcSwrR5heg4Ge9etHIXbTsbWUGUZ9LbzeHPzhe16W0ZGsBkbC2UVQwzbdM1StSRA8CgC3L3VFt8yFKGSfUUHfNyQA1z2kwFfnkXy6VuZUhkbCwUZ/DFFO3TcxwNFa7HN59kKEaqD6zB+of7YOgB5rDlGum8c9AbiPzQ4Yi8vU5UCCkLBS8DVg43DoKgASBU4Dt0WdZEngPujH4db0mEhq+JDQT0AzzOI3TD7sHfRhuyjuOOIT+veKlelo/qym0pFOgZZK4HqjwzCsRsqXZxxO93AW480clU62P6aqkq8lwDeclOMrhyF7idHhjtqc/1gr6bnJsvw090xiLMgxm5QY6vGhmu1HjSdh8sMuY7y+li+6sOHM2DvOEv/XdtBTSIRfMRt/govR7W4u0ed3+4Nn5yjEuQ0qjlAg3O7eNbpYuBiLm+meaKXdBEMBZVeD8HPALEzUIMcZxb2qs9bYGiZMs8Ki7UOzAPtUoZWPx0+A4hvt4DXQmFc5ecoy451NUhG9CMdMewCEksMmb3vupyY2ecMBUeKWIvSI+8CCAsHLRe6P3HByJ3Vkj0VSupbFiHEvF/w3mzWzugtzlLL2sko1YI65QXPbeJeYehiBansOGuV4fJsgmWGbYhjHjDmocTWGKqoEHoC3nqAwzwvinGSXOkgk8TziAi3hlLyyP/wImQjrLq2wXsrgIUyg2nrzokQZxER5mRLY/gNBFk1Sd8Z2drd6iLkrZA7psvKtF+J02wrtxXiYA5amfiqgQM0bD7OGz8n0bVoK34myYdeiCLAO81lcdmySYoS1b0wVoGLQX/rrs21Ze6aSubXVigKOzDuhYZYtIJuKxCqv6jVLo6XW8xTG8Kn2TJBC52FszJaiaIe+B7l66nvTwCq3XIbdotlSSe9ngcUxcZ9mAmXLhr5uq7eYLvLYuQeCTmuKRsxT3HRuu28vAFwWrtfsJ2YANfzxciMpEiTzfrMSSFK9xSfpNdOtySAwwhZX6NkBqCjnItx3zZ2XKOYCS8BsH/MsmuKgYSuaSZf0Zl1BoDGHLMzd24bqJ6ere0o7qTfKXqX4ZNrUv30tZfP4FNidfRYE6hBuxpyKVc4dnFCoPtoc28l39xYH3BgcY6WQ6Y1pAD5Ds0CGsywC0JAYio/a1d8kRlcAhh3fn+HVRZ9VUx7ZgZf2AmiMT9UMhkCtoOE8XO+doL2wF7D5UhHK4w2+De68b+zOYuJEV+HTaDKc8zbiMQ3y2L8ftUIRj2wdxccLXbUCwq0l15c5JwwocY8vQT1/V4HscfOedn+eWft92YZ/AH5tcBGnrDLdPbmOSXD7ZVluXf/ZLOuX2yhenHQJCad1pYVxV/nxjwGtdts4lGOURUO77RiUR1zVyYUJbvKi/0OVlmnX65flgDYuNyYMjEj/7Z+OxILY8V/aHqOQVXLqXZ3JkrCa2nOricTa7NYPoDxZ8AUZerXBsZp0bgJv0XI4hcJ0V1yE7zSwu6b0PYYpGxYM8UwPKX8eqT/yw2IE7zY4k1DQ0NDQ0NDQ0NDQ0Pji9BdLgqTB9deM/p3/uZ5t+h207z68e9FVRRBkDt54MdpF4bwfAqZ9WOhi9hnL8mDoqgMCOlzMRiVP0J7WgFX/qi/lBfHF/ZR+BJ0j9vsDYr48R48PVwRvoeQ/UdkC21ndLlBDvzyhAzz9PwAbYuNhv49qCuBC3vSY7Hkvu+Uxx5TdnZtVOSD0IH1ORId8RhDko9zEygA1rgVuXhyrFcyxDxDjIq+oTRrE0EZYlbCgO59sv+glmErCN7gC3qG8nLfQS/vfMAQydRML0Msj+D1BWwtQ3H3ibzT6gMMK4a45mVpyO4YigIhZB4dPzydTmF4oetQMjSqPAgCxgjVQR7kPOvUFUl355pahiDv7uCXyn6AIRH6kLD/IAdahrxuHTUGHqrMliG/tJqdsUenrkUd7xXISqC6uuIJQxMdUvgAQ9QW7rKCHzYDOcMKeNfB/oCL6BnZMWRgBadd4pfwH6Tmp9TaeTpieODLIMQfZEjXnYmSjiGUw3PzkGRZ4sMqQ07GdIlo8JHMGSKbV0yhwvggw/OIIati6+vYMRrq0jlDXmSJPLvyWI0masicIeHnqtH5YwzBZv+Jeoasc9yhzeU+YYgzk18yHkn7IuplxwwNIlS3qV7T8NsqjAs72kPNRTdL+XwrT/I2i4cMuWFBEenPGYrjQGOGBmnbSytm6EbHI7+7SJziaRkaUIo6mYxdZxFZDxhKQ2F70m5a8nTMlKGBZReHj1h8rs3ZDfA9Q+/QniMQqbRVhjZ7Gl2wXwtwuxHgOUPW7Qt1jZmUMWx9NiRuCu0Y0pV5NYdXfKwxxOx+Y3Qj7YYDiyaz3oAhas+H8cYTanooCYbmQV6mUibHXLTWpQzpg8Kisfa6xywpDxTlgTE807/a22hS9sIQwOcHEgcTD7PPPUR0SR+4522U9M3tbsU+HzJ1Fz6J5Ka8Uw2Gj3Z/9+11+QGTxRfyDxh9rnxZWw/P3t09OfxbQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0ND4zf4D4A/4r97ZkWdAAAAAElFTkSuQmCC'
    backgroundImage = 'src/assets/images/digitainBG.png'
    phoneNumber = '37460700400'
    minWorkes = '1000'
    maxWorkes = '1100'
    description = 'Digitain is one of the leading IT companies in Armenia that creates optimal and user-friendly solutions for businesses, thus gracefully representing Armenia at various international expositions and platforms worldwide. With the rapidly growing number of employees and global partners, the company creates a positive work culture to inspire its employees to continuously write its success story by working together toward a common vision.'
    jobDescription = 'Digitain is one of the leading IT companies in Armenia that creates optimal and user-friendly solutions for businesses, thus gracefully representing Armenia at various international expositions and platforms worldwide. With the rapidly growing number of employees and global partners, the company creates a positive work culture to inspire its employees to continuously write its success story by working together toward a common vision.'
    city = 'Երևան'
    industry = 'Տեղեկատվական Տեխնոլոգիաներ, Ծրագրավորում'
    deadline = '12.04.2025'
    scheduleType = 'Լրիվ դրույք'
  return (
    <div className='containerPage'>
        <div className='flex flex-col shadow-lg bg-[var(--itemColor)] border-x-1 border-b-1 border-gray-300'>
            <div className='w-full h-[350px] shadow-lg z-10  '>
                <img className='w-full h-full' src={backgroundImage} alt={backgroundImage} />
            </div>
            <div className='w-full h-[125px] flex pl-[30px]'>
                <div className='w-[150px] h-[150px] transform translate-y-[-60px] z-20 bg-[var(--primary)]'>
                    <img className='w-full h-full' src={logo} alt={companyTitle || 'Անուն'} />
                </div>
                <div className='mt-4 ml-10 flex flex-col'>
                    <p className=' font-bold text-4xl'>{jobTitle || 'Աշխատանքի անունը'}</p>
                    <p className='text-2xl '>{companyTitle || 'Ընկերության անունը'}</p>
                </div>
                
            </div>
            <div className='grid grid-cols-2 gap-3 ml-8 mb-4'>
                <p className='text-gray-500'>Ոլորտ՝ <span className='text-black font-bold'> {industry}</span> </p>
                <p className='text-gray-500'>Վերջնաժամկետ՝ <span className='text-black font-bold'> {deadline}</span> </p>
                <p className='text-gray-500'>Քաղաք՝ <span className='text-black font-bold'> {city}</span> </p>
                <p className='text-gray-500'>Դրույք՝ <span className='text-black font-bold'> {scheduleType}</span> </p>
            </div>
        </div>
        <div className='flex gap-5 my-5'>
            <div className='flex flex-col w-2/3 gap-5'>
                <div className='bg-[var(--itemColor)] rounded-2 shadow-lg p-5 '>
                    <p className='font-bold text-2xl mb-5'>Նկարագրություն</p>
                    <p>{jobDescription || 'Աշխատանքի մասին մասին'}</p>
                </div>
                <div className='bg-[var(--itemColor)] rounded-2 shadow-lg p-5 flex flex-col gap-5 '>
                    <p className='font-bold text-2xl'>Ընկերության մասին</p>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className='flex items-center gap-2'>
                            <PlaceIcon sx={{ fontSize: 28, color: '#d1d5dc'  }}/>
                            <div>
                                <p className='font-bold'>Քաղաք</p>
                                <p className='font-thin'>{city || 'Քաղաքը նշված չէ'}</p>
                            </div>
                        </div>
                        <div  className='flex items-center gap-2'>
                            <Groups2Icon sx={{ fontSize: 28, color: '#d1d5dc'  }}/>
                            <div>
                                <p className='font-bold'>Աշխատակիցների քանակ</p>
                                <p className='font-thin'>{minWorkes && maxWorkes ? `${minWorkes} - ${maxWorkes}` : 'Աշխատակիցների քանակը նշված չէ'}</p>
                            </div>
                        </div>
                        <div  className='flex items-center gap-2'>
                            <CallIcon sx={{ fontSize: 28, color: '#d1d5dc'  }}/>
                            <div>
                                <p className='font-bold'>Հեռախոսահամար</p>
                                <p className='font-thin'>{phoneNumber || 'Հեռախոսահամարը նշված չէ'}</p>
                            </div>
                        </div>
                        <div  className='flex items-center gap-2'>
                            <BusinessCenterIcon sx={{ fontSize: 28, color: '#d1d5dc'  }}/>
                            <div>
                                <p className='font-bold'>Ոլորտ</p>
                                <p className='font-thin'>{industry || 'Ոլորտը նշված չէ'}</p>
                            </div>
                        </div>
                    </div>
                    <p className=''>
                        {description || 'Ընկերության մասին'}
                    </p>
                </div>
                
            </div>
            <div className='flex w-1/3 bg-[var(--itemColor)] p-5 rounded-5 shadow-lg'>
                <p className='font-bold text-xl'> Նմանատիպ աշխատանքներ  </p> 
            </div>
        </div>
        
    </div>
  )
}

export default JobPage