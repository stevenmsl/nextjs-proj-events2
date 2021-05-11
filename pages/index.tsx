import { GetStaticProps } from "next";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import { DummyEvent } from "../types";

/*
  - featured events should be crawlable
  - define getStaticProps for pre-rendering
  - sepcify the revalidate to refresh the stale data  
*/

interface HomePageProps {
  featuredEvents: DummyEvent[];
}

const HomePage: React.FC<HomePageProps> = ({ featuredEvents }) => {
  if (!featuredEvents) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const featuredEvents = await getFeaturedEvents();
  console.log(featuredEvents);

  return {
    props: { featuredEvents },
    revalidate: 600,
  };
};

export default HomePage;
