// import React from "react";
// import StarRating from "./star-rating";
// import MyTextArea from "../my-textarea/my-textarea";
// import MyButton from "../my-button/my-button";
// import Image from "next/image";
// import { getTranslations } from "next-intl/server";

// const CommentForm = async () => {
//   const t = await getTranslations("Common");
//   return (
//     <form className="flex flex-col gap-[23px] w-full max-w-[500px] mb-[40px]">
//       <div className="flex gap-[14px] items-center">
//         <Image
//           loading="lazy"
//           alt="Аватарка"
//           width={65}
//           height={65}
//           src={"/avatar-c.svg"}
//         />
//         <div className="flex flex-col items-start">
//           <span className="text-[#717171] leading-[25.6px] font-medium">
//             {t("RateProd")}
//           </span>
//           <StarRating rating={1} type="button" />
//         </div>
//       </div>
//       <MyTextArea
//         name="message"
//         maxLength={300}
//         placeholder={t("AddComment")}
//       />
//       <div className="flex justify-end">
//         <MyButton type="submit" className="max-w-[155px]">
//           {t("AddComment")}
//         </MyButton>
//       </div>
//     </form>
//   );
// };

// export default CommentForm;
