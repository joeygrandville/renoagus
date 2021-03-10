import React, { lazy, Suspense, useEffect, useState } from "react";
// import shortid from "shortid";

const importIcon = (icon) =>
  lazy(() => {
    switch (icon) {
      case "Person":
        return import("@material-ui/icons/Person");
      case "AlternateEmail":
        return import("@material-ui/icons/AlternateEmail");
      case "Fingerprint":
        return import("@material-ui/icons/Fingerprint");
      case "Link":
        return import("@material-ui/icons/Link");
      case "QueryBuilder":
        return import("@material-ui/icons/QueryBuilder");
      case "PlusOne":
        return import("@material-ui/icons/PlusOne");
      case "PermContactCalendar":
        return import("@material-ui/icons/PermContactCalendar");
      case "Phone":
        return import("@material-ui/icons/Phone");
      case "Restaurant":
        return import("@material-ui/icons/Restaurant");
      default:
        return import("@material-ui/icons/Help");
    }
  }).catch(() => import("@material-ui/icons/Help"));

const DynIcon = ({ icon }) => {
  const [view, setView] = useState(undefined);
  useEffect(() => {
    const loadIcon = async () => {
      const Icon = await importIcon(icon);
      return <Icon />;
    };
    loadIcon().then(setView);
  }, [icon]);
  return <Suspense fallback="">{view}</Suspense>;
};

export default DynIcon;
