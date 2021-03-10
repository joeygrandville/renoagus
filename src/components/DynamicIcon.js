import React, { lazy, Suspense, useEffect, useState } from "react";
import shortid from "shortid";

const importIcon = (icon) => lazy(() => import(`@material-ui/icons/${icon}`).catch(() => import("@material-ui/icons/Help")));

const DynIcon = ({ icon }) => {
  const [view, setView] = useState(undefined);
  useEffect(() => {
    const loadIcon = async () => {
      const Icon = await importIcon(icon);
      return <Icon key={shortid.generate()} />;
    };
    loadIcon().then(setView);
  }, [icon]);
  return <Suspense fallback="">{view}</Suspense>;
};

export default DynIcon;
