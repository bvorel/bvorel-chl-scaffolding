import React, {useState} from "react";
const Accordion = (props) => {
    const [data, setData] = useState(props.datas);

    const handleToggleActive = () => {
        let activeNew = data.active === 1 ? 0 : 1;
        setData({...data, active : activeNew});
    }

    return (
        <div className={`p-5 border-t-[1px] last:border-b-[1px] border-[#c9c6c655] py-[25px] duration-500 group ${data.active === 1 ? 'is-active bg-click-here-accordion' : ''}`}>
            <div className="flex items-center">
              <div className="title-container flex flex-nowrap items-center w-0 w-full">
                <div className="group-title whitespace-nowrap">{data.title}</div>
                <div className="bg-click-here-teal h-[2px] bg-transparent w-full mx-5 flex justify-end justify-items-end">
                  <div className="bg-click-here-teal h-[2px] justify-self-end w-0 ease-linear duration-500 group-[.is-active]:w-full group-[.is-active]:delay-[250ms]"></div>
                </div>

              </div>
              <div className="ms-auto text-xl text-white cursor-pointer relative w-[50px] h-[50px] flex justify-start justify-items-end items-center bg-transparent" onClick={handleToggleActive}>
                <div className="absolute rotate-90 w-[30px] h-[2px] mx-[10px] my-[10px] bg-click-here-teal duration-500 group-[.is-active]:rotate-[0deg] group-[.is-active]:delay-500"></div>
                <div className="absolute w-[30px] h-[2px] mx-[10px] my-[10px] justify-self-start ease-linear delay-[500ms] duration-[250ms] group-[.is-active]:w-[0px] group-[.is-active]:delay-0 bg-click-here-teal"></div>

              </div>
            </div>
            <div className="overflow-hidden duration-1000 max-h-0 text-white group-[.is-active]:max-h-[400px] pe-[66px]">
                <p className="py-[25px]">{data.answer}</p>
            </div>
        </div>
    );
}
export default Accordion;
