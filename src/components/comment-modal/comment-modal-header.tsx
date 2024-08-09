import { useFormikContext } from "formik";
import Image from "next/image";
import React from "react";

const CommentModalHeader = ({ handleClose }: { handleClose: () => void }) => {
  const { resetForm } = useFormikContext();
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => {
          handleClose();
          resetForm();
        }}
        type="button"
      >
        <Image width={32} height={32} alt="Закрыть" src={"/close.svg"} />
      </button>
    </div>
  );
};

export default CommentModalHeader;
