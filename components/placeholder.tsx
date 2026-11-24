export function Placeholder({ title }: { title: string }) {
  return (
    <div className="placeholder">
      <h2>{title}</h2>
      <p>
        This page is part of the booking system and will be built in a later
        step. The layout and navigation around it are already in place.
      </p>
    </div>
  );
}
