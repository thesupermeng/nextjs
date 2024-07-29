import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import Image from 'next/image';
import { Plus } from '@/asset/icons';
import { isWeb } from '@/util/common';
import useGetConfig from '@/hook/user/useGetConfig';

const AccordionCustom = ({ faq, open, handleOpen }) => {
  return (
    <Accordion
      open={open}
      icon={
        open ? (
          <div className='w-[15.75px] h-[3.50px] bg-white rounded-[1px]'></div>
        ) : (
          <Image src={Plus} alt='plus' width={15} className='' />
        )
      }
      className='bg-[#191A1D] rounded-xl px-5 text-white'
    >
      <AccordionHeader
        onClick={handleOpen}
        className={`hover:text-white ${
          open ? 'text-white' : 'text-white/50'
        }  !border-none text-[17px]`}
      >
        {faq?.question}
      </AccordionHeader>
      <AccordionBody className='text-[15px] text-white font-main font-medium'>
        <div dangerouslySetInnerHTML={{ __html: faq?.answer }} />
      </AccordionBody>
    </Accordion>
  );
};
export default function FaqContent() {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [selected, setSelected] = useState(1);

  const { config } = useGetConfig();
  const [faqJson, setFaqJson] = useState([]);
  useEffect(() => {
    if (config) {
      setFaqJson(JSON.parse(config.web?.faq));
    }
  }, [config]);

  return (
    <>
      <div className='flex flex-row overflow-x-auto gap-3 mb-5 no-scrollbar'>
        {faqJson?.map((faq, index) => (
          <CategoryButton
            key={index}
            selected={selected === faq.id}
            setSelected={() => setSelected(faq.id)}
          >
            {faq.category}
          </CategoryButton>
        ))}
      </div>
      <div
        className={`gap-8 flex flex-col overflow-y-auto  ${
          isWeb() ? '' : 'flex-[1_0_0]'
        }`}
      >
        {faqJson
          ?.find((e) => e.id === selected)
          ?.qaList?.map((faq, index) => {
            return (
              <div key={index}>
                <AccordionCustom
                  faq={faq}
                  open={open === faq.id}
                  handleOpen={() => handleOpen(faq.id)}
                />
              </div>
            );
          })}

        <div className='h-5'></div>
      </div>
    </>
  );
}

const CategoryButton = ({ children, selected, setSelected }) => {
  return (
    <div
      onClick={setSelected}
      className={`whitespace-nowrap flex-initial items-center rounded-[8px] py-2.5 px-3 cursor-pointer ${
        selected ? 'bg-[#ffffff] text-black font-semibold' : 'bg-tayaGrey'
      } ${isWeb() ? '' : ' text-sm'}`}
    >
      {children}
    </div>
  );
};
