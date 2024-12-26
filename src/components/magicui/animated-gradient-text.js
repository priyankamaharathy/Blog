export default function AnimatedGradientText({ children, className }) {
  return (
    <div
      className={`inline-flex items-center text-4xl md:text-5xl font-bold ${className}`}
      style={{ "--bg-size": "400%" }}
    >
      {children}
    </div>
  );
} 