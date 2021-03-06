import React, { useState } from "react";
import { ChevronDown } from "react-feather";
import { useSpring, animated } from "react-spring";

interface PropTypes {
  getSortData: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    types: string
  ) => void;
  sortTypes: any;
}

const DropdownComponent: React.FC<PropTypes> = ({ getSortData, sortTypes }) => {
  const [toggle, setToggle] = useState(false);

  const animate = useSpring({
    opacity: toggle ? 1 : 0,
  });

  return (
    <>
      <div className="relative inline-block text-left z-50">
        <div>
          <span className="rounded-md shadow-sm">
            <button
              onClick={() => setToggle(!toggle)}
              className="inline-flex px-4 py-1 justify-center w-full rounded-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            >
              Ordered By
              <i className="ml-4">
                <ChevronDown size="20" />
              </i>
            </button>
          </span>
        </div>
        <div
          className={`${
            toggle ? "block" : "hidden"
          } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg`}
        >
          <animated.div style={animate}>
            <div className="rounded-md bg-white shadow-xs">
              <div className="py-1">
                {sortTypes.map((types: any, index: number) => (
                  <span
                    key={index}
                    className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                    onClick={(event) => {
                      getSortData(event, types);
                      setToggle(!toggle);
                    }}
                  >
                    {types}
                  </span>
                ))}
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </>
  );
};

export default DropdownComponent;
