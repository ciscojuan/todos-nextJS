'use client'

import { setCookie } from "cookies-next";
import { useState } from "react";

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props{
  currentTab?: number,
  tabOptions?: number[],
}


export const TabBar = ({currentTab = 1, tabOptions = [1, 2, 3, 4]}: Props) => {

const [selected, setSelected] = useState(currentTab)

const onTabSelected = (tab: number) =>{
  setSelected(tab)
  setCookie('currentTab', tab.toString())
}
  return (
    <div className="grid w-full grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2">

      {
        tabOptions.map((tab, index) => {
          return (
            <div key={index}>
              <input 
              checked={selected === tab}
              onChange={() => {}}
              type="radio" id={tab.toString()} className="peer hidden" />
              <label
                className="block transition-all cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                onClick={() => onTabSelected(tab)}
              >
                {tab}
              </label>
            </div>
          );
        })
      }

    </div>
  );
};
