"use client";

import { useScrollFixed } from "@/lib/hooks/useScrollFixed";
import { CommentType, ResponseType } from "@/lib/types/api-types";
import { cn } from "@/lib/utils/cn";
import { validateFile } from "@/lib/utils/validateFile";
import { addComment } from "@/services/commentsApi";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Locale } from "../../../i18n.config";
import MyButton from "../my-button/my-button";
import MyFormik from "../my-formik/my-formik";
import MyInput from "../my-input/my-input";
import MyTextArea from "../my-textarea/my-textarea";
import StarRating from "../products/star-rating";
import { FormikHelpers, FormikProps, useFormikContext } from "formik";
import CommentModalHeader from "./comment-modal-header";

type CommentModalProps = {
  open: number | null;
  setOpen: (value: number | null) => void;
  locale: Locale;
};

const CommentModal = ({ open, setOpen, locale }: CommentModalProps) => {
  useScrollFixed(!!open);
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Profile.Orders");
  const productId = open || null;

  const handleSubmit = async (
    values: CommentType,
    helpers: FormikHelpers<typeof values>
  ) => {
    setLoading(true);
    if (error) {
      setLoading(false);
      setFile(null);
      return;
    }
    const formData = new FormData();
    formData.append("rate", String(rating));
    formData.append("product", String(productId));

    if (values.text) {
      formData.append("text", values.text);
    }
    if (file) {
      formData.append("images", file);
    }
    const data: ResponseType | string = await addComment(formData, locale);

    if (typeof data !== "string" && data?.status_code === 201) {
      toast.success(t("CommentSuccess"));
      setOpen(null);
      setLoading(false);
      setFile(null);
      helpers.resetForm();
    } else {
      toast.error(data as string);
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const allowedMimeTypes = [
        "image/jpeg", // .jpg, .jpeg
        "image/png", // .png
        "image/gif", // .gif
        "image/bmp", // .bmp
        "image/webp", // .webp
        "image/tiff", // .tiff
        "image/svg+xml", // .svg
      ];

      const validationError = validateFile(
        e.target.files[0]!,
        30,
        allowedMimeTypes,
        locale
      );
      setError(validationError);
      if (!validationError) {
        setFile(e.target.files[0]);
      } else {
        setFile(null);
      }
    }
  };

  useEffect(() => {
    if (error) {
      setFile(null);
    }
  }, [error]);

  useEffect(() => {
    setError(error);
  }, [error]);

  const initialValues = {
    text: "",
  };

  const handleClose = () => {
    setOpen(null);
    setFile(null);
    setError("");
    setRating(5);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-[#000000B2] -z-10 flex items-center justify-center px-[20px] opacity-0 transition-transform duration-300 ease-in-out",
        null,
        {
          "opacity-100 z-30": open,
        }
      )}
    >
      <div
        className={cn(
          "rounded-[10px] border border-solid border-[#E0E0E0] bg-white w-full max-w-[387px] p-[24px]",
          null,
          {
            "scale-100": open,
          }
        )}
      >
        <MyFormik onSubmit={handleSubmit} initialValues={initialValues}>
          <CommentModalHeader handleClose={handleClose} />
          <p className="font-semibold md:text-[24px] md:leading-[31px] text-[20px] mb-4 text-center">
            {t("LeaveComment")}
          </p>

          <MyTextArea
            wrapperClassName="mb-4"
            className="placeholder:text-[#83899F]"
            maxLength={300}
            name="text"
            placeholder={t("AddCommentPlaceholder")}
          />
          <MyInput
            onChange={handleFileChange}
            innerIcon={
              <Image src={"/image.svg"} width={24} height={24} alt="" />
            }
            innerText={file?.name ? file.name : t("ChoosePhotoPlaceholder")}
            inputClassName="sr-only"
            name="image"
            type="file"
            accept="image/*"
            labelClassName="bg-[#F5F6F8] p-[12px]  rounded-[12px] border-[1.5px] border-[#E1E4ED] border-solid min-h-[48px] w-full justify-normal gap-[10px] items-center leading-[22px] text-[#83899F] cursor-pointer hover:border-accentColor transion-colors"
          />
          {error && (
            <span className="text-errorColor text-sm font-inter">{error}</span>
          )}
          <StarRating setRating={setRating} rating={rating} type="button" />
          <div className="flex justify-center">
            <MyButton loading={loading} type="submit" className="max-w-[155px]">
              {t("Send")}
            </MyButton>
          </div>
        </MyFormik>
      </div>
    </div>
  );
};

export default CommentModal;
