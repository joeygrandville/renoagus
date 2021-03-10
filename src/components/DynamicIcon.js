import { AlternateEmail, Fingerprint, Help, PermContactCalendar, Person, Phone, PlusOne, QueryBuilder, Restaurant } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const DynIcon = ({ icon, ...other }) => {
  const Icon = (() => {
    try {
      switch (icon) {
        case "Person":
          return <Person {...other} />;
        case "AlternateEmail":
          return <AlternateEmail {...other} />;
        case "Fingerprint":
          return <Fingerprint {...other} />;
        case "Link":
          return <Link {...other} />;
        case "QueryBuilder":
          return <QueryBuilder {...other} />;
        case "PlusOne":
          return <PlusOne {...other} />;
        case "PermContactCalendar":
          return <PermContactCalendar {...other} />;
        case "Phone":
          return <Phone {...other} />;
        case "Restaurant":
          return <Restaurant {...other} />;
        default:
          return <Help {...other} />;
      }
    } catch (_ex) {
      return <Help {...other} />;
    }
  })();
  return Icon;
};

export default DynIcon;
