import { GetStaticPaths, GetStaticProps } from "next";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import ErrorAlert from "../../components/ui/error-alert";
import { DummyEvent } from "../../types";

/*
  - event content should be crawlable
  - define both getStaticProps and getStaticPaths 
    for pre-rendering in dynamic routes
  - specify the revalidate in getStaticProps  
    to refresh the stale data periodically
  - in getStaticPaths only returns the ids of
    the featured events for optimization purpose
*/

interface EventDetailPageProps {
  event: DummyEvent;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ event }) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title}></EventSummary>
      <EventLogistics event={event}></EventLogistics>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<EventDetailPageProps> = async (
  context
) => {
  const eventId = context.params.eventId as string;
  const event = await getEventById(eventId);

  return {
    props: { event },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default EventDetailPage;
