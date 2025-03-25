import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";

type Testimonial = {
  imageUrl?: string;
  categorate: string;
  title: string;
  quoteMessage: string;
  createdDate: number | string;
  updatedDate: string;
  createdBy: {
    imageUrl?: string;
    firstName: string;
    lastName: string;
    email: string;
    createdDate: number | string;
  };
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  // const handlePrev = () => {
  //   setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  // };

  const isActive = (index: number) => {
    return index === active;
  };
  const date = moment(1732045059907).format("MMMM Do YYYY, h:mm:ss a");

  useEffect(() => {
    const interval = setInterval(handleNext, 10000);
    if (autoplay) {
      return () => interval;
    }
    return () => clearInterval(interval);
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="bg-black w-full h-[80vh] relative max-h-auto mt-1 overflow-hidden">
      <div className="flex flex-col mt-1 relative">
        <div>
          <div className="relative h-80 w-full">
            <div className="absolute w-full h-[80vh] bg-gradient-to-t from-black/50 to-bg-black/90 top-0 left-0 z-[12]"></div>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.imageUrl}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 10
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 z-0 origin-bottom w-full bg-black/40 h-[79vh] "
                >
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.title}
                    draggable={false}
                    className="h-full w-full rounded-lg bg-black object-cover object-center lg:object-cover"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="max-h-[50vh] h-auto w-full absolute bottom-0 left-0 z-20">
        <motion.div
          key={active}
          initial={{
            y: 50,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -50,
            opacity: 0,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <div className="w-full mx-1 mb-2">
            <div className="capitalize w-auto p-1 mb-2">
              <span className="bg-slate-500/70 mx-[1px] text-white rounded-2xl py-1 px-2">
                {testimonials[active].categorate}
              </span>
            </div>

            <div className="flex justify-between w-full mb-4 lg:mb-16">
              <div className="w-full ml-2">
                <div className="capitalize text-xl font-semibold text-white">
                  {testimonials[active].title}
                </div>

                <motion.p className="text-gray-300 mt-2 dark:text-neutral-300">
                  {testimonials[active].quoteMessage
                    .split(" ")
                    .map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{
                          filter: "blur(10px)",
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 3,
                          ease: "easeInOut",
                          delay: 0.02 * index,
                        }}
                        className="inline-block"
                        style={{ wordSpacing: "1px" }}
                      >
                        {word.length === 120
                          ? word.slice(0, 120) + "..."
                          : word}
                        &nbsp;
                      </motion.span>
                    ))}
                </motion.p>
              </div>

              <div className="w-full mr-5 max-[580px]:hidden block ">
                <motion.div
                  key={active}
                  initial={{
                    x: 60,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -50,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full mr-5 max-[580px]:hidden block ">
                    <div className="flex items-center gap-2 justify-end">
                      <img
                        className="size-12 rounded-full "
                        src={testimonials[active].createdBy.imageUrl}
                        alt={testimonials[active].createdBy.firstName}
                      />
                      <div className="text-white capitalize font-medium text-lg flex gap-1">
                        <h1>{testimonials[active].createdBy.firstName}</h1>
                        {testimonials[active].createdBy.lastName}
                      </div>
                    </div>
                    <p className="text-right text-[11px] text-white/85 font-semibold">
                      {moment(testimonials[active].createdDate).format("llll")}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// type Testimonial = {
//   quote: string;
//   name: string;
//   designation: string;
//   src?: string;
// };
// type Testimonials = {
//   imageUrl: string;
//   categorate: string;
//   title: string;
//   quoteMessage: string;
//   createdDate: number | string;
//   updatedDate: string;
//   createdBy: {
//     imageUrl: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     createdDate: number | string;
//   };
// };

// export const AnimatedTestimonials = ({
//   testimonials,
//   autoplay = false,
// }: {
//   testimonials: Testimonial[];
//   autoplay?: boolean;
// }) => {
//   const [active, setActive] = useState(0);

//   const handleNext = () => {
//     setActive((prev) => (prev + 1) % testimonials.length);
//   };

//   const handlePrev = () => {
//     setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const isActive = (index: number) => {
//     return index === active;
//   };

//   useEffect(() => {
//     const interval = setInterval(handleNext, 10000);
//     if (autoplay) {
//       return () => interval;
//     }
//     return () => clearInterval(interval);
//   }, [autoplay]);

//   // setInterval(() => {
//   //   handleNext();
//   // }, 20000);

//   const randomRotateY = () => {
//     return Math.floor(Math.random() * 21) - 10;
//   };
//   return (
//     // <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
//     <div className="bg-black w-full h-[80vh] relative max-h-auto mt-1 overflow-hidden">
//       {/* <div className="relative grid grid-cols-1 md:grid-cols-2  gap-20"> */}
//       <div className="flex flex-col mt-1 relative">
//         <div>
//           <div className="relative h-80 w-full">
//             <AnimatePresence>
//               {testimonials.map((testimonial, index) => (
//                 <motion.div
//                   key={testimonial.src}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.9,
//                     z: -100,
//                     rotate: randomRotateY(),
//                   }}
//                   animate={{
//                     opacity: isActive(index) ? 1 : 0.7,
//                     scale: isActive(index) ? 1 : 0.95,
//                     z: isActive(index) ? 0 : -100,
//                     rotate: isActive(index) ? 0 : randomRotateY(),
//                     zIndex: isActive(index)
//                       ? 10
//                       : testimonials.length + 2 - index,
//                     y: isActive(index) ? [0, -80, 0] : 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.9,
//                     z: 100,
//                     rotate: randomRotateY(),
//                   }}
//                   transition={{
//                     duration: 1,
//                     ease: "easeInOut",
//                   }}
//                   className="absolute inset-0 z-0 origin-bottom w-full bg-black/50 h-[79vh]"
//                 >
//                   <img
//                     src={testimonial.src}
//                     alt={testimonial.name}
//                     draggable={false}
//                     className="h-full w-full rounded-lg bg-black object-cover object-center lg:object-cover"
//                   />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//       <div className="max-h-[50vh] h-auto w-full absolute bottom-0 left-0 z-20">
//         {/* <div className="flex justify-between absolute bg-black bottom-0 left-0 z-50 flex-col py-4"> */}
//         <motion.div
//           key={active}
//           initial={{
//             y: 50,
//             opacity: 0,
//           }}
//           animate={{
//             y: 0,
//             opacity: 1,
//           }}
//           exit={{
//             y: -50,
//             opacity: 0,
//           }}
//           transition={{
//             duration: 2,
//             ease: "easeInOut",
//           }}
//         >
//           <div className="w-full">
//             <div className="w-full">Hello</div>

//             <div className="flex justify-between w-full">
//               <div className="w-full">hhhhhhhhhhhhh</div>
//               <div className="w-full justify-end text-right">
//                 <h3 className="text-2xl font-bold dark:text-white text-black">
//                   {testimonials[active].name}
//                 </h3>
//                 <p className="text-sm text-gray-500 dark:text-neutral-500">
//                   {testimonials[active].designation}
//                 </p>
//                 <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
//                   {testimonials[active].quote.split(" ").map((word, index) => (
//                     <motion.span
//                       key={index}
//                       initial={{
//                         filter: "blur(10px)",
//                         opacity: 0,
//                         y: 5,
//                       }}
//                       animate={{
//                         filter: "blur(0px)",
//                         opacity: 1,
//                         y: 0,
//                       }}
//                       transition={{
//                         duration: 3,
//                         ease: "easeInOut",
//                         delay: 0.02 * index,
//                       }}
//                       className="inline-block"
//                     >
//                       {word}&nbsp;
//                     </motion.span>
//                   ))}
//                 </motion.p>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         <div className="flex gap-4 pt-12 md:pt-0">
//           <button
//             onClick={handlePrev}
//             className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//           >
//             <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
//           </button>
//           <button
//             onClick={handleNext}
//             className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//           >
//             <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
