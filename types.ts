export type DummyEvent = DummyEventContent & {
  id: string;
};

export type DummyEventContent = {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type DummyEventsRaw = {
  [key: string]: DummyEventContent;
};
