import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();

  return <div>{t("Home...!")}</div>;
}
