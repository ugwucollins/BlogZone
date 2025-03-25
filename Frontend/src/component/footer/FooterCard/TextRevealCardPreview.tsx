import { ArrowRight } from "lucide-react";
import { TextRevealCard } from "../../ui/text-reveal-card";
import { IconWorld } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function TextRevealCardPreview() {
  return (
    <div className="flex flex-row mt-4 max-[500px]:flex-wrap max-[500px]:flex-row-reverse gap-2 justify-center bg-transparent/5 h-auto py-4 rounded-2xl w-full overflow-hidden">
      <motion.div
        variants={FooterVartiant(-30)}
        viewport={{ once: false, amount: 0.25 }}
        initial="hidden"
        whileInView={"show"}
        className="flex flex-col w-full gap-2"
      >
        <div className="bg-[url('/bg3.jpg')] bg-cover bg-no-repeat rounded-xl min-h-[20vh] sm:min-h-[31vh] p-1 relative">
          <div className="absolute w-full h-full bg-black/75 rounded-xl top-0 left-0 z-0" />

          <div className="ml-3 mt-5 z-[1] relative">
            <div className="size-8 flex justify-center items-center align-middle bg-slate-500 rounded-md mb-2">
              <IconWorld className="text-white" />
            </div>

            <h1 className="text-xl font-medium text-white">
              Explore more to get your comfort zone
            </h1>
            <p className="text-slate-300/90 mb-2">
              Book your perfect stay with us
            </p>
            <button className="flex items-center font-medium hover:font-bold gap-2 whitespace-nowrap bg-slate-100 text-black px-3 py-2 rounded-md mt-5">
              Booking Now
              <span>
                <ArrowRight size={18} />
              </span>
            </button>
          </div>
        </div>
        <div className="bg-[url('/bg4.jpg')] bg-center bg-cover bg-no-repeat relative rounded-xl min-h-[20vh] sm:min-h-[31vh] p-1">
          <div className="absolute bottom-5 left-4">
            <p className="text-white/90 capitalize font-medium">
              Article available
            </p>
            <p className="text-white/90 text-xl font-semibold capitalize">78</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={FooterVartiant(30)}
        viewport={{ once: false, amount: 0.25 }}
        initial="hidden"
        whileInView={"show"}
        className="w-full min-h-[40vh] bg-center rounded-xl bg-[url('/bg5.jpg')] bg-cover bg-no-repeat"
      >
        <div className="w-full h-full rounded-xl flex justify-center text-center align-middle items-center">
          <TextRevealCard
            text="You know the business"
            revealText="Beyond acommodation, creating memories of a lifetime "
            className="h-full w-full"
          ></TextRevealCard>
        </div>
      </motion.div>
    </div>
  );
}

export const FooterVartiant = (from: any) => ({
  hidden: {
    opacity: 0,
    x: from,
    transition: {
      duration: 1,
    },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 1,
      delay: 0.5,
      // damping: 8,
      ease: "easeOut",
    },
  },
});
