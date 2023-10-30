import { FunctionComponent } from "react";
import { motion } from "framer-motion";

export const PlaceHolder: FunctionComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full flex items-center flex-col animate-pulse my-5"
    >
      <div className="flex bg-white shadow-md p-4 rounded-md">
        <div
          data-placeholder
          className="mr-2 h-20 w-20 rounded-full overflow-hidden relative bg-gray-200"
        ></div>
        <div className="flex flex-col justify-between">
          <div
            data-placeholder
            className="mb-2 h-5 w-40 overflow-hidden relative bg-gray-200"
          ></div>
          <div
            data-placeholder
            className="h-10 w-40 overflow-hidden relative bg-gray-200"
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

interface DummySectionProps {
  id: string;
}

const DummySection: FunctionComponent<DummySectionProps> = ({ id }) => {
  return (
    <section id={id}>
      <PlaceHolder />
    </section>
  );
};

export default DummySection;
