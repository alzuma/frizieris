const CARDS = [
  {
    title: "Services",
    text: "Browse the services the shop offers and pick the one you want.",
  },
  {
    title: "Book an appointment",
    text: "Choose a specialist, a day and a time that suits you.",
  },
  {
    title: "My bookings",
    text: "See your upcoming appointments and cancel when you need to.",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="hero">
        <h1>Welcome to Frizieris</h1>
        <p>
          Book a haircut or a treatment in a few taps. This is the base layout
          of the booking system: it adapts to desktop and mobile, and the
          navigation on the left leads to the customer and admin areas.
        </p>
      </div>
      <div className="cards">
        {CARDS.map((card) => (
          <div className="card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <span className="tag">Coming soon</span>
          </div>
        ))}
      </div>
    </>
  );
}
