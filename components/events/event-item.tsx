import React from "react";
import { DummyEvent } from "../../dummy-data";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

/*
  - the css file needs to end with module.css
  - Nextjs will scope the styles properly for
    this component
 */
import classes from "./event-item.module.css";

interface EventItemProps {
  event: DummyEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const { title, image, date, location, id } = event;

  const eventDate = new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const address = location.replace(", ", "\n");
  const eventLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title}></img>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{eventDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{address}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={eventLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
