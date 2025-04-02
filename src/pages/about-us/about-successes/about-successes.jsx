import { Success } from "./success"
const AboutSuccesses = () => {
  return (
        <div  className="min-h-[325px]">
            <div className="container">
                <div>
                    <p></p>
                    <p>
                        <div>
                            <div className="flex justify-between">
                            <Success count={11} name={"Հայտարարություն"}/>
                            <Success count={55} name={"Օգտատեր"}/>
                            <Success count={41} name={"Կազմակերպություն"}/>
                            <Success count={12} name={"Ստեղծված CV"}/>
                            </div>
                        </div>
                    </p>
                </div>
            </div>
        </div> 
 )
}

export default AboutSuccesses