import ProfileSidebar from "@/components/profile/profile-sidebar/profile-sidebar";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Metadata } from "next";
import { Locale } from "../../../../i18n.config";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Profile" });

  return {
    title: `Bright gallery | ${t("Profile")}`,
    description: t("Profile"),
    icons: {
      icon: "/favicon.svg",
    },
  };
}

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <ProfileSidebar type="largerScreen" />
      {children}
    </div>
  );
};

export default ProfileLayout;
